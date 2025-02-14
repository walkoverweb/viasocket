import Navbar from '@/components/navbar/navbar';
import { NAVIGATION_FIELDS } from '@/const/fields';
import { getNavData } from '@/utils/getData';
import { CgArrowTopRight } from 'react-icons/cg';
import Industries from '@/assets/data/categories.json';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { MdArrowForward, MdClose, MdSearch } from 'react-icons/md';
import searchApps from '@/utils/searchApps';
import { CiSquarePlus } from 'react-icons/ci';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export default function AutomationSuggestions({ navData, initialIndus }) {
    const [selectedDomain, setSelectedDomain] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedApps, setSelectedApps] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [combinationLoading, setCombinationLoading] = useState(true);
    const debounceValue = useDebounce(searchTerm, 300);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const [renderCombos, setRenderCombos] = useState();
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [useCase, setUseCase] = useState('');

    const utm = '/index';

    const fetchAppsData = useCallback(async () => await fetchApps(), []);

    const filterSelectedApps = useCallback(
        (apps) =>
            apps?.filter((app) => !selectedApps.some((selectedApp) => selectedApp.appslugname === app.appslugname)) ||
            [],
        [selectedApps]
    );

    useEffect(() => {
        const fetchInitialApps = async () => {
            try {
                const apps = await fetchAppsData();
                setSearchData(filterSelectedApps(apps));
            } catch (error) {
                console.error(error);
            }
        };

        fetchInitialApps();
    }, [fetchAppsData, filterSelectedApps]);

    const handleGenerate = async () => {
        setCombinationLoading(true);

        const selectedAppSlugs = selectedApps.map((app) => app.appslugname);
        const industry = selectedIndustry || 'Dummy Industry';
        const domain = selectedDomain || 'Dummy domain';
        const useCaseData = useCase;

        try {
            const combos = await fetchCombos(
                selectedAppSlugs.length > 0 ? selectedAppSlugs : ['gohighlevel', 'slack', 'airtable'],
                industry,
                domain,
                useCaseData
            );
            setRenderCombos(combos?.data);
        } catch (error) {
            console.error('Error fetching combos:', error);
        } finally {
            setCombinationLoading(false);
        }
    };

    useEffect(() => {
        if (debounceValue !== '') {
            filterApps();
        }
    }, [debounceValue]);

    useEffect(() => {
        handleGenerate();
    }, []);

    const filterApps = async () => {
        setSearchLoading(true);
        try {
            if (debounceValue) {
                const result = await searchApps(debounceValue);
                setSearchData(filterSelectedApps(result));
            } else {
                const apps = await fetchAppsData();
                setSearchData(filterSelectedApps(apps));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleSelectApp = (appName) => {
        const app = searchData.find((app) => app.appslugname === appName);
        if (app) {
            setSelectedApps((prev) => [...prev, app]);
            setSearchData((prev) => prev.filter((item) => item.appslugname !== appName));
            setSearchTerm('');
            setShowAppDropdown(false);
        }
    };

    const [showAppDropdown, setShowAppDropdown] = useState(false);

    return (
        <div className="flex flex-col h-full md:h-screen ">
            <div className="container pb-2">
                <Navbar navData={navData} utm={'/index'} />
            </div>

            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                <div className="w-full md:w-1/2 py-10 md:py-0 px-10 flex flex-col justify-center bg-gradient-to-l from-[#def9f0] to-[#def9f0]">
                    <div className="flex flex-col gap-2 justify-start items-center text-lg w-full">
                        <div className="flex  items-center w-full group">
                            <h1 className="h1 text-nowrap">I use</h1>

                            <div className="ml-2 flex items-center gap-3 ">
                                {selectedApps.map((app) => (
                                    <div key={app.appslugname} className="flex items-center">
                                        {selectedApps.length === 1 ? (
                                            <span className="h1 text-red-500 ml-2">{app.name}</span>
                                        ) : (
                                            <Image
                                                src={app.iconurl || 'https://placehold.co/36x36'}
                                                width={36}
                                                height={36}
                                                alt={app.name}
                                                className="rounded-md"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {selectedApps.length === 0 || showAppDropdown ? (
                                <div className="relative overflow-visible">
                                    <input
                                        type="text"
                                        className="h1 ml-2 text-gray-400 border-none bg-transparent focus:outline-none w-[100px]"
                                        placeholder="App"
                                        value={searchTerm}
                                        onFocus={() => setShowAppDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowAppDropdown(false), 200)}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {showAppDropdown && (
                                        <ul
                                            tabIndex={0}
                                            className="absolute mt-2 bg-base-100 shadow-xl z-10 max-h-[290px] w-[300px] overflow-scroll p-0 border border-gray-300 rounded-lg"
                                        >
                                            {searchData?.length > 0 &&
                                                searchData.map((app, index) => (
                                                    <div
                                                        key={index}
                                                        className={`flex items-center gap-2 px-3 py-2 cursor-pointer w-[300px] ${
                                                            index === highlightedIndex ? 'bg-gray-200' : 'bg-white'
                                                        } hover:bg-gray-100`}
                                                        onClick={() => handleSelectApp(app?.appslugname)}
                                                        onMouseEnter={() => setHighlightedIndex(index)}
                                                    >
                                                        <Image
                                                            src={app?.iconurl || 'https://placehold.co/36x36'}
                                                            width={16}
                                                            height={16}
                                                            alt="ico"
                                                        />
                                                        <span>{app?.name}</span>
                                                    </div>
                                                ))}
                                        </ul>
                                    )}
                                </div>
                            ) : null}
                            {!showAppDropdown && (
                                <button
                                    className="flex h1 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4"
                                    onClick={() => setShowAppDropdown(true)}
                                >
                                    <CiSquarePlus size={30} />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col justify-start items-start w-full">
                            <div className="flex items-center">
                                <h1 className="h1 text-nowrap ">We're in the </h1>
                                <input
                                    type="text"
                                    className="h1 ml-2 text-gray-400 border-none bg-transparent focus:outline-none w-full"
                                    placeholder="Industry type"
                                    value={selectedDomain}
                                    onFocus={(e) => {
                                        e.target.classList.remove('text-gray-400');
                                        e.target.classList.add('text-red-500');
                                    }}
                                    onBlur={(e) => {
                                        if (!e.target.value) {
                                            e.target.classList.add('text-gray-400');
                                            e.target.classList.remove('text-red-500');
                                        } else {
                                            e.target.classList.add('text-red-500');
                                        }
                                    }}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-start items-start w-full">
                            <div className="flex items-center">
                                <h1 className="h1 text-nowrap">I run </h1>
                                <input
                                    type="text"
                                    className="h1 ml-2 text-gray-400 border-none bg-transparent focus:outline-none w-full"
                                    placeholder="domain.com"
                                    value={selectedIndustry}
                                    onFocus={(e) => {
                                        e.target.classList.remove('text-gray-400');
                                        e.target.classList.add('text-red-500');
                                    }}
                                    onBlur={(e) => {
                                        if (!e.target.value) {
                                            e.target.classList.add('text-gray-400');
                                            e.target.classList.remove('text-red-500');
                                        } else {
                                            e.target.classList.add('text-red-500');
                                        }
                                    }}
                                    onChange={(e) => setSelectedIndustry(e.target.value)}
                                />
                            </div>
                        </div>

                        <textarea
                            className="mt-6 p-4 w-full h-[150px] input input-bordered"
                            placeholder="eg: I run an eCommerce website and manage sales on Shopify and use Notion for database."
                            value={useCase}
                            onChange={(e) => setUseCase(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end items-center p-2 w-full">
                            <button className="btn btn-outline bg-black text-white" onClick={handleGenerate}>
                                Generate
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 bg-gray-100 flex flex-col overflow-y-auto h-full border-gray-400 border-2">
                    <div className="h-full flex flex-col justify-between ">
                        <ul className="divide-y divide-gray-300 space-y-6 flex-grow">
                            {!combinationLoading
                                ? renderCombos?.combinations?.map((combo) => {
                                      const triggerName = renderCombos?.plugins[combo?.trigger?.name].events.find(
                                          (event) => event.rowid === combo.trigger?.id
                                      )?.name;
                                      const actionName = renderCombos?.plugins[combo?.actions[0]?.name].events.find(
                                          (event) => event.rowid === combo.actions[0]?.id
                                      )?.name;

                                      const triggerIcon =
                                          renderCombos?.plugins[combo?.trigger?.name]?.iconurl ||
                                          'https://placehold.co/40x40';
                                      const actionIcon =
                                          renderCombos?.plugins[combo?.actions[0]?.name]?.iconurl ||
                                          'https://placehold.co/40x40';

                                      const integrations =
                                          renderCombos?.plugins[combo?.trigger?.name]?.rowid +
                                          ',' +
                                          renderCombos?.plugins[combo?.actions[0]?.name]?.rowid;

                                      return (
                                          <li key={combo.trigger?.id} className="p-4 flex items-center gap-4 relative">
                                              <img src={triggerIcon} alt="Trigger Icon" className="w-6 h-6" />
                                              <img src={actionIcon} alt="Action Icon" className="w-6 h-6" />
                                              <div className="flex-1">
                                                  <p className="text-lg flex items-center gap-2">
                                                      {triggerName} → {actionName}
                                                      <a
                                                          href={`${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${combo?.trigger?.id}/action?events=${combo?.actions.map((action) => action.id).join(',')}&integrations=${integrations}&action&utm_source=${utm}`}
                                                          className="text-gray-500 text-sm flex items-center"
                                                      >
                                                          Try It <CgArrowTopRight />
                                                      </a>
                                                  </p>
                                              </div>
                                          </li>
                                      );
                                  })
                                : Array.from({ length: 12 }).map((_, index) => (
                                      <li key={index} className="p-4 skeleton bg-gray-100 h-[100px]"></li>
                                  ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const randomIndex = Math.floor(Math.random() * Industries.industries.length);
    const initialIndus = Industries.industries[randomIndex];
    return {
        props: {
            navData: navData,
            initialIndus,
        },
    };
}

async function fetchApps(category) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=50${category && category !== 'All' ? `&category=${category}` : ''}`
    );
    const rawData = await response.json();
    return rawData?.data;
}

async function fetchCombos(pathArray, industry, domain, useCase) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/services?${pathArray.map((service) => `service=${service}`).join('&')}&industry=${industry && industry.toLowerCase()}&domain=${domain && domain.toLowerCase()}&useCase=${useCase && encodeURIComponent(useCase)}`
    );
    const responseData = await response.json();
    return responseData;
}
