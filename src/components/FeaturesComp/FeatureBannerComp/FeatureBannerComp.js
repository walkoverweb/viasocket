import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import Image from 'next/image';
import Link from 'next/link';
import { MdFace } from 'react-icons/md';

export default function FeatureBannerComp({ navData, featureData }) {
    return (
        <div
            style={{
                backgroundImage: featureData?.image
                    ? `url(/assets/img/bg/feature_page.png)`
                    : 'url(/assets/img/bg/feature_index.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="mt-6">
                <Navbar navData={navData} />
            </div>
            <div className="container cont__py cont cont__gap">
                <div className="cont gap-6">
                    <div className="cont gap-2 cont__w text-white">
                        <h1 className="h1">{featureData?.name || 'Step into a world of limitless features'}</h1>
                        <p className="sub__h1">
                            {featureData?.description ||
                                'Explore a variety of features made for you. including premium options that improve your experience-all a great price!'}
                        </p>
                    </div>
                </div>
                {featureData?.image ? (
                    <div className=" lg:p-20 p-4 flex flex-col items-center">
                        <Image
                            className="max-w-[2000px]  w-full"
                            src={featureData?.image[0]}
                            alt={featureData?.name}
                            width={1080}
                            height={1080}
                        />
                    </div>
                ) : (
                    <button className="btn btn-accent">Start Free Trail</button>
                )}
            </div>
        </div>
    );
}
