import { LinkButton } from '../uiComponents/buttons';
export default function FAQSection({ faqData, faqName }) {
    return (
        <>
            {' '}
            {faqData?.length > 0 && (
                <div className=" py-12">
                    <div className="container flex flex-col gap-9">
                        <h2 className="md:text-6xl text-4xl font-medium">Frequently Asked Questions</h2>
                        <div className="flex flex-col gap-3">
                            {faqData.map((faq, index) => {
                                if (faq?.page === faqName)
                                    return (
                                        <div key={index} className="rounded-md collapse collapse-plus bg-neutral">
                                            <input type="radio" name="my-accordion-2" defaultChecked={index === 0} />
                                            <div className="collapse-title text-xl font-semibold">{faq?.que}</div>
                                            <div className="collapse-content flex flex-col gap-2">
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
