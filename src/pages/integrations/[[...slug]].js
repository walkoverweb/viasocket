import IntegrationsHeaderComp from '@/components/IntegrationsComp/IntegrationsHeaderComp';
import getPageData from '@/utils/getPageData';
import getPageInfo from '@/utils/getPageInfo';

export default function IntegrationSlugPage({ pageInfo, data }) {
    const Components = {
        IntegrationsHeaderComp,
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

                    return <Component key={`section-${key}`} data={pageData} pageInfo={pageInfo} />;
                })}
        </>
    );
}

export async function getServerSideProps(context) {
    const pageInfo = getPageInfo(context?.params);
    const data = getPageData(pageInfo);
    return {
        props: {
            pageInfo: pageInfo,
            data: data,
        },
    };
}
