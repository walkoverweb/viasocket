import getApps from '@/utils/getApps';
import { getBlogData, getFooterData, getMetaData, getNavData } from '@/utils/getData';
import getPageInfo from '@/utils/getPageInfo';
import getIntegrationsInfo from '@/utils/getInterationsInfo';
import IntegrationsIndexComp from '@/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexComp';

export default function Integrations({ pageInfo, integrationsInfo, navData, footerData, metadata, apps, blogsData }) {
    console.log('🚀 ~ Integrations ~ blogsData:', blogsData);
    return (
        <>
            <IntegrationsIndexComp
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
                navData={navData}
                footerData={footerData}
                metadata={metadata}
                apps={apps}
                blogsData={blogsData}
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

    return {
        props: {
            pageInfo: pageInfo || {},
            integrationsInfo: integrationsInfo || {},
            navData: navData || {},
            footerData: footerData || {},
            metadata: metadata || {},
            apps: apps || [],
            blogsData: blogsData || [],
        },
    };
}
