import ProductComp from '@/components/productComp/productComp';
import { getDbdashData } from './api';
import GetStarted from '@/components/getStarted/getStarted';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useEffect, useState } from 'react';
import { FeaturesGrid } from '@/components/featureGrid/featureGrid';

export async function getServerSideProps() {
    const IDs = ['tblsaw4zp', 'tblvgm05y', 'tblmsw3ci', 'tblvo36my', 'tbl2bk656'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`, apiHeaders);
    const apps = await response.json();

    return {
        props: {
            trustedBy: results[0].data.rows,
            getStartedData: results[1].data.rows,
            productData: results[2].data.rows,
            features: results[3].data.rows,
            metaData: results[4].data.rows,
            apps,
        },
    };
}

const Flow = ({ trustedBy, getStartedData, productData, features, pathArray, metaData, apps }) => {
    let pageData = productData.find((page) => page?.name?.toLowerCase() === 'newflow');
    const [slectedApps, setSelectedApps] = useState([]);
    const handleOnSelect = (item) => {
        setSelectedApps((prevSelectedApps) => [...prevSelectedApps, item]);
    };

    const handleGeneration = () => {};
    const removeAppFromArray = (indexToRemove) => {
        if (indexToRemove >= 0 && indexToRemove < slectedApps.length) {
            const newSelectedApps = slectedApps.filter((_, index) => index !== indexToRemove);
            setSelectedApps(newSelectedApps);
        }
    };

    useEffect(() => {
        if (apps.length > 0) {
            setSelectedApps(apps.slice(0, 5));
        }
    }, [apps]);
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/flow'} pathArray={pathArray} />
            <div>
                <div className="py-container container flex flex-col gap-14">
                    <div className="gap-4 flex flex-col md:w-2/3">
                        {pageData?.h1 && <h1 className="md:text-6xl text-4xl font-medium ">{pageData?.h1}</h1>}
                        {pageData?.h2 && <h2 className="text-2xl">{pageData?.h2}</h2>}
                    </div>

                    <div className=" flex flex-col gap-6">
                        <h2 className="text-2xl">Explore topautomations for the software you use</h2>
                        <div className="flex flex-wrap gap-4">
                            {slectedApps.map((app, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-white w-fit p-3 rounded cursor-pointer "
                                    >
                                        <Image src={app?.iconurl} width={24} height={24} alt="ico" />
                                        <span>{app?.name}</span>
                                        <MdClose
                                            className="text-gray-300 hover:text-gray-950"
                                            onClick={() => {
                                                removeAppFromArray(index);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <ReactSearchAutocomplete
                            items={apps}
                            className="lg:w-1/3 sm:w-2/3 w-full"
                            onSelect={handleOnSelect}
                            autoFocus
                        />
                        <button className="btn btn-primary w-fit btn-md rounded" onClick={handleGeneration}>
                            Generate recommendations by AI
                        </button>
                    </div>
                </div>
            </div>
            {features && <FeaturesGrid features={features} page={pathArray[1]} />}
            <div className="container my-24">
                {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
            </div>
        </>
    );
};
export default Flow;
