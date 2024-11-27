import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import Link from 'next/link';
import { getDbdashData } from './api';
import Footer from '@/components/footer/footer';
import NewFooter from '@/components/newfooter/newfooter';
import NewNavbar from '@/components/newnavbar/newnavbar';

export default function Programs({ footerData, navData, metaData }) {
    const data = [
        {
            'heading': 'NGO Heroes',
            'description': 'Changing lives, transforming the world.',
        },
        {
            'heading': 'Students and Education',
            'description': 'Changing lives, transforming the world.',
        },
        {
            'heading': 'Women Leaders',
            'description': 'Changing lives, transforming the world.',
        },
        {
            'heading': 'Students and Education',
            'description': 'Changing lives, transforming the world.',
        },
        {
            'heading': 'Students and Education',
            'description': 'Changing lives, transforming the world.',
        },
    ];
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <NewNavbar navData={navData} utm={'pricing'} />
            <div className="container cont cont__py cont__gap ">
                <div className="cont gap-1">
                    <h1 className="h1 w-1/2 ">Free services for impactful organisations</h1>
                    <h2 className="sub__h1">
                        So, you can focus on meaningful work, driving innovation and creating lasting impact.
                    </h2>
                </div>
                {/* <button className="btn btn-rg btn-primary">Click here</button> */}
            </div>
            <div className="container">
                <div
                    className={`feature_grid grid grid-cols-2 md:grid-rows-4 grid-rows-5 md:aspect-square md:h-[auto] h-[700px] bg-gray-500 `}
                >
                    {data?.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={`/signup?utm_source=programs`}
                                className={`${index % 5 === 0 ? 'md:col-span-1 col-span-2 row-span-1' : index % 5 === 1 ? 'md:col-span-1 col-span-2 md:row-span-2 row-span-1' : index % 5 === 2 ? 'md:col-span-1 col-span-2 md:row-span-2 row-sapn-1' : index % 5 === 3 ? 'md:col-span-1 col-span-2 row-span-1' : 'col-span-2 row-span-1'} border-white border flex flex-col gap-1 items-center justify-center p-4 text-center`}
                            >
                                <h2 className="text-white h2">{item?.heading}</h2>
                                <p className="text-white sub__h2">{item?.description}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="container py-16">
                <NewFooter footerData={footerData} />
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const IDs = [
        'tbl7lj8ev', // navData: results[o]
        'tbl6u2cba', // footerData: results[1] ,
        'tbl2bk656', // metaData: results[2]
    ];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            navData: results[0].data.rows,
            footerData: results[1].data.rows,
            metaData: results[2].data.rows,
        },
    };
}
