import { LinkButton } from '../uiComponents/buttons';
export default function FAQSection({ faqData, faqName }) {
    return (
        <>
            {' '}
            {faqData?.length > 0 && (
                <div className=" py-12">
                    <div className="container flex flex-col gap-9">
                        <div className="flex flex-col">
                            {faqData.map((faq, index) => {
                                if (faq?.page === faqName)
                                    return (
                                        <div key={index} className="collapse collapse-plus border-b rounded-none">
                                            <input type="radio" name="my-accordion-3" defaultChecked={index == 0} />
                                            <div className="collapse-title text-xl font-medium">{faq?.que}</div>
                                            <div className="collapse-content flex flex-col gap-2  text-lg">
                                                <p>{faq?.ans}</p>
                                                {faq?.link && <LinkButton title="Learn More" href={faq?.link} />}
                                            </div>
                                        </div>
                                    );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
