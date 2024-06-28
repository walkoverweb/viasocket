import { getPosts } from '../lib/get_post';

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
