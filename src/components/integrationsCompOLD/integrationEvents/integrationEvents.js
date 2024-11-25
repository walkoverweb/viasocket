import DoubleAppEvents from './doubleAppEvents/doubleAppEvents';
import SingleAppsEvents from './singleAppEvents/singleAppsEvents';

export default function IntegrationEvents({ plugins, pathSlugs }) {
    return (
        <>
            {pathSlugs?.length < 2 ? (
                <SingleAppsEvents plugins={plugins[0]} />
            ) : (
                <DoubleAppEvents pathSlugs={pathSlugs} plugins={plugins} />
            )}
        </>
    );
}
