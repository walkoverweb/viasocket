import Head from 'next/head';
import Script from 'next/script';

export default function HeadComp() {
    return (
        <>
            <Head>
                {!process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT ||
                    (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT !== 'production' && (
                        <meta name="robots" content="noindex, nofollow" />
                    ))}
                <meta name="zoom-domain-verification" content="ZOOM_verify_122f4fb2b7734340b90fb0ae391bb1d0"></meta>
                <link rel="icon" type="image/x-icon" href="/assets/brand/fav_icon.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/assets/brand/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/brand/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Script
                src="https://app.10xlaunch.ai/widget"
                data-app-id="2fce272b-e110-4d49-858d-9b9398a7b72a"
                async
                defer
            />
        </>
    );
}
