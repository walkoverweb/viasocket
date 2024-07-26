// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import IntegrationSearch from '@/components/integrations/integrationApps';
// import GetStarted from '@/components/getStarted/getStarted';
// import { getDbdashData } from '../api';
// import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
// import BlogGrid from '@/components/blogGrid/blogGrid';
// import FAQSection from '@/components/faqSection/faqSection';
// import axios from 'axios';
// import { limits, datasetsize } from '../../utils/constant.js';

// const IntegrationSlugPage = () => {
//     const [apps, setApps] = useState([]); // Initialize apps as an empty array
//     const [filteredData, setFilteredData] = useState([]);
//     const [visibleItems, setVisibleItems] = useState(25);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [loading, setLoading] = useState(false);
//     const [visibleCategories, setVisibleCategories] = useState(10);
//     const [posts, setPosts] = useState([]);
//     const [metaData, setMetaData] = useState([]);
//     const [getStartedData, setGetStartedData] = useState([]);
//     const [faqData, setFaqData] = useState([]);
//     const [error, setError] = useState(null);
//     const [offset, setOffset] = useState(0);
//     const [dataSize, setDataSize] = useState(datasetsize);
//     const limit = limits;

//     const router = useRouter();
//     const { currentcategory } = router.query;
//     console.log(currentcategory, "currentcateehjhjdfjchgsdhjg");

//     const pathArray = ['', 'integrations'];

//     // Fetch integration data
//     const fetchIntegrationData = async (category, offset = 0) => {
//         if(typeof(category)!== 'string'){
//             debugger
//             console.log(category.props.href, "hrefff");
//             const newCategory = category.props.href.split('?')[1].split('=')[1];
//             category = newCategory
//         }
//         console.log(category, "categoryyy");
//         setLoading(true);
//         try {
//             console.log("inside try");
//             const fetchUrl =
//                 category && category !== 'All'
//                     ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${category}`
//                     : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=${limit}&offset=${offset}`;

//             const apiHeaders = {
//                 headers: {
//                     'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
//                 },
//             };

//             const response = await fetch(fetchUrl, apiHeaders);
//             if (!response.ok) {
//                 console.log("eroor ")
//                 throw new Error('Failed to load data');
//             }
//             const newData = await response.json();
//             console.log(newData , "newdata");
//             console.log(offset , "offset");
//             // setApps((prevData) => (offset === 0 ? newData : [...prevData, ...newData]));
//             if(offset === 0){
//                 setApps(newData)
//             }
//             else{
//                 setApps([...apps, ...newData])
//             }
//             console.log();
//             setLoading(false);
//         } catch (error) {
//             console.log("insie eeroro");
//             setError(error.message);
//             setLoading(false);
//         }
//     };

//     // Fetch metaData, getStartedData, and faqData from getDbdashData
//     const fetchDashboardData = async () => {
//         try {
//             const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng'];
//             const dataPromises = IDs.map((id) => getDbdashData(id));
//             const results = await Promise.all(dataPromises);

//             setMetaData(results[0].data.rows);
//             setGetStartedData(results[1].data.rows);
//             setFaqData(results[2].data.rows);
//         } catch (error) {
//             console.error('Error fetching dashboard data:', error);
//         }
//     };

//     // Fetch blog posts
//     const fetchPosts = async () => {
//         try {
//             const tag = 'via-socket';
//             const defaultTag = 'integrations';
//             const res = await axios.get(
//                 `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaultTag=${defaultTag}`
//             );
//             const postsData = await res.data;
//             setPosts(postsData);
//         } catch (error) {
//             console.error('Error fetching posts:', error);
//         }
//     };

//     // Initial data fetch
//     useEffect(() => {
//         fetchIntegrationData(selectedCategory); // Fetch initial data with offset 0
//         fetchDashboardData(); // Fetch dashboard data
//         fetchPosts(); // Fetch blog posts
//     }, [currentcategory,selectedCategory]);

//     // Handle Load More action
//     const handleLoadMore = () => {
//         setVisibleItems((prevVisibleItems) => prevVisibleItems + 25);
//         if ((visibleItems + 25) % datasetsize === 0) {
//             setOffset((prevOffset) => prevOffset + limit);
//             fetchIntegrationData(currentcategory, offset + limit);
//         }
//     };

//     const applyFilters = () => {
//         debugger
//         if (apps?.length > 0) {
//             const filteredItems = apps.filter((item) => {
//                 const nameMatches = item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
//                 const categoryMatches =
//                     selectedCategory === 'All' || item.category === selectedCategory || !item.category;
//                 return nameMatches && categoryMatches;
//             });

//             setFilteredData(filteredItems);
//         }
//     };

//     useEffect(() => {
//         applyFilters();
//     }, [apps, searchTerm, selectedCategory]);

//     const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

//     const handleCategoryClick = () => {
//         setCategoryDropdownOpen(!isCategoryDropdownOpen);
//     };

