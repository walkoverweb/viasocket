import AlphabeticalComponent from '@/components/alphabetSort/alphabetSort';
import Image from 'next/image';
import Link from 'next/link';

const SelectedAlphabetPage = ({ apps, alphabet, appDetails, step, alphabet2 }) => {
    return (
        <div className="container py-20 gap-8 ">
            {step == 0 && (
                <div className="flex flex-col gap-8 items-center">
                    <div className="flex flex-col gap-8 items-center">
                        <h1 className="text-center lg:text-2xl md:text-xl text-lg font-semibold pb-4">
                            Browse apps by name - {alphabet?.toUpperCase() || '-'}
                        </h1>

                        <AlphabeticalComponent alphabet={alphabet} appDetails={appDetails} step={step} />
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 justify-center items-center py-4">
                        {apps?.map((app) => (
                            <a
                                key={app?.rowid}
                                href={app?.appslugname ? `/find-apps/${alphabet}/${app?.appslugname}` : `/noplugin`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                                aria-label="app"
                            >
                                <p className="text-base py-1 ">{app.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            )}
            {step == 1 && (
                <div className="w-full  flex flex-col gap-8 items-center">
                    <div className="flex flex-col gap-8 items-center">
                        <h1 className="text-center lg:text-2xl md:text-xl text-lg font-semibold pb-4">
                            Browse apps by name - {alphabet?.toUpperCase() || '-'}
                        </h1>

                        <AlphabeticalComponent alphabet={alphabet} appDetails={appDetails} step={step} />
                    </div>

                    <div className="w-full  grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 justify-center items-center py-4">
                        {apps?.map((app) => (
                            <a
                                key={app?.rowid}
                                href={app?.appslugname ? `/find-apps/${alphabet}/${app?.appslugname}` : `/noplugin`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                                aria-label="app"
                            >
                                <p className=" hover:text-blue-600 text-base py-1 ">{app.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {step == 2 && (
                <div className="flex flex-col gap-8 items-center">
                    <h1 className="text-center lg:text-2xl md:text-xl text-lg font-semibold pb-4">
                        Browse apps by name - {alphabet?.toUpperCase() || '-'} - {appDetails?.name}
                    </h1>
                    <a
                        target="_blank"
                        href={`/integrations/${appDetails?.appslugname}`}
                        className="flex gap-2  items-center"
                    >
                        <Image
                            src={appDetails?.iconurl}
                            className="h-8 w-fit"
                            width={46}
                            height={46}
                            alt={appDetails?.name}
                        />
                        <span className="text-3xl font-semibold">{appDetails?.name}</span>
                    </a>
                    <span className="text-4xl"> + </span>
                    <AlphabeticalComponent alphabet={alphabet} appDetails={appDetails} step={step} />
                </div>
            )}

            {step == 3 && (
                <div className=" w-full flex flex-col gap-8 items-center">
                    <div className="flex flex-col gap-6 items-center">
                        <a
                            target="_blank"
                            href={`/integrations/${appDetails?.appslugname}`}
                            className="flex gap-2  items-center"
                        >
                            <Image
                                src={appDetails?.iconurl}
                                className="h-8 w-fit"
                                width={46}
                                height={46}
                                alt={appDetails?.name}
                            />
                            <span className="text-3xl font-semibold">{appDetails?.name}</span>
                        </a>
                        <span className="text-4xl"> + </span>
                        <h1 className="text-center lg:text-2xl md:text-xl text-lg font-semibold pb-4">
                            Browse apps by name - {alphabet?.toUpperCase() || '-'} - {appDetails?.name} -{' '}
                            {alphabet2?.toUpperCase()}
                        </h1>
                        <AlphabeticalComponent alphabet={alphabet} appDetails={appDetails} step={step} />
                    </div>

                    <div className=" w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 justify-center items-center py-4">
                        {apps?.map((app) => {
                            if (app?.appslugname !== appDetails?.appslugname) {
                                return (
                                    <a
                                        key={app?.rowid}
                                        href={
                                            app?.appslugname
                                                ? `/integrations/${appDetails?.appslugname}/${app?.appslugname}`
                                                : `/noplugin`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                        aria-label="app"
                                    >
                                        <p className="hover:text-blue-600 text-base py-1 ">{app.name}</p>
                                    </a>
                                );
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedAlphabetPage;

// Fetch data from API
export async function getServerSideProps(context) {
    const { slug } = context.query;
    const step = slug?.length;
    switch (slug?.length) {
        case 1: {
            const response = await fetch(`https://plugservice-api.viasocket.com/plugins/search?prefix=${slug[0]}`);
            const data = await response.json();
            return {
                props: {
                    apps: data?.data?.rows || [],
                    appDetails: null,
                    alphabet: slug[0] || '',
                    step: step,
                    alphabet2: null,
                },
            };
        }
        case 2: {
            const response = await fetch(`https://plugservice-api.viasocket.com/plugins/search?prefix=${slug[1]}`);
            const data = await response.json();
            const filteredData = data?.data?.rows.filter((app) => app.appslugname === slug[1]);
            return {
                props: {
                    apps: [],
                    appDetails: filteredData[0] || [],
                    alphabet: slug[0] || '',
                    step: step,
                    alphabet2: null,
                },
            };
        }
        case 3: {
            const appResponse = await fetch(`https://plugservice-api.viasocket.com/plugins/search?prefix=${slug[1]}`);
            const appData = await appResponse.json();
            const filteredData = appData?.data?.rows.filter((app) => app.appslugname === slug[1]);
            const response = await fetch(`https://plugservice-api.viasocket.com/plugins/search?prefix=${slug[2]}`);
            const data = await response.json();
            return {
                props: {
                    apps: data?.data?.rows || [],
                    appDetails: filteredData[0] || [],
                    alphabet: slug[0] || '',
                    step: step,
                    alphabet2: slug[2] || '',
                },
            };
        }
        default: {
            return {
                props: {
                    apps: [],
                    appDetails: [],
                    alphabet: '',
                    step: 0,
                    alphabet2: '',
                },
            };
        }
    }
}
