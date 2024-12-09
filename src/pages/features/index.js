import FeatureBannerComp from '@/components/FeaturesComp/FeatureBannerComp/FeatureBannerComp';
import FeatureGridComp from '@/components/FeaturesComp/FeatureGridComp/FeatureGridComp';
import FeaturesFooterComp from '@/components/FeaturesComp/FeaturesFooterComp/FeaturesFooterComp';
import { ALLFEATURES_FIELDS } from '@/const/fields';
import { getAllFeatures, getFooterData, getNavData } from '@/utils/getData';

export default function Features({ features, navData, footerData }) {
    return (
        <div className="cont gap-24">
            <FeatureBannerComp features={features} navData={navData} />
            <FeatureGridComp features={features} />
            <FeaturesFooterComp footerData={footerData} />
        </div>
    );
}

export async function getStaticProps() {
    const navData = await getNavData();
    const footerData = await getFooterData();
    const features = await getAllFeatures(ALLFEATURES_FIELDS);
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            features: features || [],
        },
    };
}
