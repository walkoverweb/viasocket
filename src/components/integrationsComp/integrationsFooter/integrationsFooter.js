import GetStarted from '@/components/getStarted/getStarted';
import Image from 'next/image';
import Link from 'next/link';

export default function IntegrationFooter({ getStartedData }) {
    return (
        <>
            {getStartedData && (
                <div className="container">
                    <GetStarted data={getStartedData} isHero={'false'} />
                </div>
            )}
            <div className=" py-10">
                <div className="flex flex-row gap-4 justify-center items-center">
                    <h4 className="lg:text-[32px] md:text-xl text-lg font-semibold">Integrations run at</h4>
                    <Link href="/" aria-label="main page">
                        <Image src="/assets/brand/socket_fav_dark.svg" width={40} height={40} alt="viasocket" />
                    </Link>
                </div>
            </div>
        </>
    );
}
