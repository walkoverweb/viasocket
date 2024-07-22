import { getDbdashData } from './api';
import GetStarted from '@/components/getStarted/getStarted';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { FeaturesGrid } from '@/components/featureGrid/featureGrid';
import ComboGrid from '@/components/comboGrid/comboGrid';
import Industries from '@/assets/data/categories.json';
import Autocomplete from 'react-autocomplete';
import FAQSection from '@/components/faqSection/faqSection';
import { getBlogs } from '@/utils/getBlogs';

const Flow = ({ getStartedData, features, pathArray, metaData, apps, faqData, blogs }) => {
    if (apps.length > 0) {
        const [slectedApps, setSelectedApps] = useState([]);
        const [slectedIndus, setSelectedIndus] = useState();
        const [comboData, setComboData] = useState();
        const [loading, setLoading] = useState(false);
        const [showNoData, setShowNoData] = useState(false);
        const [evalue, setEvalue] = useState('');
        const [filterredApps, setFilterredApps] = useState([]);

        const handleIndusSelect = (item) => {
            if (item && item !== 'Select your industry') {
                setSelectedIndus(item);
            }
            setShowNoData(false);
        };

        const handleGeneration = async () => {
            setLoading(true);
            setShowNoData(true);
            const serviceParams = slectedApps.map((app) => app?.appslugname);

            const appQureyString = serviceParams.map((service) => `service=${service}`).join('&');
            let indusQureyString = '';
            if (slectedIndus) {
                indusQureyString = `industry=${slectedIndus.toLowerCase()}`;
            }

            const queryString = `${appQureyString}${appQureyString && indusQureyString && '&'}${indusQureyString}`;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/services?${queryString}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
                    },
                }
            );

            const data = await response.json();
            if (data?.data) {
                setComboData(data?.data);
            }
            setLoading(false);
        };

        const removeAppFromArray = (indexToRemove) => {
            if (indexToRemove >= 0 && indexToRemove < slectedApps.length) {
                const newSelectedApps = slectedApps.filter((_, index) => index !== indexToRemove);
                setSelectedApps(newSelectedApps);
            }
        };

        const formattedIndustries = Industries.industries.map((name, id) => ({ name: name, id: id + 1 }));

        const handleSelect = (val) => {
            const filterApp = apps.find((app) => app.name === val);
            setSelectedApps((prevValues) => [...prevValues, filterApp]);
        };

        useEffect(() => {
            if (evalue) {
                const filtered = apps.filter(
                    (app) =>
                        app.name?.toLowerCase().includes(evalue.toLowerCase()) &&
                        !slectedApps.some((eapp) => eapp.name === app.name)
                );
                setFilterredApps(filtered);
            } else {
                const filtered =
                    apps.length > 0 && apps.filter((app) => !slectedApps.some((eapp) => eapp.name === app.name));
                setFilterredApps(filtered);
            }
        }, [evalue, apps, slectedApps]);

        return (
            <>
                <MetaHeadComp metaData={metaData} page={'/flow'} pathArray={pathArray} />
                <div>
                    <div className="py-container container flex flex-col gap-14">
                        <div className="gap-4 flex flex-col md:w-2/3">
                            <h1 className="md:text-6xl text-4xl font-bold ">
                                Ask AI to find out all the <span className="text-link"> automation </span>use cases
                                tailored for your business
                            </h1>
                        </div>

                        <div className=" flex flex-col gap-8">
                            <h2 className="text-3xl font-semibold flex flex-col sm:flex-row  sm:items-center items-start gap-2">
                                What Apps do you use?
                            </h2>
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
                            <div className="flex  md:gap-8 gap-4 md:w-2/3 w-full flex-col sm:flex-row">
                                <div className="react-select-cont  w-full bg-white border rounded-sm">
                                    <Autocomplete
                                        className="hello"
                                        getItemValue={(item) => item.name}
                                        value={evalue}
                                        onChange={(e) => {
                                            setEvalue(e.target.value);
                                        }}
                                        items={filterredApps}
                                        renderItem={(item) => (
                                            <div className="react-autosuggest-item">
                                                <img src={item.iconurl} />
                                                {item.name}
                                            </div>
                                        )}
                                        inputProps={{ placeholder: 'Select Apps' }}
                                        placeholder="selects"
                                        onSelect={handleSelect}
                                        menuStyle={{
                                            background: 'white',
                                            width: 'fit-content',
                                            zIndex: '400',
                                            top: '50px',
                                            left: '0px',
                                            position: 'absolute',
                                            overflow: 'auto',
                                            maxHeight: '600px',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                </div>
                                <select
                                    placeholder="Select an industry"
                                    className="select select-bordered rounded-sm w-full bg-white"
                                    onChange={(e) => handleIndusSelect(e.target.value)} // Fixing the onChange handler
                                >
                                    <option value="">Select your industry</option>
                                    {formattedIndustries.length > 0 &&
                                        formattedIndustries.map((indus, index) => {
                                            return (
                                                <option key={index}>{indus.name}</option> // Adding a unique key prop
                                            );
                                        })}
                                </select>
                            </div>

                            <button
                                className="btn btn-accent w-fit btn-md  rounded"
                                onClick={handleGeneration}
                                disabled={slectedApps.length < 2}
                            >
                                {loading ? 'Loading...' : 'Ask AI'}
                            </button>
                        </div>
                        <ComboGrid combos={comboData} loading={loading} showNoData={showNoData} />
                    </div>
                </div>
                {features && <FeaturesGrid features={features} page={pathArray[1]} />}
                <div className="bg-white py-20 mt-20">
                    {faqData && faqData.length > 0 && (
                        <div className="container">
                            <FAQSection faqData={faqData} faqName={'/flow'} />
                        </div>
                    )}
                </div>
                <div className="container my-24">
                    {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
                </div>
            </>
        );
    }
};
export default Flow;

export async function getServerSideProps() {
    const IDs = ['tblsaw4zp', 'tblvgm05y', 'tblmsw3ci', 'tblvo36my', 'tbl2bk656', 'tblnoi7ng'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`, apiHeaders);
    const apps = await response.json();

    const tag = 'viaSocket';
    const blogs = getBlogs(tag);

    return {
        props: {
            trustedBy: results[0].data.rows,
            getStartedData: results[1].data.rows,
            productData: results[2].data.rows,
            features: results[3].data.rows,
            metaData: results[4].data.rows,
            faqData: results[5].data.rows,
            apps,
            blogs,
        },
    };
}
