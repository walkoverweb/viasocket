import axios from 'axios';

export default async function fetchApps(query) {
    try {
        const fetchUrl = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all`;
        const response = await axios.get(fetchUrl, {
            headers: { 'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY },
            params: {
                category: (query?.currentcategory !== 'All' && query?.currentcategory) || '',
                limit: 100,
                offset: query?.page ? (Number(query.page) - 1) * 100 : 0,
            },
        });
        const rawData = await response?.data?.data;
        return rawData || [];
    } catch (error) {
        console.error('Failed to fetch apps:', error);
    }
}
