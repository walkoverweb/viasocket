import IntegrationsHero from './integrationsHero/integrationsHero';
import IntegrationsApps from './integrationsApps/integrationsApps';
import FAQSection from '../faqSection/faqSection';
import IntegrationsAbout from './integrationsAbout/integrationsAbout';
import BlogGrid from '../blogGrid/blogGrid';
import UseCase from '../useCases/useCases';
import IntegrationEvents from './integrationEvents/integrationEvents';
import GetStarted from '../getStarted/getStarted';
import IntegrationFooter from './integrationsFooter/integrationsFooter';

export default function IntegrationsComp({
    combinationData,
    pluginData,
    type,
    faqData,
    faqName,
    blogs,
    usecases,
    getStartedData,
    pathSlugs,
    hideApps,
    showCategories,
}) {
    return (
        <>
            <IntegrationsHero combinationData={combinationData} pluginData={pluginData} />

            {type !== 'doubleApp' && !hideApps && (
                <IntegrationsApps pluginData={pluginData} showCategories={showCategories} />
            )}

            {pluginData?.length && <IntegrationEvents plugins={pluginData} pathSlugs={pathSlugs} />}

            {usecases?.length > 0 && (
                <div className="container mx-auto py-24">
                    <UseCase usecases={usecases} />
                </div>
            )}

            {blogs?.length > 0 && (
                <div className="container my-24">
                    {' '}
                    <BlogGrid posts={blogs} />
                </div>
            )}

            {faqData && faqName && <FAQSection faqData={faqData} faqName={faqName} />}

            {pluginData?.length && <IntegrationsAbout plugins={pluginData} />}

            <IntegrationFooter getStartedData={getStartedData} />
        </>
    );
}
