import getApps from '@/utils/getApps';
import { getBlogData, getCategoryData, getFaqData, getFooterData, getMetaData, getNavData } from '@/utils/getData';
import getPageInfo from '@/utils/getPageInfo';
import getIntegrationsInfo from '@/utils/getInterationsInfo';
import IntegrationsIndexComp from '@/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexComp';
import IntegrationsAppOneComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsAppOneComp';
import getAppDetails from '@/utils/getAppDetail';
import getCombos from '@/utils/getCombos';
import IntegrationsAppTwoComp from '@/components/IntegrationsComp/integrationsAppTwoComp/integrationsAppTwoComp';
import ErrorComp from '@/components/404/404Comp';
import Head from 'next/head';
import { FAQS_FIELDS, FOOTER_FIELDS, INTECATEGORY_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';

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
            <>
                <Head>
                    <link rel="canonical" href={`https://viasocket.com${pageInfo?.url || '/'}`} />
                </Head>
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
            </>
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
                    appOneDetails={appOneDetails}
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
    const footerData = await getFooterData(FOOTER_FIELDS);

    if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
        const metadata = await getMetaData(METADATA_FIELDS, 'filter=name=`/integrations/AppOne/AppTwo`');
        const blogsData = await getBlogData();
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='[singleApp]'`);
        const combosData = await getCombos(integrationsInfo);
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
        const metadata = await getMetaData(METADATA_FIELDS, 'filter=name=`/integrations/AppOne`');
        const blogsData = await getBlogData();
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='[doubleApp]'`);
        const apps = await getApps({ page: integrationsInfo?.page, category: integrationsInfo?.category });
        const combosData = await getCombos(integrationsInfo);
        const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
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
            const navData = await getNavData(NAVIGATION_FIELDS);
            return {
                props: {
                    noData: true,
                    navData: navData || {},
                    footerData: footerData || {},
                },
            };
        }
    } else {
        const navData = await getNavData(NAVIGATION_FIELDS);
        const metadata = await getMetaData(METADATA_FIELDS, 'filter=name=`/integrations`');
        const blogsData = await getBlogData();
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/integrations'`);
        const apps = await getApps({ page: integrationsInfo?.page, category: integrationsInfo?.category });
        const categoryData = await getCategoryData(INTECATEGORY_FIELDS, `filter=name='${integrationsInfo?.category}'`);
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
                categoryData: (categoryData?.length > 0 && categoryData[0]) || {},
            },
        };
    }
}
