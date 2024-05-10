import Image from 'next/image';
import styles from './integrationHero.module.scss';
import EventGrid from './eventGrid/eventGrid';
import ComboGrid from '../comboGrid/comboGrid';
export default function IntegrationHero({ plugin, combos, mode }) {
    console.log('🚀 ~ IntegrationHero ~ combos:', combos);
    console.log('🚀 ~ IntegrationHero ~ plugin:', plugin);
    console.log('🚀 ~ IntegrationHero ~ mode:', mode);
    if (plugin.length > 0) {
        return (
            <>
                <div style={{ backgroundColor: `${plugin[0]?.brandcolor}` }} className="py-12">
                    <div className={`container flex flex-col md:gap-12 gap-6`}>
                        <div
                            className={`${styles.plugin_name} md:px-8 md:p-3 py-1 px-4 rounded-md  flex items-center gap-8 w-fit`}
                        >
                            {plugin.map((plug, index) => {
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
                                                <p className="text-[14px] uppercase text-gray-400">{plug?.category}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h1
                            className={`lg:text-6xl md:text-4xl text-3xl  font-bold ${mode === 'dark' ? 'text-white' : 'text-accent'}`}
                        >
                            {plugin.length > 0 &&
                                `Create integrations between ${plugin[0]?.name} and your ${plugin[1]?.name || 'your favorite App'}`}
                        </h1>
                        {combos?.combinations.length > 0 ? (
                            <ComboGrid combos={combos} mode={mode} />
                        ) : (
                            <EventGrid plugin={plugin} mode={mode} />
                        )}
                    </div>
                </div>
            </>
        );
    }
}
