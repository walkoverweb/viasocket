import React from 'react';
import Link from 'next/link';
import { MdChevronRight, MdOutlineArrowForward } from 'react-icons/md';
import { BtnWithHideIco, LinkButton, LinkText } from '../uiComponents/buttons';
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
                <div className="grid md:grid-cols-3 grid-cols-1 index_blog_grid">
                    {posts.map((post, index) => (
                        <CardComponent key={index} card={post} />
                    ))}
                </div>
                <Link href="/blog" target="_blank">
                    <LinkText children="Read more blogs" customClasses="btn btn-primary btn-outline btn-md" />
                </Link>
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
                <Image
                    width={720}
                    height={720}
                    src={process.env.NEXT_PUBLIC_BASE_URL + card?.thumbnail}
                    alt={card?.title}
                />
            </figure>
            <div className="card-body gap-4">
                <h3 className="uppercase tracking-wider font-semibold">{card?.title}</h3>
                <p className="text-base">{card?.description}</p>
                <div className="card-actions justify-start mt-auto">
                    <LinkButton href={`/blog/${card?.slug}`} content="Know more" />
                </div>
            </div>
        </Link>
    );
};
export default BlogGrid;
