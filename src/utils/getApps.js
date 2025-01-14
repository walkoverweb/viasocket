import { APPERPAGE } from '@/const/integrations';
import axios from 'axios';

export default async function getApps(query) {
    const category = query?.categoryData[0]?.name;
    try {
        const fetchUrl = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all`;
        const response = await axios.get(fetchUrl, {
            params: {
                category: (category !== 'All' && category) || '',
                limit: APPERPAGE,
                offset: query?.page ? query?.page * APPERPAGE : 0,
            },
        });
        const rawData = await response?.data?.data;
        return rawData || [];
    } catch (error) {
        console.error('Failed to fetch apps:', error);
    }
}
