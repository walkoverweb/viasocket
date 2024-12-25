import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdChevronRight, MdOpenInNew } from 'react-icons/md';
import IntegrationsAppComp from '../integrationsAppComp/integrationsAppComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import IntegrationsBetaComp from '../IntegrationsBetaComp/IntegrationsBetaComp';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import { LinkText } from '@/components/uiComponents/buttons';
import { useState } from 'react';
import createURL from '@/utils/createURL';

export default function IntegrationsAppOneComp({
    appDetails,
    combosData,
    pageInfo,
    integrationsInfo,
    apps,
    faqData,
    footerData,
    blogsData,
    metaData,
}) {
    const [visibleCombos, setVisibleCombos] = useState(12);
    const [showMore, setShowMore] = useState(combosData?.combinations?.length >= visibleCombos);
    const utm = pageInfo?.url;
    const integrations = 'undefined';
    return (
        <>
            <IntegrationsHeadComp
                metaData={metaData}
                page={'/integrations/AppOne'}
                plugins={[appDetails]}
                type={'appOne'}
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
            />
            <div style={{ background: appDetails?.brandcolor }}>
                <div className="container cont py-8 gap-2 flex items-center justify-between">
                    <div className="flex items-center w-full justify-end gap-5">
                        <Link
                            target="_blank"
                            href={
                                appDetails?.domain.startsWith('http')
                                    ? appDetails?.domain
                                    : 'http://' + appDetails?.domain
                            }
                        >
                            <button className="bg-white flex border border-black items-center gap-2 px-5 py-3 hover:bg-black hover:text-white transition-all">
                                Login to {appDetails?.name} <MdOpenInNew />{' '}
                            </button>
                        </Link>
                    </div>
                    <div className="flex  gap-2 items-center w-full justify-start">
                        <div className="flex h-28 items-center gap-4 px-5 py-3 bg-white w-full max-w-[400px] border border-black">
                            <Image
                                className="h-10 w-fit"
                                src={appDetails?.iconurl || 'https://placehold.co/36x36'}
                                width={36}
                                height={36}
                                alt="Slack"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">{appDetails?.name}</h2>
                                <p className="text-sm text-gray-500">{appDetails?.category?.slice(0, 2).join(', ')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container cont cont__gap cont__py ">
                <div className="flex items-center gap-2 text-lg">
                    <Link href={createURL(`/integrations`)} className="flex items-center gap-0 underline">
                        Integrations{' '}
                    </Link>
                    <MdChevronRight fontSize={22} />
                    <Link
                        href={createURL(`/integrations/${appDetails?.appslugname}`)}
                        className="flex items-center gap-0 underline"
                    >
                        {appDetails?.name}
                    </Link>
                </div>
                {combosData?.combinations?.length > 0 && (
                    <>
                        <div className="cont cont__w ">
                            <h1 className="h1">{`Create integrations between ${appDetails?.name} and your favorite App`}</h1>
                            <p className="sub__h1">
                                {`  Create effective ${appDetails?.name} automations in minutes by using pre-made templates that are customized for your needs`}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-black border-b-0 border-r-0 border">
                            {combosData?.combinations?.slice(0, visibleCombos).map((combo, index) => {
                                return (
                                    <Link
                                        key={index}
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
                        {showMore && (
                            <button
                                onClick={() => {
                                    setVisibleCombos(visibleCombos + 8);
                                    if (combosData?.combinations?.length <= visibleCombos) {
                                        setShowMore(false);
                                    }
                                }}
                                className="btn btn-outline "
                            >
                                Load More
                            </button>
                        )}
                    </>
                )}

                {!combosData?.combinations?.length > 0 && !appDetails?.events.length > 0 && (
                    <IntegrationsBetaComp appOneDetails={appDetails} />
                )}
                {!combosData?.combinations?.length > 0 && appDetails?.events.length > 0 && (
                    <div className="cont gap-4">
                        <div className="cont cont__w gap-2">
                            <h1 className="h1">
                                {`Create integrations between ${appDetails?.name} and your favorite App`}
                            </h1>
                            <p className="sub__h1">
                                {`Enable Integrations or automations with these events of ${appDetails?.name}`}
                            </p>
                        </div>

                        <div className="cont gap-4">
                            <h2 className="h2">Actions and Triggers</h2>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                                {appDetails?.events.map((event, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="p-4 border border-black flex gap-3 flex-col sm:flex-row items-start"
                                        >
                                            <Image
                                                src={appDetails?.iconurl || 'https://placehold.co/36x36'}
                                                width={36}
                                                height={36}
                                                alt={appDetails?.name}
                                                className="h-8 w-fit"
                                            />
                                            <div className="cont gap-1">
                                                <h3 className="font-semibold">{event?.name}</h3>
                                                <p className="text-sm">{event?.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="cont cont__gap cont__py">
                <div className="container cont gap-6">
                    <h2 className="h1">{`Connect Any App with ${appDetails?.name}`}</h2>
                    <div className="flex items-center gap-4 ">
                        <Image
                            className="h-10 w-fit"
                            src={appDetails?.iconurl || 'https://placehold.co/36x36'}
                            width={36}
                            height={36}
                            alt="Slack"
                        />
                        <h2 className="text-2xl font-bold">{appDetails?.name}</h2>
                    </div>
                    <MdAdd fontSize={36} />
                </div>
                <IntegrationsAppComp pageInfo={pageInfo} integrationsInfo={integrationsInfo} apps={apps} />
            </div>
            {combosData?.combinations?.length > 0 && (
                <div className="container cont gap-4">
                    <h2 className="h1">Actions and Triggers</h2>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                        {appDetails?.events.map((event, index) => {
                            return (
                                <div
                                    key={index}
                                    className="p-4 border border-black flex gap-3 flex-col sm:flex-row items-start"
                                >
                                    <Image
                                        src={appDetails?.iconurl || 'https://placehold.co/36x36'}
                                        width={36}
                                        height={36}
                                        alt={appDetails?.name}
                                        className="h-8 w-fit"
                                    />
                                    <div className="cont gap-1">
                                        <h3 className="font-semibold">{event?.name}</h3>
                                        <p className="text-sm">{event?.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {blogsData?.length > 0 && (
                <div className="container cont__py">
                    {' '}
                    <BlogGrid posts={blogsData} />
                </div>
            )}
            <div className="container cont__py">
                <div className="cont  border border-black">
                    <div className="p-12">{faqData && <FAQSection faqData={faqData} />}</div>
                    <div className="flex flex-col md:flex-row border border-x-0 border-b-0 border-black">
                        <div className="cont gap-4 p-12 border-r border-black w-full ">
                            <div>
                                <Image
                                    className="h-10 w-fit"
                                    src={appDetails?.iconurl || 'https://placehold.co/36x36'}
                                    width={36}
                                    height={36}
                                    alt="Slack"
                                />
                                <h3>About {appDetails?.name}</h3>
                            </div>
                            <p>{appDetails?.description}</p>
                            <Link
                                target="_blank"
                                href={
                                    appDetails?.domain.startsWith('http')
                                        ? appDetails?.domain
                                        : 'http://' + appDetails?.domain
                                }
                            >
                                <LinkText children={'Learn More'} />
                            </Link>
                        </div>
                        <div className="w-full cont gap-4 p-12">
                            <div>
                                <Image
                                    className="h-10 w-fit"
                                    src={'/assets/brand/fav_ico.svg'}
                                    width={36}
                                    height={36}
                                    alt="Slack"
                                />
                                <h3>About viaSocket</h3>
                            </div>
                            <p>
                                viasocket is an innovative and versatile workflow automation platform designed to
                                streamline and simplify the integration of your favorite applications and to
                            </p>
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
