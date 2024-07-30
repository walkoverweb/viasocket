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

//     const pathArray = ['', 'integrations'];

//     // Fetch integration data
//     const fetchIntegrationData = async (category, offset = 0) => {
//         let finalCategory = category;
//         if (typeof category !== 'string') {
//             finalCategory = category.props.href.split('?')[1].split('=')[1];
//         }

//         router.push(`/integrations?currentcategory=ALL`);
//     };

//     useEffect(() => {
//         const fetchPosts = async () => {
//             const tag = 'via-socket';
//             const defaultTag = 'integrations';
//             const res = await axios.get(
//                 `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
//             );
//             const posts = await res.data;
//             setPosts(posts);
//         };
//         fetchPosts();
//     }, []);
//     const getdata = async () => {
//         try {
//             const fetchUrl =
//                 finalCategory && finalCategory !== 'All'
//                     ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${finalCategory}`
//                     : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=${limit}&offset=${offset}`;

//             const apiHeaders = {
//                 headers: {
//                     'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
//                 },
//             };

//             const response = await fetch(fetchUrl, apiHeaders);
//             if (!response.ok) {
//                 throw new Error('Failed to load data');
//             }
//             const newData = await response.json();
//             setApps(offset === 0 ? newData : [...apps, ...newData]);
//             setLoading(false);
//         } catch (error) {
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
//         setOffset(0); // Reset offset when category changes
//         fetchIntegrationData(selectedCategory); // Fetch initial data with offset 0
//         fetchDashboardData(); // Fetch dashboard data
//         fetchPosts(); // Fetch blog posts
//     }, [selectedCategory]);

//     // Handle Load More action
//     const handleLoadMore = () => {
//         const newOffset = offset + limit;
//         setOffset(newOffset);
//         fetchIntegrationData(selectedCategory, newOffset);
//     };

//     const applyFilters = () => {
//         if (apps?.length > 0) {
//             const filteredItems = apps.filter((item) => {
//                 const nameMatches = item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
//                 return nameMatches;
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

import ErrorComp from '@/components/404/404Comp';
import { getDbdashData } from '@/pages/api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import IntegrationsComp from '@/components/integrationsComp/integrationsComp';
import { getUseCases } from '@/pages/api/fetch-usecases';
import axios from 'axios';

const IntegrationSlugPage = ({ getStartedData, combos, pathArray, metaData, faqData, usecase, posts }) => {
    return (
        <>
            <MetaHeadComp
                metaData={metaData}
                page={'/integrations'}
                pathArray={pathArray}
                plugin={[combos?.plugins?.[pathArray[2]]]}
            />

            <IntegrationsComp
                combinationData={combos}
                faqData={faqData}
                faqName={`[singleApp]`}
                blogs={posts}
                usecases={usecase}
                getStartedData={getStartedData}
                isHero={'false'}
                showCategories={true}
            />
        </>
    );
};

export default IntegrationSlugPage;

export async function getServerSideProps(context) {
    const pathSlugs = [];
    const combos = await fetchCombos(pathSlugs);
    const usecase = await getUseCases(pathSlugs[0]);

    const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const tag = 'via-socket';
    const defaultTag = 'integrations';
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
    );
    const posts = await res?.data;

    return {
        props: {
            combos,
            pathSlugs,
            metaData: results[0].data.rows,
            getStartedData: results[1].data.rows,
            faqData: results[2].data.rows,
            usecase: usecase ?? [],
            posts,
        },
    };
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
