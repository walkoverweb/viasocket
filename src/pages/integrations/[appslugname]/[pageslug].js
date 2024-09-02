import React, { useState, useEffect, useMemo } from 'react';
import { getDbdashData } from '@/pages/api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import IntegrationsComp from '@/components/integrationsComp/integrationsComp';
import ErrorComp from '@/components/404/404Comp';
import axios from 'axios';

export async function getServerSideProps(context) {
    const { params } = context;
    const pathSlugs = [params.pageslug, params.appslugname];

    const combos = await fetchCombos(pathSlugs);
    const apps = await fetchApps('All', 25);

    const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng', 'tbl7lj8ev', 'tbl6u2cba'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    let plugins = [];
    const pluginOne = combos?.plugins?.[pathSlugs[0]] ?? null;
    const pluginTwo = combos?.plugins?.[pathSlugs[1]] ?? null;
    plugins = [pluginOne, pluginTwo];
    const tag = 'via-socket';
    const defaultTag = 'integrations';
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
    );
    const posts = await res?.data;

    return {
        props: {
            combos,
            apps,
            pathSlugs,
            metaData: results[0].data.rows,
            getStartedData: results[1].data.rows,
            faqData: results[2].data.rows,
            navData: results[3]?.data?.rows,
            footerData: results[4]?.data?.rows,
            plugins,
            posts,
        },
    };
}

async function fetchApps(selectedCategory, visibleItems) {
    const fetchUrl =
        selectedCategory && selectedCategory !== 'All'
            ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${
                  selectedCategory && selectedCategory === 'Other' ? null : selectedCategory
              }&limit=${visibleItems}`
            : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=${visibleItems}`;

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
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pathArray[0]}&service=${pathArray[1]}`,
        apiHeaders
    );
    const responseData = await response.json();
    return responseData;
}

const IntegrationSlugPage = ({
    getStartedData,
    combos,
    metaData,
    faqData,
    plugins,
    pathSlugs,
    navData,
    posts,
    footerData,
}) => {
    return (
        <>
            <MetaHeadComp
                metaData={metaData}
                plugin={plugins}
                page={'/integrations/AppOne/AppTwo'}
                pathSlugs={pathSlugs}
            />
            {combos?.plugins?.[pathSlugs[1]] ? (
                <IntegrationsComp
                    combinationData={combos}
                    pluginData={plugins}
                    hideApps
                    faqData={faqData}
                    faqName={`[doubleApp]`}
                    getStartedData={getStartedData}
                    isHero={'false'}
                    pathSlugs={pathSlugs}
                    posts={posts}
                />
            ) : (
                <ErrorComp footerData={footerData} navData={navData} />
            )}
        </>
    );
};

export default IntegrationSlugPage;
