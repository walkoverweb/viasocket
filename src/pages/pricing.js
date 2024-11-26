import FAQSection from '@/components/faqSection/faqSection';
import { getDbdashData } from './api';
//import Footer from '@/components/footer/footer';
import { useState } from 'react';

import IntegrationFooter from '@/components/integrationsCompOLD/integrationsFooter/integrationsFooter';
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
            <div className="container flex flex-col justify-center gap-6 mb-12 md:mb-24 ">
                <div className="border border-black gradient-background">
                    <div className="h-28 "></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className=" flex flex-col gap-8 md:p-12 p-6 justify-center ">
                            <h1 className="heading md:text-6xl overflow-hidden text-60px leading-normal tracking-lose-0p5 font-family-times-now ">
                                Simple Pricing for Powerful Automation
                            </h1>

                            <h2 className="text-xl  w-full  text-[252525] font-normal text-normal">
                                Enjoy a 30-Day Free Trial.
                                <br />
                                No credit card required.
                            </h2>

                            <label className="cursor-pointer flex flex-row gap-3 items-center p-4 border border-black w-fit hover:bg-slate-50 transition-all duration-300">
                                <span className="font-semibold text-md  ">BILLED YEARLY </span>
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={isToggled}
                                    onChange={() => setIsToggled(!isToggled)}
                                />
                            </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 bg-white ">
                            <div className="flex flex-col gap-y-2 border border-l-0 min-[1003px]:border-l border-r-0 min-[768px]:border-r border-b-0 border-black font-normal ">
                                <div className="subheading font-semibold text-md  justify-around mt-12 mx-6">
                                    {'Starter'.toUpperCase()}
                                </div>
                                <div className="flex flex-col gap-8 my-12 px-6">
                                    <div class="flex flex-col gap-2">
                                        <p class="text-4xl md:text-6xl font-family-times-now">
                                            ${isToggled ? 30 * 10 : 30}
                                        </p>
                                        <p class="font-normal tracking-wide overflow-hidden">
                                            {isToggled ? 'YEAR' : 'MONTH'}/WORKSPACE
                                        </p>
                                    </div>
                                    <div className="flex flex-col font-normal text-normal">
                                        <div>Invocations: 10,000/Month</div>
                                        <div>Execution Time Limit: 30 Seconds</div>
                                        <div>Min. Polling time: 1 Min</div>
                                        <div>Unlimited Active Workflows</div>
                                    </div>
                                    <div>For individuals who need higher limits.</div>
                                </div>
                                <a
                                    href={`/signup?utm_source=pricing&plan=starter&duration=${isToggled ? 'yearly' : 'monthly'}`}
                                    className="flex flex-col items-center mt-auto border-t border-black"
                                >
                                    <div className="flex justify-center">
                                        <button className="inline-block text-center p-4 font-semibold text-md ">
                                            {'Start Free Trial'.toUpperCase()}
                                        </button>
                                    </div>
                                </a>
                            </div>

                            <div className="flex flex-col gap-y-2 border-t border-black font-normal">
                                <div className="subheading font-semibold text-md  justify-around mt-12 mx-6">
                                    {'Team'.toUpperCase()}
                                </div>
                                <div className="flex flex-col gap-8 my-12 px-6">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-4xl md:text-6xl font-family-times-now">
                                            ${isToggled ? 60 * 10 : 60}
                                        </div>
                                        <div class="font-normal tracking-wide overflow-hidden">
                                            {isToggled ? 'YEAR' : 'MONTH'}/WORKSPACE
                                        </div>
                                    </div>
                                    <div className="flex flex-col font-normal text-normal">
                                        <div>Invocations: 10,000/Month</div>
                                        <div>Execution Time Limit: 60 Seconds</div>
                                        <div>Min. Polling time: 1 Min</div>
                                        <div>Unlimited Active Workflows</div>
                                    </div>
                                    <div>For teams who want to collaborate on work.</div>
                                </div>
                                <a
                                    href={`/signup?utm_source=pricing&plan=team&duration=${isToggled ? 'yearly' : 'monthly'}`}
                                    className="flex justify-center items-center border-t  mt-auto border-black bg-black text-white"
                                >
                                    <button className="inline-block text-center p-4 font-semibold text-md ">
                                        {' '}
                                        {'Start Free Trial'.toUpperCase()}
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="container flex flex-col justify-center gap-6 md:gap-16 my-24 md:my-48">
                <div className="border border-black p-6 md:p-12 flex flex-col gap-4 md:gap-8">
                    <div className="text-3xl md:text-4xl lg:text-6xl xl:w-1/2">
                        Explore Hundreds of Features, Available on Every Plan
                    </div>
                    <div className="text-base md:text-lg xl:w-1/2">
                        Get unrestricted access to all features, no matter your choice of plan.
                    </div>
                    <div className="flex justify-start">
                        <button className="btn btn-active bg-red-700 text-white text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 hover:bg-black hover:text-white">
                            SEE ALL FEATURES
                        </button>
                    </div>
                </div>
            </div> */}

            <div className="container flex flex-col justify-center gap-6 md:gap-8 my-24 md:my-48">
                <h2 className="text-3xl md:text-4xl lg:text-6xl md:w-2/3 font-normal font-family-times-now">
                    What makes <br /> <span className="text-red-700 italic">viaSocket</span> a better choice ?
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

                                    {selectedIndex === index && (
                                        <div
                                            className="lg:hidden mt-2 text-base md:text-lg text-gray-700"
                                            style={{
                                                backgroundImage: `url('/assets/img/pricing.png')`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        >
                                            <div className=" md:p-8 mx-4 md:mx-24">
                                                <p className="text-base md:text-lg text-white  p-4">
                                                    {choice.description}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>

                    <div
                        className="lg:flex hidden w-full lg:w-1/2 md:py-12 px-6 md:px-12 bg-opacity-200 "
                        style={{
                            backgroundImage: `url('/assets/img/pricing.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="p-12 h-full flex items-center justify-center">
                            <p className="text-base md:text-lg text-white">
                                {betterChoice[selectedIndex]?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="container flex flex-col justify-center  gap-6 md:gap-18 my-24 md:my-48">
                <div className=" border border-t-0 border-black">
                    <div className="flex items-center justify-center sm:-mt-5 md:-mt-5 lg:-mt-8">
                        <div className="border-t border-black flex-grow" />
                        <div className="text-3xl md:text-4xl lg:text-6xl px-4 font-family-times-now text-center">
                            Free Services for Impactful Organizations
                        </div>
                        <div className="border-t border-black flex-grow" />
                    </div>

                    <div className="flex flex-col gap-4 md:gap-8 items-center text-center py-8 border-black">
                        <div className="text-base md:text-lg xl:w-1/2 text-center">
                            We support organizations driving change with free access to our automation solutions
                        </div>
                        <div className="flex justify-center">
                            <a  href='https://viasocket.com/blog/best-software-discounts-for-nonprofit-2024/' target='_blank' className="btn btn-active bg-red-700 text-white  px-20 py-2 hover:bg-black hover:text-white font-semibold text-md">
                                CLICK HERE
                            </a>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="container flex flex-col justify-center  my-24 md:mt-48 ">
                <div className="flex flex-col border border-black">
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
                <div className="border border-black border-l-0 border-b-0  border-t-0 flex flex-col gap-8 ">
                    <NewFooter footerData={footerData} />
                </div>
            </div>
        </>
    );
};
export default pricing;