//     const uniqueCategories = [
//         'All',
//         'Engineering',
//         'Productivity',
//         'Marketing',
//         'IT',
//         'Support',
//         'Website Builders',
//         'Databases',
//         'Social Media Accounts',
//         'Communication',
//         'Accounting',
//         'Ads & Conversion',
//         'AI Tools',
//         'Analytics',
//         'App Builder',
//         'App Families',
//         'Bookmark Managers',
//         'Business Intelligence',
//         'Calendar',
//         'Call Tracking',
//         'Website & App Building',
//         'Commerce',
//         'Communication',
//         'Contact Management',
//         'Content & Files',
//         'CRM (Customer Relationship Management)',
//         'Customer Appreciation',
//         'Customer Support',
//         'Dashboards',
//         'Developer Tools',
//         'Devices',
//         'Documents',
//         'Drip Emails',
//         'eCommerce',
//         'Education',
//         'Email',
//         'Email Newsletters',
//         'Event Management',
//         'Fax',
//         'File Management & Storage',
//         'Filters',
//         'Fitness',
//         'Forms & Surveys',
//         'Fundraising',
//         'Gaming',
//         'Human Resources',
//         'HR Talent & Recruitment',
//         'Images & Design',
//         'Internet of Things',
//         'Proposal & Invoice Management',
//         'IT Operations',
//         'Online Courses',
//         'Lifestyle & Entertainment',
//         'Marketing Automation',
//         'News & Lifestyle',
//         'Notes',
//         'Notifications',
//         'Payment Processing',
//         'Phone & SMS',
//         'Printing',
//         'Product Management',
//         'Productivity',
//         'Project Management',
//         'Reviews',
//         'Sales & CRM',
//         'Scheduling & Booking',
//         'Security & Identity Tools',
//         'Server Monitoring',
//         'Signatures',
//         'Social Media Marketing',
//         'Spreadsheets',
//         'Support',
//         'Taxes',
//         'Team Chat',
//         'Team Collaboration',
//         'Time Tracking Software',
//         'Task Management',
//         'Transactional Email',
//         'Transcription',
//         'URL Shortener',
//         'Video & Audio',
//         'Video Conferencing',
//         'Webinars',
//     ];

//     const renderFilterOptions = () => {
//         return uniqueCategories.slice(0, visibleCategories).map((category, index) => (
//             <Link href={`/integrations?currentcategory=${category}`} aria-label="select category" key={index}>
//                 <h6
//                     onClick={() => {
//                         setSelectedCategory(category);
//                         category !== selectedCategory ? setLoading(true) : '';
//                     }}
//                     className={`lg:text-[20px] text-base cursor-pointer ${
//                         selectedCategory === category ? 'font-bold' : 'font-normal'
//                     }`}
//                 >
//                     {category === 'Null' ? 'Other' : category}
//                 </h6>
//             </Link>
//         ));
//     };

//     const handleCategoryLoadMore = () => {
//         setVisibleCategories((prevVisibleCategories) => prevVisibleCategories + 10);
//     };

//     const handleCategoryItemClick = (category) => {
//         setSelectedCategory(category);
//         setCategoryDropdownOpen(false);
//     };

//     const handleLocalStore = (appName) => {
//         localStorage.setItem('selectedAppName', appName);
//     };

//     return (
//         <>
//             <MetaHeadComp metaData={metaData} page={'/integrations'} pathArray={pathArray} />
//             <div className="">
//                 <div className="flex flex-col gap-6 container py-20">
//                     <h1 className="lg:text-5xl text-3xl  font-bold">5000+ viaSocket Integrations</h1>
//                     <p className="text-lg  lg:w-[900px] ">
//                         Viasocket is your all-in-one solution, seamlessly integrating CRM, Marketing, E-Commerce,
//                         Helpdesk, Payments, Web forms, Collaboration, and more for streamlined business success.
//                     </p>
//                     <IntegrationSearch
//                         loading={loading}
//                         searchTerm={searchTerm}
//                         setSearchTerm={setSearchTerm}
//                         renderFilterOptions={renderFilterOptions}
//                         isCategoryDropdownOpen={isCategoryDropdownOpen}
//                         handleCategoryClick={handleCategoryClick}
//                         selectedCategory={selectedCategory}
//                         setSelectedCategory={setSelectedCategory}
//                         handleCategoryItemClick={handleCategoryItemClick}
//                         filteredData={filteredData}
//                         handleLocalStore={handleLocalStore}
//                         visibleItems={visibleItems}
//                         apps={apps}
//                         handleLoadMore={handleLoadMore}
//                         uniqueCategories={uniqueCategories}
//                         visibleCategories={visibleCategories}
//                         handleCategoryLoadMore={handleCategoryLoadMore}
//                         pathArray={pathArray}
//                     />
//                 </div>
//                 {posts?.length > 0 && (
//                     <div className="container mx-auto py-12 ">
//                         <BlogGrid posts={posts} />
//                     </div>
//                 )}

