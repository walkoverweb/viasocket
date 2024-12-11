import Navbar from '@/components/navbar/navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function FeatureBannerComp({ navData, featureData, pageInfo }) {
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
                        <h1 className="h1">
                            {featureData?.name || 'Explore Hundreds of Features, Available on Every Plan'}
                        </h1>
                        <p className="sub__h1">
                            {featureData?.description ||
                                'Get unrestricted access to all features, no matter your choice of plan.'}
                        </p>
                    </div>
                </div>
                {featureData?.image ? (
                    <div className=" lg:p-20 p-4 bg-neutral flex flex-col items-center">
                        <Image
                            className="max-w-[2000px] border border-black w-full"
                            src={featureData?.image[0]}
                            alt={featureData?.name}
                            width={1080}
                            height={1080}
                        />
                    </div>
                ) : (
                    <Link href={`/signup?utm_source=${pageInfo?.url}`}>
                        <button className="btn btn-accent">Start Free Trial</button>
                    </Link>
                )}
            </div>
        </div>
    );
}
