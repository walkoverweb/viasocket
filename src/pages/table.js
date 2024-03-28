import ProductComp from '@/components/productComp/productComp'
import { getDbdashData } from './api'
import GetStarted from '@/components/getStarted/getStarted'
export async function getServerSideProps() {
    const IDs = [
        'tblsaw4zp',
        'tblvgm05y',
        'tblmsw3ci',
        'tblvo36my',
        'tbl7lj8ev',
    ]

    const dataPromises = IDs.map((id) => getDbdashData(id))
    const results = await Promise.all(dataPromises)

    return {
        props: {
            trustedBy: results[0].data.rows,
            getStartedData: results[1].data.rows,
            productData: results[2].data.rows,
            features: results[3].data.rows,
            navbarData: results[4].data.rows,
        },
    }
}

const Table = ({
    trustedBy,
    getStartedData,
    productData,
    features,
    navbarData,
    pathArray,
}) => {
    return (
        <>
            <ProductComp
                trustedBy={trustedBy}
                getStartedData={getStartedData}
                productData={productData}
                features={features}
                page={pathArray[1]}
            />
            <div className="container my-12">
                {getStartedData && (
                    <GetStarted data={getStartedData} isHero={'false'} />
                )}
            </div>
        </>
    )
}
export default Table
