import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdClose, MdSearch, MdAutoAwesome } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
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
import Autocomplete from 'react-autocomplete';

const Index = ({ testimonials, caseStudies, getStartedData, features, metaData, faqData, posts }) => {
    const formattedIndustries = Industries.industries.map((name, id) => ({ name, id: id + 1 }));
    const formattedDepartments = Industries.departments.map((name, id) => ({ name, id: id + 1 }));

    const [indusSearchTerm, setIndusSearchTerm] = useState('');
    const [selectedIndus, setSelectedIndus] = useState('');
    const [deptSearchTerm, setDeptSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApps, setSelectedApps] = useState([]);
    const [apps, setApps] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [combinationLoading, setCombinationLoading] = useState(false);
    const [debounceValue, setDebounceValue] = useState(searchTerm);
    const [renderCombos, setRenderCombos] = useState();
    const [showInput, setShowInput] = useState(false);
    const hasRunFirstEffect = useRef(false);
    const inputRef = useRef(null);

    const fetchAppsData = async (category) => await fetchApps(category);

    const filterSelectedApps = (apps) => {
        return apps.filter((app) => !selectedApps.some((selectedApp) => selectedApp.appslugname === app.appslugname));
    };

    useEffect(() => {
        const getApps = async () => {
            const apps = await fetchAppsData(selectedIndus);
            if (apps.length > 0) {
                setApps(filterSelectedApps(apps));
                setSelectedApps(apps.slice(0, 3));
            }
        };
        getApps();
    }, [selectedIndus]);

    useEffect(() => {
        if (!hasRunFirstEffect.current && searchData.length > 0 && selectedApps.length === 0) {
            searchData.slice(0, 3).forEach((app) => handleSelectApp(app.appslugname));
            hasRunFirstEffect.current = true;
        }
    }, [searchData]);

    useEffect(() => {
        searchApps();
    }, [debounceValue]);

    useEffect(() => {
        if (searchTerm === '') {
            fetchAppsData(selectedIndus).then((apps) => setSearchData(filterSelectedApps(apps)));
        }
    }, [searchTerm, selectedIndus]);

    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(searchTerm), 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const handleSelectApp = (appName) => {
        const app = searchData.find((app) => app.appslugname === appName);
        if (app) {
            setSearchData((prev) => prev.filter((item) => item?.appslugname !== appName));
            setSelectedApps((prev) => [...prev, app]);
        }
        setSearchTerm('');
    };

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
            const apps = await fetchAppsData(selectedIndus);
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
            const combos = await fetchCombos(selectedAppSlugs, selectedIndus);
            setRenderCombos(combos);
        } catch (error) {
            console.error('Error fetching combos:', error);
        } finally {
            setCombinationLoading(false);
        }
    };

    const handleSelectIndus = (val) => {
        setIndusSearchTerm(val);
        setSelectedIndus(val);
    };

    const filterIndustries = (searchTerm) => {
        return formattedIndustries.filter((industry) => industry.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const handleSelectDept = (val) => {
        setDeptSearchTerm(val);
        setSelectedDept(val);
    };

    const filterDepts = (searchTerm) => {
        return formattedDepartments.filter((industry) =>
            industry.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <div className="grid gap-20">
                <div className="flex flex-col gap-10 container lg:pb-12 pt-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl font-medium flex gap-2 items-center">
                            <MdAutoAwesome color="#00ED64" /> AI First
                        </span>
                        <h2 className="md:text-6xl text-4xl font-medium">
                            Connect your favorite apps and automate your repetitive tasks
                        </h2>
                    </div>
                    <div className="p-8 bg-neutral rounded flex flex-col gap-9">
                        <div className="flex flex-wrap gap-6 items-center">
                            <h2 className="text-3xl">How</h2>
                            <div className="industry-autocomplete">
                                <Autocomplete
                                    getItemValue={(item) => item.label}
                                    items={filterIndustries(indusSearchTerm).map((industry) => ({
                                        label: industry.name,
                                    }))}
                                    renderItem={(item) => (
                                        <div className="px-2 py-1 cursor-pointer hover:bg-secondary">{item.label}</div>
                                    )}
                                    value={indusSearchTerm}
                                    onChange={(e) => setIndusSearchTerm(e.target.value)}
                                    onSelect={(val) => handleSelectIndus(val)}
                                    menuStyle={{
                                        zIndex: '400',
                                        borderRadius: '3px',
                                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                        background: 'rgba(255, 255,255)',
                                        padding: '2px 0',
                                        fontSize: '90%',
                                        position: 'absolute',
                                        overflow: 'auto',
                                        maxHeight: '50%',
                                    }}
                                />
                            </div>
                            <h2 className="text-3xl">industry is automating with</h2>
                            {selectedApps.map((app, index) => (
                                <div
                                    className="flex items-center gap-2 bg-white w-fit p-3 rounded cursor-pointer"
                                    key={app.appslugname}
                                >
                                    <Image src={app?.iconurl} width={24} height={24} alt="ico" />
                                    <span>{app?.name}</span>
                                    <MdClose
                                        className="text-gray-300 hover:text-gray-950"
                                        onClick={() => removeAppFromArray(index)}
                                    />
                                </div>
                            ))}
                            {showInput ? (
                                <div className="w-[300px] transition-all duration-300 relative bg-white dropdown">
                                    <label
                                        className="input border-[#CCCCCC] flex items-center gap-2 bg-white rounded"
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
                                                    searchData.map((app) => (
                                                        <div
                                                            key={app.appslugname}
                                                            className="flex items-center gap-2 bg-white px-3 py-2 cursor-pointer w-full hover:bg-slate-100"
                                                            onClick={() => handleSelectApp(app?.appslugname)}
                                                        >
                                                            <Image
                                                                src={app?.iconurl}
                                                                width={12}
                                                                height={12}
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
                                    className="btn p-0 flex items-center justify-center btn-primary w-[42px] rounded"
                                >
                                    <MdAdd color="white" fontSize={24} />
                                </span>
                            )}
                            <h2 className="text-3xl">in</h2>
                            <div className="industry-autocomplete">
                                <Autocomplete
                                    getItemValue={(item) => item.label}
                                    items={filterDepts(deptSearchTerm).map((dept) => ({
                                        label: dept.name,
                                    }))}
                                    renderItem={(item) => (
                                        <div className="px-2 py-1 cursor-pointer hover:bg-secondary">{item.label}</div>
                                    )}
                                    value={deptSearchTerm}
                                    onChange={(e) => setDeptSearchTerm(e.target.value)}
                                    onSelect={(val) => handleSelectDept(val)}
                                    menuStyle={{
                                        zIndex: '400',
                                        borderRadius: '3px',
                                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                        background: 'rgba(255, 255,255)',
                                        padding: '2px 0',
                                        fontSize: '90%',
                                        position: 'absolute',
                                        overflow: 'auto',
                                        maxHeight: '50%',
                                    }}
                                />
                            </div>
                            <button
                                onClick={handleGenerate}
                                className="btn btn-accent h-[48px] w-auto flex items-center justify-center rounded text-lg border border-black"
                            >
                                Search Automations
                            </button>
                        </div>
                        <ComboGrid combos={renderCombos} loading={combinationLoading} showNoData />
                    </div>
                </div>
                {features && <FeaturesGrid features={features} page={'overall'} />}
                <div className="container my-12">
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
        <div className="grid grid-rows-6 grid-cols-6 gap-6 container md:max-h-[700px]">
            {caseStudies.map((caseStudy, index) => (
                <CaseStudyLink key={index} caseStudy={caseStudy} />
            ))}
        </div>
    </div>
);

const CaseStudyLink = ({ caseStudy }) => {
    const isPriority = caseStudy?.priority === '1';
    const linkClass = isPriority
        ? 'lg:row-span-6 lg:col-span-3 md:row-span-3 md:col-span-6 row-span-2 col-span-6'
        : 'lg:row-span-3 lg:col-span-3 md:row-span-3 md:col-span-3 row-span-2 col-span-6';

    return (
        <Link
            href={caseStudy?.link}
            target="_blank"
            className={`${linkClass} bg-neutral flex flex-col ${isPriority ? 'md:flex-row lg:flex-col' : 'lg:flex-row lg:items-center'} items-start rounded-md overflow-hidden hover:drop-shadow-lg`}
            aria-label="casestudy"
            legacyBehavior
        >
            <>
                <div className="casestudy_img w-full h-full">
                    <Image src={caseStudy?.image[0]} width={1080} height={1080} alt={caseStudy?.title} />
                </div>
                <div className="p-4 flex flex-col gap-2 w-full">
                    <p>{caseStudy?.title}</p>
                    <LinkButton href={caseStudy?.link} title={'Read More'} />
                </div>
            </>
        </Link>
    );
};

export default Index;

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

    const tag = 'via-socket';
    const defaultTag = 'integrations';
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
    );
    const posts = await res.data;

    const allApps = await fetchApps();
    const firstThreeApps = allApps.slice(0, 3).map((app) => app.name);
    const combos = await fetchCombos(firstThreeApps);
    return {
        props: {
            products: results[0]?.data?.rows,
            testimonials: results[1]?.data?.rows,
            caseStudies: results[2]?.data?.rows,
            getStartedData: results[3]?.data?.rows,
            features: results[6]?.data?.rows,
            metaData: results[7]?.data?.rows,
            faqData: results[8]?.data?.rows,
            posts: posts,
            // combos,
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

async function fetchCombos(pathArray, industry) {
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?${pathArray.map((service) => `service=${service}`).join('&')}&industry=${industry && industry.toLowerCase()}`,
        apiHeaders
    );
    const responseData = await response.json();
    return responseData;
}
