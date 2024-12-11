import { ALLFEATURES } from '@/const/tables';
import { FOOTER, METADATA, NAVIGATION } from '@/const/tables';
import getDataFromTable from '@/pages/api/getDataFromTable';

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
const handleFilter = (query) => {
    if (query?.length > 0) {
        const queryString = query.join('&fields=');
        return '?fields=' + queryString;
    } else {
        return null;
    }
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
