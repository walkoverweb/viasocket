import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdAdd, MdChevronRight, MdOutlineAdsClick, MdOutlineKeyboardArrowDown, MdOutlineTaskAlt } from 'react-icons/md';

import { FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';
import GetStarted from '@/components/getStarted/getStarted';
import { getDbdashData } from '@/pages/api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { GetColorMode } from '@/utils/getColorMode';
import IntegrationHero from '@/components/integrations/integrationHero';
import FAQSection from '@/components/faqSection/faqSection';
import BlogGrid from '@/components/blogGrid/blogGrid';

const IntegrationSlugPage = ({ getStartedData, combos, apps, pathArray, metaData, faqData }) => {
    const [newBrandColor, setNewBrandColor] = useState('#F6F4EE');
    const [mode, setMode] = useState('dark');
    useEffect(() => {
        if (combos?.plugins?.[pathArray[2]]?.brandcolor) {
            setNewBrandColor(combos?.plugins?.[pathArray[2]]?.brandcolor);
        }
    }, []);
    useEffect(() => {
        setMode(GetColorMode(newBrandColor));
    }, [newBrandColor]);

    //defined states
    const [pluginOne, setPluginOne] = useState();
    const [pluginTwo, setPluginTwo] = useState();
    const [filteredData, setFilteredData] = useState([]);
    const [visibleComboItems, setVisibleComboItems] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const [plugin, setPlugin] = useState([]);

    const router = useRouter();
    const cardsData = combos?.combinations;

    useEffect(() => {
        setPlugin([combos?.plugins?.[pathArray[2]], combos?.plugins?.[pathArray[3]]]);

        setPluginOne(combos?.plugins?.[pathArray[2]]);
        setPluginTwo(combos?.plugins?.[pathArray[3]]);
    }, [combos, pathArray[2]]);

    useEffect(() => {
        if (pathArray[2] === pathArray[3]) {
            router.push('/404');
        }
    }, [pathArray[3]]);

    //fetch icons
    const getIconUrl = (pluginName) => {
        if (cardsData) {
            const plugin = combos?.plugins[pluginName];
            return plugin ? plugin.iconurl : null;
        }
    };

    const handleComboLoadMore = () => {
        setVisibleComboItems(visibleComboItems + 3);
    };

    //search functions
    const applyFilters = () => {
        let filteredItems = apps.filter(
            (item) => item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(filteredItems);
    };

    useEffect(() => {
        applyFilters();
    }, [apps, searchTerm]);

    const handleLocalStore = (appName) => {
        localStorage.setItem('selectedAppName', appName);
    };

    //find actions and trigers
    const actionEvents = [];
    const triggerEvent = [];
    if (pathArray.length > 2) {
        [pathArray[2], pathArray[3]].forEach((path) => {
            if (combos?.plugins?.[path]?.events) {
                combos.plugins[path].events.forEach((event) => {
                    if (event.type === 'action') {
                        actionEvents.push(event);
                    } else if (event.type === 'trigger') {
                        triggerEvent.push(event);
                    }
                });
            }
        });
    }

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
    const [hoveredActionCardIndex, setHoveredActionCardIndex] = useState(null);
    const [selectedActionCardIndex, setSelectedActionCardIndex] = useState(null);
    const [selectedTrigger, setSelectedTrigger] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [showFixedSection, setShowFixedSection] = useState(true);
    const [selectedTriggerImage, setSelectedTriggerImage] = useState(null);
    const [selectedActionImage, setSelectedActionImage] = useState(null);
    const [cnt, setCnt] = useState(0);

    const handleCancelClick = () => {
        setShowFixedSection(false);
        setSelectedTrigger(null);
        setSelectedAction(null);
        setShowFixedSection(false);
        setSelectedCardIndex(null);
        setSelectedActionCardIndex(null);
    };

    const handleCardClick = (index) => {
        setSelectedCardIndex(index === selectedCardIndex ? null : index);
        setSelectedTrigger(index);
        setShowFixedSection(true);
        setSelectedTriggerImage(index !== null ? combos?.plugins[triggerEvent[index].pluginslugname]?.iconurl : null);
    };

    const handleActionCardClick = (index) => {
        setSelectedActionCardIndex(index === selectedActionCardIndex ? null : index);
        setSelectedAction(index);
        setShowFixedSection(true);
        setSelectedActionImage(index !== null ? combos?.plugins[actionEvents[index].pluginslugname]?.iconurl : null);
    };

    useEffect(() => {
        setCnt(selectedCardIndex !== null && selectedActionCardIndex !== null ? 2 : 1);
    }, [selectedCardIndex, selectedActionCardIndex]);

    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [searchDropdownTerm, setSearchDropdownTerm] = useState('');
    const handleAppClick = (app) => {
        handleLocalStore(app?.name);
        setSelectedApp(app);
        setCategoryDropdownOpen(false);
        setSearchDropdownTerm('');
    };

    const filteredDropdownData = useMemo(() => {
        return filteredData
            .filter((item) => item.name && item.name.toLowerCase().includes(searchDropdownTerm.toLowerCase()))
            .slice(0, 11);
    }, [filteredData, searchDropdownTerm]);

    const getEventDescription = (eventId) => {
        const plugins = combos?.plugins;
        for (const pluginName in plugins) {
            const events = plugins[pluginName]?.events;
            if (events) {
                const event = events.find((e) => e.rowid === eventId);
                if (event) {
                    return event.name;
                }
            }
        }
        return null;
    };

    return (
        <>
            <MetaHeadComp
                metaData={metaData}
                plugin={plugin}
                page={'/integrations/AppOne/AppTwo'}
                pathArray={pathArray}
            />
            <IntegrationHero plugin={plugin} combos={combos} mode={mode} />
            <div>
                <div className="bg-white">
                    {triggerEvent.length > 2 && actionEvents.length > 2 && (
                        <>
                            <div className="container py-20">
                                <h1 className="flex text-3xl font-semibold">
                                    {`Automate anything with ${pathArray[2]} & ${pathArray[3]}${' '}Integrations!`}
                                </h1>

                                <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-20">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <MdOutlineAdsClick size={24} />
                                            <h5 className=" text-xl font-bold ">When this happens</h5>
                                            <p className="text-sm text-red-600 bg-red-200 px-3 py-1 rounded-full font-normal">
                                                Triggers
                                            </p>
                                        </div>
                                        {triggerEvent.length > 0 &&
                                            triggerEvent.map((card, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex gap-6 justify-between items-center bg-white py-3 px-6 border border-[#CCCCCC] rounded-lg cursor-pointer relative hover:drop-shadow-lg ${
                                                        selectedCardIndex === index ? 'selected-card' : ''
                                                    }`}
                                                    onClick={() => {
                                                        if (selectedCardIndex === index) {
                                                            handleCardClick(null);
                                                            setCnt(cnt - 1);
                                                        } else {
                                                            handleCardClick(index);
                                                            setCnt(cnt + 1);
                                                        }
                                                    }}
                                                    onMouseEnter={() => setHoveredCardIndex(index)}
                                                    onMouseLeave={() => setHoveredCardIndex(null)}
                                                >
                                                    <div className="flex flex-1 flex-row items-center gap-4">
                                                        <Image
                                                            src={
                                                                combos?.plugins[card?.pluginslugname]?.iconurl
                                                                    ? combos?.plugins[card?.pluginslugname]?.iconurl
                                                                    : 'https://placehold.co/40x40'
                                                            }
                                                            width={38}
                                                            height={38}
                                                            className="w-[36px] h-[36px]"
                                                            alt={combos?.plugins[card?.pluginslugname]}
                                                        />
                                                        <div className="flex flex-col ">
                                                            <h6 className="text-lg font-semibold ">{card?.name}</h6>
                                                            <p className=" text-md font-normal ">{card?.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-[10px]">
                                                        {selectedCardIndex === index ? (
                                                            <FaCheckCircle className="text-[#1A73E8]" size={20} />
                                                        ) : (
                                                            hoveredCardIndex === index && <FaRegCheckCircle size={20} />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <MdOutlineTaskAlt size={24} />
                                            <h5 className="text-xl font-bold ">Do this</h5>
                                            <p className="text-sm text-blue-600 bg-blue-200 px-3 py-1 rounded-full font-normal">
                                                Actions
                                            </p>
                                        </div>
                                        {actionEvents.length > 0 &&
                                            actionEvents.map((card, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex gap-6 justify-between items-center bg-white py-3 px-6 border border-[#CCCCCC] rounded-lg cursor-pointer relative hover:drop-shadow-lg ${
                                                        selectedActionCardIndex === i ? 'selected-card' : ''
                                                    }`}
                                                    onClick={() => {
                                                        if (selectedActionCardIndex === i) {
                                                            handleActionCardClick(null);
                                                            setCnt(cnt - 1);
                                                        } else {
                                                            handleActionCardClick(i);
                                                            setCnt(cnt + 1);
                                                        }
                                                    }}
                                                    onMouseEnter={() => setHoveredActionCardIndex(i)}
                                                    onMouseLeave={() => setHoveredActionCardIndex(null)}
                                                >
                                                    <div className="flex flex-1 flex-row items-center gap-4">
                                                        <Image
                                                            src={
                                                                combos?.plugins[card?.pluginslugname]?.iconurl
                                                                    ? combos?.plugins[card?.pluginslugname]?.iconurl
                                                                    : 'https://placehold.co/40x40'
                                                            }
                                                            width={38}
                                                            height={38}
                                                            className="w-[36px] h-[36px]"
                                                            alt={combos?.plugins[card?.pluginslugname]}
                                                        />
                                                        <div className="flex flex-col ">
                                                            <h6 className="text-lg font-semibold ">{card?.name}</h6>
                                                            <p className=" text-md font-normal ">{card?.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className=" w-[10px] ">
                                                        {selectedActionCardIndex === i ? (
                                                            <FaCheckCircle className="text-[#1A73E8] " size={20} />
                                                        ) : (
                                                            hoveredActionCardIndex === i && (
                                                                <FaRegCheckCircle size={20} />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {(selectedTrigger !== null || selectedAction !== null) && cnt >= 1 && showFixedSection && (
                    <div className={`bg-white ${cnt < 1 ? 'hidden' : 'fixed'} bottom-0 w-[100%] z-30`}>
                        <div className="container flex flex-wrap lg:justify-between gap-6 items-center py-4 ">
                            <div className="flex flex-row flex-wrap items-center gap-4">
                                <div className="flex flex-row gap-4 bg-white border px-5 py-2 rounded-lg w-[400px] items-center">
                                    {selectedTrigger !== null ? (
                                        <>
                                            <Image
                                                src={selectedTriggerImage}
                                                alt="alt"
                                                height={30}
                                                width={30}
                                                className="h-[30px] w-[30px]"
                                            />
                                            <h1 className="lg:text-xl md:text-lg text-base font-semibold">
                                                {triggerEvent[selectedTrigger]?.name}
                                            </h1>
                                        </>
                                    ) : (
                                        <p className="text-xl font-semibold text-[#808080]">Select Trigger</p>
                                    )}
                                </div>

                                <div className="lg:text-xl text-lg ">
                                    <MdAdd size={20} />
                                </div>

                                <div className="flex flex-row items-center gap-4 bg-white border px-5 py-2 rounded-lg w-[400px]">
                                    {selectedAction !== null ? (
                                        <>
                                            <Image
                                                src={selectedActionImage}
                                                alt={actionEvents[selectedAction]?.name}
                                                height={30}
                                                width={30}
                                                className="h-[30px] w-[30px]"
                                            />
                                            <h1 className="lg:text-xl md:text-lg text-base font-semibold">
                                                {actionEvents[selectedAction]?.name}
                                            </h1>
                                        </>
                                    ) : (
                                        <p className="lg:text-xl md:text-lg text-base font-semibold text-[#808080]">
                                            Select Action
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-row gap-3">
                                <div>
                                    <button
                                        className="btn md:btn-md btn-sm lg:text-base bg-black text-white p-2 rounded"
                                        onClick={handleCancelClick}
                                        aria-label="cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <Link
                                        href={`https://flow.viasocket.com/makeflow/trigger/${triggerEvent[selectedTrigger]?.rowid}/action/${actionEvents[selectedAction]?.rowid}`}
                                        target="_blank"
                                        aria-label="try the combination"
                                    >
                                        <button
                                            className="btn md:btn-md btn-sm lg:text-base bg-black text-white p-2 rounded"
                                            disabled={cnt !== 2}
                                            aria-label="try the combination"
                                        >
                                            Try it now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white py-20 ">
                    {faqData && faqData.length > 0 && (
                        <div className="container">
                            <FAQSection faqData={faqData} faqName={`[doubleApp]`} />
                        </div>
                    )}
                </div>

                <div className=" py-20">
                    <div className="flex lg:flex-row md:flex-row flex-col gap-10 container justify-between">
                        <div className="flex flex-1 flex-col justify-start gap-4">
                            <Image
                                src={pluginOne?.iconurl ? pluginOne?.iconurl : 'https://placehold.co/40x40'}
                                width={34}
                                height={34}
                                alt={combos?.plugins?.[pathArray[2]]?.name}
                            />
                            <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">
                                {`About ${combos?.plugins?.[pathArray[2]]?.name}`}
                            </h6>
                            <p className="md:text-xl text-base">{pluginOne?.description}</p>
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

                        <div>
                            {' '}
                            <UseCase />
                        </div>
                        <div className="flex flex-1 flex-col justify-start gap-4">
                            <Image
                                src={pluginTwo?.iconurl ? pluginTwo?.iconurl : 'https://placehold.co/40x40'}
                                width={34}
                                height={34}
                                alt={combos?.plugins?.[pathArray[3]]?.name}
                            />
                            <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">
                                {`About ${combos?.plugins?.[pathArray[3]]?.name}`}
                            </h6>
                            <p className="md:text-xl text-base">{pluginTwo?.description}</p>
                            <div>
                                <Link
                                    href={
                                        combos?.plugins?.[pathArray[3]]?.domain.startsWith('http')
                                            ? combos?.plugins?.[pathArray[3]]?.domain
                                            : 'http://' + combos?.plugins?.[pathArray[3]]?.domain
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
                    </div>
                </div>

                <div className="bg-[#E6E6E6] py-10">
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
            </div>
        </>
    );
};

export default IntegrationSlugPage;
export async function getServerSideProps(context) {
    const { params } = context;
    const pathArray = [params.appslugname, params.pageslug];

    const combos = await fetchCombos(pathArray);
    const apps = await fetchApps('All', 25);

    const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
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
              }&limit=${visibleItems}`
            : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=${visibleItems}`;

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
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pathArray[0]}&service=${pathArray[1]}`,
        apiHeaders
    );
    const responseData = await response.json();
    return responseData;
}
