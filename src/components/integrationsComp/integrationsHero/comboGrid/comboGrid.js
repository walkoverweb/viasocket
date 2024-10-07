import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import style from './comboGrid.module.scss';

export default function ComboGrid({ combos, loading, showNoData, mode }) {
    const [visibleComboItems, setVisibleComboItems] = useState(9);
    const cardsData = combos?.combinations;
    const plugins = combos?.plugins;
    const handleComboLoadMore = () => {
        setVisibleComboItems(visibleComboItems + 9);
    };
    if (!loading) {
        if (cardsData?.length > 0) {
            return (
                <>
                    <div className="flex flex-col gap-8">
                        <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ">
                            {cardsData.map((card, index) => {
                                return (
                                    <RecomendedCard
                                        key={index}
                                        card={card}
                                        index={index}
                                        visibleComboItems={visibleComboItems}
                                        plugins={plugins}
                                    />
                                );
                            })}
                        </div>
                        {visibleComboItems < cardsData?.length && (
                            <div className="flex flex-row justify-center items-center">
                                <button
                                    onClick={handleComboLoadMore}
                                    className={`py-2 px-5 text-sm border rounded-sm   ${mode === 'dark' ? ' border-white text-white' : 'border-gray-600  text-primary'}`}
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
                <>
                    {showNoData && (
                        <div className=" rounded-md text-2xl font-semibold">
                            Combination Unavailable. <br />
                            Please explore other Apps or Industries.
                        </div>
                    )}
                </>
            );
        }
    } else {
        return (
            <div className="flex flex-col gap-8">
                <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ">
                    {[...Array(9)].map((_, index) => (
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

export function RecomendedCard({ index, visibleComboItems, card, plugins }) {
    const action = card.actions[0].name;
    const trigger = card.trigger.name;
    const plugs = {
        [action]: plugins[action]?.rowid,
        [trigger]: plugins[trigger]?.rowid,
    };
    const integrations = Object.values(plugs)
        .filter((value) => value !== 'undefined_action_rowid' && value !== 'undefined_trigger_rowid')
        .join(',');

    const getIconUrl = (plugin) => {
        const iconUrl = plugins[plugin]?.iconurl || 'https://placehold.co/40x40';
        return iconUrl;
    };
    const getCardDescription = (card) => {
        const description = card?.description
            ? card.description
            : `${plugins[card?.actions[0].name].events.find((action) => action.rowid === card?.actions[0].id)?.name?.toLowerCase()} in ${plugins[card?.actions[0].name].name} when ${plugins[card.trigger.name].events.find((trigger) => trigger.rowid === card.trigger.id)?.name?.toLowerCase()} in ${plugins[card.trigger.name].name}`;
        return description;
    };
    return (
        <>
            <Link
                className={index >= visibleComboItems ? 'hidden' : ' h-full'}
                key={index}
                href={`https://flow.viasocket.com/makeflow/trigger/${card?.trigger?.id}/action?utm_source=integration_page&events=${card?.actions.map((action) => action.id).join(',')}&integrations=${integrations}`}
                target="_blank"
            >
                <div
                    className={`${style.card} border rounded-md  overflow-hidden h-full flex flex-col hover:shadow-lg hover:bg-secondary  transition-all cursor-pointer`}
                >
                    <div className="p-8 bg-white flex flex-col gap-4 h-full ">
                        <div className="flex gap-4 flex-wrap">
                            <Image
                                src={getIconUrl(card?.trigger?.name)}
                                height={30}
                                width={30}
                                alt={card?.trigger?.name}
                            />
                            {card?.actions.length > 0 &&
                                card?.actions.map((action, index) => {
                                    return (
                                        <Image
                                            key={index}
                                            src={getIconUrl(action?.name)}
                                            height={30}
                                            width={30}
                                            alt="ico"
                                        />
                                    );
                                })}
                        </div>
                        <h2 className="text-lg int-card-des mb-auto">{getCardDescription(card)}</h2>
                    </div>
                    <div className={`${style.try_it} gap-1 px-8 py-4 flex items-center justify-end`}>
                        Try It
                        <MdChevronRight fontSize={20} />
                    </div>
                </div>
            </Link>
        </>
    );
}
