import { getPosts } from '../lib/getPost';

export default function Temp() {
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
