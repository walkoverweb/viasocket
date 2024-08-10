import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdClose, MdOutlineArrowForward, MdSearch, MdArrowForward } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { getDbdashData } from './api/index';
import GetStarted from '@/components/getStarted/getStarted';
import { FeaturesGrid } from '@/components/featureGrid/featureGrid';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import BlogGrid from '@/components/blogGrid/blogGrid';
import ComboGrid from '@/components/integrationsComp/integrationsHero/comboGrid/comboGrid';
import fetchSearchResults from '@/utils/searchIntegrationApps';
import Industries from '@/assets/data/categories.json';
import { LinkButton } from '@/components/uiComponents/buttons';

const Index = ({ products, testimonials, caseStudies, getStartedData, features, metaData, faqData, posts, combos }) => {
    const formattedIndustries = Industries.industries.map((name, id) => ({ name, id: id + 1 }));
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedApps, setSelectedApps] = useState([]);
    const [apps, setApps] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [combinationLoading, setCombinationLoading] = useState(false);
    const [debounceValue, setDebounceValue] = useState(searchTerm);
    const [renderCombos, setRenderCombos] = useState();
    const hasRunEffect = useRef(false);

    const fetchAppsData = async (category) => await fetchApps(category);

    useEffect(() => {
        const getApps = async () => {
            const apps = await fetchAppsData(selectedCategory); // Await the result here
            if (apps.length > 0) setApps(apps.slice(0, 20));
        };
        getApps();
    }, [selectedCategory]);

    useEffect(() => {
        if (apps.length > 0) setSearchData(apps.slice(0, 20));
    }, [apps]);

    // useEffect(() => {
    //     if (!hasRunEffect.current && searchData.length > 0 && selectedApps.length === 0) {
    //         searchData.slice(0, 2).forEach((app) => handleSelectApp(app.appslugname));
    //         hasRunEffect.current = true;
    //     }
    // }, [searchData, selectedApps]);

    useEffect(() => {
        if (!hasRunEffect.current && searchData.length > 0 && selectedApps.length === 0) {
            const initialApps = searchData.filter(
                (app) => app.appslugname === 'slack' || app.appslugname === 'airtable'
            );
            initialApps.forEach((app) => handleSelectApp(app.appslugname));
            hasRunEffect.current = true;
        }
    }, [searchData, selectedApps]);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(searchTerm), 200);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        searchApps();
    }, [debounceValue]);

    const handleSelectApp = (appName) => {
        const app = searchData.find((app) => app.appslugname === appName);
        if (app) {
            setSearchData((prev) => prev.filter((item) => item.appslugname !== appName));
            setSelectedApps((prev) => [...prev, app]);
        }
        setSearchTerm('');
    };

    const searchApps = async () => {
        if (debounceValue) {
            setSearchLoading(true);
            try {
                const result = await fetchSearchResults(debounceValue);
                setSearchData(result);
            } catch (error) {
                console.error(error);
            } finally {
                setSearchLoading(false);
            }
        }
    };

    const removeAppFromArray = (indexToRemove) => {
        if (indexToRemove >= 0 && indexToRemove < selectedApps.length) {
            const appToRemove = selectedApps[indexToRemove];
            setSelectedApps((prev) => {
                const updatedSelectedApps = prev.filter((_, index) => index !== indexToRemove);
                if (updatedSelectedApps.length > 0 || selectedApps.length === 1) {
                    setSearchData((prevSearchData) => [appToRemove, ...prevSearchData]);
                }
                return updatedSelectedApps;
            });
        }
    };

    const handleGenerate = async () => {
        const selectedAppSlugs = selectedApps.map((app) => app.appslugname);
        setCombinationLoading(true);
        try {
            const combos = await fetchCombos(selectedAppSlugs, selectedCategory);
            setRenderCombos(combos);
            setCombinationLoading(false);
        } catch (error) {
            console.error('Error fetching combos:', error);
            setCombinationLoading(false);
        }
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <div className="grid gap-20">
                <div className="flex flex-col gap-10 container lg:pb-12 pt-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl font-medium">AI First</span>
                        <h2 className="md:text-6xl text-4xl font-medium ">
                            Connect your favorite apps and
                            <br /> automate your repetitive tasks
                        </h2>
                    </div>
                    <div className="p-8 bg-neutral rounded flex flex-col gap-9">
                        <h2 className="text-3xl">What industries are automating</h2>
                        <div className="flex flex-wrap gap-6">
                            <select
                                placeholder="Select an industry"
                                className="select select-bordered border-[#CCCCCC] flex items-center gap-2 bg-white rounded max-w-[300px]"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {formattedIndustries.map((indus, index) => (
                                    <option value={indus.name} key={index}>
                                        {indus.name}
                                    </option>
                                ))}
                            </select>
                            {selectedApps.map((app, index) => (
                                <div className="flex items-center gap-2 bg-white w-fit p-3 rounded cursor-pointer">
                                    <Image src={app?.iconurl} width={24} height={24} alt="ico" />
                                    <span>{app?.name}</span>
                                    <MdClose
                                        className="text-gray-300 hover:text-gray-950"
                                        onClick={() => removeAppFromArray(index)}
                                    />
                                </div>
                            ))}
                            <div className="w-[300px] transition-all duration-300 relative bg-white dropdown">
                                <label
                                    className="input border-[#CCCCCC] flex items-center gap-2 bg-white rounded"
                                    tabIndex={0}
                                    role="button"
                                >
                                    <MdSearch color="#CCCCCC" fontSize={20} />
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="Search integrations"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <span
                                        className="btn icon border-none bg-transparent p-0"
                                        onClick={() => setSearchTerm('')}
                                    >
                                        <MdClose color="black" fontSize={24} />
                                    </span>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu flex-nowrap bg-base-100 shadow-xl mt-2 z-[1] rounded max-h-[290px] w-[300px] overflow-scroll p-0"
                                >
                                    {searchLoading ? (
                                        [...Array(12)].map((_, index) => (
                                            <div
                                                className=" rounded-none  bg-white px-3 py-2 flex  w-full "
                                                key={index}
                                            >
                                                <div className="w-[280px] skeleton bg-slate-100 rounded-none "></div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            {searchData &&
                                                searchData.length &&
                                                searchData.map((app, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 bg-white px-3 py-2 cursor-pointer w-full hover:bg-slate-100"
                                                        onClick={() => handleSelectApp(app.appslugname)}
                                                    >
                                                        <Image src={app?.iconurl} width={12} height={12} alt="ico" />
                                                        <span>{app?.name}</span>
                                                    </div>
                                                ))}
                                        </>
                                    )}
                                </ul>
                            </div>
                            <button
                                onClick={handleGenerate}
                                className="btn btn-accent h-[48px] w-auto flex items-center justify-center rounded text-lg border border-black"
                            >
                                Search Automation
                            </button>
                        </div>
                        <ComboGrid
                            combos={renderCombos ? renderCombos : combos}
                            loading={combinationLoading}
                            showNoData
                        />
                    </div>
                </div>
                {/* <ProductsSection products={products} /> */}
                {features && <FeaturesGrid features={features} page={'overall'} />}
                <div className="container my-12">
                    <TestimonialsSection testimonials={testimonials} />
                </div>
                <div className="container my-12">
                    {' '}
                    <CaseStudiesSection caseStudies={caseStudies} />
                </div>
                {posts?.length > 0 && (
                    <div className="container gap-12">
                        {' '}
                        <BlogGrid posts={posts} />
                    </div>
                )}
                {faqData?.length > 0 && <FAQSection faqData={faqData} faqName={'/index'} />}
                {getStartedData && (
                    <div className="container">
                        <GetStarted data={getStartedData} isHero={'false'} />
                    </div>
                )}
            </div>
        </>
    );
};

const ProductsSection = ({ products }) => (
    <div className="container grid gap-10">
        <h2 className="font-inter text-3xl font-semibold leading-9 tracking-normal text-left">
            Meet our automation products
        </h2>
        <div className="grid md:grid-cols-2 grid-cols-1 md:flex-row lg:gap-16 md:gap-8 gap-8 items-center justify-center">
            {products.map((product, index) => (
                <Link
                    key={index}
                    href={`/${product?.name && product.name}`}
                    target="_blank"
                    className="flex items-center justify-center w-full h-full"
                    aria-label="products"
                >
                    <div className="flex flex-col bg-white rounded-md overflow-hidden max-w-[400px] md:max-w-full w-full h-full hover:drop-shadow-lg">
                        <div className="p-6 grid gap-2 h-full">
                            <div className="flex items-center gap-2">
                                <Image
                                    className="h-[40px]"
                                    src={`/assets/brand/${product?.name}_ico.svg`}
                                    width={36}
                                    height={48}
                                    alt={product?.name}
                                />
                                <p className="font-inter text-3xl font-semibold leading-11 text-left capitalize tracking-wide">
                                    {product?.name}
                                </p>
                            </div>
                            <p className="font-inter lg:text-xl text-base font-normal leading-6 tracking-normal text-left">
                                {product?.description}
                            </p>
                            <button className="flex items-center gap-1 text-[#0000ff]" aria-label="Explore">
                                Explore <MdArrowForward />
                            </button>
                        </div>
                        <div className="pt-6 w-full">
                            <Image
                                className="w-full bg-[#F6F4EE]"
                                src={product.image[0]}
                                height={90}
                                width={80}
                                alt={product?.name}
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const TestimonialsSection = ({ testimonials }) => (
    <div className="flex flex-col gap-9">
        <h2 className="md:text-6xl text-4xl font-medium">What clients says</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {testimonials.map((testimonial, index) => (
                <div className="flex flex-col rounded-md p-8 gap-8 bg-neutral" key={index}>
                    <p className="font-inter text-lg font-normal leading-[32px] tracking-normal text-left">
                        " {testimonial?.testimonial}"
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                        <Image
                            className="rounded-full"
                            src={testimonial?.client_img[0]}
                            width={36}
                            height={36}
                            alt={testimonial?.given_by}
                        />
                        <div>
                            <p className="font-inter font-semibold leading-4 tracking-normal text-left">
                                {testimonial?.given_by}
                            </p>
                            <p className="font-inter text-sm font-normal leading-4 tracking-normal text-left pt-1 text-gray-400">
                                {testimonial?.giver_title}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const CaseStudiesSection = ({ caseStudies }) => (
    <div className="flex flex-col gap-9">
        <h2 className="md:text-6xl text-4xl font-medium">Client Stories</h2>
        <div className="grid grid-rows-6 grid-cols-6 gap-6 container md:max-h-[700px]">
            {caseStudies.map((caseStudy, index) => (
                <CaseStudyLink key={index} caseStudy={caseStudy} />
            ))}
        </div>
    </div>
);

const CaseStudyLink = ({ caseStudy }) => {
    const isPriority = caseStudy?.priority === '1';
    const linkClass = isPriority
        ? 'lg:row-span-6 lg:col-span-3 md:row-span-3 md:col-span-6 row-span-2 col-span-6'
        : 'lg:row-span-3 lg:col-span-3 md:row-span-3 md:col-span-3 row-span-2 col-span-6';

    return (
        <Link
            href={caseStudy?.link}
            target="_blank"
            className={`${linkClass} bg-neutral flex flex-col ${isPriority ? 'md:flex-row lg:flex-col' : 'lg:flex-row lg:items-center'} items-start rounded-md overflow-hidden hover:drop-shadow-lg`}
            aria-label="casestudy"
        >
            <div className="casestudy_img w-full h-full">
                <Image src={caseStudy?.image[0]} width={1080} height={1080} alt={caseStudy?.title} />
            </div>
            <div className="p-4 flex flex-col gap-2 w-full">
                <p>{caseStudy?.title}</p>
                <LinkButton href={caseStudy?.link} title={'Read More'} />
            </div>
        </Link>
    );
};

export default Index;

export async function getServerSideProps() {
    const IDs = [
        'tblogeya1',
        'tblwql8n1',
        'tblwoqytc',
        'tblvgm05y',
        'tblmsw3ci',
        'tblsaw4zp',
        'tblvo36my',
        'tbl2bk656',
        'tblnoi7ng',
        'tblvu0f6w',
    ];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const tag = 'via-socket';
    const defaultTag = 'integrations';
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
    );
    const posts = await res.data;
    const combos = await fetchCombos(['slack', 'airtable'], 'All');
    return {
        props: {
            products: results[0]?.data?.rows,
            testimonials: results[1]?.data?.rows,
            caseStudies: results[2]?.data?.rows,
            getStartedData: results[3]?.data?.rows,
            features: results[6]?.data?.rows,
            metaData: results[7]?.data?.rows,
            faqData: results[8]?.data?.rows,
            posts: posts,
            combos,
        },
    };
}

async function fetchApps(category) {
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=50${category && `&category=${category}`}`,
        apiHeaders
    );
    const apps = await response.json();
    return apps;
}

async function fetchCombos(pathArray, industry) {
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?${pathArray.map((service) => `service=${service}`).join('&')}&industry=${industry.toLowerCase()}`,
        apiHeaders
    );
    const responseData = await response.json();
    return responseData;
}
