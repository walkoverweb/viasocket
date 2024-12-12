import axios from 'axios';

export default async function getApps(query) {
    try {
        const fetchUrl = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all`;
        const response = await axios.get(fetchUrl, {
            params: {
                category: (query?.category !== 'All' && query?.category) || '',
                limit: 48,
                offset: query?.offset ? query?.offset : 0,
            },
        });
        const rawData = await response?.data?.data;
        return rawData || [];
    } catch (error) {
        console.error('Failed to fetch apps:', error);
    }
}
