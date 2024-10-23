import ErrorComp from '@/components/404/404Comp';
import { getDbdashData } from '@/pages/api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import IntegrationsComp from '@/components/integrationsComp/integrationsComp';
import { getUseCases } from '@/pages/api/fetch-usecases';
import axios from 'axios';
import fetchApps from '@/utils/getApps';

const IntegrationSlugPage = ({
    getStartedData,
    combos,
    pathSlugs,
    metaData,
    faqData,
    usecase,
    posts,
    navData,
    footerData,
    apps,
    query,
    utm,
}) => {
    if (combos && !combos.error && combos?.plugins?.[pathSlugs[0]]) {
        return (
            <>
                <MetaHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    plugin={[combos?.plugins?.[pathSlugs[0]]]}
                />

                {combos?.plugins?.[pathSlugs[0]] && (
                    <IntegrationsComp
                        utm={utm}
                        apps={apps}
                        query={query}
                        combinationData={combos}
                        pluginData={[combos?.plugins?.[pathSlugs[0]]]}
                        faqData={faqData}
                        faqName={`[singleApp]`}
                        posts={posts}
                        usecases={usecase}
                        getStartedData={getStartedData}
                        isHero={'false'}
                        pathSlugs={pathSlugs}
                        pathArray={pathArray}
                    />
                )}
            </>
        );
    } else {
        return (
            <>
                <MetaHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    plugin={[combos?.plugins?.[pathSlugs[0]]]}
                    pathSlugs={pathSlugs}
                />
                <ErrorComp footerData={footerData} navData={navData} utm={utm} />
            </>
        );
    }
};

export default IntegrationSlugPage;

export async function getServerSideProps(context) {
    const { params } = context;
    const utm = context?.resolvedUrl.split(/[?#]/)[0];
    const query = { page: context?.query?.page || 1, currentcategory: context?.query?.currentcategory || 'All' };
    const pathSlugs = [params?.appslugname];
    const combos = await fetchCombos(pathSlugs);
    const usecase = await getUseCases(pathSlugs[0]);

    const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng', 'tbl7lj8ev', 'tbl6u2cba'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);
    const apps = (await fetchApps(query)) || [];
    const tag = pathSlugs;
    const defaultTag = 'integrations';
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
    );
    const posts = await res?.data;

    return {
        props: {
            params,
            combos,
            pathSlugs,
            metaData: results[0].data.rows,
            getStartedData: results[1].data.rows,
            faqData: results[2].data.rows,
            navData: results[3]?.data?.rows,
            footerData: results[4]?.data?.rows,
            usecase: usecase ?? [],
            posts,
            apps,
            query,
            utm,
        },
    };
}

async function fetchCombos(pathArray) {
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pathArray[0]}`,
        apiHeaders
    );
    const responseData = await response.json();
    return responseData;
}
