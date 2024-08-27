import Image from 'next/image';
import style from './eventGrid.module.scss';

export default function EventGrid({ plugin, mode }) {
    if (plugin?.length) {
        const actionEvents = [];
        const triggerEvents = [];

        plugin.forEach((p) => {
            p.events.forEach((event) => {
                if (event.type === 'action') {
                    actionEvents.push(event);
                } else if (event.type === 'trigger') {
                    triggerEvents.push(event);
                }
            });
        });
        return (
            <>
                <div className="flex flex-col gap-4 md:gap-8 lg:gap-10 ">
                    <h2
                        className={`flex lg:text-4xl md:text-2xl text-xl w-2/3 font-semibold ${mode === 'dark' ? 'text-white' : 'text-dark'}`}
                    >
                        {`Enable Integrations or automations with these events of ${plugin[0].name}`}
                    </h2>
                    <div className="flex flex-col gap-10">
                        {triggerEvents.length > 0 && (
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <p className="text-lg text-blue-600 bg-blue-200 px-3 py-1 rounded-full font-medium">
                                        Triggers
                                    </p>
                                </div>
                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                                    {triggerEvents.map((card, i) => (
                                        <EventCard card={card} plugin={plugin} key={i} />
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
                                        <EventCard card={card} plugin={plugin} key={i} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return null;
}

export function EventCard({ card, plugin }) {
    const getIconUrl = (plug) => {
        const pluginData = plugin.find((p) => p.appslugname === plug);
        const iconUrl = pluginData?.iconurl || 'https://placehold.co/40x40';
        return iconUrl;
    };
    return (
        <div className={`${style.card} bg-white px-6 py-6 rounded-lg hover:shadow-xl`}>
            <div className="flex flex-col gap-4">
                <Image
                    src={getIconUrl(card?.pluginslugname)}
                    width={26}
                    height={26}
                    className="w-[26px] h-[26px]"
                    alt={card?.name || ''}
                />
                <div className="flex flex-col">
                    <h6 className="md:text-xl text-lg font-semibold ">
                        {card?.name?.charAt(0).toUpperCase() + card.name.slice(1).toLowerCase()}
                    </h6>
                    <p className="md:text-lg text-base font-normal ">
                        {card?.description?.charAt(0).toUpperCase() && card?.description?.charAt(0).toUpperCase()}
                        {card?.description?.slice(1).toLowerCase() && card?.description?.slice(1).toLowerCase()}
                    </p>
                </div>
            </div>
        </div>
    );
}
