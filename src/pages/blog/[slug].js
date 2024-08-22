import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import * as fs from 'fs';
import { fetchPostContent } from '../../components/lib/posts';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import Head from 'next/head';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { getTag } from '@/components/lib/tags';
import TagButton from '@/components/blogs/tags/tagButton';
import dynamic from 'next/dynamic';
import GetStarted from '@/components/getStarted/getStarted';
import { getDbdashData } from '../api';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
// const components = { Test }
const component = { ReactPlayer };

// import { SocialList } from '@/components/socialList';
// const components = { Test }
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Image from 'next/image';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';

const slugToPostContent = ((postContents) => {
    let hash = {};
    let fullPath = {};
    postContents.map((data) => {
        fullPath = data.fullPath;
    });
    postContents?.forEach((it) => (hash[it.slug] = it));

    return hash;
})(fetchPostContent());

export default function TestPage({
    getStartedData,
    source,
    title,
    date,
    author,
    tags,
    thumbnailImage,
    navData,
    footerData,
}) {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    property="og:title"
                    content={`Explore the world of ${title} Through our blog and stay informed about the latest developments, expert insights, and valuable tips that matter most. visit at GIDHH -The Best Accounting Software`}
                    key="title"
                />
            </Head>
            <Navbar navData={navData} />
            <div className="wrapper container blog-container mt-4 mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-5/6 xl:w-3/5">
                <a className="btn-sm btn btn-outline" href="#" onClick={handleClick} aria-label="back">
                    <MdKeyboardArrowLeft /> Back
                </a>
                <div className="flex flex-col gap-2 justify-between md:flex-row mt-6 mb-12">
                    <div className="flex flex-col justify-center gap-2 md:w-1/2">
                        <div className="capitalize">
                            {author}, {date}
                        </div>
                        <h1 className="font-medium text-4xl">{title}</h1>
                    </div>
                    {thumbnailImage !== '' && (
                        <img
                            className="w-full md:w-1/2"
                            src={process.env.NEXT_PUBLIC_BASE_URL + thumbnailImage}
                            width={1080}
                            height={1080}
                            alt={title}
                        />
                    )}
                </div>
                <div className="body">
                    <MDXRemote {...source} components={component} />
                </div>
                <footer className="pt-3 grid gap-4">
                    <div className="blog-card-tags">
                        <ul className="blog-page-tags flex gap-3 ps-0 mb-1">
                            {tags !== '' &&
                                tags?.map((it, i) => (
                                    <li className="bg-gray-300 w-fit px-3 rounded-full uppercase" key={i}>
                                        <TagButton tag={getTag(it)} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </footer>

                <div className="container py-8">
                    {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
                </div>
            </div>
            <Footer footerData={footerData} />
        </>
    );
}

export async function getServerSideProps(slug) {
    const slugData = slug.params.slug;
    const source = fs.readFileSync(slugToPostContent[slugData]?.fullPath, 'utf8');
    const matterResult = matter(source, {
        engines: {
            yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
    });

    const title = matterResult?.data?.title;
    const author = matterResult?.data?.author;
    const content = matterResult?.content;
    var date = new Date(matterResult?.data?.date);
    date = format(date, 'LLLL d, yyyy');
    const tags = matterResult?.data?.tag;
    const thumbnailImage = matterResult?.data?.thumbnail;
    const mdxSource = await serialize(content);

    const IDs = ['tblvgm05y', 'tbl7lj8ev', 'tbl6u2cba'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            getStartedData: results[0].data.rows,
            navData: results[1]?.data?.rows,
            footerData: results[2]?.data?.rows,
            source: mdxSource,
            date: date || '',
            title: title || '',
            author: author || '',
            tags: tags || '',
            thumbnailImage: thumbnailImage || '',
        },
    };
}
