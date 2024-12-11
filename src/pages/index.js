import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { MdClose, MdSearch, MdArrowForward, MdOutlineAutoAwesome, MdArrowOutward } from 'react-icons/md';
import axios from 'axios';
import { getDbdashData } from './api/index';
import GetStarted from '@/components/getStarted/getStarted';
import { FeaturesGrid } from '@/components/featureGrid/featureGrid';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import BlogGrid from '@/components/blogGrid/blogGrid';
import ComboGrid from '@/components/integrationsComp/integrationsHero/comboGrid/comboGrid';
import Industries from '@/assets/data/categories.json';
import { LinkButton } from '@/components/uiComponents/buttons';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import Autocomplete from 'react-autocomplete';
import AlphabeticalComponent from '@/components/alphabetSort/alphabetSort';
import searchApps from '@/utils/searchApps';

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
        filterApps();
    }, [debounceValue]);

    const filterApps = async () => {
        if (debounceValue) {
            setSearchLoading(true);
            try {
                const result = await searchApps(debounceValue);
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
            <div
                className="w-full  h-dvh min-h-fit py-10  hero_gradint"
                style={{ background: 'url(/assets/img/gradientHero.svg) center/cover' }}
            >
                <div className="container h-full flex flex-col">
                    <Navbar navData={navData} utm={'/index'} />
                    <div className=" flex flex-col mt-auto  cont__gap">
                        <div className="md:flex-row flex-col gap-20 text-center md:text-start items-center flex justify-between ">
                            <div className="md:w-3/5 flex flex-col items-center md:items-start gap-8 py-20">
                                <div className="flex flex-col gap-1">
                                    <h1 className="h1 text-black">
                                        <span className="text-accent">Connect</span> your favorite apps and automate
                                        your repetitive tasks
                                    </h1>
                                    <h2 className="sub__h1 text-black">
                                        Discover Top Solutions for Effortless Connectivity.
                                    </h2>
                                </div>
                                <LinkButton
                                    content={'Get Started'}
                                    customClasses={'btn btn-accent btn-lg'}
                                    href={'/signup?utm_source=/index'}
                                />
                            </div>
                            {/* <div className="flex items-center gap-2 w-fit">
                            <Image
                                src={'/assets/img/chat_expert.jpeg'}
                                width={100}
                                height={100}
                                className="h-11 w-11 rounded-full border-white border-2"
                                alt="Chat Experts"
                            />
                            <div className="text-white text-start">
                                <p className="text-sm uppercase tracking-wider">Need to automate ?</p>
                                <span className="flex items-center text-gray-300">
                                    <span className="text-sm tracking-wider">Ask a Specialist for Free </span>
                                    <MdArrowOutward />
                                </span>
                            </div>
                        </div> */}
                        </div>
                        {/* <div className="flex items-center justify-center w-full">
                        <a className="version-link">Latest Version out !</a>
                    </div> */}
                    </div>
                </div>
            </div>
            <div className=" cont cont__py gap-36">
                <div className="container flex flex-col gap-4 ">
                    <h2 className="h1">For Example</h2>

                    <div className="gap-6 flex flex-col">
                        <div className="flex flex-wrap gap-2 items-center ">
                            <h3 className="">How</h3>
                            <div className="dropdown">
                                <h3
                                    onClick={() => {
                                        setShowIndusDropdown(true);
                                        setTimeout(() => {
                                            document.getElementById('indusAutoComplete').focus();
                                        }, 0);
                                    }}
                                    tabIndex={0}
                                    role="button"
                                    className=" cursor-pointer dropdown underline text-accent"
                                >
                                    {selectedIndus || 'All'}
                                </h3>
                                {showIndusDropdown && (
                                    <div
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100  z-[1] w-52 p-2 shadow industry-autocomplete"
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

                            <h3 className="">industry {selectedIndus === 'All' ? 'are' : 'is'} automating with</h3>
                            {appLoading ? (
                                <>
                                    {' '}
                                    {[...Array(3)].map((_, index) => (
                                        <div className="bg-white   items-center flex w-[120px] gap-1 p-2 " key={index}>
                                            <div className="skeleton max-h-[17px] max-w-[17px] min-h-[17px] min-w-[16px] bg-gray-200 "></div>
                                            <div className="skeleton h-[12px] w-full bg-gray-200"></div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {selectedApps.map((app, index) => (
                                        <div
                                            className="flex items-center gap-2 bg-[#FAFAFA] w-fit px-2 h-[42px] border border-black  "
                                            key={app.appslugname}
                                        >
                                            <Image
                                                src={app?.iconurl}
                                                width={20}
                                                height={20}
                                                className="h-[24px] w-fit"
                                                alt="ico"
                                            />
                                            <span>{app?.name}</span>
                                            <MdClose
                                                className="text-gray-300 hover:text-gray-950 cursor-pointer"
                                                onClick={() => removeAppFromArray(index)}
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                            <div className="w-[300px] transition-all duration-300 relative bg-white dropdown">
                                <label
                                    className="input flex items-center h-[42px] gap-2 border border-black "
                                    tabIndex={0}
                                    role="button"
                                >
                                    <MdSearch color="#CCCCCC" fontSize={20} />
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="Add your favorite App"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        ref={inputRef}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <span
                                        className=""
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
                                    className="dropdown-content menu flex-nowrap bg-base-100 shadow-xl mt-2 z-[1]  max-h-[290px] w-[300px] overflow-scroll p-0"
                                >
                                    {searchLoading ? (
                                        [...Array(12)].map((_, index) => (
                                            <div className="rounded-none bg-white px-3 py-2 flex w-full" key={index}>
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
                                                        <Image src={app?.iconurl} width={16} height={16} alt="ico" />
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

                            <h2 className="">in</h2>

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
                                    className=" dropdown underline text-accent"
                                >
                                    {selectedDept || 'all their'}
                                </h2>
                                {showDeptDropdown && (
                                    <div
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100  z-[1] w-52 p-2 shadow industry-autocomplete"
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
                                            inputProps={{
                                                placeholder: 'Select Department',
                                                id: 'deptAutoComplete',
                                            }}
                                            menuStyle={{
                                                position: 'flex',
                                                overflow: 'auto',
                                                maxHeight: '400px',
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <h2 className="" id="dept">
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
                                    className="h-[32px] w-[32px] flex items-center justify-center bg-accent text-white"
                                >
                                    <MdArrowForward />
                                </button>
                            </div>
                        </div>
                        <ComboGrid combos={renderCombos} loading={combinationLoading} utm={'index'} showNoData />
                    </div>
                </div>
                {features && <FeaturesGrid features={features} page={'overall'} />}
                <div className="container">
                    <TestimonialsSection testimonials={testimonials} />
                </div>
                <div className="container">
                    <CaseStudiesSection caseStudies={caseStudies} />
                </div>
                {posts?.length > 0 && (
                    <div className="container">
                        <BlogGrid posts={posts} />
                    </div>
                )}

                {faqData?.length > 0 && (
                    <div className="container">
                        <FAQSection faqData={faqData} faqName={'/index'} />
                    </div>
                )}
                {getStartedData && (
                    <div className="container">
                        <GetStarted data={getStartedData} isHero={'false'} />
                    </div>
                )}
                <div className="container">
                    <AlphabeticalComponent step={0} />
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
    );
};

const TestimonialsSection = ({ testimonials }) => (
    <div className="flex flex-col gap-9">
        <h2 className="h1 flex gap-2 flex-wrap">
            What clients says <MdOutlineAutoAwesome />
        </h2>
        <div className="index_client_grid grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full  ">
            {testimonials.map((testimonial, index) => (
                <div className="block_border flex flex-col sm:p-12 p-6 gap-4" key={index}>
                    <div className="flex flex-col  gap-2 ">
                        <Image
                            className="border border-black"
                            src={testimonial?.client_img[0]}
                            width={50}
                            height={50}
                            alt={testimonial?.given_by}
                        />
                        <div className="flex flex-col">
                            <p className="text-sm tracking-wider uppercase font-bold ">{testimonial?.given_by}</p>
                            <p className="text-sm  text-grey">{testimonial?.giver_title}</p>
                        </div>
                    </div>
                    <p className="text-[#373737]">" {testimonial?.testimonial}"</p>
                </div>
            ))}
        </div>
    </div>
);

const CaseStudiesSection = ({ caseStudies }) => (
    <div className="flex flex-col gap-9">
        <h2 className="h1">Client Stories</h2>
        <div className="grid grid-rows-6 grid-cols-6 border-black border lg:max-h-[550px] md:max-h-[700px] max-h-[1200px] ">
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
            className={` bg-neutral flex  overflow-hidden col-span-6 row-span-2    ${
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
                    {/* <LinkButton href={caseStudy?.link} title={'Read More'} />
                     */}
                    <LinkButton href={caseStudy?.link} content={'Know More'} />
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
