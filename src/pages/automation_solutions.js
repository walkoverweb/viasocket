import Navbar from '@/components/navbar/navbar';
import { NAVIGATION_FIELDS } from '@/const/fields';
import { getNavData } from '@/utils/getData';
import { CgArrowTopRight } from 'react-icons/cg';
export default function AutomationSuggestions({ navData }) {
    return (
        <div className="flex flex-col h-fit md:h-screen">
            <div className="container pb-2">
                <Navbar navData={navData} utm={'/index'} />
            </div>

            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                <div className="w-full md:w-1/2 py-10 md:py-0 px-10 flex flex-col justify-center bg-gradient-to-l from-[#def9f0] to-[#def9f0]">
                    <h1 className="h1 text-black">
                        I use <span className="text-gray-400">App</span>
                    </h1>
                    <h2 className="h1 text-black mt-4">
                        We’re in the <span className="text-gray-400">Industry type</span>
                    </h2>
                    <h3 className="h1 text-black mt-4">
                        I run <span className="text-gray-400">domain.com</span>
                    </h3>

                    <textarea
                        className="mt-6 p-4 w-full h-[150px] input input-bordered"
                        placeholder="eg: I run an eCommerce website and manage sales on Shopify and use Notion for database."
                    ></textarea>
                    <div className="flex justify-end items-center p-2">
                        <button className="btn btn-outline bg-black text-white">Generate</button>
                    </div>
                </div>

                <div className="w-full md:w-1/2 bg-gray-100 pt-10 flex flex-col overflow-y-auto ">
                    <div className="flex-grow px-6">
                        {['eCommerce', 'Healthcare', 'Healthcare', 'Healthcare'].map((category, index) => (
                            <div key={index} className="p-2 border-b border-gray-300">
                                <h2 className="text-gray-500 font-semibold">{category}</h2>
                                <div className="mt-4 space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center space-x-3">
                                            <span className="text-black  text-sm xl:text-lg flex items-center  xl:leading-10">
                                                <img src="/shopify.svg" alt="Shopify" className="h-5 w-5 mr-2" />
                                                <img src="/notion.svg" alt="Notion" className="h-5 w-5 mr-2" />
                                                Add new Shopify orders to Notion as database items
                                            </span>
                                            <span className="text-gray-400 flex justify-center items-center text-xs sm:text-sm cursor-pointer">
                                                Try it <CgArrowTopRight />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full py-4 px-6 bg-gray-200 sticky bottom-0">
                        <button className="btn btn-outline bg-red-700 text-white">
                            Add Todo <CgArrowTopRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    return {
        props: {
            navData: navData,
        },
    };
}
