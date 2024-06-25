import React from 'react';
import Link from 'next/link';
import { MdOutlineArrowForward } from 'react-icons/md';
import Temp from './temp';

const BlogGrid = ({ posts }) => {
    console.log(posts, 'posttt from blogg grid');
    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex justify-center m-10">
                    <h1 className="m-5 font-extrabold text-5xl">Blog Grid</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {posts.map((post, index) => (
                        <CardComponent key={index} card={post} />
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Read More
                    </button> */}
                </div>
            </div>
        </>
    );
};

const CardComponent = ({ card }) => {
    console.log(card, 'cardddddd');
    return (
        <div className="card card-compact bg-base-100 w-70 mr-5 ml-5 hover:shadow-2xl">
            <figure>
                <img src={card?.thumbnail} alt={card?.title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{card?.title}</h2>
                <p>{card?.description}</p>
                <div className="card-actions justify-start">
                    <Link
                        target="_blank"
                        href={`blog/${card?.slug}`}
                        className="flex items-center gap-1 text-[#0000ff] mt-6"
                    >
                        Learn More <MdOutlineArrowForward />
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default BlogGrid;
