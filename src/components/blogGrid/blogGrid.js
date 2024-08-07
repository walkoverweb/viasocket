import React from 'react';
import Link from 'next/link';
import { MdOutlineArrowForward } from 'react-icons/md';
const BlogGrid = ({ posts }) => {
    return (
        <>
            <div className="flex flex-col gap-9">
                <h1 className="text-3xl font-bold">Know More About Viasocket Integrations</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    {posts.map((post, index) => (
                        <CardComponent key={index} card={post} />
                    ))}
                </div>
                <div className="flex justify-center ">
                    <Link
                        href="/blog"
                        target="_blank"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Read More Blogs
                    </Link>
                </div>
            </div>
        </>
    );
};

const CardComponent = ({ card }) => {
    return (
        <div className="card card-compact bg-white-100 w-70  hover:shadow-2xl bg-white">
            <figure className="h-60">
                <img src={card?.thumbnail} alt={card?.title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{card?.title}</h2>
                <p className="text-base">{card?.description}</p>
                <div className="card-actions justify-start">
                    <Link
                        target="_blank"
                        href={`/blog/${card?.slug}`}
                        className="flex items-center gap-1 text-[#0000ff] mt-6"
                    >
                        Read More <MdOutlineArrowForward />
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default BlogGrid;
