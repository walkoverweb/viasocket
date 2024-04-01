import Head from 'next/head'

export default function MetaHeadComp({ metaData, pathArray }) {
    console.log('🚀 ~ MetaHeadComp ~ metaData:', metaData, pathArray)
    let meta = metaData.find((item) => item.name === '/')

    return (
        <>
            <Head>
                <title>{meta?.title && meta?.title}</title>
                <meta
                    name="description"
                    content={meta?.description && meta?.description}
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="/assets/brand/fav_ico.svg"
                />
            </Head>
        </>
    )
}
