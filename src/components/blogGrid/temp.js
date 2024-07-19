import { getPosts } from '../lib/getPost';

export default function Temp() {
    return (
        <>
            <p>temppp</p>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            posts,
        },
    };
}
