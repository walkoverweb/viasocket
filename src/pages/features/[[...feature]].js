import FeatureBannerComp from '@/components/FeaturesComp/FeatureBannerComp/FeatureBannerComp';
import FeatureContentComp from '@/components/FeaturesComp/FeatureContentComp/FeatureContentComp';
import FeatureGridComp from '@/components/FeaturesComp/FeatureGridComp/FeatureGridComp';
import FeaturesFooterComp from '@/components/FeaturesComp/FeaturesFooterComp/FeaturesFooterComp';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { ALLFEATURES_FIELDS, METADATA_FIELDS } from '@/const/fields';
import { getAllFeatures, getFeatureData, getFooterData, getMetaData, getNavData } from '@/utils/getData';
import GetPageInfo from '@/utils/getPageInfo';

export default function Features({ features, featureData, navData, footerData, metaData, pathArray, pageInfo }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={pathArray?.join('/')} pathArray={pathArray} />
            <div className="cont ">
                <FeatureBannerComp featureData={featureData} navData={navData} pageInfo={pageInfo} />
                <FeatureGridComp features={features} pageInfo={pageInfo} />
                <FeatureContentComp featureData={featureData?.faqs} pageInfo={pageInfo} />
                <FeaturesFooterComp
                    featureData={featureData?.cta_content}
                    footerData={footerData}
                    pageInfo={pageInfo}
                />
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const pageInfo = GetPageInfo(context);
    const navData = await getNavData();
    const footerData = await getFooterData();
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='${pageInfo?.url}'`);
    let feature = null;
    let features = [];
    let featureData = [];
    if (context?.params?.feature?.length > 0) {
        feature = context?.params?.feature[0];
    }

    if (!feature) {
        features = await getAllFeatures(ALLFEATURES_FIELDS);
    } else {
        featureData = await getFeatureData(feature);
    }

    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            features: features || [],
            featureData: featureData[0] || {},
            metaData: metaData[0] || {},
            pageInfo: pageInfo || {},
        },
    };
}
