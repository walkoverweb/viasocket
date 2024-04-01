import Head from 'next/head'

export default function MetaHeadComp({ metaData, page, pathArray }) {
    let meta = metaData.find((item) => item.name === page)
    let title = meta?.title
    let description = meta?.description
    if (meta?.dynamic) {
        title = title.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
            return match === '[AppOne]' ? pathArray[2] : pathArray[3]
        })
        description = description.replace(
            /\[AppOne\]|\[AppTwo\]/g,
            function (match) {
                return match === '[AppOne]' ? pathArray[2] : pathArray[3]
            }
        )
    }

    return (
        <>
            <Head>
                <title>{title && title}</title>
                <meta name="description" content={description && description} />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="/assets/brand/fav_ico.svg"
                />
            </Head>
        </>
    )
}
