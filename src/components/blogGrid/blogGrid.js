import React from 'react';
import Link from 'next/link';
import { LinkText } from '../uiComponents/buttons';
import Image from 'next/image';
const BlogGrid = ({ posts }) => {
    return (
        <>
            {' '}
            <div className="flex flex-col gap-9">
                <h2 className="h1">
                    Know More About <br />
                    Viasocket Integrations
                </h2>
                <div className="w-full cont">
                    <div className="grid md:grid-cols-3 grid-cols-1 index_blog_grid">
                        {posts.map((post, index) => (
                            <CardComponent key={index} card={post} />
                        ))}
                    </div>
                    <Link href="/blog" target="_blank" className=" w-fit">
                        <LinkText
                            children="Read more blogs"
                            customClasses="btn btn-primary btn-outline btn-md w-fit border-t-0"
                        />
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
            className="block_border card rounded-none LinkButtonCard"
        >
            {' '}
            <figure className="h-90">
                <Image width={720} height={720} src={card?.image} alt={card?.title} />
            </figure>
            <div className="card-body gap-4">
                <div className="flex flex-col gap-1 h-full">
                    <h3 className="uppercase tracking-wider font-semibold">{card?.title.toLowerCase()}</h3>
                    <p className="text-base">{card?.description}</p>
                </div>
                <div className="card-actions justify-start mt-auto">
                    <LinkText children="Know more" />
                </div>
            </div>
        </Link>
    );
};
export default BlogGrid;
