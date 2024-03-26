import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import * as fs from 'fs'
import { fetchPostContent } from '../../components/lib/posts'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import Head from 'next/head'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { getTag } from '@/components/lib/tags'
import TagButton from '@/components/blogs/tags/tagButton'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
// const components = { Test }
const component = { ReactPlayer }

// import { SocialList } from '@/components/socialList';
// const components = { Test }
import { MdKeyboardArrowLeft } from 'react-icons/md'
import Image from 'next/image'

const slugToPostContent = ((postContents) => {
    let hash = {}
    let fullPath = {}
    postContents.map((data) => {
        fullPath = data.fullPath
    })
    postContents?.forEach((it) => (hash[it.slug] = it))

    return hash
})(fetchPostContent())

export default function TestPage({
    source,
    title,
    date,
    author,
    tags,
    thumbnailImage,
}) {
    const router = useRouter()

    const handleClick = () => {
        router.back()
    }
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
            <div className="wrapper container blog-container mt-28">
                <a
                    className=" btn-sm btn btn-outline"
                    href="#"
                    onClick={handleClick}
                >
                    <MdKeyboardArrowLeft /> Back
                </a>
                <div className="flex flex-col gap-2 justify-between md:flex-row mt-6 mb-12">
                    <div className="  flex flex-col justify-center gap-2">
                        <div className=" capitalize">
                            {author}, {date}
                        </div>
                        <h1 className="font-medium text-4xl">{title}</h1>
                    </div>
                    {thumbnailImage !== '' && (
                        <Image
                            className="md:w-1/2 w-full"
                            src={thumbnailImage}
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
                        <ul className="blog-page-tags d-flex gap-3 ps-0 mb-1">
                            {tags !== '' &&
                                tags?.map((it, i) => (
                                    <li
                                        className="bg-gray-300  w-fit px-3 rounded-full"
                                        key={i}
                                    >
                                        <TagButton tag={getTag(it)} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <button
                        className="btn btn-primary btn-sm w-fit"
                        onClick={handleClick}
                    >
                        <MdKeyboardArrowLeft /> Back
                    </button>
                </footer>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const paths = fetchPostContent().map((it) => '/blog/' + it.staticPath)

    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps(slug) {
    const slugData = slug.params.slug
    const source = fs.readFileSync(
        slugToPostContent[slugData]?.fullPath,
        'utf8'
    )
    const matterResult = matter(source, {
        engines: {
            yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
    })

    const title = matterResult?.data?.title
    const author = matterResult?.data?.author
    const content = matterResult?.content
    var date = new Date(matterResult?.data?.date)
    date = format(date, 'LLLL d, yyyy')
    const tags = matterResult?.data?.tag
    const thumbnailImage = matterResult?.data?.thumbnail
    const mdxSource = await serialize(content)

    return {
        props: {
            source: mdxSource,
            date: date || '',
            title: title || '',
            author: author || '',
            tags: tags || '',
            thumbnailImage: thumbnailImage || '',
        },
    }
}
