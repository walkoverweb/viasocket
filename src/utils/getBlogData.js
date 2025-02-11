export async function getBlogData(tag) {
    try {
        const response = await fetch(`https://flow.sokt.io/func/scri3Tye3dRc?tag=${tag}`, {
            method: 'GET',
            headers: {
                'auth-key': process.env.NEXT_PUBLIC_BLOG_DB_KEY,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return [];
    }
}
