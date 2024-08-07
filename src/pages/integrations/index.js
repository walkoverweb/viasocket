import ErrorComp from '@/components/404/404Comp';
import { getDbdashData } from '@/pages/api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import IntegrationsComp from '@/components/integrationsComp/integrationsComp';
import { getUseCases } from '@/pages/api/fetch-usecases';
import axios from 'axios';

const IntegrationSlugPage = ({ getStartedData, combos, pathArray, metaData, faqData, usecase, posts }) => {
    return (
        <>
            <MetaHeadComp
                metaData={metaData}
                page={'/integrations'}
                pathArray={pathArray}
                plugin={[combos?.plugins?.[pathArray[2]]]}
            />

            <IntegrationsComp
                combinationData={combos}
                faqData={faqData}
                faqName={`[singleApp]`}
                blogs={posts}
                usecases={usecase}
                getStartedData={getStartedData}
                isHero={'false'}
                showCategories={true}
            />
        </>
    );
};

export default IntegrationSlugPage;

export async function getServerSideProps(context) {
    const pathSlugs = [];
    const combos = await fetchCombos(pathSlugs);
    const usecase = await getUseCases();

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
