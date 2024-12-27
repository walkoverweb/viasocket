import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdAdd, MdCheck, MdClose, MdKeyboardArrowDown } from 'react-icons/md';

export default function IntegrationsEventsComp({ combosData, appOneDetails, appTwoDetails }) {
    const [visibleEvents, setVisibleEvents] = useState(6);
    const [selectedTrigger, setSelectedTrigger] = useState();
    const [selectedAction, setSelectedAction] = useState();

    const actions = [];
    const trigger = [];

    const categorizeEvents = (events) => {
        events?.forEach((event) => {
            if (event.type === 'action') {
                actions.push(event);
            } else if (event.type === 'trigger') {
                trigger.push(event);
            }
        });
    };

    categorizeEvents(appOneDetails?.events);

    if (appTwoDetails) {
        categorizeEvents(appTwoDetails?.events);
    }
    function getIcons(appslugname) {
        const appOneSlug = appOneDetails?.appslugname;
        const appTwoSlug = appTwoDetails?.appslugname;

        if (appslugname === appOneSlug) {
            return appOneDetails?.iconurl || 'https://placehold.co/36x36';
        } else if (appslugname === appTwoSlug) {
            return appTwoDetails?.iconurl || 'https://placehold.co/36x36';
        } else {
            return 'https://placehold.co/36x36';
        }
    }
    function getAppDetail(appslugname) {
        const appOneSlug = appOneDetails?.appslugname;
        const appTwoSlug = appTwoDetails?.appslugname;

        if (appslugname === appOneSlug) {
            return appOneDetails;
        } else if (appslugname === appTwoSlug) {
            return appTwoDetails;
        } else {
            return {};
        }
    }
    return (
        <>
            {combosData ? (
                <>
                    <div className="cont items-start w-full gap-2">
                        <div className="flex w-full gap-2">
                            {trigger?.length > 0 && (
                                <div className="cont gap-2 w-full">
                                    <h3 className="h2">Triggers</h3>
                                    {trigger.slice(0, visibleEvents).map((event, index) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    setSelectedTrigger(event);
                                                }}
                                                key={index}
                                                className="p-4 border border-black flex gap-3 flex-col sm:flex-row items-start hover:bg-black hover:text-white cursor-pointer"
                                            >
                                                <Image
                                                    src={getIcons(event?.pluginslugname)}
                                                    width={36}
                                                    height={36}
                                                    alt={appOneDetails?.name}
                                                    className="h-6 w-fit"
                                                />
                                                <div className="cont gap-1 w-full">
                                                    <h3 className="font-semibold">{event?.name}</h3>
                                                    <p className="text-sm">{event?.description}</p>
                                                </div>
                                                {event.rowid === selectedTrigger?.rowid && (
                                                    <div className="text-green-600 flex h-full items-center justify-center">
                                                        <MdCheck fontSize={24} />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {actions?.length > 0 && (
                                <div className="cont gap-2 w-full  ">
                                    <h3 className="h2">Actions</h3>
                                    {actions.slice(0, visibleEvents).map((event, index) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    setSelectedAction(event);
                                                }}
                                                key={index}
                                                className="p-4 border border-black flex gap-3 flex-col sm:flex-row items-start hover:bg-black hover:text-white cursor-pointer"
                                            >
                                                <Image
                                                    src={getIcons(event?.pluginslugname)}
                                                    width={36}
                                                    height={36}
                                                    alt={appOneDetails?.name}
                                                    className="h-6 w-fit"
                                                />
                                                <div className="cont gap-1 w-full">
                                                    <h3 className="font-semibold">{event?.name}</h3>
                                                    <p className="text-sm">{event?.description}</p>
                                                </div>
                                                {event.rowid === selectedAction?.rowid && (
                                                    <div className="text-green-600 flex h-full items-center justify-center">
                                                        <MdCheck fontSize={24} />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        {(actions?.length >= visibleEvents || trigger >= visibleEvents) && (
                            <button
                                onClick={() => {
                                    setVisibleEvents(visibleEvents + 6);
                                }}
                                className="btn btn-outline "
                            >
                                Load More <MdKeyboardArrowDown fontSize={20} />
                            </button>
                        )}
                    </div>
                    {(selectedTrigger || selectedAction) && (
                        <div className="fixed bottom-0 left-0 w-full z-[99999] bg-white border border-black p-4 ">
                            <div className="container flex flex-col lg:flex-row items-center gap-3 justify-between">
                                <div className="flex items-center gap-4 w-full flex-col md:flex-row ">
                                    <div className="flex items-center gap-2 border border-black p-2 w-full min-h-12 min-w-[220px]">
                                        {selectedTrigger && (
                                            <>
                                                <Image
                                                    src={getIcons(selectedTrigger?.pluginslugname)}
                                                    width={36}
                                                    height={36}
                                                    alt={'Selected Trigger'}
                                                    className="h-6 w-fit"
                                                />
                                                <span className="w-full">{selectedTrigger?.name}</span>
                                                <span
                                                    className="w-fit hover:bg-black rounded-full p-1 hover:text-white cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedTrigger();
                                                    }}
                                                >
                                                    <MdClose fontSize={20} />
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <MdAdd fontSize={30} />
                                    <div className="flex items-center gap-2 border border-black p-2 w-full min-h-12 min-w-[220px]">
                                        {selectedAction && (
                                            <>
                                                <Image
                                                    src={getIcons(selectedAction?.pluginslugname)}
                                                    width={36}
                                                    height={36}
                                                    alt={'Selected Action'}
                                                    className="h-6 w-fit"
                                                />
                                                <span className="w-full">{selectedAction?.name}</span>
                                                <span
                                                    className="w-fit hover:bg-black rounded-full p-1 hover:text-white cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedAction();
                                                    }}
                                                >
                                                    <MdClose fontSize={20} />
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Link
                                        target="_blank"
                                        className={`btn btn-primary ${selectedAction && selectedTrigger ? '' : 'btn-disabled'}`}
                                        href={`https://flow.viasocket.com/makeflow/trigger/${selectedTrigger?.rowid}/action?events=${selectedAction?.rowid}`}
                                    >
                                        Try It
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setSelectedAction();
                                            setSelectedTrigger();
                                        }}
                                        className="btn btn-outline "
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="cont items-start w-full gap-2">
                    <div className="flex w-full gap-2">
                        {trigger?.length > 0 && (
                            <div className="cont gap-2 w-full">
                                <h3 className="h2">Triggers</h3>
                                {trigger.slice(0, visibleEvents).map((event, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="p-4 border border-black flex gap-3 flex-col sm:flex-row items-start"
                                        >
                                            <Image
                                                src={getIcons(event?.pluginslugname)}
                                                width={36}
                                                height={36}
                                                alt={appOneDetails?.name}
                                                className="h-8 w-fit"
                                            />
                                            <div className="cont gap-1">
                                                <h3 className="font-semibold">{event?.name}</h3>
                                                <p className="text-sm">{event?.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {actions?.length > 0 && (
                            <div className="cont gap-2 w-full  ">
                                <h3 className="h2">Actions</h3>
                                {actions.slice(0, visibleEvents).map((event, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="p-4 border border-black flex gap-3 flex-col sm:flex-row items-start"
                                        >
                                            <Image
                                                src={getIcons(event?.pluginslugname)}
                                                width={36}
                                                height={36}
                                                alt={appOneDetails?.name}
                                                className="h-8 w-fit"
                                            />
                                            <div className="cont gap-1">
                                                <h3 className="font-semibold">{event?.name}</h3>
                                                <p className="text-sm">{event?.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {(actions?.length >= visibleEvents || trigger >= visibleEvents) && (
                        <button
                            onClick={() => {
                                setVisibleEvents(visibleEvents + 6);
                            }}
                            className="btn btn-outline "
                        >
                            Load More <MdKeyboardArrowDown fontSize={20} />
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
