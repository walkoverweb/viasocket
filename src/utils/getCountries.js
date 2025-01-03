import axios from 'axios';

export default async function getCountries() {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/all?fields=name,flags,cca2`);
        const responseData = await response.data;
        responseData.sort((a, b) => {
            if (a?.name?.common < b?.name?.common) return -1;
            if (a?.name?.common > b?.name?.common) return 1;
            return 0;
        });
        return responseData;
    } catch (error) {
        console.error('Error fetching combos:', error);
        return null;
    }
}
