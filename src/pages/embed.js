import BlogGrid from '@/components/blogGrid/blogGrid';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import GetStarted from '@/components/getStarted/getStarted';
import Navbar from '@/components/navbar/navbar';
import { EMBED_FIELDS, FAQS_FIELDS, FOOTER_FIELDS, GETSTARTED_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import { getEmbedData, getFaqData, getFooterData, getGetStartedData, getNavData } from '@/utils/getData';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

const Embed = ({ navData, posts, footerData, faqData, getStartedData, embedData }) => {
    const [selectedImage, setSelectedImage] = useState(embedData[0]?.image?.[0]);

    return (
        <>
            <div className="w-full h-fit lg:h-screen  border-b-2 border-black">
                <div className="container h-full flex flex-col">
                    <Navbar navData={navData} utm={'/index'} />
                    <div className="flex flex-col lg:flex-row h-full mt-10">
                        <div className="h-full w-full lg:w-3/5 flex flex-col justify-center gap-8 px-4 lg:px-0 ">
                            <div>
                                <h6 className="h1 font-normal">
                                    <span className="text-red-700">Embed </span>
                                    third party apps with your SaaS/AI product
                                </h6>
                            </div>
                            <div>
                                <h2 className="sub__h1 w-full lg:w-4/5">
                                    Let your customers easily discover, connect and manage workflows right within your
                                    product.
                                </h2>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <button className="btn btn-accent ">How To Start</button>
                                <p className="px-5 text-gray-500 ">Or</p>
                                <button className="btn btn-outline">Self Embed</button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-8 lg:mt-0 relative w-full md:w-1/2 h-full min-h-[400px] mx-auto">
                            <Image src="/assets/img/embedheroimage.svg" layout="fill" alt="Selected Embed Image" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-fit lg:h-screen w-full flex justify-center items-center p-0 md:p-10 md:py-20 gap-6 mt-10">
                <div className="w-full lg:w-5/6 h-full px-0 flex flex-col md:flex-row justify-center items-center gap-4">
                    <div className=" hidden md:block w-full md:w-1/2 h-full min-h-[400px] mx-auto bg-[#FFF5F5] p-6 border-2 border-gray-200">
                        <div className=" flex relative justify-center items-center h-full min-h-[400px]">
                            <Image
                                src={selectedImage || 'https://placehold.co/40x40'}
                                layout="fill"
                                // width={400}
                                // height={400}
                                alt="Connector Image"
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 h-fit flex flex-col justify-center gap-6 items-center p-4 md:p-8 lg:max-h-[650px]">
                        {embedData.map((item, index) => (
                            <div key={index} className="hover:bg-black hover:text-white py-2 px-2 md:px-2 group w-full">
                                <div
                                    className="text-sm pr-0 pb-6 md:pb-0 text-gray-400 cursor-pointer"
                                    onClick={() => setSelectedImage(item?.image[0])}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="text-lg font-bold sm:whitespace-nowrap group-hover:text-white text-black">
                                            {item.name}
                                        </div>
                                    </div>
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full h-fit lg:h-screen md:w-11/12 border-2 border-x-gray-200 mt-10 mx-auto py-20 md:py-10 bg-[#F5FBFF]">
                <div className="flex flex-col justify-center items-center w-full xl:w-2/4 mx-auto">
                    <p className="h1 font-normal">How it works</p>
                    <h2 className="sub__h1 text-center">
                        Follow these steps, and your product will be seamlessly integrated with the viaSocket embed
                    </h2>
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch px-1 md:px-20   min-h-[400px] pt-20 gap-8">
                    <div className="w-5/6 md:w-2/4 xl:w-1/3 py-14 px-6 border-2  lg:border-b-2  border-gray-200 bg-white ">
                        <h3 className="h2 font-semibold mb-2 h-1/3">Configure the Display</h3>
                        <p className="sub__h2">
                            You have full control over the integration's appearance and functionality. Customize the
                            display style, button type, and filter available services to suit your needs.
                        </p>
                    </div>
                    <div className="w-5/6 md:w-2/4 xl:w-1/3 py-14 px-6 border-2  lg:border-b-2  border-gray-200 bg-white ">
                        <h3 className="h2 font-semibold mb-2 h-1/3 ">Generate JWT Token</h3>
                        <p className="sub__h2">
                            To generate the JWT token, gather the org_id, user_id, project_id, and access key to ensure
                            each user only sees their relevant flows.
                        </p>
                    </div>
                    <div className="w-5/6 md:w-2/4 xl:w-1/3 py-14 px-6 border-2 border-gray-200 bg-white">
                        <h3 className="h2 font-semibold mb-2 h-1/3">Embed SDK</h3>
                        <p className="sub__h2">
                            Once you've got your token, grab the SDK code snippet and paste it into your app's code
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-11/12 p-2 py-10 md:p-20 mx-auto border-y-2 md:border-2 border-black flex flex-col justify-center items-center text-center gap-10 mt-20">
                <h1 className="h1 font-normal">Upgrade your Product Today with viaSocket</h1>
                <h2 className="sub__h1 w-full md:w-2/3">
                    Start using viaSocket embed and bring seamless automation within your product, so your customers can
                    stick to your product while automating their day-to-day repetitive tasks.
                </h2>
                <button className="btn btn-accent text-white">Get Started</button>
            </div>

            <div className="flex flex-col lg:flex-row h-fit mt-20 lg:mt-0 lg:h-screen w-11/12 mx-auto justify-center items-center">
                <div className="h-full w-full lg:w-3/5 flex flex-col justify-center gap-2 px-4 lg:px-0 ">
                    <div>
                        <h6 className="text-4xl">Give Your Chatbot the Power of 5,000+ Integrations</h6>
                    </div>
                    <div>
                        <h2 className="sub__h1 w-full lg:w-4/5">
                            You can connect your chatbot to over 5000 apps on viaSocket. Automate tasks, streamline
                            workflows and enhance your chatbot’s capabilities—all in just a few clicks. Explore the
                            possibilities and watch your chatbot evolve.
                        </h2>
                    </div>
                    <button className="btn btn-accent mt-4">Read More</button>
                </div>
                <div className="flex justify-center items-center mt-8 lg:mt-0 relative w-full md:w-2/5 h-2/3 min-h-[400px] mx-auto bg-gray-300"></div>
            </div>

            <div className="w-full md:w-11/12 p-2 py-10 md:p-20 mx-auto bg-black text-white flex flex-col justify-center items-center text-center gap-10 mt-20">
                <h1 className="h1 font-normal">Start Showing Your Customers Automation Use Cases for Free</h1>
                <h2 className="sub__h1 w-full md:w-2/4">
                    Simply add the provided embed code to your blog or website, and instantly display real-world
                    automation examples that highlight how your app connects with others.
                </h2>
                <button className="btn btn-accent text-white">Get your free embed code</button>
            </div>

            <div className="cont cont__py gap-36">
                {posts?.length > 0 && (
                    <div className="container">
                        <BlogGrid posts={posts} />
                    </div>
                )}
                {faqData?.length > 0 && (
                    <div className="container">
                        <FAQSection faqData={faqData} faqName={'/index'} />
                    </div>
                )}
                {getStartedData && (
                    <div className="container">
                        <GetStarted data={getStartedData} isHero={'false'} />
                    </div>
                )}
                <div className="container">
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
    );
};

export default Embed;

export async function getServerSideProps() {
    const tag = 'via-socket';
    const defaultTag = 'integrations';
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
    );

    const posts = await res.data;
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/index'`);
    const getStarted = await getGetStartedData(GETSTARTED_FIELDS);
    const embedData = await getEmbedData();

    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            posts: posts || [],
            faqData: faqData || [],
            getStartedData: getStarted || [],
            embedData: embedData || [],
        },
    };
}
