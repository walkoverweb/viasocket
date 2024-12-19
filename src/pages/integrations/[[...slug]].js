import getApps from '@/utils/getApps';
import { getBlogData, getCategoryData, getFaqData, getFooterData, getMetaData, getNavData } from '@/utils/getData';
import getPageInfo from '@/utils/getPageInfo';
import getIntegrationsInfo from '@/utils/getInterationsInfo';
import IntegrationsIndexComp from '@/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexComp';
import IntegrationsAppOneComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsAppOneComp';
import getAppDetails from '@/utils/getAppDetail';
import getCombos from '@/utils/getCombos';
import IntegrationsAppTwoComp from '@/components/IntegrationsComp/integrationsAppTwoComp/integrationsAppTwoComp';
import NoDataPluginComp from '@/components/noDataPluginComp/noDataPluginComp';
import NoPage from '../404';
import ErrorComp from '@/components/404/404Comp';
import Head from 'next/head';

export default function Integrations({
    pageInfo,
    integrationsInfo,
    metadata,
    apps,
    blogsData,
    combosData,
    faqData,
    footerData,
    navData,
    categoryData,
    appOneDetails,
    appTwoDetails,
    noData,
}) {
    if (noData) {
        return (
            <>
                <Head>
                    <title>{'404 - Page not found'}</title>
                </Head>
                <ErrorComp navData={navData} footerData={footerData} />
            </>
        );
    } else if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
        return (
            <IntegrationsAppTwoComp
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
                metadata={metadata}
                apps={apps}
                blogsData={blogsData}
                appOneDetails={appOneDetails}
                appTwoDetails={appTwoDetails}
                combosData={combosData}
                faqData={faqData}
                footerData={footerData}
            />
        );
    } else if (integrationsInfo?.appone) {
        return (
            <>
                <IntegrationsAppOneComp
                    pageInfo={pageInfo}
                    integrationsInfo={integrationsInfo}
                    metadata={metadata}
                    apps={apps}
                    blogsData={blogsData}
                    appDetails={appOneDetails}
                    combosData={combosData}
                    faqData={faqData}
                    footerData={footerData}
                />
            </>
        );
    } else {
        return (
            <IntegrationsIndexComp
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
                navData={navData}
                footerData={footerData}
                apps={apps}
                blogsData={blogsData}
                categoryData={categoryData}
            />
        );
    }
}
export async function getServerSideProps(context) {
    const pageInfo = getPageInfo(context);
    const integrationsInfo = getIntegrationsInfo(pageInfo?.pathArray);
    const footerData = await getFooterData();

    if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
        // const navData = await getNavData();
        const metadata = await getMetaData();
        const blogsData = await getBlogData();
        const faqData = await getFaqData('[singleApp]');
        // const apps = await getApps({ page: integrationsInfo.page, category: integrationsInfo.category });
        const combosData = await getCombos(integrationsInfo);
        // const categoryData = await getCategoryData(integrationsInfo?.category);
        const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
        const appTwoDetails = getAppDetails(combosData, integrationsInfo?.apptwo);
        if ((appOneDetails, appTwoDetails)) {
            return {
                props: {
                    pageInfo: pageInfo || {},
                    navData: {},
                    footerData: footerData || {},
                    apps: [],
                    metadata: metadata || {},
                    blogsData: blogsData || [],
                    faqData: faqData || [],
                    integrationsInfo: integrationsInfo || {},
                    combosData: combosData || {},
                    appOneDetails: appOneDetails || {},
                    appTwoDetails: appTwoDetails || {},
                    categoryData: {},
                },
            };
        } else {
            const navData = await getNavData();
            return {
                props: {
                    noData: true,
                    navData: navData || {},
                    footerData: footerData || {},
                },
            };
        }
    } else if (integrationsInfo?.appone) {
        // const navData = await getNavData();
        const metadata = await getMetaData();
        const blogsData = await getBlogData();
        const faqData = await getFaqData('[singleApp]');
        const apps = await getApps({ page: integrationsInfo.page, category: integrationsInfo.category });
        const combosData = await getCombos(integrationsInfo);
        // const categoryData = await getCategoryData(integrationsInfo?.category);
        const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
        // const appTwoDetails = getAppDetails(combosData, integrationsInfo?.apptwo);
        if (appOneDetails) {
            return {
                props: {
                    pageInfo: pageInfo || {},
                    navData: {},
                    footerData: footerData || {},
                    apps: apps || [],
                    metadata: metadata || {},
                    blogsData: blogsData || [],
                    faqData: faqData || [],
                    integrationsInfo: integrationsInfo || {},
                    combosData: combosData || {},
                    appOneDetails: appOneDetails || {},
                    appTwoDetails: {},
                    categoryData: {},
                },
            };
        } else {
            const navData = await getNavData();
            return {
                props: {
                    noData: true,
                    navData: navData || {},
                    footerData: footerData || {},
                },
            };
        }
    } else {
        const navData = await getNavData();
        const metadata = await getMetaData();
        const blogsData = await getBlogData();
        const faqData = await getFaqData('[singleApp]');
        const apps = await getApps({ page: integrationsInfo.page, category: integrationsInfo.category });
        const categoryData = await getCategoryData(integrationsInfo?.category);
        return {
            props: {
                pageInfo: pageInfo || {},
                navData: navData || {},
                footerData: footerData || {},
                apps: apps || [],
                metadata: metadata || {},
                blogsData: blogsData || [],
                faqData: faqData || [],
                integrationsInfo: integrationsInfo || {},
                combosData: {},
                appOneDetails: {},
                appTwoDetails: {},
                categoryData: (categoryData.length > 0 && categoryData[0]) || {},
            },
        };
    }
}
