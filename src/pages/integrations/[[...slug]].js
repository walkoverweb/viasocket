import getApps from '@/utils/getApps';
import { getBlogData, getCategoryData, getFaqData, getFooterData, getMetaData, getNavData } from '@/utils/getData';
import getPageInfo from '@/utils/getPageInfo';
import getIntegrationsInfo from '@/utils/getInterationsInfo';
import IntegrationsIndexComp from '@/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexComp';
import IntegrationsAppOneComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsAppOneComp';
import getAppDetails from '@/utils/getAppDetail';
import getCombos from '@/utils/getCombos';
import IntegrationsAppTwoComp from '@/components/IntegrationsComp/integrationsAppTwoComp/integrationsAppTwoComp';

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
}) {
    const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
    const appTwoDetails = getAppDetails(combosData, integrationsInfo?.apptwo);
    if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
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
    } else
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
export async function getServerSideProps(context) {
    const pageInfo = getPageInfo(context);
    const integrationsInfo = getIntegrationsInfo(pageInfo?.pathArray);
    const navData = await getNavData();
    const footerData = await getFooterData();
    const metadata = await getMetaData();
    const blogsData = await getBlogData();
    const faqData = await getFaqData('[singleApp]');
    const apps = await getApps({ page: integrationsInfo.page, category: integrationsInfo.category });
    const combosData = await getCombos(integrationsInfo);
    const categoryData = await getCategoryData(integrationsInfo?.category);

    return {
        props: {
            pageInfo: pageInfo || {},
            navData: navData || {},
            footerData: footerData || {},
            metadata: metadata || {},
            blogsData: blogsData || [],
            faqData: faqData || [],
            integrationsInfo: integrationsInfo || {},
            apps: apps || [],
            combosData: combosData || {},
            categoryData: categoryData[0] || {},
        },
    };
}
