import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import Link from 'next/link';
import { getDbdashData } from '../api';
import Footer from '@/components/footer/footer';
import AZComp from '@/components/findComboComp/a-zComp/a-zComp';

export default function FindCombinations({ navData, footerData, metaData }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/support'} />

            <Navbar navData={navData} />

            <div className="container py-20 flex flex-col gap-20  items-center justify-center">
                <div className=" border  p-16 rounded flex flex-col gap-6  items-center justify-center">
                    <h2 className="text-2xl font-semibold">Select App One</h2>
                    <AZComp />
                </div>

                <span className="text-4xl font-semibold">+</span>

                <div className=" border  p-16 rounded flex flex-col gap-6  items-center justify-center">
                    <h2 className="text-2xl font-semibold">Select App Two</h2>
                    <AZComp />
                </div>
            </div>

            <Footer footerData={footerData} />
        </>
    );
}

export async function getStaticProps() {
    const IDs = [
        'tbl7lj8ev', //  navData: results[0]
        'tbl6u2cba', //footerData: results[1]
        'tbl2bk656', // metaData: results[2]
    ];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            navData: results[0]?.data?.rows,
            footerData: results[1]?.data?.rows,
            metaData: results[2]?.data?.rows,
        },
    };
}
