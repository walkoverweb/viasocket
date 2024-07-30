import TrustedBy from '@/components/trustedBy/trustedBy';
import Link from 'next/link';
import Head from 'next/head';
import { getDbdashData } from './api';
import { MdArrowForward } from 'react-icons/md';
import GetStarted from '@/components/getStarted/getStarted';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import Image from 'next/image';

import { MdAlarm, MdTrendingUp, MdShowChart } from 'react-icons/md';
import { useState } from 'react';

export async function getServerSideProps() {
    const IDs = ['tblvgm05y', 'tbl2bk656', 'tblnoi7ng', 'tbld6tbln'];

    try {
        const dataPromises = IDs.map((id) => getDbdashData(id));
        const results = await Promise.all(dataPromises);

        // Validate results
        const validateData = (data) => data?.data?.rows || [];

        return {
            props: {
                getStartedData: validateData(results[0]),
                metaData: validateData(results[1]),
                faqData: validateData(results[2]),
                useCases: validateData(results[3]),
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                getStartedData: [],

                metaData: [],
                faqData: [],
                useCases: [],
            },
        };
    }
}

const embed = ({ getStartedData, productData, metaData, faqData, useCases }) => {
    const [hoveredTag, setHoveredTag] = useState(null);
    const images = {
        tag1: '/assets/img/embedfeature/libraries.svg',
        tag2: '/assets/img/embedfeature/mainFlow.svg',
        tag3: '/assets/img/embedfeature/mainFlow.svg',
        tag4: '/assets/img/embedfeature/mainFlow.svg',
        tag5: '/assets/img/embedfeature/mainFlow.svg',
        tag6: '/assets/img/embedfeature/mainFlow.svg',
        tag7: '/assets/img/embedfeature/mainFlow.svg',
        tag8: '/assets/img/embedfeature/mainFlow.svg',
        tag9: '/assets/img/embedfeature/Integrationtemplates.png',
        tag10: '/assets/img/embedfeature/mainFlow.svg',
        tag11: '/assets/img/embedfeature/mainFlow.svg',
        tag12: '/assets/img/embedfeature/mainFlow.svg',
        tag13: '/assets/img/embedfeature/mainFlow.svg',
        tag14: '/assets/img/embedfeature/scheduleTask.svg',
    };

    const tags = [
        { id: 'tag1', label: '5000+ connector library' },
        { id: 'tag2', label: 'Easy to implement' },
        { id: 'tag3', label: 'Cost-effective' },
        { id: 'tag4', label: 'Always updated' },
        { id: 'tag5', label: 'User friendly' },
        { id: 'tag6', label: 'Native behaviour' },
        { id: 'tag7', label: 'Inbuilt help doc' },
        { id: 'tag8', label: 'High customizations' },
        { id: 'tag9', label: 'Integration templates' },
        { id: 'tag10', label: 'Drag and Drop' },
        { id: 'tag11', label: 'Real-time data transfer' },
        { id: 'tag12', label: 'Built-in data storage' },
        { id: 'tag13', label: 'Scalability' },
        { id: 'tag14', label: 'Security and Compliances ' },
    ];
    const steps = [
        {
            number: 1,
            title: 'Implement our code',
            description: 'Set up triggers for app events or specific times to fetch data across your app stack.',
        },
        {
            number: 2,
            title: "Style it to match your product's branding",
            description: 'Override our design system styles without forking the codebase.',
        },
        {
            number: 3,
            title: 'Allow your users to create automated workflows',
            description: 'Set up triggers for app events or specific times to fetch data across your app stack.',
        },
    ];

    return (
        <>
            <div className="bg-white">
                <div className="container bg-white">
                    <MetaHeadComp metaData={metaData} page={'/'} />
                    <div className="container grid gap-20">
                        <div className=" flex justify-center py-10">
                            <div className="flex flex-col md:flex-row w-full max-w-8xl bg-white rounded-lg overflow-hidden">
                                <div className="w-full md:w-1/2 p-10">
                                    <h5 className="text-3xl font-bold mb-4">Embed</h5>
                                    <h1 className="text-7xl font-bold mb-8">
                                        Bring third-party app integration into your SaaS
                                    </h1>
                                    <p className="text-gray-700 text-xl">
                                        With Viasocket embedding, your users can easily connect third-party apps with
                                        your SaaS tools to automate tasks without leaving your platform
                                    </p>
                                    <div className="flex space-x-4 justify-left pt-8">
                                        <button className="bg-gray-500 text-white py-2 px-8 rounded ">
                                            Talk to us
                                        </button>
                                        <button className="bg-white text-gray py-2 px-8 rounded  border border-gray-700">
                                            See how it works
                                        </button>
                                    </div>
                                    <div className="space-y-2 mt-4">
                                        <div className="flex items-center space-x-2">
                                            <MdAlarm className="text-xl text-gray-700" />
                                            <span className="text-lg">30 Mins of code to bring embedding</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MdTrendingUp className="text-xl text-gray-700" />
                                            <span className="text-lg">Higher retention rate</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MdShowChart className="text-xl text-gray-700" />
                                            <span className="text-lg">Competitive benefit</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 relative">
                                    <Image
                                        src="/assets/img/embedfeature/EmbedHeroImage.png"
                                        alt="Example Image"
                                        layout="responsive"
                                        width={1200}
                                        height={800}
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className=" container flex items-center justify-center bg-[#F6F4EE]">
                            <div className="w-screen flex flex-col p-4">
                                <div className="flex flex-col md:flex-row bg-F6F4EE rounded-lg  p-4 md:p-8 overflow-hidden">
                                    {/* Image Section */}
                                    <div className="flex-1 flex items-center justify-center bg-white p-4 overflow-hidden">
                                        <img
                                            src={images[hoveredTag] || '/assets/img/embedfeature/mainFlow.svg'}
                                            alt={hoveredTag || 'Default Image'}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>

                                    {/* Tags Section */}
                                    <div className="flex-1 p-4 overflow-y-auto">
                                        <ul className="space-y-2">
                                            {tags.map((tag) => (
                                                <li
                                                    key={tag.id}
                                                    className={`cursor-pointer p-2 rounded border-b-4 border-gray-200 transition-all duration-300 flex items-center ${
                                                        hoveredTag === tag.id
                                                            ? 'bg-gradient-to-r from-white via-Ivory-100 via-Ivory-300 to-Ivory-500 text-black shadow-lg'
                                                            : 'bg-F6F4EE text-gray-700 hover:bg-gray-300'
                                                    }`}
                                                    onMouseEnter={() => setHoveredTag(tag.id)}
                                                    onMouseLeave={() => {}}
                                                >
                                                    <span className="flex-1 text-left md:text-center">{tag.label}</span>
                                                    {hoveredTag === tag.id && (
                                                        <span className="ml-2 w-3 h-3 rounded-full bg-black"></span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container  flex items-center justify-center bg-white">
                            <div className=" bg-white mx-auto pr-4 py-8">
                                <h1 className="text-3xl font-bold mb-4">How it Works</h1>
                                <p className="text-gray-700 mb-8 py-4">
                                    20 Years in SaaS Taught Us: Integrations Are Vital & Often Tough <br />
                                    With Embed, We Made Them Simple.
                                </p>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {steps.map((step, index) => (
                                        <div key={index} className="bg-gray-100 p-4 rounded-lg ">
                                            <div className="flex items-center justify-center w-12 h-12 bg-gray-500 text-white rounded-full mb-4">
                                                {step.number}
                                            </div>
                                            <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                                            <p className="text-gray-700">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="container flex items-center justify-center bg-white py-8">
                            <div className="container  mx-auto ">
                                <div className="bg-white rounded-lg  p-4">
                                    <h1 className="text-3xl font-bold mb-2">Upgrade your SaaS today, 100% free </h1>
                                    <p className="text-gray-700 mb-6">
                                        Start using viaSocket Embed lifetime free for any 5 apps of your choice. We will
                                        begin charging <br />
                                        once you've found the tool beneficial and wish to extend its use to additional
                                        apps
                                    </p>

                                    <div className="flex space-x-2 mb-6">
                                        <button className="bg-gray-500 text-white py-2 px-2 rounded flex items-center">
                                            Talk to Us
                                            <MdArrowForward className="ml-2" />
                                        </button>
                                        <button className="bg-white text-gray-500 border border-gray-500 py-2 px-2 rounded flex items-center">
                                            SignUp & Get Started
                                            <MdArrowForward className="ml-2" />
                                        </button>
                                        <Link href="/faq" className="text-blue-500 flex items-center">
                                            FAQ <MdArrowForward className="ml-2 text-gray-500" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="  bg-white">
                            <h1 className="text-3xl font-bold p-4 gap-4">Usecases</h1>
                            {useCases && useCases.length > 0 ? (
                                useCases.map((item, index) => (
                                    <div className="container mx-auto bg-white flex flex-col md:flex-row" key={index}>
                                        {/* Content Section */}
                                        <div className="w-full md:w-1/2 p-2">
                                            <div className="bg-white">
                                                <div className="p-4 pb-2">
                                                    <h1 className="text-xl font-bold pb-2">
                                                        {item.usecase || 'Use Case Title Missing'}
                                                    </h1>
                                                    <p>{item.description || 'Description not available'}</p>
                                                </div>
                                                <div className="m-4">
                                                    {item?.embedusecase?.features?.length > 0 ? (
                                                        item.embedusecase.features.map((item2, index2) => (
                                                            <div key={index2} className="p-4 mb-2 bg-[#F6F4EE]">
                                                                <h2 className="text-lg font-semibold p-2">
                                                                    {item2.title || 'Feature Title Missing'}
                                                                </h2>
                                                                <p className="p-2">
                                                                    {item2.description ||
                                                                        'Feature description not available'}
                                                                </p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No features available.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Image Section */}
                                        <div className="w-full md:w-1/2 p-2 flex justify-center items-center">
                                            <img
                                                src="/assets/img/embedfeature/whatsapphealthcare.png"
                                                alt={item.usecase || 'Default Image'}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                //<CustomComponent useCases={useCases} />
                                <p>No use cases available.</p>
                            )}
                        </div>
                        <div className="container bg-white py-20">
                            {faqData && faqData.length > 0 ? (
                                <div className="container">
                                    <FAQSection faqData={faqData} faqName={'/embed'} />
                                </div>
                            ) : (
                                <p>No FAQ data available.</p>
                            )}
                        </div>
                        {getStartedData && getStartedData.length > 0 ? (
                            <div className="container">
                                <GetStarted data={getStartedData} isHero={'false'} />
                            </div>
                        ) : (
                            <p>No get started data available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default embed;
