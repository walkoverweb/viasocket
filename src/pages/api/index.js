//fetch data from DBDash
export const getDbdashData = async (tableName) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/65d2ed33fa9d1a94a5224235/${tableName}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
            },
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
};

//fetch data from multiple tables in DB Dash
export default async function fetchDataAndUpdateState(IDs, getDataFunction) {
    for (let i = 0; i < IDs.length; i++) {
        const ID = IDs[i];
        const dbdashData = await getDataFunction(ID);
    }
}

// fetch post API
// export const fetchPosts = async (tag, defaultTag) => {
//     const tag = params?.appslugname;
//     const defaultTag = 'integrations';
//     try {
//         const res = await axios.get(`NEXT_PUBLIC_BASE_URL/api/fetch-posts?tag=${tag}&defaultTag=${defaultTag}`);
//         const posts = await res.data;
//         setPosts(posts);
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//     }
// };
