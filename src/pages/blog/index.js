import { listPostContent, countPosts } from '../../components/lib/posts'
import { listTags } from '../../components/lib/tags'
import Layout from '../../components/blogs/layout'
import PostList from '../../components/blogs/postList'
import config from '../../components/lib/config'

export default function Index({ posts, tags, pagination }) {
    return (
        <Layout>
            <PostList posts={posts} tags={tags} pagination={pagination} />
        </Layout>
    )
}

export async function getStaticProps() {
    const posts = listPostContent(1, config.posts_per_page)
    const tags = listTags()
    const pagination = {
        current: 1,
        pages: Math.ceil(countPosts() / config.posts_per_page),
    }

    return {
        props: {
            posts,
            tags,
            pagination,
        },
    }
}
