import Head from 'next/head';

export default function AZMetaHeadComp({ alphabet }) {
    return (
        <Head>
            <title>Apps starting with {alphabet?.toUpperCase()}</title>
            <meta
                name="description"
                content={`Browse and discover a wide range of apps that start with the letter ${alphabet?.toUpperCase()}. Find the perfect app for your needs today!`}
            />
            <meta property="og:title" content={`Apps starting with ${alphabet?.toUpperCase()}`} />
            <meta
                property="og:description"
                content={`Browse and discover a wide range of apps that start with the letter ${alphabet?.toUpperCase()}. Find the perfect app for your needs today!`}
            />
        </Head>
    );
}
