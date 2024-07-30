import Image from 'next/image';
import styles from './integrationsHero.module.scss';
import EventGrid from './eventGrid/eventGrid';
import ComboGrid from './comboGrid/comboGrid';
import NoDataGrid from './noDataGrid/noDataGrid';
import { useEffect, useState } from 'react';
import { GetColorMode } from '@/utils/getColorMode';

export default function IntegrationsHero({ combinationData, pluginData }) {
    if (pluginData?.length) {
        const [newBrandColor, setNewBrandColor] = useState('#F6F4EE');
        const [mode, setMode] = useState('dark');

        useEffect(() => {
            if (pluginData[0]?.brandcolor) {
                setNewBrandColor(pluginData[0].brandcolor);
            }
        }, [pluginData[0]?.brandcolor]);

        useEffect(() => {
            setMode(GetColorMode(newBrandColor));
        }, [newBrandColor]);

        const integrationText =
            pluginData?.length <= 1
                ? `Create integrations between ${pluginData[0]?.name} and your favorite App`
                : `Create integrations between ${pluginData[0]?.name} and ${pluginData[1]?.name}`;
        return (
            <>
                <div style={{ backgroundColor: `${newBrandColor}` }} className="py-12">
                    <div className={`container flex flex-col md:gap-12 gap-6`}>
                        <div
                            className={`${styles.plugin_name} md:px-8 md:p-3 py-1 px-4 rounded-md  flex items-center gap-8 w-fit`}
                        >
                            {pluginData.length &&
                                pluginData.map((plug, index) => {
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
                                                        {plug?.category}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <h2
                            className={`lg:text-6xl md:text-4xl text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-accent'}`}
                        >
                            {integrationText}
                        </h2>
                        {pluginData[0]?.events?.length ? (
                            <>
                                {combinationData?.combinations?.length > 0 ? (
                                    <ComboGrid combos={combinationData} mode={mode} />
                                ) : (
                                    <EventGrid plugin={pluginData} mode={mode} />
                                )}
                            </>
                        ) : (
                            <NoDataGrid plugin={pluginData[0]} mode={mode} />
                        )}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="container pt-24 flex flex-col gap-6">
                <h1 className="lg:text-5xl text-3xl  font-bold">5000+ viaSocket Integrations</h1>
                <p className="text-lg  lg:w-[900px] ">
                    Viasocket is your all-in-one solution, seamlessly integrating CRM, Marketing, E-Commerce, Helpdesk,
                    Payments, Web forms, Collaboration, and more for streamlined business success.
                </p>
            </div>
        );
    }
}
