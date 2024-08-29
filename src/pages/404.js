import ErrorComp from '@/components/404/404Comp';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import { getDbdashData } from './api';
import Head from 'next/head';

const NoPage = ({ pathArray, navData, footerData }) => {
    return (
        <>
            <Head>
                <title>{'404 - Page not found'}</title>
            </Head>
            <ErrorComp pathArray={pathArray} navData={navData} footerData={footerData} />
        </>
    );
};
export default NoPage;
export async function getStaticProps() {
    const IDs = ['tbl7lj8ev', 'tbl6u2cba'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            navData: results[0]?.data?.rows,
            footerData: results[1]?.data?.rows,
        },
    };
}
