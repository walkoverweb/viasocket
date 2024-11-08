import ProductComp from '@/components/productComp/productComp';
import { getDbdashData } from './api';
import GetStarted from '@/components/getStarted/getStarted';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
export async function getServerSideProps() {
    const IDs = ['tblsaw4zp', 'tblvgm05y', 'tblmsw3ci', 'tblvo36my', 'tbl2bk656', 'tblnoi7ng'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            trustedBy: results[0].data.rows,
            getStartedData: results[1].data.rows,
            productData: results[2].data.rows,
            features: results[3].data.rows,
            metaData: results[4].data.rows,
            faqData: results[5].data.rows,
        },
    };
}

const Table = ({ trustedBy, getStartedData, productData, features, metaData, pathArray, faqData }) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/table'} pathArray={pathArray} />
            <ProductComp
                trustedBy={trustedBy}
                getStartedData={getStartedData}
                productData={productData}
                features={features}
                page={pathArray[1]}
            />
            <div className="bg-white py-20 mt-20">
                <h2 className=" container md:text-6xl text-4xl font-medium">Frequently Asked Questions</h2>

                {faqData && faqData.length > 0 && (
                    <div className="container">
                        <FAQSection faqData={faqData} faqName={`/table`} />
                    </div>
                )}
            </div>
            <div className="container my-12">
                {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
            </div>
        </>
    );
};
export default Table;
