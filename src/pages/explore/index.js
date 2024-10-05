import categories from '@/assets/data/categories.json';
import Link from 'next/link';
export default function Explore() {
    return (
        <>
            <div className="container py-12 flex flex-col gap-8">
                <h1 className="text-4xl font-bold text-primary">Explore Categories</h1>
                <ul className="grid grid-cols-3 gap-3">
                    {categories?.categoriesObj.map((category) => {
                        return (
                            <li>
                                <a
                                    className="hover:text-link hover:underline underline-offset-2"
                                    href={`/explore/${category?.slug}`}
                                >
                                    {category.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
