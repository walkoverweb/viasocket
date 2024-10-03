import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import { getDbdashData } from '@/pages/api';
import Image from 'next/image';
import Link from 'next/link';

export default function Alphabet({ firstApp, apps, navData, footerData, metaData }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/support'} />

            <Navbar navData={navData} />
            <div className="container flex flex-col my-20 gap-5">
                {firstApp.length == 1 || !apps.length ? (
                    <>
                        <h1 className="text-6xl">{firstApp}</h1>
                        <div className="grid grid-cols-5 gap-3 ">
                            {apps?.length > 0 &&
                                apps.map((app) => {
                                    if (app?.name && app?.appslugname)
                                        return (
                                            <>
                                                <Link
                                                    className="text-link"
                                                    href={`/find-combinations/${app?.appslugname}`}
                                                >
                                                    {app.name}
                                                </Link>
                                            </>
                                        );
                                })}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col gap-20  items-center justify-center">
                            <div className=" border  p-16 rounded flex flex-col gap-6 h-[260px] min-w-[400px] items-center justify-center">
                                <div className="flex items-center gap-2">
                                    <Image src={apps[0]?.iconurl} width={28} height={28} alt={apps[0]?.name} />
                                    <h1 className="capitalize text-xl font-semibold">{apps[0]?.name} </h1>
                                </div>
                                <Link className="text-link capitalize" href={`/integrations/${apps[0]?.appslugname}`}>
                                    Go to {apps[0]?.name} integratioins
                                </Link>
                            </div>

                            <span className="text-4xl font-semibold">+</span>
                            <div className=" border  p-16 rounded flex flex-col gap-6 h-[260px] min-w-[400px] items-center justify-center">
                                <div className="flex items-center gap-2">
                                    <Image src={apps[1]?.iconurl} width={28} height={28} alt={apps[1]?.name} />
                                    <h1 className="capitalize text-xl font-semibold">{apps[1]?.name} </h1>
                                </div>
                                <Link className="text-link capitalize" href={`/integrations/${apps[1]?.appslugname}`}>
                                    Go to {apps[1]?.name} integratioins
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer footerData={footerData} />
        </>
    );
}
// export async function getServerSideProps(context) {
//     const { params } = context;
//     const firstApp = params?.firstApp;
//     const secondApp = params?.secondApp;

//     let fetchUrl = ``;
//     if (firstApp.length > 1) {
//         fetchUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/${process.env.NEXT_PUBLIC_DB_ID_AZ}/tblwegm8v?filter=appslugname='${firstApp}&filter=appslugname='${secondApp}'`;
//     } else {
//         fetchUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/${process.env.NEXT_PUBLIC_DB_ID_AZ}/tblwegm8v?filter=audience='Public' and status ='published' and name%20like%20'${firstApp}%'`;
//     }

//     const apiHeaders = {
//         headers: {
//             'auth-key': process.env.NEXT_PUBLIC_DB_KEY_AZ,
//         },
//     };

//     let apps = [];
//     try {
//         const response = await fetch(fetchUrl, apiHeaders);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }
//         const responseData = await response.json();
//         apps = responseData?.data?.rows;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }

//     const IDs = [
//         'tbl7lj8ev', //  navData: results[0]
//         'tbl6u2cba', //footerData: results[1]
//         'tbl2bk656', // metaData: results[2]
//     ];

//     const dataPromises = IDs.map((id) => getDbdashData(id));
//     const results = await Promise.all(dataPromises);
//     return {
//         props: {
//             firstApp: firstApp,
//             apps,
//             navData: results[0]?.data?.rows,
//             footerData: results[1]?.data?.rows,
//             metaData: results[2]?.data?.rows,
//         },
//     };
// }
export async function getServerSideProps(context) {
    const { params } = context;
    const firstApp = params?.firstApp;
    const secondApp = params?.secondApp;

    let fetchUrl = ``;
    if (firstApp && secondApp) {
        // Fetch data for both apps when both are selected
        fetchUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/${process.env.NEXT_PUBLIC_DB_ID_AZ}/tblwegm8v?filter=appslugname in ('${firstApp}', '${secondApp}')`;
    } else {
        // Fetch data for the first app only
        fetchUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/${process.env.NEXT_PUBLIC_DB_ID_AZ}/tblwegm8v?filter=audience='Public' and status='published' and name like '${firstApp}%'`;
    }

    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_DB_KEY_AZ,
        },
    };

    let apps = [];
    try {
        const response = await fetch(fetchUrl, apiHeaders);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const responseData = await response.json();
        apps = responseData?.data?.rows;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    const IDs = [
        'tbl7lj8ev', // navData: results[0]
        'tbl6u2cba', // footerData: results[1]
        'tbl2bk656', // metaData: results[2]
    ];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);
    return {
        props: {
            firstApp,
            apps,
            navData: results[0]?.data?.rows,
            footerData: results[1]?.data?.rows,
            metaData: results[2]?.data?.rows,
        },
    };
}
