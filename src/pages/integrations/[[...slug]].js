import getPageData from '@/utils/getPageData';
import getPageInfo from '@/utils/getPageInfo';
import getApps from '@/utils/getApps';

// components
import IntegrationsHeaderComp from '@/components/IntegrationsComp/IntegrationsHeaderComp/IntegrationsHeaderComp';
import IntegrationsApps from '@/components/IntegrationsComp/integrationsApps/integrationsApps';

export default function IntegrationSlugPage({ pageInfo, data, apps }) {
    const Components = {
        IntegrationsHeaderComp,
        IntegrationsApps,
    };

    return (
        <>
            {data &&
                Object.keys(data).map((key) => {
                    const pageData = data[key];
                    var Component = Components[key];
                    if (!Component) {
                        console.error(`Component "${key}" is undefined. Check your imports and component exports.`);
                        return;
                    }
                    return <Component key={`section-${key}`} data={pageData} pageInfo={pageInfo} apps={apps} />;
                })}
        </>
    );
}

export async function getServerSideProps(context) {
    const pageInfo = getPageInfo(context?.query);
    const data = getPageData(pageInfo);
    const apps = (await getApps({ page: pageInfo?.pagination?.pageNo, category: pageInfo?.query?.category })) || [];
    return {
        props: {
            pageInfo: pageInfo,
            data: data,
            apps: apps || [],
        },
    };
}
