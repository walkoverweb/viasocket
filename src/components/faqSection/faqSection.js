import { LinkButton } from '../uiComponents/buttons';
export default function FAQSection({ faqData, faqName }) {
    return (
        <>
            {' '}
            {faqData?.length > 0 && (
                <div className=" py-24">
                    <div className="container flex flex-col gap-9">
                        <h2 className=" md:text-6xl text-4xl font-medium font-family-times-now">
                            Frequently Asked Questions
                        </h2>

                        <div className="flex flex-col">
                            {faqData.map((faq, index) => {
                                if (faq?.page === faqName)
                                    return (
                                        <div key={index} className="collapse collapse-arrow border-none rounded-none">
                                            <input
                                                type="radio"
                                                name="my-accordion-3 border-none "
                                                defaultChecked={index == 0}
                                            />
                                            <div className="collapse-title text-xl font-medium px-0  border-none">
                                                {faq?.que}
                                            </div>
                                            <div className="collapse-content flex flex-col gap-2 text-lg px-0 mx-0 bg-none border-none">
                                                <p className="bg-white">{faq?.ans}</p>
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
