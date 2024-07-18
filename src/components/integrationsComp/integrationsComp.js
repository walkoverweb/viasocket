import IntegrationsHero from './integrationsHero/integrationsHero';
import IntegrationsApps from './integrationsApps/integrationsApps';
import FAQSection from '../faqSection/faqSection';
import IntegrationsAbout from './integrationsAbout/integrationsAbout';

export default function IntegrationsComp({ combinationData, pluginData }) {
    return (
        <>
            <IntegrationsHero combinationData={combinationData} pluginData={pluginData} />
            {/* <IntegrationsApps />
            <FAQSection />
            <IntegrationsAbout /> */}
        </>
    );
}
