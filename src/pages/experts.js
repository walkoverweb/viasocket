import { getDbdashData } from './api';
import AgencyList from '@/components/agencyList/agnecyList';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { MdArticle, MdChevronRight, MdOutlineArticle } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';

export async function getServerSideProps() {
    const IDs = ['tblajmg8e', 'tblmsw3ci', 'tbl2bk656', 'tblirrj24', 'tbl7lj8ev', 'tbl6u2cba'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            agencies: results[0].data.rows,
            rawPageData: results[1].data.rows,
            metaData: results[2].data.rows,
            expertsHelp: results[3].data.rows,
            navData: results[4]?.data?.rows,
            footerData: results[5]?.data?.rows,
        },
    };
}

const Experts = ({ agencies, rawPageData, pathArray, metaData, expertsHelp, navData, footerData }) => {
    let pageData = rawPageData.find((page) => page?.name?.toLowerCase() === pathArray[1]);

    let verifiedArr = [];
    let nonVerifiedArr = [];

    // Iterate through the objects and categorize them
    if (agencies.length > 0) {
        agencies.forEach((obj) => {
            switch (obj.verified) {
                case true:
                    verifiedArr.push(obj);
                    break;

                default:
                    nonVerifiedArr.push(obj);
                    break;
            }
        });
    }
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/experts'} pathArray={pathArray} />
            <div className="pt-12">
                <Navbar navData={navData} utm={'/experts'} />
            </div>
            <div className="">
                <div className=" py-container container">
                    <div className="flex flex-col gap-9 md:w-2/3 w-full">
                        {pageData?.h3 && <h3 className="text-2xl">{pageData?.h3}</h3>}
                        {pageData?.h1 && <h1 className="md:text-6xl text-4xl font-medium ">{pageData?.h1}</h1>}
                        {pageData?.h2 && <h3 className="text-2xl">{pageData?.h2}</h3>}
                    </div>
                </div>

                <div className="flex flex-col gap-9 py-container container">
                    <h2 className="text-3xl font-semibold ">Verified automation agencies by viaSocket</h2>
                    {verifiedArr.length > 0 && <AgencyList agencies={verifiedArr} type={'verified'} />}
                </div>
                <div className="flex flex-col gap-9 py-container container">
                    <h2 className="text-3xl font-semibold ">Non-verified automation agencies</h2>
                    {nonVerifiedArr.length > 0 && <AgencyList agencies={nonVerifiedArr} type={'nonverified'} />}
                </div>
                <div className="py-container  bg-white">
                    <div className="container flex flex-col gap-9 ">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-12 justify-between items-center">
                            <div className="flex flex-col gap-9  h-full justify-center">
                                <h2 className="text-3xl font-semibold ">
                                    Register your agency as our verified <br />
                                    Experts for automations.
                                </h2>
                                <ul className="list-disc flex flex-col gap-3 ps-4">
                                    <li>Lifetime free access To viasocket’s Team Plan with all advanced features</li>
                                    <li>Assistance in creating and troubleshooting complex workflows</li>
                                    <li>
                                        Customized Training sessions tailored to your specific needs and skill level
                                    </li>
                                    <li>Free access to our comprehensive educational resources</li>
                                    <li>Get your requested plugin live within 48 hours</li>
                                    <li>
                                        Showcase your expertise to a global audience by being featured on our dedicated
                                        Expert page
                                    </li>
                                    <li>
                                        Leverage our extensive network and client base to receive valuable referrals
                                    </li>
                                    <li>Offer your clients free credits worth your service charges.</li>
                                </ul>
                                <Link target="_blank" href="https://calendly.com/rpaliwal71/15-mins?month=2024-03">
                                    <button className="btn btn-md btn-accent w-fit">Be an Expert</button>
                                </Link>
                            </div>
                            <Image
                                src={'/assets/img/expertpage.png'}
                                className=""
                                width={1080}
                                height={1080}
                                alt="be an expert image"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-9 py-container container">
                    <h2 className="text-3xl font-semibold">How experts can help?</h2>
                    <div className="mt-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center md:justify-start gap-6">
                        {expertsHelp &&
                            expertsHelp.map((expertsHelpBlog, index) => {
                                return (
                                    <div key={index} className="flex flex-col gap-4 bg-white p-6 ">
                                        <MdOutlineArticle color="#8F9396" fontSize={36} />
                                        <p className="text-xl ">{expertsHelpBlog?.description}</p>
                                        {expertsHelpBlog?.link && (
                                            <Link
                                                href={expertsHelpBlog?.link}
                                                className="flex items-center mt-auto text-[#4485F2]"
                                            >
                                                Learn More <MdChevronRight fontSize={22} />
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="container py-16">
                <Footer footerData={footerData} />
            </div>
        </>
    );
};
export default Experts;
