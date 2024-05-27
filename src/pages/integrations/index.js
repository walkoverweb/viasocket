import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import IntegrationSearch from '@/components/integrations/integrationApps';
import GetStarted from '@/components/getStarted/getStarted';
import { getDbdashData } from '../api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';

const IntegrationSlugPage = ({ getStartedData, responseData, pathArray, metaData, faqData }) => {
    //defined states
    const [apps, setApps] = useState(responseData);
    const [filteredData, setFilteredData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(25);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState();
    const [visibleCategories, setVisibleCategories] = useState(10);

    const router = useRouter();
    const { currentcategory } = router.query;

    useEffect(() => {
        router.push('/integrations?currentcategory=All');
    }, []);

    //fetch apps
    useEffect(() => {
        setApps(responseData);
        setLoading(false);
        setSelectedCategory(currentcategory);
    }, [currentcategory, visibleItems]);

    //fetch apps

    useEffect(() => {
        setVisibleItems(25);
    }, [selectedCategory]);

    //fetch icons

    const handleLoadMore = () => {
        setVisibleItems(visibleItems + 25);
    };

    //search functions
    const applyFilters = () => {
        if (apps.length > 0) {
            let filteredItems = apps.filter((item) => {
                const nameMatches = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                const categoryMatches =
                    selectedCategory === 'All' || item.category === selectedCategory || !item.category;
                return nameMatches && categoryMatches;
            });

            setFilteredData(filteredItems);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [apps, searchTerm, currentcategory]);

    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const handleCategoryClick = () => {
        setCategoryDropdownOpen(!isCategoryDropdownOpen);
    };

    // const uniqueCategories = ["All", "Human Resources", "Productivity","Marketing", "IT Operations", "Support", "Website Building","E-commerce platform", "Social media ", "Communication", "Other"];
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
            <Link href={`/integrations?currentcategory=${category}`} aria-label="select category">
                <h6
                    key={category}
                    onClick={() => {
                        setSelectedCategory(category);
                        category !== selectedCategory ? setLoading(true) : '';
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
        setVisibleCategories(visibleCategories + 10); // Increase the number of visible categories by 10
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
            {' '}
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

export async function getServerSideProps(context) {
    const { currentcategory } = context.query;

    const pathArray = ['', 'integrations'];

    const fetchUrl =
        currentcategory && currentcategory !== 'All'
            ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${
                  currentcategory && currentcategory === 'Other' ? null : currentcategory
              }&limit=200`
            : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`;

    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };

    const response = await fetch(fetchUrl, apiHeaders);
    const responseData = await response.json();

    const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);
    return {
        props: {
            metaData: results[0].data.rows,
            getStartedData: results[1].data.rows,
            faqData: results[2].data.rows,
            responseData,
            pathArray,
        },
    };
}
