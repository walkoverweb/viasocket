import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';
import { MdAdd, MdOutlineAdsClick, MdOutlineTaskAlt } from 'react-icons/md';

export default function DoubleAppEvents({ pathSlugs, plugins }) {
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

    const getIconUrl = (plugin) => {
        const iconUrl = plugins.find((plug) => plug?.appslugname === plugin)?.iconurl || 'https://placehold.co/40x40';
        return iconUrl;
    };

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
        setSelectedTriggerImage(index !== null ? getIconUrl(triggerEvent[index]?.pluginslugname) : null);
    };

    const handleActionCardClick = (index) => {
        setSelectedActionCardIndex(index === selectedActionCardIndex ? null : index);
        setSelectedAction(index);
        setShowFixedSection(true);
        setSelectedActionImage(index !== null ? getIconUrl(actionEvents[index]?.pluginslugname) : null);
    };

    useEffect(() => {
        setCnt(selectedCardIndex !== null && selectedActionCardIndex !== null ? 2 : 1);
    }, [selectedCardIndex, selectedActionCardIndex]);
    const actionEvents = [];
    const triggerEvent = [];
    if (plugins.length >= 2) {
        plugins.forEach((path) => {
            if (path?.events) {
                path.events.forEach((event) => {
                    if (event.type === 'action') {
                        actionEvents.push(event);
                    } else if (event.type === 'trigger') {
                        triggerEvent.push(event);
                    }
                });
            }
        });
    }

    return (
        <>
            <div className="bg-white">
                {triggerEvent?.length > 2 && actionEvents?.length > 2 && (
                    <>
                        <div className="container py-20">
                            <h2 className="flex text-3xl font-semibold">
                                {`Automate anything with ${pathSlugs[0]} & ${pathSlugs[1]}${' '}Integrations!`}
                            </h2>

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
                                                        src={getIconUrl(card?.pluginslugname)}
                                                        width={38}
                                                        height={38}
                                                        className="w-[36px] h-[36px]"
                                                        alt={card?.pluginslugname}
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
                                                        src={getIconUrl(card?.pluginslugname)}
                                                        width={38}
                                                        height={38}
                                                        className="w-[36px] h-[36px]"
                                                        alt={card?.pluginslugname}
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
                                                        hoveredActionCardIndex === i && <FaRegCheckCircle size={20} />
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
                    <div className="container flex gap-6 flex-wrap lg:justify-start items-start py-4 ">
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
                                        <h2 className="lg:text-xl md:text-lg text-base font-semibold">
                                            {triggerEvent[selectedTrigger]?.name}
                                        </h2>
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
                                        <h2 className="lg:text-xl md:text-lg text-base font-semibold">
                                            {actionEvents[selectedAction]?.name}
                                        </h2>
                                    </>
                                ) : (
                                    <p className="lg:text-xl md:text-lg text-base font-semibold text-[#808080]">
                                        Select Action
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-row gap-3 item-start">
                            <div>
                                <Link
                                    href={`https://flow.viasocket.com/makeflow/trigger/${triggerEvent[selectedTrigger]?.rowid}/action?events=${actionEvents[selectedAction]?.rowid}`}
                                    target="_blank"
                                    aria-label="try the combination"
                                >
                                    <button
                                        className="btn md:btn-md btn-sm lg:text-base bg-black text-white p-2 rounded hover:bg-black hover:text-white"
                                        disabled={cnt !== 2}
                                        aria-label="try the combination"
                                    >
                                        Try it now
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <button
                                    className="btn md:btn-md btn-sm lg:text-base bg-gray-200 text-black p-2 rounded hover:bg-black hover:text-white"
                                    onClick={handleCancelClick}
                                    aria-label="cancel"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
