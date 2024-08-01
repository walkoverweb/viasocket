import Image from 'next/image';

import { useEffect, useState } from 'react';
import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md';
import categories from '@/assets/data/categories.json';
import Link from 'next/link';
import { useRouter } from 'next/router';
import fetchSearchResults from '@/utils/searchIntegrationApps';

export default function IntegrationsApps({ pluginData, showCategories }) {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedApps, setSelectedApps] = useState([]);
    const [visibleApps, setVisibleApps] = useState(40);
    const [visibleCategories, setVisibleCategories] = useState(15);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [offset, setOffset] = useState(0);
    const [hasMoreApps, setHasMoreApps] = useState(true);
    const [searchData, setsearchData] = useState([]);
    const [searchLoading, setsearchLoading] = useState(false);
    const [debounceValue, setdebounceValue] = useState(searchTerm);
    const router = useRouter();
    const currentCategory = router?.query?.currentcategory;
    const debouncedSearchTerm = useDebounce(searchTerm, 800);
    useEffect(() => {
        if (currentCategory) {
            setSelectedCategory(currentCategory);
        }
    }, [currentCategory]);

    useEffect(() => {
        if (selectedCategory) {
            if (selectedCategory != 'All') {
                setOffset(0);
            }
            fetchApps(selectedCategory, offset);
        }
    }, [offset, selectedCategory]);

    // debounce function
    function useDebounce(value, delay) {
        useEffect(() => {
            const handler = setTimeout(() => {
                setdebounceValue(value);
            }, delay);

            // Clean up the timeout if value changes or component unmounts
            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debounceValue;
    }
    const searchApps = async () => {
        if (debouncedSearchTerm) {
            setsearchLoading(true);
            try {
                const result = await fetchSearchResults(debouncedSearchTerm);
                console.log(result, 'dkjfgdjk');
                setsearchData(result);
            } catch (error) {
            } finally {
                setsearchLoading(false);
            }
        }
    };
    useEffect(() => {
        if (debouncedSearchTerm) {
            searchApps();
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        applyFilters();
    }, [apps, searchData, searchTerm]);

    const applyFilters = () => {
        if (searchData?.length > 0 && searchTerm && selectedCategory === 'All') {
            setSelectedApps(searchData);
        } else {
            setSelectedApps(apps);
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

            setHasMoreApps(newData?.length > 0);

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleLoadMoreApps = () => {
        if (apps?.length < 40) {
            return;
        } else {
            setVisibleApps(visibleApps + 40);
            if (visibleApps >= searchedApps.length && hasMoreApps) {
                setOffset(offset + 200);
                fetchApps(selectedCategory, offset + 200);
            }
        }
    };

    const handleLoadMoreCategories = () => {
        setVisibleCategories(visibleCategories + 10);
    };

    const openChatWidget = () => {
        window.chatWidget.open();
    };

    return (
        <div className="container flex flex-col gap-9 py-12">
            {pluginData?.length && (
                <>
                    <h1 className="lg:text-3xl  text-2xl md:text-3xl font-semibold">Integrate with specific service</h1>
                    <div className="flex  gap-2 justify-center items-center bg-white border  py-4 px-6 rounded-md w-fit">
                        <Image
                            className="w-[26px] h-[26px]"
                            src={pluginData[0]?.iconurl || 'https://placehold.co/40x40'}
                            width={40}
                            height={40}
                            alt={pluginData[0]?.name}
                        />
                        <h6 className="text-2xl font-bold capitalize">{pluginData[0]?.name}</h6>
                    </div>
                    <div className="px-8">
                        <MdAdd fontSize={46} />
                    </div>
                </>
            )}

            <div className=" flex gap-5 lg:flex-row flex-col ">
                {showCategories && (
                    <div className="flex flex-col gap-5">
                        <p className="lg:text-2xl md:text-xl text-lg font-medium">Category</p>
                        <select className="select w-full max-w-xs block lg:hidden bg-white">
                            {categories?.industries?.length &&
                                categories?.industries?.map((category, index) => <option>{category}</option>)}
                        </select>

                        <div className="lg:flex hidden flex-col lg:w-[240px] md:w-[240px]  gap-4">
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
                )}

                <div className="flex flex-col gap-5">
                    <div className="lg:w-[500px] md:w-[400px] w-[250px]">
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
                    <div className="flex flex-row flex-wrap gap-5">
                        {searchLoading ? (
                            <p>loading</p>
                        ) : searchedApps?.length || loading ? (
                            searchedApps.slice(0, visibleApps).map((app) => {
                                if (app?.appslugname) {
                                    return (
                                        <a
                                            key={app?.rowid}
                                            rel="noopener noreferrer"
                                            aria-label="apps"
                                            href={
                                                app?.appslugname
                                                    ? `/integrations${pluginData?.length && pluginData[0]?.appslugname ? '/' + pluginData[0]?.appslugname : ''}/${app?.appslugname}`
                                                    : `/noplugin`
                                            }
                                        >
                                            <div className="flex flex-row justify-center items-center gap-2 px-5 py-3 rounded border border-[#CCCCCC] bg-white">
                                                {app?.iconurl && (
                                                    <Image src={app?.iconurl} alt={app?.name} height={23} width={23} />
                                                )}
                                                <span className="text-base font-medium">{app?.name}</span>
                                            </div>
                                        </a>
                                    );
                                }
                            })
                        ) : (
                            <div className="flex flex-col gap-4 w-1/2">
                                <p className="text-gray-700 font-semibold text-xl">
                                    Can't find what you need? Let us know what you're looking for! We're always looking
                                    to expand our collection.
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
                    {(visibleApps < searchedApps?.length || hasMoreApps) && (
                        <button
                            onClick={() => {
                                if (visibleApps >= searchedApps?.length) {
                                    handleLoadMoreApps();
                                } else {
                                    setVisibleApps(visibleApps + 45);
                                }
                            }}
                            className="font-medium text-[#2D81F7] flex items-center"
                            aria-label="load more apps"
                        >
                            {loading ? (
                                <div className="skeleton w-[100px] h-[40px] bg-slate-200 rounded-sm"></div>
                            ) : (
                                <div className="flex items-center">
                                    Load More
                                    <MdKeyboardArrowDown fontSize={22} />
                                </div>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
