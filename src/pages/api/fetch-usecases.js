export const getUseCases = async (usecase) => {
    if (!usecase) {
        // console.error('No usecase provided');
        return [];
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/65d2ed33fa9d1a94a5224235/tblvu0f6w?filter=slugname='${usecase}'`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
            },
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return [];
        }

        const responseData = await response.json();

        if (!responseData || !responseData.data || !responseData.data.rows || !Array.isArray(responseData.data.rows)) {
            console.error('Invalid response structure:', responseData);
            return [];
        }

        return responseData.data.rows[0]?.usecase.usecases || [];
    } catch (error) {
        console.error('Error in api:', error);
        return [];
    }
};
