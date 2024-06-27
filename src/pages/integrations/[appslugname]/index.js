import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdAdd, MdChevronRight } from 'react-icons/md';
import IntegrationSearch from '@/components/integrations/integrationApps';
import ErrorComp from '@/components/404/404Comp';
import GetStarted from '@/components/getStarted/getStarted';
import { getDbdashData } from '@/pages/api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import ComboGrid from '@/components/comboGrid/comboGrid';
import { GetColorMode } from '@/utils/getColorMode';
import IntegrationHero from '@/components/integrations/integrationHero';
import FAQSection from '@/components/faqSection/faqSection';
import NoDataPluginComp from '@/components/noDataPluginComp/noDataPluginComp';
import BlogGrid from '@/components/blogGrid/blogGrid';
import axios from 'axios';
const IntegrationSlugPage = ({ getStartedData, combos, params, apps, pathArray, metaData, faqData }) => {
    console.log(params.appslugname, 123);
    const [newBrandColor, setNewBrandColor] = useState('#F6F4EE');
    const [mode, setMode] = useState('dark');
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        console.log('inside use effect');
        const fetchPosts = async () => {
            const tag = params.appslugname;
            const defaultTag = 'integrations';
            const res = await axios.get(`http://localhost:1111/api/fetch-posts?tag=${tag}&defaultTag=${defaultTag}`);
            const posts = await res.data;
            setPosts(posts);
        };
        fetchPosts();
    }, []);
    useEffect(() => {
        if (combos?.plugins?.[pathArray[2]]?.brandcolor) {
            setNewBrandColor(combos?.plugins?.[pathArray[2]]?.brandcolor);
        }
    }, []);
    useEffect(() => {
        setMode(GetColorMode(newBrandColor));
    }, [newBrandColor]);

    //defined states
    const [plugin, setPlugin] = useState();
    const [filteredData, setFilteredData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(25);
    const [visibleComboItems, setVisibleComboItems] = useState(9);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState(10);

    const router = useRouter();

    const cardsData = combos?.combinations;

    //fetch apps

    //fetch apps

    useEffect(() => {
        setVisibleItems(25);
    }, [selectedCategory]);
    useEffect(() => {
        setPlugin(combos?.plugins?.[pathArray[2]]);
    }, [combos, pathArray[2]]);

    const handleLoadMore = () => {
        setVisibleItems(visibleItems + 25);
    };

    const handleComboLoadMore = () => {
        setVisibleComboItems(visibleComboItems + 3);
    };

    //search functions
    const applyFilters = () => {
        if (apps.length > 0) {
            let filteredItems = apps.filter((item) => {
                const nameMatches = item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
                const categoryMatches =
                    selectedCategory === 'All' || item.category === selectedCategory || !item.category;
                return nameMatches && categoryMatches;
            });

            setFilteredData(filteredItems);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [apps, searchTerm, selectedCategory]);

    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const handleCategoryClick = () => {
        setCategoryDropdownOpen(!isCategoryDropdownOpen);
    };

    const uniqueCategories = [
        'All',
        'Engineering',
        'Productivity',
        'Marketing',
        'IT',
        'Support',
        'Website Builders',
        'Databases',
        'Social Media Accounts',
        'Communication',
        'Accounting',
        'Ads & Conversion',
        'AI Tools',
        'Analytics',
        'App Builder',
        'App Families',
        'Bookmark Managers',
        'Business Intelligence',
        'Calendar',
        'Call Tracking',
        'Website & App Building',
        'Commerce',
        'Communication',
        'Contact Management',
        'Content & Files',
        'CRM (Customer Relationship Management)',
        'Customer Appreciation',
        'Customer Support',
        'Dashboards',
        'Developer Tools',
        'Devices',
        'Documents',
        'Drip Emails',
        'eCommerce',
        'Education',
        'Email',
        'Email Newsletters',
        'Event Management',
        'Fax',
        'File Management & Storage',
        'Filters',
        'Fitness',
        'Forms & Surveys',
        'Fundraising',
        'Gaming',
        'Human Resources',
        'HR Talent & Recruitment',
        'Images & Design',
        'Internet of Things',
        'Proposal & Invoice Management',
        'IT Operations',
        'Online Courses',
        'Lifestyle & Entertainment',
        'Marketing Automation',
        'News & Lifestyle',
        'Notes',
        'Notifications',
        'Payment Processing',
        'Phone & SMS',
        'Printing',
        'Product Management',
        'Productivity',
        'Project Management',
        'Reviews',
        'Sales & CRM',
        'Scheduling & Booking',
        'Security & Identity Tools',
        'Server Monitoring',
        'Signatures',
        'Social Media Marketing',
        'Spreadsheets',
        'Support',
        'Taxes',
        'Team Chat',
        'Team Collaboration',
        'Time Tracking Software',
        'Task Management',
        'Transactional Email',
        'Transcription',
        'URL Shortener',
        'Video & Audio',
        'Video Conferencing',
        'Webinars',
    ];
    const renderFilterOptions = () => {
        return uniqueCategories.slice(0, visibleCategories).map((category) => (
            <h6
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`lg:text-[20px] text-base cursor-pointer ${
                    selectedCategory === category ? 'font-bold' : 'font-normal'
                }`}
            >
                {category === 'Null' ? 'Other' : category}
            </h6>
        ));
    };
    const handleCategoryLoadMore = () => {
        setVisibleCategories(visibleCategories + 10); // Increase the number of visible categories by 10
    };

    const handleCategoryItemClick = (category) => {
        setSelectedCategory(category);
        setCategoryDropdownOpen(false);
    };

    const handleLocalStore = (appName) => {
        localStorage.setItem('selectedAppName', appName);
    };

    const openChatWidget = () => {
        window.chatWidget.open();
    };

    //get Icon URL
    if (combos && !combos.error) {
        console.log('heyyy');
        if (combos?.plugins[pathArray[2]]?.events?.length) {
            return (
                <>
                    <MetaHeadComp
                        metaData={metaData}
                        page={'/integrations/AppOne'}
                        pathArray={pathArray}
                        plugin={[plugin]}
                    />
                    {plugin && <IntegrationHero plugin={[plugin]} combos={combos} mode={mode} />}

                    <div className="] py-14">
                        <div className="container flex  flex-col gap-8">
                            <h1 className="lg:text-3xl  text-2xl md:text-3xl font-semibold">
                                Integrate with specific service
                            </h1>
                            <div className="flex flex-col gap-9">
                                <div className="flex  gap-2 justify-center items-center bg-white border  py-4 px-6 rounded-md w-fit">
                                    <Image
                                        className="w-[26px] h-[26px]"
                                        src={plugin?.iconurl ? plugin?.iconurl : 'https://placehold.co/40x40'}
                                        width={40}
                                        height={40}
                                        alt={combos?.plugins?.[pathArray[2]]?.name}
                                    />
                                    <h6 className="text-2xl font-bold capitalize">
                                        {combos?.plugins?.[pathArray[2]]?.name}
                                    </h6>
                                </div>
                                <div className="px-8">
                                    <MdAdd fontSize={46} />
                                </div>

                                <IntegrationSearch
                                    loading={loading}
                                    selectedApp={pathArray[2]}
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    renderFilterOptions={renderFilterOptions}
                                    isCategoryDropdownOpen={isCategoryDropdownOpen}
                                    handleCategoryClick={handleCategoryClick}
                                    selectedCategory={selectedCategory}
                                    handleCategoryItemClick={handleCategoryItemClick}
                                    filteredData={filteredData}
                                    handleLocalStore={handleLocalStore}
                                    visibleItems={visibleItems}
                                    apps={apps}
                                    handleLoadMore={handleLoadMore}
                                    uniqueCategories={uniqueCategories}
                                    visibleCategories={visibleCategories}
                                    handleCategoryLoadMore={handleCategoryLoadMore}
                                    pathArray={pathArray}
                                />
                            </div>
                        </div>
                    </div>
                    {cardsData?.length > 0 && (
                        <div className="py-14 bg-white">
                            <div className="flex flex-col gap-9 container">
                                <h2 className="text-3xl">Actions and Triggers</h2>
                                {combos?.plugins?.[pathArray[2]]?.events.some((event) => event.type === 'trigger') && (
                                    <div className="flex-col flex gap-3">
                                        <h3 className="text-xl font-semibold">Triggers</h3>
                                        <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
                                            {combos?.plugins?.[pathArray[2]]?.events.map((event) => {
                                                if (event.type === 'trigger') {
                                                    return (
                                                        <div className="flex gap-3 border border-gray-300 rounded-sm p-3 items-center">
                                                            <Image
                                                                width={24}
                                                                height={24}
                                                                className="w-auto h-[28px]"
                                                                src={
                                                                    combos?.plugins?.[pathArray[2]]?.iconurl
                                                                        ? combos?.plugins?.[pathArray[2]]?.iconurl
                                                                        : 'https://placehold.co/40x40'
                                                                }
                                                                alt={combos?.plugins?.[pathArray[2]]?.name}
                                                            />

                                                            <div>
                                                                <h4 className="font-semibold">{event?.name}</h4>
                                                                <p>{event?.description}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                )}
                                {combos?.plugins?.[pathArray[2]]?.events.some((event) => event?.type === 'action') && (
                                    <div className="flex-col flex gap-3">
                                        <h3 className="text-xl font-semibold">Actions</h3>
                                        <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
                                            {combos?.plugins?.[pathArray[2]]?.events.map((event) => {
                                                if (event.type === 'action') {
                                                    return (
                                                        <div className="flex gap-3 border border-gray-300 rounded-sm p-3 items-center">
                                                            <Image
                                                                width={24}
                                                                height={24}
                                                                className="w-auto h-[28px]"
                                                                src={
                                                                    combos?.plugins?.[pathArray[2]]?.iconurl
                                                                        ? combos?.plugins?.[pathArray[2]]?.iconurl
                                                                        : 'https://placehold.co/40x40'
                                                                }
                                                                alt={combos?.plugins?.[pathArray[2]]?.name}
                                                            />

                                                            <div>
                                                                <h4 className="font-semibold">{event?.name}</h4>
                                                                <p>{event?.description}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {posts?.length && (
                        <div className="container mx-auto py-12 ">
                            {' '}
                            <BlogGrid posts={posts} />
                        </div>
                    )}

                    <div className="bg-white py-20 ">
                        {faqData && faqData.length > 0 && (
                            <div className="container">
                                <FAQSection faqData={faqData} faqName={`[singleApp]`} />
                            </div>
                        )}
                    </div>
                    {/* abouttttt */}
                    <div className="py-14">
                        <div className="flex lg:flex-row md:flex-row flex-col gap-10 container justify-between">
                            <div className="flex flex-1 flex-col justify-start gap-4">
                                <Image
                                    src={plugin?.iconurl ? plugin?.iconurl : 'https://placehold.co/40x40'}
                                    width={34}
                                    height={34}
                                    alt={combos?.plugins?.[pathArray[2]]?.name}
                                />
                                <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">
                                    {`About ${combos?.plugins?.[pathArray[2]]?.name}`}
                                </h6>
                                <p className="md:text-xl text-base">{plugin?.description}</p>
                                <div>
                                    <Link
                                        href={
                                            combos?.plugins?.[pathArray[2]]?.domain.startsWith('http')
                                                ? combos?.plugins?.[pathArray[2]]?.domain
                                                : 'http://' + combos?.plugins?.[pathArray[2]]?.domain
                                        }
                                        target="_blank"
                                    >
                                        <button
                                            className="font-medium text-[#2D81F7] flex items-center"
                                            aria-label="load more apps"
                                        >
                                            Learn More
                                            <MdChevronRight fontSize={22} />
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-4">
                                <Link href="/" aria-label="main link">
                                    <Image
                                        src="/assets/brand/socket_fav_dark.svg"
                                        width={34}
                                        height={34}
                                        alt="viasocket"
                                    />
                                </Link>
                                <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">About viaSocket</h6>
                                <p className="md:text-xl text-base ">
                                    viasocket is an innovative and versatile workflow automation platform designed to
                                    streamline and simplify the integration of your favorite applications and tools.
                                </p>
                                <div>
                                    <Link href="/" target="_blank">
                                        <button
                                            className="font-medium text-[#2D81F7] flex items-center"
                                            aria-label="load more apps"
                                        >
                                            Learn More
                                            <MdChevronRight fontSize={22} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------------------------------------------------------------------------------ */}

                    <div className=" py-14">
                        <div className="container">
                            {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
                        </div>
                    </div>

                    {/* footer */}

                    <div className=" py-10">
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <h4 className="lg:text-[32px] md:text-xl text-lg font-semibold">Integrations run at</h4>
                            <Link href="/" aria-label="main page">
                                <Image
                                    src="../../../assets/brand/socket_fav_dark.svg"
                                    width={40}
                                    height={40}
                                    alt="viasocket"
                                />
                            </Link>
                        </div>
                    </div>
                </>
            );
        } else {
            console.log('heklki there');
            return <NoDataPluginComp plugin={[plugin]} combos={combos} mode={mode} />;
        }
    } else {
        return (
            <>
                <MetaHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    pathArray={pathArray}
                    plugin={[plugin]}
                />
                <ErrorComp pathArray={pathArray} />
            </>
        );
    }
};

export default IntegrationSlugPage;

export async function getServerSideProps(context) {
    const { params } = context;
    const pathArray = [params.appslugname];
    // Fetch data server-side here
    const combos = await fetchCombos(pathArray);
    const apps = await fetchApps('All', 25);

    const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            params,
            combos,
            apps,
            pathArray,
            metaData: results[0].data.rows,
            getStartedData: results[1].data.rows,
            faqData: results[2].data.rows,
        },
    };
}

async function fetchApps(selectedCategory, visibleItems) {
    const fetchUrl =
        selectedCategory && selectedCategory !== 'All'
            ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${
                  selectedCategory && selectedCategory === 'Other' ? null : selectedCategory
              }&limit=200`
            : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`;
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };

    const response = await fetch(fetchUrl, apiHeaders);
    const responseData = await response.json();
    return responseData;
}

async function fetchCombos(pathArray) {
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pathArray[0]}`,
        apiHeaders
    );
    const responseData = await response.json();
    return responseData;
}
