import ErrorComp from '@/components/404/404Comp';
import { getDbdashData } from '@/pages/api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import IntegrationsComp from '@/components/integrationsComp/integrationsComp';
import { getUseCases } from '@/pages/api/fetch-usecases';
import axios from 'axios';

const IntegrationSlugPage = ({ getStartedData, combos, pathSlugs, metaData, faqData, usecase, posts }) => {
    if (combos && !combos.error) {
        return (
            <>
                <MetaHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    plugin={[combos?.plugins?.[pathSlugs[0]]]}
                />

                {combos?.plugins?.[pathSlugs[0]] && (
                    <IntegrationsComp
                        combinationData={combos}
                        pluginData={[combos?.plugins?.[pathSlugs[0]]]}
                        faqData={faqData}
                        faqName={`[singleApp]`}
                        blogs={posts}
                        usecases={usecase}
                        getStartedData={getStartedData}
                        isHero={'false'}
                        pathSlugs={pathSlugs}
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
                />
                <ErrorComp pathSlugs={pathSlugs} page="/integration" />
            </>
        );
    }
};

export default IntegrationSlugPage;

export async function getServerSideProps(context) {
    const { params } = context;
    const pathSlugs = [params.appslugname];
    console.log('🚀 ~ getServerSideProps ~ pathSlugs:', pathSlugs);
    const combos = await fetchCombos(pathSlugs);
    const usecase = await getUseCases(pathSlugs[0]);

    const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const tag = 'via-socket';
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
            usecase: usecase ?? [],
            posts,
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
