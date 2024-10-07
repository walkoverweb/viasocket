import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdClose, MdSearch, MdAutoAwesome } from 'react-icons/md';
import axios from 'axios';
import { getDbdashData } from './api/index';
import GetStarted from '@/components/getStarted/getStarted';
import { FeaturesGrid } from '@/components/featureGrid/featureGrid';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import BlogGrid from '@/components/blogGrid/blogGrid';
import ComboGrid from '@/components/integrationsComp/integrationsHero/comboGrid/comboGrid';
import fetchSearchResults from '@/utils/searchIntegrationApps';
import Industries from '@/assets/data/categories.json';
import { LinkButton } from '@/components/uiComponents/buttons';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import Autocomplete from 'react-autocomplete';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

const Index = ({
    testimonials,
    caseStudies,
    getStartedData,
    features,
    metaData,
    faqData,
    posts,
    navData,
    footerData,
    initialIndus,
}) => {
    const formattedIndustries = useMemo(() => Industries.industries.map((name, id) => ({ name, id: id + 1 })), []);
    const formattedDepartments = useMemo(() => Industries.departments.map((name, id) => ({ name, id: id + 1 })), []);

    const [indusSearchTerm, setIndusSearchTerm] = useState('');
    const [selectedIndus, setSelectedIndus] = useState(initialIndus);
    const [showIndusDropdown, setShowIndusDropdown] = useState(false);
    const [deptSearchTerm, setDeptSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [showDeptDropdown, setShowDeptDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApps, setSelectedApps] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [appLoading, setAppLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [combinationLoading, setCombinationLoading] = useState(true);
    const debounceValue = useDebounce(searchTerm, 300);
    const [renderCombos, setRenderCombos] = useState();
    const [showInput, setShowInput] = useState(false);
    const hasRunFirstEffect = useRef(false);
    const inputRef = useRef(null);

    const fetchAppsData = useCallback(async () => await fetchApps(), []);

    const filterSelectedApps = useCallback(
        (apps) => {
            return apps.filter(
                (app) => !selectedApps.some((selectedApp) => selectedApp.appslugname === app.appslugname)
            );
        },
        [selectedApps]
    );

    useEffect(() => {
        const fetchInitialApps = async () => {
            setSearchLoading(true);
            try {
                const apps = await fetchAppsData();
                setSearchData(filterSelectedApps(apps));
            } catch (error) {
                setAppLoading(false);
                console.error(error);
            } finally {
                setAppLoading(false);
                setSearchLoading(false);
            }
        };

        fetchInitialApps();
    }, [fetchAppsData, filterSelectedApps]);

    useEffect(() => {
        if (!hasRunFirstEffect.current && searchData.length > 0) {
            const initialApps = searchData.slice(0, 3);
            initialApps.forEach((app) => handleSelectApp(app.appslugname));
            hasRunFirstEffect.current = true;
        }
    }, [searchData]);

    useEffect(() => {
        if (hasRunFirstEffect.current && selectedApps.length === 3) {
            handleGenerate();
        }
    }, [selectedApps]);

    const handleSelectApp = (appName) => {
        const app = searchData.find((app) => app.appslugname === appName);
        if (app) {
            setSearchData((prev) => prev.filter((item) => item?.appslugname !== appName));
            setSelectedApps((prev) => [...prev, app]);
        }
        setSearchTerm('');
    };

    useEffect(() => {
        searchApps();
    }, [debounceValue]);

    const searchApps = async () => {
        if (debounceValue) {
            setSearchLoading(true);
            try {
                const result = await fetchSearchResults(debounceValue);
                setSearchData(filterSelectedApps(result));
            } catch (error) {
                console.error(error);
            } finally {
                setSearchLoading(false);
            }
        } else {
            const apps = await fetchAppsData();
            setSearchData(filterSelectedApps(apps));
        }
    };

    const removeAppFromArray = (indexToRemove) => {
        if (indexToRemove >= 0 && indexToRemove < selectedApps.length) {
            const appToRemove = selectedApps[indexToRemove];
            setSelectedApps((prev) => {
                const updatedSelectedApps = prev.filter((_, index) => index !== indexToRemove);
                if (updatedSelectedApps.length > 0 || selectedApps.length === 1) {
                    setSearchData((prevSearchData) => [appToRemove, ...filterSelectedApps(prevSearchData)]);
                }
                return updatedSelectedApps;
            });
        }
    };

    const handleGenerate = async () => {
        const selectedAppSlugs = selectedApps.map((app) => app.appslugname);
        setCombinationLoading(true);
        try {
            const combos = await fetchCombos(selectedAppSlugs, selectedIndus, selectedDept);
            setRenderCombos(combos?.data);
        } catch (error) {
            console.error('Error fetching combos:', error);
        } finally {
            setCombinationLoading(false);
        }
    };

    const handleSelectIndus = (val) => {
        setIndusSearchTerm('');
        setSelectedIndus(val);
        setShowIndusDropdown(false);
    };

    const filterIndustries = (searchTerm) => {
        return formattedIndustries.filter((industry) => industry.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const handleSelectDept = (val) => {
        setDeptSearchTerm('');
        setSelectedDept(val);
        setShowDeptDropdown(false);
    };

    const filterDepts = (searchTerm) => {
        return formattedDepartments.filter((industry) =>
            industry.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) => (prevIndex < searchData.length - 1 ? prevIndex + 1 : prevIndex));
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && highlightedIndex < searchData.length) {
                handleSelectApp(searchData[highlightedIndex].appslugname);
            }
        }
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <Navbar navData={navData} />
            <div className="grid gap-20">
                <div className="flex flex-col gap-16 container lg:pb-12 pt-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl font-medium flex gap-2 items-center">
                            <MdAutoAwesome color="#00ED64" /> AI First
                        </span>
                        <h1 className="md:text-6xl text-4xl font-medium">
                            Connect your favorite apps and automate your repetitive tasks
                        </h1>
                    </div>
                    <div className="p-8 bg-neutral rounded flex flex-col gap-9">
                        <div className="flex flex-wrap gap-2 items-center">
                            <h2 className="text-3xl">How</h2>
                            <div className="dropdown">
                                <h2
                                    onClick={() => {
                                        setShowIndusDropdown(true);
                                        setTimeout(() => {
                                            document.getElementById('indusAutoComplete').focus();
                                        }, 0);
                                    }}
                                    tabIndex={0}
                                    role="button"
                                    className="text-3xl underline decoration-dotted text-slate-500 decoration-slate-400 decoration-2 underline-offset-2 cursor-pointer dropdown"
                                >
                                    {selectedIndus || 'All'}
                                </h2>
                                {showIndusDropdown && (
                                    <div
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow industry-autocomplete"
                                    >
                                        <Autocomplete
                                            getItemValue={(item) => item.label}
                                            items={filterIndustries(indusSearchTerm).map((industry) => ({
                                                label: industry.name,
                                            }))}
                                            renderItem={(item) => (
                                                <div className="px-2 py-1 cursor-pointer hover:bg-secondary">
                                                    {item.label}
                                                </div>
                                            )}
                                            value={indusSearchTerm}
                                            onChange={(e) => setIndusSearchTerm(e.target.value)}
                                            onSelect={(val) => handleSelectIndus(val)}
                                            menuStyle={{
                                                position: 'flex',
                                                overflow: 'auto',
                                                maxHeight: '400px',
                                            }}
                                            inputProps={{ placeholder: 'Select Industry', id: 'indusAutoComplete' }}
                                        />
                                    </div>
                                )}
                            </div>

                            <h2 className="text-3xl">
                                industry {selectedIndus === 'All' ? 'are' : 'is'} automating with
                            </h2>
                            {appLoading ? (
                                <>
                                    {' '}
                                    {[...Array(3)].map((_, index) => (
                                        <div
                                            className="bg-white rounded  items-center flex w-[120px] gap-1 p-2 "
                                            key={index}
                                        >
                                            <div className="skeleton max-h-[17px] max-w-[17px] min-h-[17px] min-w-[16px] bg-gray-200 "></div>
                                            <div className="skeleton h-[12px] w-full bg-gray-200"></div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {selectedApps.map((app, index) => (
                                        <div
                                            className="flex items-center gap-2 bg-white w-fit px-2 py-1 rounded "
                                            key={app.appslugname}
                                        >
                                            <Image src={app?.iconurl} width={16} height={16} alt="ico" />
                                            <span>{app?.name}</span>
                                            <MdClose
                                                className="text-gray-300 hover:text-gray-950 cursor-pointer"
                                                onClick={() => removeAppFromArray(index)}
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                            {showInput ? (
                                <div className="w-[300px] transition-all duration-300 relative bg-white dropdown">
                                    <label
                                        className="input input-sm border-[#CCCCCC] flex items-center gap-2 bg-white rounded"
                                        tabIndex={0}
                                        role="button"
                                    >
                                        <MdSearch color="#CCCCCC" fontSize={20} />
                                        <input
                                            type="text"
                                            className="grow"
                                            placeholder="Add a new app"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            ref={inputRef}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <span
                                            className="btn icon border-none bg-transparent p-0"
                                            onClick={() => {
                                                setSearchTerm('');
                                                setShowInput(false);
                                            }}
                                        >
                                            <MdClose color="black" fontSize={24} />
                                        </span>
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu flex-nowrap bg-base-100 shadow-xl mt-2 z-[1] rounded max-h-[290px] w-[300px] overflow-scroll p-0"
                                    >
                                        {searchLoading ? (
                                            [...Array(12)].map((_, index) => (
                                                <div
                                                    className="rounded-none bg-white px-3 py-2 flex w-full"
                                                    key={index}
                                                >
                                                    <div className="w-[280px] skeleton bg-slate-100 rounded-none"></div>
                                                </div>
                                            ))
                                        ) : (
                                            <>
                                                {searchData && searchData.length > 0 ? (
                                                    searchData.map((app, index) => (
                                                        <div
                                                            key={app.appslugname}
                                                            className={`flex items-center gap-2 px-3 py-2 cursor-pointer w-full ${
                                                                index === highlightedIndex ? 'bg-gray-200' : 'bg-white'
                                                            } hover:bg-gray-100`}
                                                            onClick={() => handleSelectApp(app?.appslugname)}
                                                            onMouseEnter={() => setHighlightedIndex(index)}
                                                        >
                                                            <Image
                                                                src={app?.iconurl}
                                                                width={16}
                                                                height={16}
                                                                alt="ico"
                                                            />
                                                            <span>{app?.name}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="flex items-center gap-2 bg-white px-3 py-2 w-full">
                                                        No app found.
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </ul>
                                </div>
                            ) : (
                                <span
                                    onClick={() => setShowInput(true)}
                                    className="p-0 flex items-center justify-center bg-primary w-[30px] h-[30px] rounded"
                                >
                                    <MdAdd color="white" fontSize={24} />
                                </span>
                            )}

                            <h2 className="text-3xl">in</h2>

                            <div className="dropdown">
                                <h2
                                    onClick={() => {
                                        setShowDeptDropdown(true);
                                        setTimeout(() => {
                                            document.getElementById('deptAutoComplete').focus();
                                        }, 0);
                                    }}
                                    tabIndex={0}
                                    role="button"
                                    className="text-3xl underline decoration-dotted  text-slate-500 decoration-slate-400 decoration-2 underline-offset-2 cursor-pointer dropdown"
                                >
                                    {selectedDept || 'all their'}
                                </h2>
                                {showDeptDropdown && (
                                    <div
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow industry-autocomplete"
                                    >
                                        <Autocomplete
                                            getItemValue={(item) => item.label}
                                            items={filterDepts(deptSearchTerm).map((dept) => ({
                                                label: dept.name,
                                            }))}
                                            renderItem={(item) => (
                                                <div className="px-2 py-1 cursor-pointer hover:bg-secondary">
                                                    {item.label}
                                                </div>
                                            )}
                                            value={deptSearchTerm}
                                            onChange={(e) => setDeptSearchTerm(e.target.value)}
                                            onSelect={(val) => handleSelectDept(val)}
                                            inputProps={{ placeholder: 'Select Department', id: 'deptAutoComplete' }}
                                            menuStyle={{
                                                position: 'flex',
                                                overflow: 'auto',
                                                maxHeight: '400px',
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <h2 className="text-3xl" id="dept">
                                department
                            </h2>
                            <div
                                className={
                                    selectedApps.length < 2 ? 'tooltip tooltip-error tooltip-top text-white' : ''
                                }
                                data-tip="Select at least 2 apps to search automations"
                            >
                                <button
                                    disabled={selectedApps.length < 2}
                                    onClick={handleGenerate}
                                    className="btn btn-accent h-[30px] w-auto flex items-center justify-center rounded btn-sm border border-black"
                                >
                                    Search Automations
                                </button>
                            </div>
                        </div>
                        <ComboGrid combos={renderCombos} loading={combinationLoading} showNoData />
                    </div>
                </div>
                {features && <FeaturesGrid features={features} page={'overall'} />}
                <div className="container my-a12">
                    <TestimonialsSection testimonials={testimonials} />
                </div>
                <div className="container my-12">
                    <CaseStudiesSection caseStudies={caseStudies} />
                </div>
                {posts?.length > 0 && (
                    <div className="container gap-12">
                        <BlogGrid posts={posts} />
                    </div>
                )}
                {faqData?.length > 0 && <FAQSection faqData={faqData} faqName={'/index'} />}
                {getStartedData && (
                    <div className="container">
                        <GetStarted data={getStartedData} isHero={'false'} />
                    </div>
                )}
            </div>

            <Footer footerData={footerData} />
        </>
    );
};

const TestimonialsSection = ({ testimonials }) => (
    <div className="flex flex-col gap-9">
        <h2 className="md:text-6xl text-4xl font-medium">What clients says</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {testimonials.map((testimonial, index) => (
                <div className="flex flex-col rounded-md p-8 gap-8 bg-neutral" key={index}>
                    <p className="font-inter text-lg font-normal leading-[32px] tracking-normal text-left">
                        " {testimonial?.testimonial}"
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                        <Image
                            className="rounded-full"
                            src={testimonial?.client_img[0]}
                            width={36}
                            height={36}
                            alt={testimonial?.given_by}
                        />
                        <div>
                            <p className="font-inter font-semibold leading-4 tracking-normal text-left">
                                {testimonial?.given_by}
                            </p>
                            <p className="font-inter text-sm font-normal leading-4 tracking-normal text-left pt-1 text-gray-400">
                                {testimonial?.giver_title}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const CaseStudiesSection = ({ caseStudies }) => (
    <div className="flex flex-col gap-9">
        <h2 className="md:text-6xl text-4xl font-medium">Client Stories</h2>
        <div className="grid grid-rows-6 grid-cols-6 gap-6 container lg:max-h-[550px] md:max-h-[700px] max-h-[1200px]">
            {caseStudies.map((caseStudy, index) => (
                <CaseStudyLink key={index} caseStudy={caseStudy} />
            ))}
        </div>
    </div>
);

const CaseStudyLink = ({ caseStudy }) => {
    const isPriority = caseStudy?.priority === '1';
    return (
        <div
            aria-label="casestudy"
            className={` bg-neutral flex rounded-md overflow-hidden col-span-6 row-span-2    ${
                isPriority
                    ? 'lg:col-span-3 lg:row-span-6 lg:flex-col flex-col md:flex-row col-span-6 row-span-2'
                    : 'lg:col-span-3 lg:row-span-3 md:flex-row flex-col'
            }`}
        >
            <>
                <div className=" casestudy_img overflow-hidden w-full h-full ">
                    <Image
                        className="h-full w-full"
                        src={caseStudy?.image[0]}
                        width={1080}
                        height={1080}
                        alt={caseStudy?.title}
                    />
                </div>
                <div className="w-full p-3 bg-neutral flex flex-col gap-3 justify-center">
                    <p>{caseStudy?.title}</p>
                    <LinkButton href={caseStudy?.link} title={'Read More'} />
                </div>
            </>
        </div>
    );
};

export default Index;

export async function getServerSideProps() {
    const IDs = [
        'tblwql8n1', // testimonials: results[0]
        'tblwoqytc', // caseStudies: results[1]
        'tblvgm05y', // getStartedData: results[2]
        'tblvo36my', // features: results[3]
        'tbl2bk656', // metaData: results[4]
        'tblnoi7ng', // faqData: results[5]
        'tbl7lj8ev', // navData: results[6]
        'tbl6u2cba', // footerData: results[7]
    ];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const tag = 'via-socket';
    const defaultTag = 'integrations';
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
    );
    const posts = await res.data;

    const randomIndex = Math.floor(Math.random() * Industries.industries.length);
    const initialIndus = Industries.industries[randomIndex];

    return {
        props: {
            testimonials: results[0]?.data?.rows,
            caseStudies: results[1]?.data?.rows,
            getStartedData: results[2]?.data?.rows,
            features: results[3]?.data?.rows,
            metaData: results[4]?.data?.rows,
            faqData: results[5]?.data?.rows,
            navData: results[6]?.data?.rows,
            footerData: results[7]?.data?.rows,
            posts: posts,
            initialIndus,
        },
    };
}

async function fetchApps(category) {
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=50${category && category !== 'All' ? `&category=${category}` : ''}`,
        apiHeaders
    );
    const rawData = await response.json();
    return rawData?.data;
}

async function fetchCombos(pathArray, industry, department) {
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/services?${pathArray.map((service) => `service=${service}`).join('&')}&industry=${industry && industry.toLowerCase()}&department=${department && department !== 'All' && department.toLowerCase()}`,
        apiHeaders
    );
    const responseData = await response.json();
    return responseData;
}
