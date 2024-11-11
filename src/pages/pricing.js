import FAQSection from '@/components/faqSection/faqSection';
import { getDbdashData } from './api';
//import Footer from '@/components/footer/footer';
import { useState } from 'react';

import IntegrationFooter from '@/components/integrationsComp/integrationsFooter/integrationsFooter';
import NewFooter from '@/components/newfooter/newfooter';
import React from 'react';
import NewNavbar from '@/components/newnavbar/newnavbar';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
export async function getServerSideProps() {
    const IDs = ['tblnoi7ng', 'tbl6u2cba', 'tblfj3wrr', 'tbl7lj8ev'];
    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            faqData: results[0].data.rows,
            footerData: results[1]?.data?.rows,
            betterChoice: results[2]?.data?.rows,
            navData: results[3]?.data?.rows,
        },
    };
}

const pricing = ({ pathArray, navData, footerData, faqData, betterChoice, metaData, getStartedData, faqName }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [isToggled, setIsToggled] = useState(false);
    return (
        <>
            <NewNavbar navData={navData} utm={'pricing'} />
            <div className="container flex flex-col justify-center gap-6 mb-12 md:mb-24">
                <div className="border border-black">
                    <div className="h-24 "></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 ">
                        <div className="flex flex-col gap-8 p-12 ">
                            <h1 className="font-bold text-4xl md:text-6xl overflow-hidden">
                                Simple Pricing For Powerful Automation
                            </h1>
                            <h2 className="text-xl md:text-2xl font-semibold w-full ">
                                Enjoy a 30-Day Free Trial.
                                <br />
                                No credit card required.
                            </h2>
                            <div className="border border-black p-4 w-full md:w-1/2">
                                <div className="form-control flex items-center">
                                    <label className="cursor-pointer flex items-center">
                                        <span className="font-semibold mx-2 text-xl md:text-2xl">Billed Yearly</span>
                                        <input
                                            type="checkbox"
                                            className="toggle"
                                            checked={isToggled}
                                            onChange={() => setIsToggled(!isToggled)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="flex flex-col gap-y-8 border border-b-0 border-black font-normal">
                                <div className="flex flex-col gap-12 my-12 px-6">
                                    <div className="subheading font-semibold text-3xl md:text-4xl">Starter</div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-4xl md:text-6xl">${isToggled ? 30 * 10 : 30}</div>
                                        <div className="font-semibold">${isToggled ? 'Year' : 'month'}/workspace</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div>Invocations: 10,000/Month</div>
                                        <div>Execution Time Limit: 30 Seconds</div>
                                        <div>Min. Polling time: 1 Min</div>
                                        <div>Unlimited Active Workflows</div>
                                    </div>
                                    <div>For individuals who need higher limits.</div>
                                </div>
                                <a
                                    href="/start-trial"
                                    className="flex justify-center items-center border-t border-black "
                                >
                                    <button className="inline-block text-center p-4 font-bold">Start Free Trial</button>
                                </a>
                            </div>

                            <div className="flex flex-col gap-y-8 border-t border-black font-normal">
                                <div className="flex flex-col gap-12 my-12 px-6">
                                    <div className="subheading font-semibold text-3xl md:text-4xl">Team</div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-4xl md:text-6xl">${isToggled ? 60 * 10 : 60}</div>
                                        <div className="font-semibold">${isToggled ? 'Year' : 'month'}/workspace</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div>Invocations: 10,000/Month</div>
                                        <div>Execution Time Limit: 60 Seconds</div>
                                        <div>Min. Polling time: 1 Min</div>
                                        <div>Unlimited Active Workflows</div>
                                    </div>
                                    <div>For teams who want to collaborate on work.</div>
                                </div>
                                <a
                                    href="/start-trial"
                                    className="flex justify-center items-center border-t border-black bg-black text-white"
                                >
                                    <button className="inline-block text-center p-4 font-bold">Start Free Trial</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col justify-center gap-6 md:gap-16 my-12 md:my-24">
                <div className="border border-black p-6 md:p-12 flex flex-col gap-4 md:gap-8">
                    <div className="text-3xl md:text-4xl lg:text-6xl xl:w-1/2">
                        Explore Hundreds of Features, Available on Every Plan
                    </div>
                    <div className="text-base md:text-lg xl:w-1/2">
                        Get unrestricted access to all features, no matter your choice of plan.
                    </div>
                    <div className="flex justify-start">
                        <button className="btn btn-active bg-red-700 text-white text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 hover:bg-red-800 hover:text-white">
                            SEE ALL FEATURES
                        </button>
                    </div>
                </div>
            </div>

            <div className="container flex flex-col justify-center gap-6 md:gap-16 my-12 md:my-24">
                <h2 className="text-3xl md:text-4xl lg:text-6xl md:w-2/3 font-normal px-6 md:px-12">
                    What Makes <span className="text-red-700">Viasocket</span> A Better Choice
                </h2>

                <div className="flex flex-col lg:flex-row border border-black">
                    <div className="flex flex-col w-full lg:w-1/2 py-12 md:py-24 px-6 md:px-12 text-base md:text-xl gap-4">
                        {betterChoice.length > 0 &&
                            betterChoice.map((choice, index) => (
                                <div
                                    key={index}
                                    className={`border-b md:border-b py-3 cursor-pointer ${index === selectedIndex ? 'border-red-300' : ''}`}
                                    onClick={() => setSelectedIndex(index)}
                                >
                                    <div>{choice.name}</div>
                                </div>
                            ))}
                    </div>
                    <div className="flex flex-col w-full lg:w-1/2 bg-gray-200 py-12 md:py-24 px-6 md:px-12">
                        <p className="text-base md:text-lg">{betterChoice[selectedIndex]?.description}</p>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col justify-center gap-6 md:gap-16 my-12 md:my-24">
                <div className="border border-black p-6 md:p-12 flex flex-col gap-4 md:gap-8">
                    <div className="text-3xl md:text-4xl lg:text-6xl xl:w-1/2">
                        Free Services for Impactful Organizations
                    </div>
                    <div className="text-base md:text-lg xl:w-1/2">
                        We support organizations driving change with free access to our automation solutions
                    </div>
                    <div className="flex justify-start">
                        <button className="btn btn-active bg-red-700 text-white text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 hover:bg-red-800 hover:text-white">
                            CLICK HERE
                        </button>
                    </div>
                </div>
            </div>

            <div className="container flex flex-col justify-center  md:gap-16 gap-6 my-12 md:my-24 ">
                <div className="flex flex-col border border-black">
                    <h2 className="md:text-4xl sm:text-3xl lg:text-6xl  font-normal px-12 mt-24 overflow-hidden">
                        Trendy Questions
                    </h2>
                    <div className="flex flex-col text-xl">
                        <div className="bg-white">
                            {faqData && faqData.length > 0 && (
                                <div className=" xl2:px-12">
                                    <FAQSection faqData={faqData} faqName={`/pricing`} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container flex flex-col justify-center  md:gap-16 gap-6 my-12 md:my-24 ">
                <div className="border border-black  flex flex-col gap-8 ">
                    <NewFooter footerData={footerData} />
                </div>
            </div>
        </>
    );
};
export default pricing;
