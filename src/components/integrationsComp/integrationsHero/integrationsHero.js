import Image from 'next/image';
import styles from './integrationsHero.module.scss';
import EventGrid from './eventGrid/eventGrid';
import ComboGrid from './comboGrid/comboGrid';
import NoDataGrid from './noDataGrid/noDataGrid';
import { useEffect, useState } from 'react';
import { GetColorMode } from '@/utils/getColorMode';

export default function IntegrationsHero({ combinationData, pluginData }) {
    const [newBrandColor, setNewBrandColor] = useState('#F6F4EE');
    const [mode, setMode] = useState('dark');

    useEffect(() => {
        if (pluginData?.brandcolor) {
            setNewBrandColor(pluginData.brandcolor);
        }
    }, [pluginData?.brandcolor]);

    useEffect(() => {
        setMode(GetColorMode(newBrandColor));
    }, [newBrandColor]);

    if (!pluginData) {
        return null;
    }

    const integrationText =
        pluginData.name === pluginData.name
            ? `Create integrations between ${pluginData.name} and your favorite App`
            : `Create integrations between ${pluginData.name} and ${pluginData.name}`;

    return (
        <>
            <div style={{ backgroundColor: `${newBrandColor}` }} className="py-12">
                <div className={`container flex flex-col md:gap-12 gap-6`}>
                    <div
                        className={`${styles.plugin_name} md:px-8 md:p-3 py-1 px-4 rounded-md flex items-center gap-8 w-fit shadow-black shadow-sm`}
                    >
                        <div className="flex items-center gap-3 w-fit">
                            {pluginData.iconurl && (
                                <Image
                                    src={pluginData.iconurl}
                                    width={40}
                                    height={40}
                                    className="h-auto w-[30px] md:w-[36px]"
                                    alt={pluginData.name || 'plugin icon'}
                                />
                            )}
                            <div className="flex flex-col">
                                {pluginData.name && <p className="md:text-2xl text-lg font-bold">{pluginData.name}</p>}
                                {pluginData.category && (
                                    <p className="text-[14px] uppercase text-gray-400">
                                        {pluginData.category.join(', ')}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <h2
                        className={`lg:text-6xl md:text-4xl text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-accent'}`}
                    >
                        {integrationText}
                    </h2>
                    {pluginData.events?.length ? (
                        <>
                            {combinationData?.combinations?.length > 0 ? (
                                <ComboGrid combos={combinationData} mode={mode} />
                            ) : (
                                <EventGrid plugin={pluginData} mode={mode} />
                            )}
                        </>
                    ) : (
                        <NoDataGrid plugin={pluginData} mode={mode} />
                    )}
                </div>
            </div>
        </>
    );
}
