import Image from 'next/image';
import { useState } from 'react';
import { MdArrowDropDown, MdKeyboardArrowDown } from 'react-icons/md';

export default function IntegrationsEventsComp({ appOneDetails, appTwoDetails }) {
    const [visibleEvents, setVisibleEvents] = useState(6);
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
    return (
        <>
            <div className="cont items-start w-full gap-2">
                <div className="flex w-full gap-2">
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
        </>
    );
}
