import Head from 'next/head';

export default function HeadComp() {
    return (
        <>
            <Head>
                {!process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT ||
                    (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT !== 'production' && (
                        <meta name="robots" content="noindex, nofollow" />
                    ))}
                <meta name="zoom-domain-verification" content="ZOOM_verify_122f4fb2b7734340b90fb0ae391bb1d0"></meta>
                <link rel="icon" type="image/x-icon" href="/assets/brand/fav_ico.svg" />
            </Head>
        </>
    );
}
