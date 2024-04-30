import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';

export default function ComboGrid({ combos, loading }) {
    const [visibleComboItems, setVisibleComboItems] = useState(9);

    const cardsData = combos?.combinations;
    const plugins = combos?.plugins;

    const getIconUrl = (pluginName) => {
        if (cardsData) {
            const plugin = combos?.plugins[pluginName];
            return plugin ? plugin?.iconurl : null;
        }
    };
    const getEventDescription = (eventId) => {
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

    const handleComboLoadMore = () => {
        setVisibleComboItems(visibleComboItems + 3);
    };
    if (!loading) {
        if (cardsData.length > 0) {
            return (
                <>
                    <div className="flex flex-col gap-8">
                        <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ">
                            {cardsData.map((card, index) => {
                                return (
                                    <>
                                        <Link
                                            className={index >= visibleComboItems ? 'hidden' : ''}
                                            key={index}
                                            href={`https://flow.viasocket.com/makeflow/trigger/${card?.trigger?.id}/action/${card?.action[0]?.id}`}
                                            target="_blank"
                                            aria-label="try the app combination"
                                        >
                                            <div className="bg-white rounded-md overflow-hidden hover:shadow-xl h-full flex flex-col transition duration-300 ease-in-out">
                                                <div className="p-8 flex flex-col gap-4 h-full">
                                                    <div className="flex gap-3 flex-wrap">
                                                        <Image
                                                            src={
                                                                getIconUrl(card?.trigger?.name)
                                                                    ? getIconUrl(card?.trigger?.name)
                                                                    : 'https://placehold.co/40x40'
                                                            }
                                                            height={30}
                                                            width={30}
                                                            alt="ico"
                                                        />
                                                        {card?.action.length > 0 &&
                                                            card?.action.map((action, index) => {
                                                                console.log('🚀 ~ card?.action.map ~ action:', action);
                                                                return (
                                                                    <Image
                                                                        src={
                                                                            getIconUrl(action?.name)
                                                                                ? getIconUrl(action?.name)
                                                                                : 'https://placehold.co/40x40'
                                                                        }
                                                                        height={30}
                                                                        width={30}
                                                                        alt="ico"
                                                                    />
                                                                );
                                                            })}
                                                    </div>
                                                    {card?.description ? (
                                                        <h2 className="text-xl int-card-des ">{card?.description}</h2>
                                                    ) : (
                                                        <h2 className="text-xl int-card-des ">
                                                            {`${getEventDescription(card?.action[0]?.id) && getEventDescription(card?.action[0]?.id).toLowerCase()} in ${combos?.plugins?.[card?.action[0]?.name]?.name.toLowerCase()} when ${getEventDescription(card?.trigger?.id) && getEventDescription(card?.trigger?.id).toLowerCase()} in ${combos?.plugins?.[card?.trigger?.name]?.name.toLowerCase()}`}
                                                        </h2>
                                                    )}
                                                </div>
                                                <div className="bg-gray-300 gap-1 px-8 py-4 flex items-center justify-end">
                                                    Try It
                                                    <MdChevronRight fontSize={20} />
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                );
                            })}
                        </div>
                        {visibleComboItems < cardsData?.length && (
                            <div className="flex flex-row justify-center items-center">
                                <button
                                    onClick={handleComboLoadMore}
                                    className="border border-white px-4 py-2 rounded-md text-white text-base"
                                    aria-label="load more button"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                </>
            );
        } else {
            return (
                <div className=" rounded-md text-2xl font-semibold">
                    Combination Unavailable. <br />
                    Please explore other Apps or Industries.
                </div>
            );
        }
    } else {
        return (
            <div className="flex flex-col gap-8">
                <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ">
                    {[...Array(3)].map((_, index) => (
                        <div
                            className="bg-white rounded-md overflow-hidden hover:shadow-xl h-full flex flex-col transition duration-300 ease-in-out"
                            key={index}
                        >
                            <div className="p-8 flex flex-col gap-4 h-full">
                                <div className="flex gap-3 flex-wrap">
                                    <div className="skeleton h-[30px] w-[30px] bg-gray-200 "></div>
                                    <div className="skeleton h-[30px] w-[30px] bg-gray-200 "></div>
                                    <div className="skeleton h-[30px] w-[30px] bg-gray-200 "></div>
                                    <div className="skeleton h-[30px] w-[30px] bg-gray-200 "></div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="skeleton h-[12px] w-full bg-gray-200"></div>
                                    <div className="skeleton h-[12px] w-full bg-gray-200"></div>
                                    <div className="skeleton h-[12px] w-4/5 bg-gray-200 "></div>
                                </div>
                                <div className="flex h-[36px] items-center justify-end">
                                    <div className="skeleton h-[12px] w-20 bg-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
