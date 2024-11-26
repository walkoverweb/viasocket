export default function IntegrationsHeaderComp({ data }) {
    return (
        <>
            <div className="container cont cont__py cont__gap">
                <h1 className="h1">{data?.heading}</h1>
                <h2 className="sub__h1 w-full md:w-2/3">{data?.subheading}</h2>
            </div>
        </>
    );
}
