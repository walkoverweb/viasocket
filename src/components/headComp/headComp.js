import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function HeadComp() {
    useEffect(() => {
        const favicon = document.getElementById('dynamic-favicon');

        // Set the default favicon
        favicon.href = '/assets/brand/favicon-16x16.png';

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Change favicon when the page is inactive (tab is not visible)
                favicon.href = '/assests/brand/favicon-seach.png';
            } else {
                // Change favicon when the page is active
                favicon.href = '/assets/brand/favicon-16x16.png';
            }
        };

        // Add event listener to detect visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <>
            <Head>
                {!process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT ||
                    (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT !== 'production' && (
                        <meta name="robots" content="noindex, nofollow" />
                    ))}
                <meta name="zoom-domain-verification" content="ZOOM_verify_122f4fb2b7734340b90fb0ae391bb1d0"></meta>
                <link id="dynamic-favicon" rel="icon" type="image/x-icon" href="/assets/brand/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/assets/brand/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/brand/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-THTCRSLN');`,
                }}
            ></Script>
        </>
    );
}
