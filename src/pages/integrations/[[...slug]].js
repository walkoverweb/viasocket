import Link from 'next/link';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import categories from '@/data/categories.json';
import style from './integrations.module.scss';

import getApps from '@/utils/getApps';
import { getFooterData, getMetaData, getNavData } from '@/utils/getData';
import getPageInfo from '@/utils/getPageInfo';
import getIntegrationsInfo from '@/utils/getInterationsInfo';

export default function Integrations({ pageInfo, navData, footerData, metadata, apps }) {
    return (
        <>
            <div className="container my-6">
                <Navbar navData={navData} />
            </div>
            <div className="container cont">
                <label className="input border max-w-[400px] border-black flex items-center gap-2 focus-within:outline-none">
                    <MdSearch fontSize={20} />
                    <input type="text" className={`${style.input} grow`} placeholder="Search your favorite tools " />
                </label>
                <div className="flex">
                    <div className=" border border-black border-t-0 lg:block hidden">
                        <div className="cont min-w-[252px] ">
                            {categories?.categories.map((category, index) => {
                                return (
                                    <Link
                                        key={index}
                                        className="uppercase text-sm font-medium tracking-wider px-5 py-2 hover:bg-black hover:text-white"
                                        href={`/integrations/category/${category}`}
                                    >
                                        {category}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="p-9 cont gap-2">
                            <h1 className="h1 text-accent">
                                <span className="text-black italic">300+</span> AI Tools
                            </h1>
                            <p>
                                Viasocket is your all-in-one solution, seamlessly integrating CRM, Marketing,
                                E-Commerce, Helpdesk, Payments, Web forms, Collaboration, and more for streamlined
                                business success.
                            </p>
                        </div>

                        <div className={style.appsgrid}>
                            {apps?.length > 0 &&
                                apps.map((app, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={`/integrations/${app?.appslugname}`}
                                            className={style.app}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="border flex items-center justify-center w-9 h-9 bg-white">
                                                    <Image
                                                        src={app?.iconurl}
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
                                })}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-end w-fulls">
                    <Link className="btn btn-outline border-t-0" href={'/'}>
                        Prev
                    </Link>
                    <Link className="btn btn-outline border-t-0 border-l-0" href={'/'}>
                        Next
                    </Link>
                </div>
            </div>
            <div className="container my-6">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
export async function getServerSideProps(context) {
    const pageInfo = getPageInfo(context);
    console.log('🚀 ~ getServerSideProps ~ pageInfo:', pageInfo);
    const integrationsInfo = getIntegrationsInfo(pageInfo?.pathArray);
    console.log('🚀 ~ getServerSideProps ~ integrationsInfo:', integrationsInfo);
    const navData = await getNavData();
    const footerData = await getFooterData();
    const metadata = await getMetaData();
    const apps = await getApps();

    return {
        props: {
            pageInfo: pageInfo || {},
            navData: navData || {},
            footerData: footerData || {},
            metadata: metadata || {},
            apps: apps || [],
        },
    };
}
