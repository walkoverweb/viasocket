import Footer from '@/components/footer/footer';

export default function FeaturesFooterComp({ footerData }) {
    return (
        <div className="container pb-12">
            <div className="cont py-32 items-center justify-center text-center border border-black border-b-0 ">
                <div className="cont cont__w gap-6 items-center justify-center text-center ">
                    <h2 className="h1">The new age of AI-first customer service starts here</h2>
                    <button className="btn btn-accent btn-md">Click here</button>
                </div>
            </div>
            <Footer footerData={footerData} />
        </div>
    );
}
