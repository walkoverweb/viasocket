import Image from 'next/image';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md';
import categories from '@/assets/data/categories.json';
import Link from 'next/link';
import { useRouter } from 'next/router';
import fetchSearchResults from '@/utils/searchIntegrationApps';
export default function IntegrationsApps({ pluginData, showCategories }) {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedApps, setSearchedApps] = useState([]);
    const [visibleApps, setVisibleApps] = useState(40);
    const [visibleCategories, setVisibleCategories] = useState(15);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [offset, setOffset] = useState(0);
    const [searchData, setSearchData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [available, setAvailable] = useState(false);
    const [categorySearchTerm, setCategorySearchTerm] = useState('');
    const router = useRouter();
    const currentCategory = router?.query?.currentcategory;

    const debounceValue = useDebounce(searchTerm, 300);
    useEffect(() => {
        if (currentCategory) {
            setSelectedCategory(currentCategory);
        }
    }, [currentCategory]);

    useEffect(() => {
        if (selectedCategory) {
            if (selectedCategory !== 'All') {
                setOffset(0);
            }
            fetchApps(selectedCategory, offset);
        }
    }, [offset, selectedCategory]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (selectedCategory && showCategories) {
            const newUrl = `${window.location.pathname}?currentcategory=${selectedCategory}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        }

        setVisibleApps(40);
    }, [selectedCategory]);

    useEffect(() => {
        if (debounceValue) {
            searchApps();
        }
    }, [debounceValue]);

    useEffect(() => {
        applyFilters();
    }, [apps, searchData, searchTerm]);

    const fetchApps = async (category, offset) => {
        setLoading(true);
        let finalCategory =
            typeof category === 'string' ? category : category?.props?.href?.split('?')[1].split('=')[1];
        try {
            const fetchUrl =
                finalCategory && finalCategory !== 'All'
                    ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${finalCategory}`
                    : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200&offset=${offset}`;

            const response = await fetch(fetchUrl, {
                headers: { 'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY },
            });

            if (!response.ok) throw new Error('Failed to load data');

            const rawData = await response.json();
            const newData = rawData.data;

            setApps((prevApps) => (offset === 0 ? newData : [...prevApps, ...newData]));
            setAvailable(newData?.length >= 0);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const searchApps = async () => {
        if (debounceValue) {
            setSearchLoading(true);
            try {
                const result = await fetchSearchResults(debounceValue);
                setSearchData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setSearchLoading(false);
            }
        }
    };

    const applyFilters = useCallback(() => {
        const filterItems = (items) =>
            items.filter((item) => !item?.name?.toLowerCase().includes(pluginData[0]?.appslugname.toLowerCase()));
        if (searchData?.length > 0 && searchTerm && selectedCategory === 'All') {
            setSearchedApps(pluginData ? filterItems(searchData) : searchData);
        } else {
            setSearchedApps(pluginData ? filterItems(apps) : apps);
        }
    }, [apps, searchData, searchTerm, selectedCategory, pluginData]);

    const handleLoadMoreApps = () => {
        if (apps?.length >= 40) {
            setVisibleApps(visibleApps + 40);
        }
    };
    useEffect(() => {
        if (visibleApps >= searchedApps.length) {
            setOffset(offset + 200);
        }
    }, [visibleApps]);

    const handleLoadMoreCategories = () => {
        setVisibleCategories(visibleCategories + 10);
    };

    const openChatWidget = () => {
        window.chatWidget.open();
    };
    const filteredCategories = categories?.categories?.filter((category) =>
        category.toLowerCase().includes(categorySearchTerm.toLowerCase())
    );

    return (
        <div className="container flex flex-col gap-9 py-12">
            {pluginData?.length && (
                <>
                    <h2 className="lg:text-3xl text-2xl md:text-3xl font-semibold">Integrate with specific service</h2>
                    <div className="flex gap-2 justify-center items-center bg-white border py-4 px-6 rounded-md w-fit">
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

            <div className="flex gap-5 lg:flex-row flex-col">
                {showCategories && (
                    <div className="flex flex-col gap-5">
                        <p className="lg:text-2xl md:text-xl text-lg font-medium">Category</p>
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
                                className="lg:w-[200px] md:w-[150px] sm:w-[100px]"
                                placeholder="Search Category"
                                value={categorySearchTerm}
                                onChange={(e) => setCategorySearchTerm(e.target.value)}
                            />
                        </label>
                        <select className="select w-full max-w-xs block lg:hidden bg-white">
                            {filteredCategories?.map((category, index) => (
                                <option key={index}>{category}</option>
                            ))}
                        </select>

                        <div className="lg:flex hidden flex-col lg:w-[240px] md:w-[240px] gap-4">
                            {filteredCategories?.slice(0, visibleCategories).map((category, index) => {
                                return (
                                    <h6
                                        key={index}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`lg:text-[20px] text-base cursor-pointer ${selectedCategory === category ? 'font-bold' : 'font-normal'}`}
                                    >
                                        {category === 'Null' ? 'Other' : category}
                                    </h6>
                                );
                            })}

                            {filteredCategories?.length > visibleCategories && (
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
                            Array.from({ length: 20 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row justify-center items-center gap-2 px-5 py-3 rounded border border-[#CCCCCC] bg-white animate-pulse"
                                >
                                    <div className="h-6 w-6 bg-gray-300 rounded"></div>
                                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                </div>
                            ))
                        ) : searchedApps?.length || loading ? (
                            <>
                                {searchedApps?.length > 0 &&
                                    searchedApps.slice(0, visibleApps).map(
                                        (app, index) =>
                                            app?.appslugname && (
                                                <a
                                                    key={index}
                                                    rel="noopener noreferrer"
                                                    aria-label="apps"
                                                    href={`/integrations${pluginData?.length && pluginData[0]?.appslugname ? '/' + pluginData[0]?.appslugname : ''}/${app?.appslugname}`}
                                                >
                                                    <div className="flex flex-row justify-center items-center gap-2 px-5 py-3 rounded border border-[#CCCCCC] bg-white">
                                                        {app?.iconurl && (
                                                            <Image
                                                                src={app?.iconurl}
                                                                alt={app?.name}
                                                                height={23}
                                                                width={23}
                                                            />
                                                        )}
                                                        <span className="text-base font-medium">{app?.name}</span>
                                                    </div>
                                                </a>
                                            )
                                    )}
                                {loading &&
                                    Array.from({ length: 20 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-row justify-center items-center gap-2 px-5 py-3 rounded border border-[#CCCCCC] bg-white animate-pulse"
                                        >
                                            <div className="h-6 w-6 bg-gray-300 rounded"></div>
                                            <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                        </div>
                                    ))}
                            </>
                        ) : (
                            !loading && (
                                <div className="flex flex-col gap-4 w-1/2">
                                    <p className="text-gray-700 font-semibold text-xl">
                                        Can't find what you need? Let us know what you're looking for! We're always
                                        looking to expand our collection.
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
                            )
                        )}
                    </div>
                    {available && visibleApps < searchedApps?.length && (
                        <button
                            onClick={() => {
                                if (visibleApps >= searchedApps?.length) {
                                    handleLoadMoreApps();
                                } else {
                                    setVisibleApps(visibleApps + 45);
                                }
                            }}
                            className="flex items-center gap-2 text-blue-500 font-medium cursor-pointer w-fit"
                            aria-label="load more apps"
                        >
                            {' '}
                            Load More
                            <MdKeyboardArrowDown fontSize={22} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
