export default function Alphabet({ hello }) {
    return (
        <>
            <div className="container my-20">
                <p>{hello}</p>
            </div>
        </>
    );
}
export async function getServerSideProps(context) {
    const { params } = context;
    const alphabet = [params.second];
    return {
        props: {
            hello: alphabet,
        },
    };
}
