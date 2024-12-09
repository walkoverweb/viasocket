import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import Link from 'next/link';
import { MdFace } from 'react-icons/md';

export default function FeatureBannerComp({ navData }) {
    return (
        <>
            <div className="mt-6">
                <Navbar navData={navData} />
            </div>
            <div className="container cont__py cont__gap">
                <div className="cont gap-6">
                    <div className="cont gap-2 cont__w">
                        <h1 className="h1">Step into a world of limitless features</h1>
                        <p className="sub__h1">
                            Explore a variety of features made for you. including premium options that improve your
                            experience-all a great price!
                        </p>
                    </div>
                    <button className="btn btn-accent">Start Free Trail</button>
                </div>
            </div>
        </>
    );
}
