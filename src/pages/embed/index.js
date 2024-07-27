// import TrustedBy from '@/components/trustedBy/trustedBy';
// import Link from 'next/link';
// import { getDbdashData } from '../api';
// import { MdArrowForward } from 'react-icons/md';
// import GetStarted from '@/components/getStarted/getStarted';
// import { FeaturesGrid } from '@/components/featureGrid/featureGrid';
// import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
// import FAQSection from '@/components/faqSection/faqSection';
// import Image from 'next/image';

// export async function getServerSideProps() {
//     const IDs = [
//         'tblogeya1',
//         'tblwql8n1',
//         'tblwoqytc',
//         'tblvgm05y',
//         'tblmsw3ci',
//         'tblsaw4zp',
//         'tblvo36my',
//         'tbl2bk656',
//         'tblnoi7ng',
//         'tblvu0f6w',
//     ];

//     const dataPromises = IDs.map((id) => getDbdashData(id));
//     const results = await Promise.all(dataPromises);

//     return {
//         props: {
//             products: results[0]?.data?.rows,
//             testimonials: results[1]?.data?.rows,
//             caseStudies: results[2]?.data?.rows,
//             getStartedData: results[3]?.data?.rows,
//             productData: results[4]?.data?.rows,
//             trustedData: results[5]?.data?.rows,
//             features: results[6]?.data?.rows,
//             metaData: results[7]?.data?.rows,
//             faqData: results[8]?.data?.rows,
//         },
//     };
// }

// const embed = ({ getStartedData, productData, metaData, faqData }) => {
//     return (
//         <>
//             <MetaHeadComp metaData={metaData} page={'/'} />
//             <div className="grid gap-20">
//                 <div className="bg-gray-100 flex justify-center py-10">
//                     <div className="flex flex-col md:flex-row w-full max-w-8xl bg-white rounded-lg shadow-lg overflow-hidden">
//                         <div className="w-full md:w-1/2 p-8">
//                             <h5 className="text-3xl font-bold mb-4">Embed</h5>
//                             <h1
//                                 className="text-7xl font-bold mb-8 width: Fill (1,440px)px;
// height: Hug (856px)px;
// padding: 120px 80px 120px 80px;
// gap: 40px;
// opacity: 0px;
// "
//                             >
//                                 Bring third-party app integration into your SaaS
//                             </h1>
//                             <p className="text-gray-700">
//                                 Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to
//                                 build custom designs without leaving your HTML.
//                             </p>
//                         </div>
//                         <div className="w-80 md:w-1/2 relative">
//                             <Image
//                                 src="/assets/img/embedfeature/EmbedHeroImage.png"
//                                 alt="Example Image"
//                                 layout="responsive"
//                                 width={500}
//                                 height={300}
//                                 objectFit="cover"
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-white py-20">
//                     {faqData && faqData.length > 0 && (
//                         <div className="container">
//                             <FAQSection faqData={faqData} faqName={'/index'} />
//                         </div>
//                     )}
//                 </div>
//                 {getStartedData && (
//                     <div className="container">
//                         <GetStarted data={getStartedData} isHero={'false'} />
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default embed;
import TrustedBy from '@/components/trustedBy/trustedBy';
import Link from 'next/link';
import { getDbdashData } from '../api';
import { MdArrowForward } from 'react-icons/md';
import GetStarted from '@/components/getStarted/getStarted';
import { FeaturesGrid } from '@/components/featureGrid/featureGrid';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
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
        'tblvu0f6w',
    ];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            products: results[0]?.data?.rows,
            testimonials: results[1]?.data?.rows,
            caseStudies: results[2]?.data?.rows,
            getStartedData: results[3]?.data?.rows,
            productData: results[4]?.data?.rows,
            trustedData: results[5]?.data?.rows,
            features: results[6]?.data?.rows,
            metaData: results[7]?.data?.rows,
            faqData: results[8]?.data?.rows,
        },
    };
}

const embed = ({ getStartedData, productData, metaData, faqData }) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <div className="grid gap-20">
                <div className="bg-gray-100 flex justify-center py-10">
                    <div className="flex flex-col md:flex-row w-full max-w-8xl bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="w-full md:w-1/2 p-10">
                            <h5 className="text-3xl font-bold mb-4">Embed</h5>
                            <h1 className="text-7xl font-bold mb-8">
                                Bring third-party app integration into your SaaS
                            </h1>
                            <p className="text-gray-700 text-xl">
                                With Viasocket embeding, your users can easily connect third party app with your SaaS
                                tools to automate tasks without leaving your platform
                            </p>
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
                <div className="bg-white py-20">
                    {faqData && faqData.length > 0 && (
                        <div className="container">
                            <FAQSection faqData={faqData} faqName={'/index'} />
                        </div>
                    )}
                </div>
                {getStartedData && (
                    <div className="container">
                        <GetStarted data={getStartedData} isHero={'false'} />
                    </div>
                )}
            </div>
        </>
    );
};

export default embed;
