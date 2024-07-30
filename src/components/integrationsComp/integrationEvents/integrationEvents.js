import DoubleAppEvents from './doubleAppEvents/doubleAppEvents';
import SingleAppsEvents from './singleAppEvents/singleAppsEvents';

export default function IntegrationEvents({ plugins, pathArray }) {
    return (
        <>
            {pathArray?.length < 2 ? (
                <SingleAppsEvents pluginData={plugins} />
            ) : (
                <DoubleAppEvents pathArray={pathArray} plugins={plugins} />
            )}
        </>
    );
}
