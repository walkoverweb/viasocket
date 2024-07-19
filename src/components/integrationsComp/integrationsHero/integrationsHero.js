import Image from 'next/image';
import styles from './integrationsHero.module.scss';
import EventGrid from './eventGrid/eventGrid';
import ComboGrid from './comboGrid/comboGrid';
import NoDataGrid from './noDataGrid/noDataGrid';
import { useEffect, useState } from 'react';
import { GetColorMode } from '@/utils/getColorMode';
export default function IntegrationsHero({ combinationData, pluginData }) {
    const plugins = pluginData;
    const [newBrandColor, setNewBrandColor] = useState('#F6F4EE');
    const [mode, setMode] = useState('dark');

    useEffect(() => {
        if (plugins[0]?.brandcolor) {
            setNewBrandColor(plugins[0]?.brandcolor);
        }
    }, [plugins[0]?.brandcolor]);

    useEffect(() => {
        setMode(GetColorMode(newBrandColor));
    }, [newBrandColor]);

    if (plugins.length > 0) {
        return (
            <>
                <div style={{ backgroundColor: `${plugins[0]?.brandcolor}` }} className="py-12">
                    <div className={`container flex flex-col md:gap-12 gap-6`}>
                        <div
                            className={`${styles.plugin_name} md:px-8 md:p-3 py-1 px-4 rounded-md  flex items-center gap-8 w-fit`}
                        >
                            {plugins.map((plug, index) => {
                                return (
                                    <div key={index} className="flex items-center gap-3  w-fit">
                                        {index > 0 && <span className="text-3xl mx-4"> + </span>}
                                        {plug?.iconurl && (
                                            <Image
                                                src={plug.iconurl}
                                                width={40}
                                                height={40}
                                                className="h-auto w-[30px] md:w-[36px]"
                                                alt="notion"
                                            />
                                        )}
                                        <div className="flex flex-col">
                                            {plug?.name && (
                                                <p className="md:text-2xl text-lg font-bold">{plug?.name}</p>
                                            )}
                                            {plug?.category && (
                                                <p className="text-[14px] uppercase text-gray-400">
                                                    {plug?.category?.join(', ')}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h2
                            className={`lg:text-6xl md:text-4xl text-3xl  font-bold ${mode === 'dark' ? 'text-white' : 'text-accent'}`}
                        >
                            {plugins.length > 0 &&
                                `Create integrations between ${plugins[0]?.name} and ${plugins[1]?.name || 'your favorite App'}`}
                        </h2>
                        {plugins[0]?.events?.length ? (
                            <>
                                {combinationData?.combinations?.length > 0 ? (
                                    <ComboGrid combos={combinationData} mode={mode} />
                                ) : (
                                    <EventGrid plugin={plugins} mode={mode} />
                                )}
                            </>
                        ) : (
                            <NoDataGrid plugin={plugins} mode={mode} />
                        )}
                    </div>
                </div>
            </>
        );
    }
}
