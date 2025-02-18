import BlogGrid from '@/components/blogGrid/blogGrid';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import GetStarted from '@/components/getStarted/getStarted';
import Navbar from '@/components/navbar/navbar';
import { EMBED_FIELDS, FAQS_FIELDS, FOOTER_FIELDS, GETSTARTED_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
import { getEmbedData, getFaqData, getFooterData, getGetStartedData, getNavData } from '@/utils/getData';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

const Embed = ({ navData, blogData, footerData, faqData, getStartedData, embedData }) => {
    const [selectedImage, setSelectedImage] = useState(embedData[0]?.image?.[0]);

    const steps = [
        {
            title: 'Configure the Display',
            description:
                "You have full control over the integration's appearance and functionality. Customize the display style, button type, and filter available services to suit your needs.",
        },
        {
            title: 'Generate JWT Token',
            description:
                'To generate the JWT token, gather the org_id, user_id, project_id, and access key to ensure each user only sees their relevant flows.',
        },
        {
            title: 'Embed SDK',
            description: "Once you've got your token, grab the SDK code snippet and paste it into your app's code.",
        },
    ];

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
                                <p className=" text-gray-500 ">Or</p>
                                <button className="btn btn-outline">Self Embed</button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-8 lg:mt-0 relative w-full md:w-1/2 h-full min-h-[400px] mx-auto">
                            <Image src="/assets/img/embedheroimage.svg" layout="fill" alt="Selected Embed Image" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container h-fit xl:h-screen w-full flex justify-center items-center p-12 gap-12 my-20">
                <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-8">
                    <div className="hidden md:block w-full h-full min-h-[400px] mx-auto bg-[#FFF5F5] p-6 border-2 border-gray-200">
                        <div className="flex relative justify-center items-center h-full w-full">
                            <Image
                                src={selectedImage || 'https://placehold.co/40x40'}
                                layout="fill"
                                alt="Connector Image"
                                className="object-fill max-w-full"
                            />
                        </div>
                    </div>
                    <div className="w-full h-fit flex flex-col justify-center items-center gap-2">
                        {embedData.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 group w-full ${selectedImage === item?.image[0] ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
                            >
                                <div
                                    className={`text-lg cursor-pointer ${selectedImage === item?.image[0] ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
                                    onMouseEnter={() => setSelectedImage(item?.image[0])}
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`text-xl font-bold sm:whitespace-nowrap ${selectedImage === item?.image[0] ? 'text-white' : 'text-black group-hover:text-white'}`}
                                        >
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

            <div className="container cont cont__py gap-20 h-fit border-2 border-x-gray-200 my-12 bg-[#F5FBFF]">
                <div className="flex flex-col justify-center items-center w-full xl:w-2/4 mx-auto">
                    <p className="h1 h1__b font-extrabold">How it works</p>
                    <h2 className="sub__h1 text-center">
                        Follow these steps, and your product will be seamlessly integrated with the viaSocket embed
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12  justify-items-center">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="py-20 px-8 border-2 border-gray-200 bg-white flex flex-col gap-4 transition-transform transform hover:scale-110"
                        >
                            <h3 className="h2 font-semibold mb-2">{step.title}</h3>
                            <p className="sub__h2">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container cont cont__py border-y-2 md:border-2 border-black  justify-center items-center text-center gap-10 mt-20">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="h1 h1__b max-w-[1200px]">Upgrade your Product Today with viaSocket</h1>
                    <h2 className="sub__h1 max-w-[1000px]">
                        Start using viaSocket embed and bring seamless automation within your product, so your customers
                        can stick to your product while automating their day-to-day repetitive tasks.
                    </h2>
                </div>
                <button className="btn btn-accent text-white">Get Started</button>
            </div>

            <div className="container cont cont__py flex flex-col lg:flex-row h-fit lg:mt-0 lg:h-screen justify-center items-center">
                <div className="h-full w-full lg:w-1/2 flex flex-col justify-center gap-4">
                    <div>
                        <h6 className="h1 font-semibold   ">Give Your Chatbot the Power of 5,000+ Integrations</h6>
                        <h2 className="sub__h1">
                            You can connect your chatbot to over 5000 apps on viaSocket. Automate tasks, streamline
                            workflows and enhance your chatbot's capabilities—all in just a few clicks. Explore the
                            possibilities and watch your chatbot evolve.
                        </h2>
                    </div>
                    <button className="btn btn-accent mt-4">Read More</button>
                </div>
                <div className="flex justify-center items-center mt-8 lg:mt-0 relative w-full md:w-2/5 h-2/3 min-h-[400px] mx-auto bg-gray-300"></div>
            </div>

            <div className="container cont cont__py  bg-black text-white  justify-center items-center text-center gap-10">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="h1 h1__b max-w-[1200px]">Start Showing Automation Use Cases on Your Platform</h1>
                    <h2 className="sub__h1 max-w-[1000px]">
                        Simply add the provided embed code to your blog or website, and instantly display real-world
                        automation examples that highlight how your app connects with others.
                    </h2>
                </div>
                <button className="btn btn-accent text-white">Get your free embed code</button>
            </div>

            <div className="cont cont__py gap-36">
                {blogData?.length > 0 && (
                    <div className="container">
                        <BlogGrid posts={blogData} />
                    </div>
                )}
                <div className="pb-6">
                    {faqData?.length > 0 && (
                        <div className="container border border-black p-20 border-b-0">
                            <FAQSection faqData={faqData} faqName={'/index'} />
                        </div>
                    )}
                    {getStartedData && (
                        <div className="container border border-black p-20 border-b-0">
                            <GetStarted data={getStartedData} isHero={'false'} />
                        </div>
                    )}
                    <div className="container">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Embed;

export async function getServerSideProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/index'`);
    const getStarted = await getGetStartedData(GETSTARTED_FIELDS);
    const embedData = await getEmbedData();
    const blogTags = 'embed';
    const blogData = await getBlogData(blogTags);

    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            blogData: blogData || [],
            faqData: faqData || [],
            getStartedData: getStarted || [],
            embedData: embedData || [],
        },
    };
}
