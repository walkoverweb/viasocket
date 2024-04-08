import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';

export default function FAQSection() {
    return (
        <>
            <div>
                <h2>Frequently Asked Questions</h2>
                <div className="flex flex-col gap-2">
                    <div className=" rounded-md collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-semibold">
                            Click to open this one and close others
                        </div>
                        <div className="collapse-content flex flex-col gap-2">
                            <p>
                                Drive customer acquisition seamlessly with Click-to-WhatsApp ads, strategically placed
                                on Facebook and Instagram. Engage with potential customers in their preferred space,
                                inviting them for a personalized conversation and enhancing your brand's reach.
                            </p>
                            <Link href={'/'} className="text-link">
                                Learn more <MdChevronRight fontSize={20} />{' '}
                            </Link>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Click to open this one and close others
                        </div>
                        <div className="collapse-content">
                            <p>hello</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Click to open this one and close others
                        </div>
                        <div className="collapse-content">
                            <p>hello</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
