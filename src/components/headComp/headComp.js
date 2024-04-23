import Head from 'next/head';

export default function HeadComp() {
    return (
        <>
            <Head>
          

                {!process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT ||
                    (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT !== 'production' && (
                        <meta name="robots" content="noindex, nofollow" />
                    ))}
                <link rel="icon" type="image/x-icon" href="/assets/brand/fav_ico.svg" />
            </Head>
        </>
    );
}
