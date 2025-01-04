import { ALLFEATURES, CASESTUDY, CATEGORY, FAQS, GETSTARTED, INDEXFEATURES, TESTIMONIALS } from '@/const/tables';
import { FOOTER, METADATA, NAVIGATION } from '@/const/tables';
import getDataFromTable from './getDataFromTable';

const handleData = (data) => {
    return data?.data?.rows;
};

const handleQuery = (query) => {
    if (query?.length > 0) {
        const queryString = query.join('&fields=');
        return '?fields=' + queryString;
    } else {
        return null;
    }
};
const handleFieldsFilter = (fields, filter) => {
    let queryString = '';

    if (fields?.length > 0) {
        queryString += '?fields=' + fields.join('&fields=');
    }
    if (filter) {
        queryString += (queryString ? '&' : '?') + filter;
    }
    return queryString || null;
};

export async function getNavData() {
    const data = await getDataFromTable(NAVIGATION);
    return handleData(data);
}

export async function getFooterData() {
    const data = await getDataFromTable(FOOTER);
    return handleData(data);
}

export async function getMetaData(fields, filter) {
    const data = await getDataFromTable(METADATA, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getAllFeatures(query) {
    const data = await getDataFromTable(ALLFEATURES, handleQuery(query));
    return handleData(data);
}

export async function getFeatureData(query) {
    const data = await getDataFromTable(ALLFEATURES, `?filter=slug='${query}'`);
    return handleData(data);
}
export async function getFaqData(query) {
    const data = await getDataFromTable(FAQS, `?filter=page='${query}'`);
    return handleData(data);
}
export async function getCategoryData(query) {
    const data = await getDataFromTable(CATEGORY, `?filter=name='${query}'`);
    return handleData(data);
}

export async function getBlogData() {
    const tag = 'via-socket';
    const defaultTag = 'integrations';
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
        );
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const posts = await res.json();
        return posts;
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return [];
    }
}
export async function getTestimonialData(fields, filter) {
    const data = await getDataFromTable(TESTIMONIALS, handleFieldsFilter(fields, filter));
    return handleData(data);
}
export async function getCaseStudyData(fields, filter) {
    const data = await getDataFromTable(CASESTUDY, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getGetStartedData(fields, filter) {
    const data = await getDataFromTable(GETSTARTED, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getIndexFeatures(fields, filter) {
    const data = await getDataFromTable(INDEXFEATURES, handleFieldsFilter(fields, filter));
    return handleData(data);
}
