import axios from 'axios';

export async function getBlogs(tag) {
    try {
        const response = await axios.get(
            `https://table-api.viasocket.com/66029bf861a15927654de175/tblngzrs5?filter=tags @> ARRAY['${tag}']`,
            {
                headers: {
                    'auth-key': process.env.NEXT_PUBLIC_BLOG_DB_KEY,
                },
            }
        );


        return response?.data?.data?.rows;
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return [];
    }
}

export default async function getBlogsData(tag) {
    let blogs = [];
    const getBlogsRecursive = async (tag) => {
        const data = await getBlogs(tag);
        if (data?.length < 3) {
            const remainingBlogs = 3 - data.length;
            const additionalBlogs = await getBlogs('index');
            blogs = [...blogs, ...data, ...additionalBlogs.slice(0, remainingBlogs)];
        } else {
            blogs = data;
        }
    };

    await getBlogsRecursive(tag);
    return blogs.slice(0, 6);
}