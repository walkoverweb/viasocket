import { LinkButton, LinkText } from '../uiComponents/buttons';
export default function FAQSection({ faqData, faqName }) {
    return (
        <>
            {' '}
            {faqData?.length > 0 && (
                <div className="flex flex-col gap-9">
                    <h2 className="h1">Frequently Asked Questions</h2>

                    <div className="flex flex-col">
                        {faqData.map((faq, index) => {
                            if (faq?.page === faqName)
                                return (
                                    <div
                                        key={index}
                                        className="collapse collapse-arrow border-b border-none rounded-none LinkButtonCard"
                                    >
                                        <input
                                            type="radio"
                                            name="my-accordion-3 border-none bg-white "
                                            defaultChecked={index == 0}
                                        />
                                        <div className="collapse-title text-lg font-semibold">{faq?.que}</div>
                                        <div className="collapse-content flex flex-col gap-2">
                                            <div className="font-">{faq?.ans}</div>
                                            {faq?.link && <LinkButton content="Learn More" href={faq?.link} />}
                                        </div>
                                    </div>
                                );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
