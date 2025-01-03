import axios from 'axios';

export default async function checkDevelopingCountry(code) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_DB_BASE_URL}/65d2ed33fa9d1a94a5224235/tblxvza45?filter=codes='${code}'`,
            {
                headers: {
                    'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
                },
            }
        );
        const responseData = await response.json();
        return responseData?.data.rows;
    } catch (error) {
        console.error('Error fetching combos:', error);
        return null;
    }
}
