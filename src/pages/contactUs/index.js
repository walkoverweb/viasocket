import { getDbdashData } from '../api';
import GetStarted from '@/components/getStarted/getStarted';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Image from 'next/image';

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

const Embed = ({ getStartedData, productData, metaData, faqData, useCases }) => {
    return (
        <>
            <div className="bg-white">
                <div className="container bg-white">
                    <MetaHeadComp metaData={metaData} page={'/'} />
                </div>

                {/* Centered Contact Us Section */}
                <div className="flex items-center justify-center ">
                    <div className="bg-white px-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left Box */}
                            <div className="flex flex-col justify-center bg-blue-100 p-4 rounded-lg">
                                <h1 className="text-2xl font-bold mb-2">Heading</h1>
                                <h2 className="text-xl text-gray-700">Subheading</h2>
                            </div>
                            {/* Right Box */}
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p>Right Box Content</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Embed;
