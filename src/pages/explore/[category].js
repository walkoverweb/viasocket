import categories from '@/assets/data/categories.json';
export default function Category() {
    return <></>;
}
export const getStaticProps = async (context) => {
    const category = context?.params.category;
    const categoryName = findCategoryName(category);

    return {
        props: {},
    };
};
export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export function findCategoryName(slug) {
    const category = categories?.categoriesObj?.find((category) => category?.slug === slug);
    return category ? category.name : null;
}

export async function fetchApps(category) {
    try {
        const fetchUrl = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${finalCategory}`;

        const response = await fetch(fetchUrl, {
            headers: { 'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY },
        });

        if (!response.ok) throw new Error('Failed to load data');

        const rawData = await response.json();
        const newData = rawData.data;
    } catch (error) {
    } finally {
    }
}
