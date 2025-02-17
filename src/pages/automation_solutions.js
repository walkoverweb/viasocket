import Navbar from '@/components/navbar/navbar';
import { FOOTER_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import { getFooterData, getNavData } from '@/utils/getData';
import { CgArrowTopRight } from 'react-icons/cg';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import searchApps from '@/utils/searchApps';
import { CiSquarePlus } from 'react-icons/ci';
import Footer from '@/components/footer/footer';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export default function AutomationSuggestions({ navData, footerData }) {
    const [selectedDomain, setSelectedDomain] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedApps, setSelectedApps] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [combinationLoading, setCombinationLoading] = useState(true);
    const debounceValue = useDebounce(searchTerm, 300);

    const [renderCombos, setRenderCombos] = useState([]);
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
        const useCaseData = useCase || 'use case';
        try {
            const combos = await fetchCombos(
                selectedAppSlugs.length > 0 ? selectedAppSlugs : ['gohighlevel', 'slack', 'airtable'],
                industry,
                domain,
                useCaseData
            );
            console.log(combos, ' asoifhoiasfoih');
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
        }
    };

    const handleSelectApp = (app) => {
        setSelectedApps((prev) => {
            const exists = prev.some((selected) => selected.appslugname === app.appslugname);
            if (exists) {
                return prev.filter((item) => item.appslugname !== app.appslugname);
            }
            return [...prev, { ...app }];
        });
    };

    const [showAppDropdown, setShowAppDropdown] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowAppDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    console.log(renderCombos, 1234);

    return (
        <>
            <div className="container pb-10">
                <Navbar navData={navData} utm={'/index'} />
            </div>
            <div className="flex flex-col h-full md:h-screen mb-36">
                <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                    <div className="w-full md:w-1/2 py-10 md:py-0 px-10 flex flex-col justify-center bg-gradient-to-l from-[#def9f0] to-[#def9f0]">
                        <div className="flex flex-col gap-2 justify-start items-start text-lg w-fit">
                            <div className="flex items-center w-full group">
                                <h1 className="h1 text-nowrap">I use</h1>

                                <div className="ml-2 flex items-center gap-3">
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
                                    <div className="relative overflow-visible" ref={dropdownRef}>
                                        <input
                                            type="text"
                                            className="h1 ml-2 text-gray-400 border-none bg-transparent focus:outline-none w-full"
                                            placeholder="App"
                                            value={searchTerm}
                                            onFocus={() => setShowAppDropdown(true)}
                                            onBlur={() => setTimeout(() => setShowAppDropdown(false), 300)}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        {showAppDropdown && (
                                            <ul className="absolute mt-2 bg-base-100 shadow-xl z-10 max-h-[290px] w-[300px] overflow-scroll p-0 border border-gray-300 rounded-lg">
                                                {selectedApps.map((app) => (
                                                    <DropdownItem
                                                        key={app.appslugname}
                                                        app={app}
                                                        isChecked={true}
                                                        handleSelect={handleSelectApp}
                                                    />
                                                ))}
                                                {searchData
                                                    ?.filter(
                                                        (app) =>
                                                            !selectedApps.some(
                                                                (selected) => selected.appslugname === app.appslugname
                                                            )
                                                    )
                                                    .map((app, index) => (
                                                        <DropdownItem
                                                            key={index}
                                                            app={app}
                                                            isChecked={false}
                                                            handleSelect={handleSelectApp}
                                                        />
                                                    ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        className="flex h1 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4"
                                        onClick={() => setShowAppDropdown(true)}
                                    >
                                        <CiSquarePlus size={30} />
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-start items-start">
                                <h1 className="h1 text-nowrap ">We're in the </h1>
                                <input
                                    type="text"
                                    className="h1 ml-0 sm:ml-2 md:ml-0 lg:ml-2 text-gray-400 border-none bg-transparent focus:outline-none w-full "
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
                            <div className="flex flex-col">
                                {combinationLoading ? (
                                    <>
                                        <div className="flex rounded-none justify-center items-center w-full h-[86px] p-4 skeleton bg-slate-100 border-b"></div>
                                        <div className="flex rounded-none justify-center items-center w-full h-[86px] p-4 skeleton bg-slate-100 border-b"></div>
                                        <div className="flex rounded-none justify-center items-center w-full h-[86px] p-4 skeleton bg-slate-100 border-b"></div>
                                        <div className="flex rounded-none justify-center items-center w-full h-[86px] p-4 skeleton bg-slate-100 border-b"></div>
                                        <div className="flex rounded-none justify-center items-center w-full h-[86px] p-4 skeleton bg-slate-100 border-b"></div>
                                        <div className="flex rounded-none justify-center items-center w-full h-[86px] p-4 skeleton bg-slate-100 border-b"></div>
                                        <div className="flex rounded-none justify-center items-center w-full h-[86px] p-4 skeleton bg-slate-100 border-b"></div>
                                        <div className="flex rounded-none justify-center items-center w-full h-[86px] p-4 skeleton bg-slate-100 border-b"></div>
                                        <div className="flex rounded-none justify-center items-center w-full h-[86px] p-4 skeleton bg-slate-100 border-b"></div>
                                    </>
                                ) : (
                                    renderCombos?.combinations?.map((combo) => {
                                        const triggerName = renderCombos?.plugins[combo?.trigger?.name]?.events?.find(
                                            (event) => event?.rowid === combo.trigger?.id
                                        )?.name;
                                        const actionName = renderCombos?.plugins[combo?.actions[0]?.name]?.events?.find(
                                            (event) => event?.rowid === combo?.actions[0]?.id
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
                                            <a
                                                target="blank"
                                                href={`${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${combo?.trigger?.id}/action?events=${combo?.actions.map((action) => action.id).join(',')}&integrations=${integrations}&action&utm_source=${utm}`}
                                                // key={combo.trigger?.id}
                                                className="px-4 py-6 flex items-center gap-4 border-b hover:bg-white "
                                            >
                                                <img src={triggerIcon} alt="Trigger Icon" className="w-6 h-6" />
                                                <img src={actionIcon} alt="Action Icon" className="w-6 h-6" />
                                                <div className="flex gap-4 items-center justify-between w-full">
                                                    <p className="text-lg flex items-center gap-2">
                                                        {triggerName} → {actionName}
                                                    </p>
                                                    <span className="text-gray-500 text-sm flex items-center">
                                                        Try It <CgArrowTopRight />
                                                    </span>
                                                </div>
                                            </a>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pb-10">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}

const DropdownItem = ({ app, isChecked, handleSelect }) => (
    <div
        className={`flex items-center gap-2 px-3 py-2 cursor-pointer w-[300px] hover:bg-gray-100 ${
            isChecked ? 'bg-gray-200' : 'bg-white'
        }`}
        onClick={() => handleSelect(app)}
    >
        <input
            type="checkbox"
            checked={isChecked}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleSelect(app)}
        />
        <Image src={app?.iconurl || 'https://placehold.co/36x36'} width={16} height={16} alt="ico" />
        <span>{app?.name}</span>
    </div>
);

export async function getServerSideProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    return {
        props: {
            navData: navData,
            footerData: footerData,
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
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/services?${pathArray.map((service) => `service=${service}`).join('&')}&industry=${industry && industry.toLowerCase()}&domain=${domain && domain.toLowerCase()}&usecase=${useCase && encodeURIComponent(useCase)}`,
        {
            cache: 'no-cache',
        }
    );
    const responseData = await response.json();
    return responseData;
}
