import React from 'react';
import Link from 'next/link';
import { MdChevronRight, MdOutlineArrowForward } from 'react-icons/md';
import { LinkButton } from '../uiComponents/buttons';
import Image from 'next/image';
const BlogGrid = ({ posts }) => {
    return (
        <>
            {' '}
            <div className="flex flex-col gap-9">
                <h2 className="md:text-6xl text-4xl font-medium">
                    Know More About <br />
                    Viasocket Integrations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    {posts.map((post, index) => (
                        <CardComponent key={index} card={post} />
                    ))}
                </div>
                <div className="flex justify-center ">
                    <Link
                        className="flex items-center gap-1 btn btn-ghost btn-md hover:bg-secondary"
                        href="/blog"
                        target="_blank"
                    >
                        Read More Blogs <MdChevronRight fontSize={20} />
                    </Link>
                </div>
            </div>
        </>
    );
};
const CardComponent = ({ card }) => {
    return (
        <Link
            href={`/blog/${card?.slug}`}
            target="_blank"
            id="blogSection"
            className="card card-compact bg-white-100 w-70  hover:shadow-2xl bg-neutral"
        >
            <figure className="h-60">
                <Image
                    width={720}
                    height={720}
                    src={process.env.NEXT_PUBLIC_BASE_URL + card?.thumbnail}
                    alt={card?.title}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{card?.title}</h2>
                <p className="text-base">{card?.description}</p>
                <div className="card-actions justify-start">
                    <LinkButton href={`/blog/${card?.slug}`} title="Read more" />
                </div>
            </div>
        </Link>
    );
};
export default BlogGrid;
