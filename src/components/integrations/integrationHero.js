import Image from 'next/image';
import styles from './integrationHero.module.scss';
import EventGrid from './eventGrid/eventGrid';
import ComboGrid from '../comboGrid/comboGrid';
export default function IntegrationHero({ plugin, combos, mode }) {
    if (plugin) {
        return (
            <>
                <div style={{ backgroundColor: `${plugin?.brandcolor}` }} className="py-12">
                    <div className={`container flex flex-col md:gap-12 gap-6`}>
                        <div
                            className={`${styles.plugin_name} md:px-8 md:p-3 py-1 px-4 rounded-md  flex items-center gap-8 w-fit`}
                        >
                            <div className="flex items-center gap-3  w-fit">
                                {plugin?.iconurl && (
                                    <Image
                                        src={plugin.iconurl}
                                        width={40}
                                        height={40}
                                        className="h-auto w-[30px] md:w-[36px]"
                                        alt="notion"
                                    />
                                )}
                                <div className="flex flex-col">
                                    {plugin?.name && <p className="md:text-2xl text-lg font-bold">{plugin?.name}</p>}
                                    {plugin?.category && (
                                        <p className="text-[14px] uppercase text-gray-400">{plugin?.category}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <h1
                            className={`lg:text-6xl md:text-4xl text-3xl  font-bold ${mode === 'dark' ? 'text-white' : 'text-accent'}`}
                        >
                            {plugin?.name && `Create integrations between ${plugin?.name} and your favorite app.`}
                        </h1>
                        {combos?.combinations.length > 0 ? (
                            <ComboGrid combos={combos} />
                        ) : (
                            <EventGrid plugin={plugin} mode={mode} />
                        )}
                    </div>
                </div>
            </>
        );
    }
}
