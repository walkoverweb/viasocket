import Head from 'next/head';
import { useState } from 'react';

export default function MetaHeadComp({ metaData, page, pathArray, plugin }) {
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
                    </Head>
                </>
            );
        }
    }
}
