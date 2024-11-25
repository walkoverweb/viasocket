export default function IntegrationsHeaderComp({ data }) {
    return (
        <>
            <div className="container">
                <h1>{data?.heading}</h1>
                <h2>{data?.subheading}</h2>
            </div>
        </>
    );
}
