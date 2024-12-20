import Link from 'next/link';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import categories from '@/data/categories.json';
import style from './IntegrationsIndexComp.module.scss';
import { APPERPAGE } from '@/const/integrations';
import { useEffect, useState } from 'react';
import searchApps from '@/utils/searchApps';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
export default function IntegrationsIndexComp({
    pageInfo,
    integrationsInfo,
    navData,
    footerData,
    apps,
    blogsData,
    categoryData,
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [searchedApps, setSearchedApps] = useState([]);
    const [searchedCategoies, setSearchedCategoies] = useState();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);
    useEffect(() => {
        if (debounceValue) {
            const filteredCategories = categories?.categories?.filter((category) =>
                category.toLowerCase().includes(debounceValue.toLowerCase())
            );
            setSearchedCategoies(filteredCategories);
            const loadApps = async () => {
                const fetchedApps = await searchApps(debounceValue);
                setSearchedApps(fetchedApps || []);
            };
            loadApps();
        } else {
            setSearchedApps([]);
            setSearchedCategoies();
        }
    }, [debounceValue]);

    const showNext = apps?.length > 0 && APPERPAGE <= apps?.length;

    const goToNext = () => {
        const url = `/integrations/${integrationsInfo?.category ? 'category/' + integrationsInfo?.category : ''}/page/${Number(integrationsInfo?.page) + 1}`;
        return url;
    };

    const goToPrev = () => {
        if (integrationsInfo?.category && !integrationsInfo?.page) {
            const url = `${pageInfo?.pathArray.join('/')}/page/${Number(integrationsInfo?.page) - 1}`;
            return url;
        } else {
            const url = `${pageInfo?.pathArray.slice(0, -2).join('/')}/page/${Number(integrationsInfo?.page) - 1}`;
            return url;
        }
    };
    return (
        <>
            <IntegrationsHeadComp metaData={categoryData} integrationsInfo={integrationsInfo} />
            <div className="container my-6">
                <Navbar navData={navData} utm={'/integrations'} />
            </div>
            <div className="container cont">
                <label className="input border max-w-[400px] border-black flex items-center gap-2 focus-within:outline-none">
                    <MdSearch fontSize={20} />
                    <input
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                        type="text"
                        className={`${style.input} grow`}
                        placeholder="Search your favorite tools "
                    />
                </label>
                <div className="flex">
                    <div className=" border border-black border-t-0 lg:block hidden">
                        <div className="cont max-w-[252px] min-w-[252px] ">
                            {debounceValue ? (
                                searchedCategoies ? (
                                    searchedCategoies.map((category, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                className={`border-r-0 border-y-0 border-8 uppercase text-sm font-medium tracking-wider px-3 py-2 hover:bg-black hover:text-white ${category === decodeURIComponent(integrationsInfo?.category) ? 'border-accent' : 'border-white hover:border-black'}`}
                                                href={`/integrations/category/${category}`}
                                            >
                                                {category}
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <span className="p-8 text-3xl w-full col-span-3 border border-black border-l-0 border-t-0 ">
                                        No Apps found for Searched name{' '}
                                    </span>
                                )
                            ) : (
                                categories?.categories.map((category, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            className={`border-r-0 border-y-0 border-8 uppercase text-sm font-medium tracking-wider px-3 py-2 hover:bg-black hover:text-white ${category === decodeURIComponent(integrationsInfo?.category) ? 'border-accent' : 'border-white hover:border-black'}`}
                                            href={`/integrations/category/${category}`}
                                        >
                                            {category}
                                        </Link>
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="p-9 cont gap-2">
                            {integrationsInfo?.category && integrationsInfo?.category != 'All' ? (
                                <>
                                    <h1 className="h1 text-accent">
                                        <span className="text-black italic">{categoryData?.appcount || 300}+</span>{' '}
                                        {decodeURIComponent(integrationsInfo?.category)}
                                    </h1>
                                    <p>{categoryData?.subheading}</p>
                                </>
                            ) : (
                                <>
                                    <h1 className="h1  text-accent italic">
                                        {' '}
                                        5000+
                                        <span className="text-black not-italic"> viaSocket Integrations</span>
                                    </h1>
                                    <p>
                                        Viasocket is your all-in-one solution, seamlessly integrating CRM, Marketing,
                                        E-Commerce, Helpdesk, Payments, Web forms, Collaboration, and more for
                                        streamlined business success.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className={style.appsgrid}>
                            {debounceValue ? (
                                searchedApps?.length > 0 ? (
                                    searchedApps?.map((app, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={`/integrations/${app?.appslugname}`}
                                                className={style.app}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="border flex items-center justify-center w-9 h-9 bg-white">
                                                        <Image
                                                            src={app?.iconurl || 'https://placehold.co/36x36'}
                                                            width={36}
                                                            height={36}
                                                            alt={app?.name}
                                                            className="h-5 w-fit"
                                                        />
                                                    </div>
                                                    <h2 className="font-bold">{app?.name}</h2>
                                                </div>
                                                <p className={style?.app__des}>{app?.description}</p>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <span className="p-8 text-3xl w-full col-span-3 border border-black border-l-0 border-t-0 ">
                                        No Apps found for Searched name{' '}
                                    </span>
                                )
                            ) : (
                                apps?.map((app, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={`/integrations/${app?.appslugname}`}
                                            className={style.app}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="border flex items-center justify-center w-9 h-9 bg-white">
                                                    <Image
                                                        src={app?.iconurl || 'https://placehold.co/36x36'}
                                                        width={36}
                                                        height={36}
                                                        alt={app?.name}
                                                        className="h-5 w-fit"
                                                    />
                                                </div>
                                                <h2 className="font-bold">{app?.name}</h2>
                                            </div>
                                            <p className={style?.app__des}>{app?.description}</p>
                                        </Link>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
                {!debounceValue && (
                    <div className="flex justify-end items-end w-full">
                        {integrationsInfo?.page > 0 && (
                            <Link className="btn btn-ghost" href={goToPrev()}>
                                Prev
                            </Link>
                        )}
                        {showNext && (
                            <Link className="btn btn-ghost" href={goToNext()}>
                                Next
                            </Link>
                        )}
                    </div>
                )}
            </div>
            <div className="container my-6">
                <BlogGrid posts={blogsData} />
            </div>
            <div className="container my-6">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
