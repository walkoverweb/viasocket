import Head from 'next/head'

export default function HeadComp() {
    if (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'production') {
        return (
            <>
                <Head>
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
            </>
        )
    }
}
