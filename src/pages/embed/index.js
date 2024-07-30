import TrustedBy from '@/components/trustedBy/trustedBy';
import Link from 'next/link';
import Head from 'next/head';
import HowItWorks from './howItWorks';
import { getDbdashData } from '../api';
import { MdArrowForward } from 'react-icons/md';
import GetStarted from '@/components/getStarted/getStarted';
import { FeaturesGrid } from '@/components/featureGrid/featureGrid';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import Image from 'next/image';
import UpgradeSaas from './saas';
import TagImageDisplay from './features';
import { MdAlarm, MdTrendingUp, MdShowChart } from 'react-icons/md';
import CustomComponent from './embedUsecases';

export async function getServerSideProps() {
    const IDs = [
        'tblogeya1',
        'tblwql8n1',
        'tblwoqytc',
        'tblvgm05y',
        'tblmsw3ci',
        'tblsaw4zp',
        'tblvo36my',
        'tbl2bk656',
        'tblnoi7ng',
        'tbld6tbln',
    ];

    try {
        const dataPromises = IDs.map((id) => getDbdashData(id));
        const results = await Promise.all(dataPromises);

        // Validate results
        const validateData = (data) => data?.data?.rows || [];

        return {
            props: {
                products: validateData(results[0]),
                testimonials: validateData(results[1]),
                caseStudies: validateData(results[2]),
                getStartedData: validateData(results[3]),
                productData: validateData(results[4]),
                trustedData: validateData(results[5]),
                features: validateData(results[6]),
                metaData: validateData(results[7]),
                faqData: validateData(results[8]),
                useCases: validateData(results[9]),
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                products: [],
                testimonials: [],
                caseStudies: [],
                getStartedData: [],
                productData: [],
                trustedData: [],
                features: [],
                metaData: [],
                faqData: [],
                useCases: [],
            },
        };
    }
}

const embed = ({ getStartedData, productData, metaData, faqData, useCases }) => {
    return (
        <>
            <div className="bg-white">
                <div className="container bg-white">
                    <MetaHeadComp metaData={metaData} page={'/'} />
                    <div className="container grid gap-20">
                        <div className=" flex justify-center py-10">
                            <div className="flex flex-col md:flex-row w-full max-w-8xl bg-white rounded-lg shadow-lg overflow-hidden">
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
                                        <button className="bg-gray-500 text-white py-2 px-8 rounded shadow">
                                            Talk to us
                                        </button>
                                        <button className="bg-white text-gray py-2 px-8 rounded shadow border border-gray-700">
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
                            <TagImageDisplay />
                        </div>
                        <div className="container  flex items-center justify-center bg-white">
                            <HowItWorks />
                        </div>
                        <div className="container flex items-center justify-center bg-white py-28">
                            <UpgradeSaas />
                        </div>
                        <div className="  bg-white">
                            <h1 className="text-3xl font-bold p-2 ">Usecases</h1>
                            {useCases && useCases.length > 0 ? (
                                <CustomComponent useCases={useCases} />
                            ) : (
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
