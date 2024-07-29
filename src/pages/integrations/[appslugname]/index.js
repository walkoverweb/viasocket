import Image from 'next/image';
import Link from 'next/link';
import ErrorComp from '@/components/404/404Comp';
import GetStarted from '@/components/getStarted/getStarted';
import { getDbdashData } from '@/pages/api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import IntegrationsComp from '@/components/integrationsComp/integrationsComp';
import { getUseCases } from '@/pages/api/fetch-usecases';
import axios from 'axios';

const IntegrationSlugPage = ({ getStartedData, combos, pathArray, metaData, faqData, usecase, posts }) => {
    if (combos && !combos.error) {
        return (
            <>
                <MetaHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    pathArray={pathArray}
                    plugin={[combos?.plugins?.[pathArray[2]]]}
                />

                {combos?.plugins?.[pathArray[2]] && (
                    <IntegrationsComp
                        combinationData={combos}
                        pluginData={combos?.plugins?.[pathArray[2]]}
                        faqData={faqData}
                        faqName={`[singleApp]`}
                        blogs={posts}
                        usecases={usecase}
                    />
                )}

                <div className=" py-14">
                    <div className="container">
                        {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
                    </div>
                </div>

                {/* footer */}

                <div className=" py-10">
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <h4 className="lg:text-[32px] md:text-xl text-lg font-semibold">Integrations run at</h4>
                        <Link href="/" aria-label="main page">
                            <Image
                                src="../../../assets/brand/socket_fav_dark.svg"
                                width={40}
                                height={40}
                                alt="viasocket"
                            />
                        </Link>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <MetaHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    pathArray={pathArray}
                    plugin={[combos?.plugins?.[pathArray[2]]]}
                />
                <ErrorComp pathArray={pathArray} />
            </>
        );
    }
};

export default IntegrationSlugPage;

export async function getServerSideProps(context) {
    const { params } = context;
    const pathArray = [params.appslugname];
    // Fetch data server-side here
    const combos = await fetchCombos(pathArray);
    const apps = await fetchApps('All', 25);
    const usecase = await getUseCases(pathArray[0]);

    const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const tag = 'via-socket';
    const defaultTag = 'integrations';
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
    );
    const posts = await res.data;

    return {
        props: {
            params,
            combos,
            apps,
            pathArray,
            metaData: results[0].data.rows,
            getStartedData: results[1].data.rows,
            faqData: results[2].data.rows,
            usecase: usecase ?? [],
            posts,
        },
    };
}

async function fetchApps(selectedCategory, visibleItems) {
    const fetchUrl =
        selectedCategory && selectedCategory !== 'All'
            ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${
                  selectedCategory && selectedCategory === 'Other' ? null : selectedCategory
              }&limit=200`
            : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`;
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };

    const response = await fetch(fetchUrl, apiHeaders);
    const responseData = await response.json();
    return responseData;
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
