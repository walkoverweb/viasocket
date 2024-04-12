import ProductComp from '@/components/productComp/productComp';
import { getDbdashData } from './api';
import GetStarted from '@/components/getStarted/getStarted';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';
export async function getServerSideProps() {
    const IDs = ['tblsaw4zp', 'tblvgm05y', 'tblmsw3ci', 'tblvo36my', 'tbl2bk656'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            trustedBy: results[0].data.rows,
            getStartedData: results[1].data.rows,
            productData: results[2].data.rows,
            features: results[3].data.rows,
            metaData: results[4].data.rows,
        },
    };
}

const Flow = ({ trustedBy, getStartedData, productData, features, pathArray, metaData }) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/flow'} pathArray={pathArray} />
            <div>
                <div className="py-container container">
                    <h1 className="text-6xl">Let your apps talk</h1>
                    <h2 className="text-2xl">Automate mundane tasks with AI in few clicks</h2>
                </div>
                <div className="py-container container flex flex-col gap-9">
                    <h2 className="text-2xl font-bold">Explore topautomations for the software you use</h2>
                    <div className="flex flex-wrap gap-4">
                        {Array.from({ length: 19 }, (_, index) => (
                            <div key={index} className="flex items-center gap-2 bg-white w-fit p-3 rounded ">
                                <Image src={'https://placehold.co/40x40'} width={24} height={24} alt="ico" />
                                <span>Airtabe</span>
                                <MdClose />
                            </div>
                        ))}
                    </div>
                    <label className="input input-bordered flex items-center gap-2 w-1/3 h-auto p-2 bg-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input type="text" className="grow" placeholder="Search" />
                    </label>
                </div>
            </div>
            <div className="container my-24">
                {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
            </div>
        </>
    );
};
export default Flow;
