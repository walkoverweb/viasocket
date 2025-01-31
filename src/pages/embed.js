import BlogGrid from '@/components/blogGrid/blogGrid';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import GetStarted from '@/components/getStarted/getStarted';
import Navbar from '@/components/navbar/navbar';
import { FAQS_FIELDS, FOOTER_FIELDS, GETSTARTED_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import { getFaqData, getFooterData, getGetStartedData, getNavData } from '@/utils/getData';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

const Embed = ({ navData, posts, footerData, faqData, getStartedData, connectorData }) => {
    const [selectedImage, setSelectedImage] = useState(connectorData[0].image);

    return (
        <>
            <div className="w-full h-fit lg:h-screen py-10 border-b-2 border-black">
                <div className="container h-full flex flex-col">
                    <Navbar navData={navData} utm={'/index'} />
                    <div className="flex flex-col lg:flex-row h-full mt-10">
                        <div className="h-full w-full lg:w-3/5 flex flex-col justify-center gap-4 px-4 lg:px-0 ">
                            <div>
                                <h6 className="h1 font-normal">
                                    Bring <span className="text-red-700">100+</span> app integration into your SaaS
                                </h6>
                            </div>
                            <div>
                                <h2 className="sub__h1 w-full lg:w-2/5">
                                    An AI-powered no-code platform for workflow automation, app integrations, and
                                    data-driven efficiency.
                                </h2>
                            </div>
                            <button className="btn btn-primary bg-black text-white mt-5 w-fit">Get Started</button>
                        </div>
                        <div className="flex justify-center items-center mt-8 lg:mt-0 relative w-full md:w-1/2 h-full min-h-[400px] mx-auto">
                            <Image src="/assets/img/embedheroimage.svg" layout="fill" alt="Selected Embed Image" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-fit lg:h-screen w-full flex justify-center items-center py-10 md:py-20 gap-6">
                <div className="w-full lg:w-4/6 h-full px-4 md:px-0 flex flex-col md:flex-row justify-center items-center gap-4">
                    <div className="flex justify-center items-center relative w-full md:w-1/2 h-full min-h-[400px] mx-auto">
                        <Image src={selectedImage} layout="fill" alt="Connector Image" />
                    </div>
                    <div className="w-fit h-fit py-10 px-0 flex flex-col justify-center items-center p-10">
                        {connectorData.map((item, index) => (
                            <div className="hover:bg-black hover:text-white py-10 px-2 group">
                                <div
                                    key={index}
                                    className="relative pt-4 border-t-2 sub__h2 pr-6 lg:pr-0 pb-6 md:pb-0 text-gray-400 cursor-pointer"
                                    onClick={() => setSelectedImage(item.image)}
                                >
                                    <span className="absolute -top-4 left-0 bg-white pr-0 md:pr-2 text-black group-hover:text-white group-hover:bg-black">
                                        {item.title}
                                    </span>
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full md:w-11/12 border-t-2 border-b-2 border-black mx-auto bg-gray-100 py-10">
                <div className="flex flex-col justify-center items-center w-full xl:w-2/4 mx-auto">
                    <p className="h1 font-normal">How it works</p>
                    <h2 className="sub__h1 text-center">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </h2>
                </div>
                <div className="flex flex-col lg:flex-row justify-center px-1 md:px-20 h-fit xl:h-96 pt-20">
                    <div className="w-full xl:w-1/3 py-14 px-6 border-2 border-b-0 lg:border-b-2 lg:border-r-0 border-black bg-white">
                        <h3 className="h1 font-semibold mb-2">Step 1</h3>
                        <p className="sub__h1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                        </p>
                    </div>
                    <div className="w-full xl:w-1/3 py-14 px-6 border-2 border-b-0 lg:border-b-2 lg:border-r-0 border-black bg-white">
                        <h3 className="h1 font-semibold mb-2">Step 2</h3>
                        <p className="sub__h1">
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo.
                        </p>
                    </div>
                    <div className="w-full xl:w-1/3 py-14 px-6 border-2 border-black bg-white">
                        <h3 className="h1 font-semibold mb-2">Step 3</h3>
                        <p className="sub__h1">
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-11/12 p-2 md:p-20 mx-auto border-b-2 border-black flex flex-col justify-center items-center text-center gap-10">
                <h1 className="h1 font-normal">Upgrade your SaaS today, 100% free</h1>
                <h2 className="sub__h1 w-full md:w-3/4">
                    Start using viaSocket Embed lifetime free for any 5 apps of your choice. We will begin charging once
                    you've found the tool beneficial and wish to extend its use to additional apps.
                </h2>
                <button className="btn btn-primary text-white">Get Started</button>
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
    const connectorData = [
        {
            title: '5000+ connector library',
            description: 'tackling healthcare inaccessibility amidst a pandemic',
            image: '/assets/img/dummyimg.svg',
        },
        {
            title: 'Easy to implement',
            description: 'tackling healthcare inaccessibility amidst a pandemic',
            image: '/assets/img/dummyimg.svg',
        },
        {
            title: 'Cost-Effective',
            description: 'tackling healthcare inaccessibility amidst a pandemic',
            image: '/assets/img/dummyimg.svg',
        },
        {
            title: 'Always updated',
            description: 'tackling healthcare inaccessibility amidst a pandemic',
            image: '/assets/img/dummyimg.svg',
        },
        {
            title: 'Integration templates',
            description: 'tackling healthcare inaccessibility amidst a pandemic',
            image: '/assets/img/dummyimg.svg',
        },
    ];

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
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            posts: posts,
            faqData: faqData,
            getStartedData: getStarted,
            connectorData: connectorData,
        },
    };
}
