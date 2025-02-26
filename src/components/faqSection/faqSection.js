import { LinkButton, LinkText } from '../uiComponents/buttons';
import { useState } from 'react';

export default function FAQSection({ faqData, faqName }) {
    const [openIndex, setOpenIndex] = useState(-1);

    return (
        <>
            {faqData?.length > 0 && (
                <div className="flex flex-col gap-9">
                    <h2 className="h1">Frequently Asked Questions</h2>

                    <div className="flex flex-col">
                        {faqData.map((faq, index) => {
                            return (
                                <div key={index} className="collapse border-b border-none rounded-none LinkButtonCard ">
                                    <input
                                        type="checkbox"
                                        checked={openIndex === index}
                                        onChange={() => setOpenIndex(openIndex === index ? -1 : index)}
                                    />
                                    <div className="collapse-title text-xl sm:text-2xl font-semibold grid grid-cols-[60px_1fr_32px] sm:grid-cols-[80px_1fr_40px] items-start border-t-2 border-gray-200">
                                        <span className="text-4xl  text-gray-300">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        {faq?.que}
                                        <div
                                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-black' : 'bg-gray-200'}`}
                                        >
                                            {openIndex === index ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    className="sm:w-6 sm:h-6"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M18 6L6 18M6 6l12 12" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="black"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M12 5v14M5 12h14" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className="collapse-content grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr_40px] ">
                                        <div></div>
                                        <div className="flex flex-col gap-2">
                                            <div>{faq?.ans}</div>
                                            {faq?.link && <LinkButton content="Learn More" href={faq?.link} />}
                                        </div>
                                        <div></div>
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
