export async function getBlogData() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BLOG_DB_URL , {
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
