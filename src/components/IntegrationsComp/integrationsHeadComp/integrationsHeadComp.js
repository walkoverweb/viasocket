import Head from 'next/head';

export default function IntegrationsHeadComp({ metaData, integrationsInfo, plugins, type }) {
    if (type === 'appTwo') {
        const title = `Integrate ${plugins[0]?.name} with ${plugins[1]?.name} for automation | viaSocket`;
        const description = `viaSocket enables seamless integration between ${plugins[0]?.name} and ${plugins[1]?.name}, empowering you to automate tasks, and achieve more in less time. Get started now!`;
        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content="https://viasocket.com/assets/brand/socket_fav_dark.svg" />
                </Head>
            </>
        );
    } else if (type === 'appOne') {
        const title = `Integrate ${plugins[0]?.name} with thousands of apps | viaSocket`;
        const description = `Connect ${plugins[0]?.name} with thousands of apps effortlessly using viaSocket. Streamline your workflow and enhance productivity. Try it now!`;
        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content="https://viasocket.com/assets/brand/socket_fav_dark.svg" />
                </Head>
            </>
        );
    } else {
        if (integrationsInfo?.catefory) {
            return (
                <Head>
                    <title>{`${metaData?.title && metaData?.title} ${integrationsInfo?.page && '| Page ' + integrationsInfo?.page}`}</title>
                    <meta
                        name="description"
                        content={`${metaData?.description && metaData?.description} ${integrationsInfo?.page && '| Page ' + integrationsInfo?.page}`}
                    />
                    <meta
                        property="og:title"
                        content={`${metaData?.title && metaData?.title} ${integrationsInfo?.page && '| Page ' + integrationsInfo?.page}`}
                    />
                    <meta
                        property="og:description"
                        content={`${metaData?.description && metaData?.description} ${integrationsInfo?.page && '| Page ' + integrationsInfo?.page}`}
                    />
                    <meta property="og:image" content="https://viasocket.com/assets/brand/socket_fav_dark.svg" />
                </Head>
            );
        } else {
            return (
                <Head>
                    <title>{`Explore thousands of apps for Integrations | viaSocket ${integrationsInfo?.page && '| Page ' + integrationsInfo?.page}`}</title>
                    <meta
                        name="description"
                        content={`Browse through thousands of apps to simplify your workflow. Find the right solution for your business with viaSocket's wide range of integrations. ${integrationsInfo?.page && '| Page ' + integrationsInfo?.page}`}
                    />
                    <meta
                        property="og:title"
                        content={`Explore thousands of apps for Integrations | viaSocket ${integrationsInfo?.page && '| Page ' + integrationsInfo?.page}`}
                    />
                    <meta
                        property="og:description"
                        content={`Browse through thousands of apps to simplify your workflow. Find the right solution for your business with viaSocket's wide range of integrations. ${integrationsInfo?.page && '| Page ' + integrationsInfo?.page}`}
                    />
                    <meta property="og:image" content="https://viasocket.com/assets/brand/socket_fav_dark.svg" />
                </Head>
            );
        }
    }
}
