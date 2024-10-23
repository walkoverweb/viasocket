import { listPostContent, countPosts } from '../../components/lib/posts';
import { listTags } from '../../components/lib/tags';
import Layout from '../../components/blogs/layout';
import PostList from '../../components/blogs/postList';
import config from '../../components/lib/config';
import GetStarted from '@/components/getStarted/getStarted';
import { getDbdashData } from '../api';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';

export default function Index({ getStartedData, posts, tags, pagination, navData, footerData }) {
    return (
        <>
            <Navbar navData={navData} utm={'/blogs'} />
            <Layout>
                <PostList posts={posts} tags={tags} pagination={pagination} />
            </Layout>

            <div className="container">{getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}</div>
            <Footer footerData={footerData} />
        </>
    );
}

export async function getStaticProps() {
    const IDs = ['tblsaw4zp', 'tblvgm05y', 'tblmsw3ci', 'tblvo36my', 'tbl7lj8ev', 'tbl6u2cba'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const posts = listPostContent(1, config.posts_per_page);
    const tags = listTags();
    const pagination = {
        current: 1,
        pages: Math.ceil(countPosts() / config.posts_per_page),
    };

    return {
        props: {
            getStartedData: results[1].data.rows,
            navData: results[4]?.data?.rows,
            footerData: results[5]?.data?.rows,
            posts,
            tags,
            pagination,
        },
    };
}