//                 <div className="bg-white py-20 ">
//                     {faqData && faqData.length > 0 && (
//                         <div className="container">
//                             <FAQSection faqData={faqData} faqName={'/integrations'} />
//                         </div>
//                     )}
//                 </div>
//                 <div className="container py-20">
//                     {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default IntegrationSlugPage;

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import IntegrationSearch from '@/components/integrations/integrationApps';
import GetStarted from '@/components/getStarted/getStarted';
import { getDbdashData } from '../api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import BlogGrid from '@/components/blogGrid/blogGrid';
import FAQSection from '@/components/faqSection/faqSection';
import axios from 'axios';
import { limits, datasetsize } from '../../utils/constant.js';

const IntegrationSlugPage = () => {
    const [apps, setApps] = useState([]); // Initialize apps as an empty array
    const [filteredData, setFilteredData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(25);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState(10);
    const [posts, setPosts] = useState([]);
    const [metaData, setMetaData] = useState([]);
    const [getStartedData, setGetStartedData] = useState([]);
    const [faqData, setFaqData] = useState([]);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [dataSize, setDataSize] = useState(datasetsize);
    const limit = limits;

    const router = useRouter();
    const { currentcategory } = router.query;

    const pathArray = ['', 'integrations'];

    // Fetch integration data
    const fetchIntegrationData = async (category, offset = 0) => {
        let finalCategory = category;
        if (typeof category !== 'string') {
            finalCategory = category.props.href.split('?')[1].split('=')[1];
        }

        setLoading(true);
        try {
            const fetchUrl =
                finalCategory && finalCategory !== 'All'
                    ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${finalCategory}`
                    : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=${limit}&offset=${offset}`;

            const apiHeaders = {
                headers: {
                    'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
                },
            };

            const response = await fetch(fetchUrl, apiHeaders);
            if (!response.ok) {
                throw new Error('Failed to load data');
            }
            const newData = await response.json();
            setApps(offset === 0 ? newData : [...apps, ...newData]);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    // Fetch metaData, getStartedData, and faqData from getDbdashData
    const fetchDashboardData = async () => {
        try {
            const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng'];
            const dataPromises = IDs.map((id) => getDbdashData(id));
            const results = await Promise.all(dataPromises);

            setMetaData(results[0].data.rows);
            setGetStartedData(results[1].data.rows);
            setFaqData(results[2].data.rows);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    // Fetch blog posts
    const fetchPosts = async () => {
        try {
            const tag = 'via-socket';
            const defaultTag = 'integrations';
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaultTag=${defaultTag}`
            );
            const postsData = await res.data;
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // Initial data fetch
    useEffect(() => {
        setOffset(0); // Reset offset when category changes
        fetchIntegrationData(selectedCategory); // Fetch initial data with offset 0
        fetchDashboardData(); // Fetch dashboard data
        fetchPosts(); // Fetch blog posts
    }, [selectedCategory]);

    // Handle Load More action
    const handleLoadMore = () => {
        const newOffset = offset + limit;
        setOffset(newOffset);
        fetchIntegrationData(selectedCategory, newOffset);
    };

    const applyFilters = () => {
        if (apps?.length > 0) {
            const filteredItems = apps.filter((item) => {
                const nameMatches = item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
                return nameMatches;
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
        return uniqueCategories.slice(0, visibleCategories).map((category, index) => (
            <Link href={`/integrations?currentcategory=${category}`} aria-label="select category" key={index}>
                <h6
                    onClick={() => {
                        setSelectedCategory(category);
                    }}
                    className={`lg:text-[20px] text-base cursor-pointer ${
                        selectedCategory === category ? 'font-bold' : 'font-normal'
                    }`}
                >
                    {category === 'Null' ? 'Other' : category}
                </h6>
            </Link>
        ));
    };

    const handleCategoryLoadMore = () => {
        setVisibleCategories((prevVisibleCategories) => prevVisibleCategories + 10);
    };

    const handleCategoryItemClick = (category) => {
        setSelectedCategory(category);
        setCategoryDropdownOpen(false);
    };

    const handleLocalStore = (appName) => {
        localStorage.setItem('selectedAppName', appName);
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/integrations'} pathArray={pathArray} />
            <div className="">
                <div className="flex flex-col gap-6 container py-20">
                    <h1 className="lg:text-5xl text-3xl  font-bold">5000+ viaSocket Integrations</h1>
                    <p className="text-lg  lg:w-[900px] ">
                        Viasocket is your all-in-one solution, seamlessly integrating CRM, Marketing, E-Commerce,
                        Helpdesk, Payments, Web forms, Collaboration, and more for streamlined business success.
                    </p>
                    <IntegrationSearch
                        loading={loading}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        renderFilterOptions={renderFilterOptions}
                        isCategoryDropdownOpen={isCategoryDropdownOpen}
                        handleCategoryClick={handleCategoryClick}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
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
                {posts?.length > 0 && (
                    <div className="container mx-auto py-12 ">
                        <BlogGrid posts={posts} />
                    </div>
                )}

                <div className="bg-white py-20 ">
                    {faqData && faqData.length > 0 && (
                        <div className="container">
                            <FAQSection faqData={faqData} faqName={'/integrations'} />
                        </div>
                    )}
                </div>
                <div className="container py-20">
                    {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
                </div>
            </div>
        </>
    );
};

export default IntegrationSlugPage;
