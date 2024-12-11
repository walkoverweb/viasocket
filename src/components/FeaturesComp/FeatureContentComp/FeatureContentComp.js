export default function FeatureContentComp({ featureData }) {
    if (featureData && featureData.length > 0)
        return (
            <div className="container cont justify-center items-center">
                <div className="cont__w cont cont__gap">
                    {featureData?.map((faq, index) => {
                        return (
                            <div className="text-center">
                                <h2 className="h2 ">{faq?.question}</h2>
                                <p className="sub__h2">{faq?.answer}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
}
