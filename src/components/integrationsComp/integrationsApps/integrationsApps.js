import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import categories from '@/assets/data/categories.json';
import Link from 'next/link';

export default function IntegrationsApps({ pluginData }) {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedApps, setSelectedApps] = useState([]);
    const [visibleApps, setVisibleApps] = useState(25);
    const [visibleCategories, setVisibleCategories] = useState(15);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        fetchApps(selectedCategory, offset);
    }, [offset, selectedCategory]);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, apps]);

    const applyFilters = () => {
        if (apps?.length > 0) {
            const filteredItems = apps.filter((item) => {
                const nameMatches = item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
                return nameMatches;
            });

            setSelectedApps(filteredItems);
        }
    };

    const fetchApps = async (category, offset) => {
        let finalCategory = category;
        if (typeof category !== 'string') {
            finalCategory = category?.props?.href?.split('?')[1].split('=')[1];
        }
        setLoading(true);
        try {
            const fetchUrl =
                finalCategory && finalCategory !== 'All'
                    ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${finalCategory}`
                    : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200&offset=${offset}`;

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

    const handleLoadMoreApps = () => {
        console.log('🚀 ~ handleLoadMoreApps ~ visibleApps:', visibleApps, searchedApps);
        setVisibleApps(visibleApps + 25);
        if (visibleApps == searchedApps) {
            console.log('🚀 ~ handleLoadMoreApps ~ visibleApps:', visibleApps);
            setOffset(offset + 200);
        }
    };

    const handleLoadMoreCategories = () => {
        setVisibleCategories(visibleCategories + 10);
    };

    const openChatWidget = () => {
        window.chatWidget.open();
    };

    return (
        <div className="container flex gap-5 py-24">
            <div className="flex flex-col gap-5">
                <p className="lg:text-2xl md:text-xl text-lg font-medium">Category</p>
                <div className="lg:flex flex-col lg:w-[240px] md:w-[240px] hidden gap-4">
                    {categories?.industries?.length &&
                        categories?.industries?.slice(0, visibleCategories).map((category, index) => {
                            return (
                                <Link
                                    href={`/integrations?currentcategory=${category}`}
                                    aria-label="select category"
                                    key={index}
                                >
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
                            );
                        })}

                    {categories?.industries?.length > visibleCategories && (
                        <button
                            onClick={handleLoadMoreCategories}
                            className="text-blue-500 font-medium cursor-pointer text-left flex items-center"
                            aria-label="load more categories"
                        >
                            Load More
                            <MdKeyboardArrowDown fontSize={22} />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="lg:w-[500px] md:w-[400px] w-[250px]   ">
                    <label className="input border-[#CCCCCC] flex items-center gap-2 bg-white rounded">
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
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search integrations"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </label>
                </div>
                <div className="flex flex-row flex-wrap gap-5 ">
                    {searchedApps?.length ? (
                        searchedApps.slice(0, visibleApps).map((app) => {
                            if (app?.appslugname) {
                                return (
                                    <>
                                        <a
                                            key={app?.rowid}
                                            rel="noopener noreferrer"
                                            aria-label="apps"
                                            href={
                                                app?.appslugname
                                                    ? `/integrations${pluginData.appslugname ? '/' + pluginData.appslugname : ''}/${app?.appslugname}`
                                                    : `/noplugin`
                                            }
                                        >
                                            <div
                                                className="flex flex-row justify-center items-center gap-2 px-5 py-3 rounded border border-[#CCCCCC] bg-white"
                                                // onClick={() => handleLocalStore(app?.name)}
                                            >
                                                {app?.iconurl && (
                                                    <Image src={app?.iconurl} alt={app?.name} height={23} width={23} />
                                                )}

                                                <span className="text-base font-medium">{app?.name}</span>
                                            </div>
                                        </a>
                                    </>
                                );
                            }
                        })
                    ) : (
                        <div className="flex flex-col gap-4 w-1/2">
                            <p className="text-gray-700 font-semibold text-xl">
                                Can't find what you need? Let us know what you're looking for! We're always looking to
                                expand our collection.
                                <br />
                                Request an app here
                            </p>
                            <div>
                                <button
                                    className="px-4 py-2 border border-[#CCCCCC] rounded"
                                    onClick={openChatWidget}
                                    aria-label="live chat"
                                >
                                    Live Chat
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {visibleApps < searchedApps?.length && (
                    <button
                        onClick={handleLoadMoreApps}
                        className="font-medium text-[#2D81F7] flex items-center"
                        aria-label="load more apps"
                    >
                        {loading ? (
                            <div className="skeleton w-[100px] h-[34px]"></div>
                        ) : (
                            <div className="flex items-center">
                                {' '}
                                Load More
                                <MdKeyboardArrowDown fontSize={22} />
                            </div>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
