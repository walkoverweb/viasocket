import Head from 'next/head'

export default function HeadComp() {
    if (
        process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT !== 'production' ||
        !process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT
    ) {
        return (
            <>
                <Head>
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
            </>
        )
    }
}
