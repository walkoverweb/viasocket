import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';

export default function MetaHeadComp({ metaData, page, plugin }) {
    if (metaData) {
        let meta = metaData.find((item) => item.name === page);
        let title, description;

        if (meta?.name === page) {
            title = meta?.title;
            description = meta?.description;

            if (meta?.dynamic && plugin.length > 0 && plugin[0]) {
                title = title.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
                    return match === '[AppOne]' ? plugin[0].name : plugin[1].name;
                });
                description = description.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
                    return match === '[AppOne]' ? plugin[0].name : plugin[1].name;
                });
            }

            return (
                <>
                    <Head>
                        <title>{title && title}</title>
                        <meta name="description" content={description && description} />
                        <meta property="og:title" content={title && title} />
                        <meta property="og:description" content={description && description} />
                        <meta property="og:image" content="https://viasocket.com/assets/brand/socket_fav_dark.svg" />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                            (function(c,l,a,r,i,t,y){
                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                            })(window, document, "clarity", "script", "mfce0ity11");
                        `,
                            }}
                        />
                    </Head>
                </>
            );
        }
    }
}
