import Head from 'next/head'
export async function getServerSideProps() {
    const IDs = ['tblmsw3ci']

    const dataPromises = IDs.map((id) => getDbdashData(id))
    const results = await Promise.all(dataPromises)

    return {
        props: {
            pagesData: results,
        },
    }
}

export default function HeadComp(data) {
    if (data?.data) {
        return (
            <>
                <Head>
                    <title>
                        {data?.data?.title
                            ? data?.data?.title
                            : 'Viasocket: Unleash the Power of Seamless API Development'}
                    </title>
                    <meta
                        name="description"
                        content={
                            data?.data?.description
                                ? data?.data?.description
                                : 'Elevate your API development experience with Viasocket, the ultimate developer tool that seamlessly combines the precision of a code editor with the simplicity of Postman. Viasocket empowers developers to effortlessly create, test, and manage APIs, transforming complex workflows into smooth, efficient processes. Explore the future of API development with Viasocket today!'
                        }
                    />
                    <meta
                        name="keywords"
                        content={data?.data?.keywords && data?.data?.keywords}
                    />
                </Head>
            </>
        )
    } else {
        return (
            <>
                <Head>
                    <title>
                        Viasocket: Unleash the Power of Seamless API Development
                    </title>
                    <meta
                        name="description"
                        content="Elevate your API development experience with Viasocket, the ultimate developer tool that seamlessly combines the precision of a code editor with the simplicity of Postman. Viasocket empowers developers to effortlessly create, test, and manage APIs, transforming complex workflows into smooth, efficient processes. Explore the future of API development with Viasocket today!"
                    />
                    <link
                        rel="icon"
                        type="image/x-icon"
                        href="/assets/brand/fav_ico.svg"
                    ></link>
                </Head>
            </>
        )
    }
}
