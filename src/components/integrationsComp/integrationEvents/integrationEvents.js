import SingleAppsEvents from './singleAppEvents/singleAppsEvents';

export default function IntegrationEvents({ pluginData }) {
    return (
        <>
            <SingleAppsEvents pluginData={pluginData} />
        </>
    );
}
