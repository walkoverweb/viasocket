import getApps from '@/utils/getApps';
import { getBlogData, getFooterData, getMetaData, getNavData } from '@/utils/getData';
import getPageInfo from '@/utils/getPageInfo';
import getIntegrationsInfo from '@/utils/getInterationsInfo';
import IntegrationsIndexComp from '@/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexComp';
import IntegrationsAppOneComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsAppOneComp';
import getAppDetails from '@/utils/getAppDetail';

export default function Integrations({
    pageInfo,
    integrationsInfo,
    navData,
    footerData,
    metadata,
    apps,
    blogsData,
    appDetails,
}) {
    return (
        <>
            {/* <IntegrationsIndexComp
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
                navData={navData}
                footerData={footerData}
                metadata={metadata}
                apps={apps}
                blogsData={blogsData}
            /> */}
            <IntegrationsAppOneComp
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
                metadata={metadata}
                apps={apps}
                blogsData={blogsData}
                appDetails={appDetails}
            />
        </>
    );
}
export async function getServerSideProps(context) {
    const pageInfo = getPageInfo(context);
    const integrationsInfo = getIntegrationsInfo(pageInfo?.pathArray);
    const navData = await getNavData();
    const footerData = await getFooterData();
    const metadata = await getMetaData();
    const blogsData = await getBlogData();
    const apps = await getApps({ page: integrationsInfo.page, category: integrationsInfo.category });
    const appDetails = await getAppDetails(integrationsInfo?.appone);
    console.log('🚀 ~ getServerSideProps ~ appDetails:', appDetails);

    return {
        props: {
            pageInfo: pageInfo || {},
            integrationsInfo: integrationsInfo || {},
            navData: navData || {},
            footerData: footerData || {},
            metadata: metadata || {},
            apps: apps || [],
            blogsData: blogsData || [],
            appDetails: appDetails || {},
        },
    };
}
