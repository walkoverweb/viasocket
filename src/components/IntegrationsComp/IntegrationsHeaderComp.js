export default function IntegrationsHeaderComp({ data }) {
    return (
        <>
            <div className="container cont cont__py cont__gap">
                <h1 className="h1">{data?.heading}</h1>
                <h2 className="sub__h1">{data?.subheading}</h2>
            </div>
        </>
    );
}
