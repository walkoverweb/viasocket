import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import { getFooterData, getMetaData, getNavData } from '@/utils/getData';

export default function Integrations({ navData, footerData }) {
    return (
        <>
            <div className="container my-6">
                <Navbar navData={navData} />
            </div>
            <div className="container my-6">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
export async function getServerSideProps(contex) {
    console.log('🚀 ~ getServerSideProps ~ contex:', contex);
    const navData = await getNavData();
    const footerData = await getFooterData();
    const metadata = await getMetaData();

    return {
        props: {
            navData: navData || {},
            footerData: footerData || {},
            metadata: metadata || {},
        },
    };
}
