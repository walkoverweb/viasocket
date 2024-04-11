import { getDbdashData } from './api';
import AgencyList from '@/components/agencyList/agnecyList';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { MdArticle, MdChevronRight, MdOutlineArticle } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';

export async function getServerSideProps() {
    const IDs = ['tblajmg8e', 'tblmsw3ci', 'tbl2bk656', 'tblirrj24'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            agencies: results[0].data.rows,
            rawPageData: results[1].data.rows,
            metaData: results[2].data.rows,
            expertsHelp: results[3].data.rows,
        },
    };
}

const Experts = ({ agencies, rawPageData, pathArray, metaData, expertsHelp }) => {
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

            <div className="">
                <div className="grid gap-9 md:w-5/6 w=1/1 py-24 container">
                    {pageData?.h3 && <h3 className="text-2xl">{pageData?.h3}</h3>}
                    {pageData?.h1 && <h1 className="md:text-6xl text-4xl font-medium ">{pageData?.h1}</h1>}
                    {pageData?.h2 && <h3 className="text-2xl">{pageData?.h2}</h3>}
                </div>

                <div className="flex flex-col gap-9 py-24 container">
                    <h2 className="text-3xl font-semibold ">Verified automation agencies by viaSocket</h2>
                    {verifiedArr.length > 0 && <AgencyList agencies={verifiedArr} type={'verified'} />}
                </div>
                <div className="flex flex-col gap-9 py-24 container">
                    <h2 className="text-3xl font-semibold ">Non-verified automation agencies</h2>
                    {nonVerifiedArr.length > 0 && <AgencyList agencies={nonVerifiedArr} type={'nonverified'} />}
                </div>
                <div className="py-24  bg-white">
                    <div className="container flex flex-col gap-9 ">
                        <h2 className="text-3xl font-semibold ">
                            Register your agency as our verified <br />
                            Experts for automations.
                        </h2>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-9 w-1/2 h-full justify-center">
                                <p>
                                    As a viaSocket expert, you'll empower clients with tailor-made automation solutions,
                                    training, and unwavering support every step of the way. 
                                    <br />
                                    <br />
                                    With viaSocket in your arsenal, you can design, implement, and maintain innovative
                                    solutions, ensuring you and your clients stay ahead of the curve. 
                                    <br />
                                    <br />
                                    Let your agency's knowledge and skills set the foundation for countless success
                                    stories.
                                </p>
                                <Link target="_blank" href="https://calendly.com/rpaliwal71/15-mins?month=2024-03">
                                    <button className="btn btn-md btn-accent rounded-sm w-fit">Be an Expert</button>
                                </Link>
                            </div>
                            <Image
                                src={'https://placehold.co/600x600'}
                                className="w-auto max-w-1/2 h-full max-h-[500px]"
                                width={1080}
                                height={1080}
                                alt="be an expert image"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-9 my-24 container">
                    <h2 className="text-3xl font-semibold">How experts can help?</h2>
                    <div className="mt-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center md:justify-start gap-6">
                        {expertsHelp &&
                            expertsHelp.map((expertsHelpBlog, index) => {
                                return (
                                    <div key={index} className="flex flex-col gap-4 bg-white p-6 rounded-md">
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
        </>
    );
};
export default Experts;
