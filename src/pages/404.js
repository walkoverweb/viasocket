import ErrorComp from '@/components/404/404Comp';
import Head from 'next/head';
import { getFooterData, getNavData } from '@/utils/getData';
import { FOOTER_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';


const NoPage = () => {
    return (
        <>
            <Head>
                <title>{'404 - Page not found'}</title>
            </Head>
            <div>
                404
            </div>
            {/* <ErrorComp pathArray={pathArray} navData={navData} footerData={footerData} /> */}
        </>
    );
};
export default NoPage;
// export async function getServerSideProps() {
//     const navData = await getNavData(NAVIGATION_FIELDS);
//     const footerData = await getFooterData(FOOTER_FIELDS);

//     return {
//         props: {
//             navData: navData || [],
//             footerData: footerData || [],
//         },
//     };
// }
