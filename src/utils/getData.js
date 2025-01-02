import { ALLFEATURES, CATEGORY, FAQS, TESTIMONIALS } from '@/const/tables';
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
        queryString += (queryString ? '&' : '?') + `filter=${filter}`;
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

export async function getMetaData(query) {
    const data = await getDataFromTable(METADATA, `?filter=name='${query}'`);
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
    const data = await getDataFromTable(TESTIMONIALS, handleFieldsFilter(fields, filter));
    return handleData(data);
}

// export async function getBlogData(){
//      async function getBlogsFromTable(table, query) {
//         const apiUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/66029bf861a15927654de175/tblngzrs5${query ? query : ''}`;

//         try {
//             const response = await fetch(apiUrl, {
//                 headers: {
//                     'auth-key': `${process.env.NEXT_PUBLIC_BLOG_DB_KEY}`,
//                 },
//             });
//             const responseData = await response.json();
//             return responseData;
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     const data = await getBlogsFromTable(ALLFEATURES);
//     return handleData(data);
// }
