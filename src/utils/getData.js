import { FOOTER, METADATA, NAVIGATION } from '@/const/tables';
import getDataFromTable from '@/pages/api/getDataFromTable';

const handleData = (data) => {
    return data?.data?.rows;
};

export async function getNavData() {
    const data = await getDataFromTable(NAVIGATION);
    return handleData(data);
}

export async function getFooterData() {
    const data = await getDataFromTable(FOOTER);
    return handleData(data);
}

export async function getMetaData() {
    const data = await getDataFromTable(METADATA);
    return handleData(data);
}
