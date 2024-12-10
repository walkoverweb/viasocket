import FeatureBannerComp from '@/components/FeaturesComp/FeatureBannerComp/FeatureBannerComp';
import FeatureContentComp from '@/components/FeaturesComp/FeatureContentComp/FeatureContentComp';
import FeatureGridComp from '@/components/FeaturesComp/FeatureGridComp/FeatureGridComp';
import FeaturesFooterComp from '@/components/FeaturesComp/FeaturesFooterComp/FeaturesFooterComp';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { ALLFEATURES_FIELDS } from '@/const/fields';
import { getAllFeatures, getFeatureData, getFooterData, getNavData } from '@/utils/getData';

export default function Features({ features, featureData, navData, footerData, metaData }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/experts'} pathArray={pathArray} />
            <div className="cont lg:gap-24 gap-6">
                <FeatureBannerComp featureData={featureData} navData={navData} />
                <FeatureGridComp features={features} />
                <FeatureContentComp featureData={featureData?.faqs} />
                <FeaturesFooterComp footerData={footerData} />
            </div>
        </>
    );
}

export async function getStaticProps(context) {
    let feature = null;
    let features = [];
    let featureData = [];
    if (context?.params?.feature?.length > 0) {
        feature = context?.params?.feature[0];
    }

    const navData = await getNavData();
    const footerData = await getFooterData();

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
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}
