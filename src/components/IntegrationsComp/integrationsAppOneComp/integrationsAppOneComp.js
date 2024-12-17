import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdChevronRight, MdOpenInNew } from 'react-icons/md';
import IntegrationsAppComp from '../integrationsAppComp/integrationsAppComp';
import FAQSection from '@/components/faqSection/faqSection';
import { LinkButton, LinkText } from '@/components/uiComponents/buttons';
import Footer from '@/components/footer/footer';

export default function IntegrationsAppOneComp({
    appDetails,
    combosData,
    pageInfo,
    integrationsInfo,
    apps,
    faqData,
    footerData,
}) {
    console.log('🚀 ~ IntegrationsAppOneComp ~ appDetails:', appDetails);
    const utm = pageInfo?.url;
    const integrations = 'undefined';
    // const integrations = Object.values(plugs)
    // .filter((value) => value !== 'undefined_action_rowid' && value !== 'undefined_trigger_rowid')
    // .join(',');
    return (
        <>
            <div style={{ background: appDetails?.brandcolor }}>
                <div className="container py-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 px-5 py-3 bg-white w-full max-w-[400px]">
                        <Image className="h-10 w-fit" src={appDetails?.iconurl} width={36} height={36} alt="Slack" />
                        <div>
                            <h2 className="text-2xl font-bold">{appDetails?.name}</h2>
                            <p className="text-sm text-gray-500">{appDetails?.category?.slice(0, 2).join(', ')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <button className="bg-white flex items-center gap-2 px-5 py-3 hover:bg-black hover:text-white transition-all">
                            Login to Slack <MdOpenInNew />{' '}
                        </button>
                        <button className="bg-white flex items-center gap-2 px-5 py-3 hover:bg-black hover:text-white transition-all ">
                            Login to viaSocket <MdOpenInNew />{' '}
                        </button>
                    </div>
                </div>
            </div>
            <div className="container cont cont__gap cont__py ">
                <div className="flex items-center gap-2 text-lg">
                    <span className="flex items-center gap-0 underline">
                        Integrations <MdChevronRight fontSize={22} />{' '}
                    </span>
                    <span className="flex items-center gap-0 underline">
                        {appDetails?.name} <MdChevronRight fontSize={22} />
                    </span>
                </div>
                {combosData?.combinations?.length > 0 && (
                    <>
                        <div className="cont cont__w ">
                            <h1 className="h1">Create integrations between Slack and your favorite App</h1>
                            <p className="sub__h1">
                                Create effective Slack automations in minutes by using pre-made templates that are
                                customized for your needs
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-black border-b-0 border-r-0 border">
                            {combosData?.combinations?.map((combo) => {
                                return (
                                    <Link
                                        href={`https://flow.viasocket.com/makeflow/trigger/${combo?.trigger?.id}/action?utm_source=${utm}&events=${combo?.actions.map((action) => action.id).join(',')}&integrations=${integrations}`}
                                        className="border border-black border-t-0 border-l-0 p-4 lg:p-8 cont gap-4 justify-between "
                                    >
                                        <div className="cont gap-2">
                                            <div className="flex gap-1">
                                                <Image
                                                    src={
                                                        combosData?.plugins[combo?.trigger?.name]?.iconurl ||
                                                        'https://placehold.co/40x40'
                                                    }
                                                    width={36}
                                                    height={36}
                                                    className="w-fit h-8"
                                                    alt={combo?.trigger?.name}
                                                />
                                                <Image
                                                    src={
                                                        combosData?.plugins[combo?.actions[0]?.name]?.iconurl ||
                                                        'https://placehold.co/40x40'
                                                    }
                                                    width={36}
                                                    height={36}
                                                    className="w-fit h-8"
                                                    alt={combo?.trigger?.name}
                                                />
                                            </div>
                                            <p className="text-sm">{combo?.description}</p>
                                        </div>
                                        <button className="btn btn-primary w-full mt-full">TRY IT</button>
                                    </Link>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
            <div className="cont cont__gap cont__py">
                <div className="container cont gap-6">
                    <h2 className="h1">Connect Any App with Slack</h2>
                    <div className="flex items-center gap-4 ">
                        <Image className="h-10 w-fit" src={appDetails?.iconurl} width={36} height={36} alt="Slack" />
                        <h2 className="text-2xl font-bold">{appDetails?.name}</h2>
                    </div>
                    <MdAdd fontSize={36} />
                </div>
                <IntegrationsAppComp pageInfo={pageInfo} integrationsInfo={integrationsInfo} apps={apps} />
            </div>
            <div className="container cont__py">
                <div className="cont  border border-black">
                    <div className="p-12">{faqData && <FAQSection faqData={faqData} />}</div>
                    <div className="flex flex-col md:flex-row border border-x-0 border-b-0 border-black">
                        <div className="cont gap-4 p-12 border-r border-black">
                            <div>
                                <Image
                                    className="h-10 w-fit"
                                    src={appDetails?.iconurl}
                                    width={36}
                                    height={36}
                                    alt="Slack"
                                />
                                <h3>About {appDetails?.name}</h3>
                            </div>
                            <p>{appDetails?.description}</p>
                            <Link href={'/'}>
                                <LinkText children={'Learn More'} />
                            </Link>
                        </div>
                        <div className="cont gap-4 p-12">
                            <div>
                                <Image
                                    className="h-10 w-fit"
                                    src={appDetails?.iconurl}
                                    width={36}
                                    height={36}
                                    alt="Slack"
                                />
                                <h3>About {appDetails?.name}</h3>
                            </div>
                            <p>{appDetails?.description}</p>
                            <Link href={'/'}>
                                <LinkText children={'Learn More'} />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    );
}
