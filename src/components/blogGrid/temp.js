import { getPosts } from '../lib/postsss';

export default function Temp() {
    // const posts = getPosts();
    // console.log(posts, "loggeddd");
    return (
        <>
            <p>temppp</p>
        </>
    );
}

export async function getStaticProps() {
    console.log('inside props');

    console.log(posts);
    return {
        props: {
            posts,
        },
    };
}
