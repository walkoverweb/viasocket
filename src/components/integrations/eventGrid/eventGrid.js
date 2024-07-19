import Image from 'next/image';
import { useEffect, useState } from 'react';
import style from './eventGrid.module.scss';

export default function EventGrid({ plugin, mode }) {
    if (plugin.length > 0) {
        const [actionEvents, setActionEvents] = useState([]);
        const [triggerEvent, setTriggerEvent] = useState([]);

        useEffect(() => {
            const newActionEvents = [];
            const newTriggerEvents = [];
            plugin?.map((plug) => {
                plug?.events.forEach((event) => {
                    if (event.type === 'action') {
                        newActionEvents.push(event);
                    } else if (event.type === 'trigger') {
                        newTriggerEvents.push(event);
                    }
                });
            });

            setActionEvents(newActionEvents);
            setTriggerEvent(newTriggerEvents);
        }, [plugin]);

        return (
            <>
                <div className="flex flex-col gap-4 md:gap-8 lg:gap-10 ">
                    <h1
                        className={`flex   lg:text-4xl md:text-2xl text-xl  w-2/3 font-semibold  ${mode === 'dark' ? 'text-white' : 'text-accent'}`}
                    >
                        {/* {`Enable Integrations or automations with these events of ${plugin[0].name} ${plugin[1] && '& ' + plugin[1].name}`} */}
                    </h1>
                    <div className="flex flex-col  gap-10">
                        {triggerEvent.length > 0 && (
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <p className="text-lg text-blue-600 bg-blue-200 px-3 py-1 rounded-full font-medium">
                                        Actions
                                    </p>
                                </div>
                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                                    {triggerEvent.map((card, i) => (
                                        <EventCard card={card} plugin={plugin} index={i} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {actionEvents.length > 0 && (
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <p className="text-lg text-blue-600 bg-blue-200 px-3 py-1 rounded-full font-medium">
                                        Actions
                                    </p>
                                </div>
                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                                    {actionEvents.map((card, i) => (
                                        <EventCard card={card} plugin={plugin} index={i} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

//
//
//
//Event Card
export function EventCard({ card, plugin, index }) {
    return (
        <div key={index} className={`${style.card} bg-white px-6 py-6 rounded-lg hover:shadow-xl`}>
            <div className="flex flex-col gap-4">
                <Image
                    src={
                        plugin.find((slug) => slug?.appslugname === card?.pluginslugname)?.iconurl ||
                        'https://placehold.co/40x40'
                    }
                    width={26}
                    height={26}
                    className="w-[26px] h-[26px]"
                    alt={plugin.find((slug) => slug?.appslugname === card?.pluginslugname)?.name || ''}
                />
                <div className="flex flex-col">
                    <h6 className="md:text-xl text-lg font-semibold ">
                        {card.name.charAt(0).toUpperCase() + card.name.slice(1).toLowerCase()}
                    </h6>
                    <p className="md:text-lg text-base font-normal ">
                        {card.description.charAt(0).toUpperCase() + card.description.slice(1).toLowerCase()}
                    </p>
                </div>
            </div>
        </div>
    );
}
