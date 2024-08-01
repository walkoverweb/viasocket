import TrustedBy from '@/components/trustedBy/trustedBy';
import Link from 'next/link';
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

const embed = ({ getStartedData, metaData, faqData, useCases }) => {
    const [hoveredTag, setHoveredTag] = useState(null);

    const images = {
        tag1: '/assets/img/embedfeature/libraries.svg',
        tag2: '/assets/img/embedfeature/mainflow.svg',
        tag3: '/assets/img/embedfeature/mainflow.svg',
        tag4: '/assets/img/embedfeature/mainflow.svg',
        tag5: '/assets/img/embedfeature/mainflow.svg',
        tag6: '/assets/img/embedfeature/mainflow.svg',
        tag7: '/assets/img/embedfeature/mainflow.svg',
        tag8: '/assets/img/embedfeature/mainflow.svg',
        tag9: '/public/assets/img/embedfeature/integrationtemplate.png',
        tag10: '/assets/img/embedfeature/mainflow.svg',
        tag11: '/assets/img/embedfeature/mainflow.svg',
        tag12: '/assets/img/embedfeature/mainflow.svg',
        tag13: '/assets/img/embedfeature/mainflow.svg',
        tag14: '/assets/img/embedfeature/scheduletask.svg',
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
        { id: 'tag14', label: 'Security and Compliances' },
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
            <div className="">
                <MetaHeadComp metaData={metaData} page={'/embed'} />
                {/* Hero Section */}
                <div className="container flex flex-col md:flex-row items-center justify-center gap-12  rounded-lg py-12">
                    <div className=" flex flex-col gap-5 w-full md:w-1/2   ">
                        <h5 className="text-2xl">Embed</h5>
                        <h1 className="text-4xl md:text-6xl font-bold ">
                            Bring third-party app integration into your SaaS
                        </h1>
                        <p className=" text-lg ">
                            With Viasocket embedding, your users can easily connect third-party apps with your SaaS
                            tools to automate tasks without leaving your platform.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="btn btn-accent ">Talk to us</button>
                            <button className="btn btn-accent btn-outline">See how it works</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-x-2	">
                                <MdAlarm className="text-xl text-gray-700" />
                                <span className="text-lg">30 Mins of code to bring embedding</span>
                            </div>
                            <div className="flex items-center gap-x-2	">
                                <MdTrendingUp className="text-xl text-gray-700" />
                                <span className="text-lg">Higher retention rate</span>
                            </div>
                            <div className="flex items-center gap-x-2	">
                                <MdShowChart className="text-xl text-gray-700" />
                                <span className="text-lg">Competitive benefit</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-[600px] md:w-1/2">
                        <Image
                            src="/assets/img/embedfeature/embedheroimage.svg"
                            alt="Embed hero image"
                            layout="responsive"
                            width={1200}
                            height={800}
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className="bg-white py-12">
                    <div className="container mx-auto flex flex-col md:flex-row ">
                        {/* Image Section */}
                        <div className="flex-1 flex items-center justify-center bg-white p-0 rounded-lg">
                            <img
                                src={images[hoveredTag] || '/assets/img/embedfeature/mainflow.svg'}
                                alt={hoveredTag || 'Default Image'}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Tags Section */}
                        <div className="flex-1 p-0 md:p-8 overflow-y-auto">
                            <ul className="gap-y-4">
                                {tags.map((tag) => (
                                    <li
                                        key={tag?.id}
                                        className={`cursor-pointer p-4 rounded border-b-4 border-gray-200 transition-all duration-300 flex items-center ${
                                            hoveredTag === tag?.id
                                                ? 'bg-gradient-to-r from-white via-Ivory-100 via-Ivory-300 to-Ivory-500 text-black shadow-lg'
                                                : 'bg-[#F6F4EE] text-gray-700 hover:bg-gray-300'
                                        }`}
                                        onMouseEnter={() => setHoveredTag(tag?.id)}
                                        onMouseLeave={() => setHoveredTag(null)}
                                    >
                                        <span className="flex-1 text-left md:text-center">{tag?.label}</span>
                                        {hoveredTag === tag?.id && (
                                            <span className="gap-2 w-3 h-3 rounded-full bg-black"></span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="container flex flex-col gap-9 py-24">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold">How it Works</h2>
                        <p className="">
                            20 Years in SaaS Taught Us: Integrations Are Vital & Often Tough <br />
                            With Embed, We Made Them Simple.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step) => (
                            <div key={step.number} className="flex flex-col gap-3 bg-white p-8 rounded">
                                <span className="text-3xl font-bold">{step.number}</span>
                                <h3 className="text-xl font-bold">{step?.title}</h3>
                                <p className="">{step?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upgrade Section */}
                <div className="gap-y-3 bg-white py-48">
                    <div className="container mx-auto flex flex-col gap-3">
                        <h2 className="text-3xl font-bold gap-3">Upgrade your SaaS today, 100% free</h2>
                        <p className="text-gray-700 gap-3">
                            Start using viaSocket Embed lifetime free for any 5 apps of your choice. We will begin
                            charging <br />
                            once you've found the tool beneficial and wish to extend its use to additional apps.
                        </p>
                        <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
                            <button className="bg-gray-500 text-white py-2 px-6 rounded flex items-center">
                                Talk to Us
                                <MdArrowForward />
                            </button>
                            <button className="bg-white text-gray-500 border border-gray-500 py-2 px-6 rounded flex items-center">
                                SignUp & Get Started
                                <MdArrowForward />
                            </button>
                            <Link href="/faq" className="text-blue-500 flex items-center">
                                FAQ <MdArrowForward />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Use Cases Section */}
                <div className="bg-[#F6F4EE] py-12">
                    <div className="container ">
                        <h1 className="text-3xl font-bold gap-y-4 gap-8">Usecases</h1>
                        {useCases &&
                            useCases.length > 0 &&
                            useCases.map((item, index) => (
                                <div className="flex flex-col md:flex-row gap-y-4" key={index}>
                                    {/* Content Section */}
                                    <div className="flex flex-col gap-y-3 w-full md:w-1/2 p-0 md:p-2">
                                        <div className="bg-white p-2 rounded-lg  grid gap-y-8">
                                            <h1 className="text-xl font-bold gap-y-2">
                                                {item?.usecase || 'Use Case Title Missing'}
                                            </h1>
                                            <p className="flex flex-col gap-y-3">
                                                {item?.description || 'Description not available'}
                                            </p>
                                            {item?.embedusecase?.features?.length > 0 &&
                                                item?.embedusecase?.features.map((feature, index2) => (
                                                    <div key={index2} className="bg-[#F6F4EE] p-4 gap-3 rounded-lg">
                                                        <h2 className="text-lg font-semibold gap-3">
                                                            {feature?.title || 'Feature Title Missing'}
                                                        </h2>
                                                        <p>
                                                            {feature?.description ||
                                                                'Feature description not available'}
                                                        </p>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Image Section */}
                                    <div className="w-full md:w-1/2 p-0 md:p-4 flex justify-center items-center">
                                        <img
                                            src={item?.image || '/assets/img/embedfeature/whatsappheaalthcare.png'}
                                            alt={item?.usecase || 'Default Image'}
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white py-12">
                    <div className="container">
                        {faqData && faqData?.length > 0 && <FAQSection faqData={faqData} faqName={'/embed'} />}
                    </div>
                </div>

                {/* Get Started Section */}
                {getStartedData && getStartedData.length > 0 && (
                    <div className="container">
                        <GetStarted data={getStartedData} isHero={'false'} />
                    </div>
                )}
            </div>
        </>
    );
};

export default embed;
