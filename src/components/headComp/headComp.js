import Head from 'next/head';

export default function HeadComp() {
    return (
        <>
            <Head>
                <meta
                    http-equiv="Content-Security-Policy"
                    content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://cdnjs.cloudflare.com "
                />

                {!process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT ||
                    (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT !== 'production' && (
                        <meta name="robots" content="noindex, nofollow" />
                    ))}
                <link rel="icon" type="image/x-icon" href="/assets/brand/fav_ico.svg" />
            </Head>
        </>
    );
}
