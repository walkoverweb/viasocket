import Image from 'next/image';
import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';

export default function IntegrationsAbout({ pluginData }) {
    return (
        <>
            <div className="py-24">
                <div className="flex lg:flex-row md:flex-row flex-col gap-10 container justify-between">
                    <div className="flex flex-1 flex-col justify-start gap-4">
                        <Image
                            src={pluginData?.iconurl || 'https://placehold.co/40x40'}
                            width={34}
                            height={34}
                            alt={pluginData?.name}
                        />
                        <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">
                            {`About ${pluginData?.name}`}
                        </h6>
                        <p className="md:text-xl text-base">{pluginData?.description}</p>
                        <div>
                            <Link
                                href={
                                    pluginData?.domain.startsWith('http')
                                        ? pluginData?.domain
                                        : 'http://' + pluginData?.domain
                                }
                                target="_blank"
                            >
                                <button
                                    className="font-medium text-[#2D81F7] flex items-center"
                                    aria-label="load more apps"
                                >
                                    Learn More
                                    <MdChevronRight fontSize={22} />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-4">
                        <Link href="/" aria-label="main link">
                            <Image src="/assets/brand/socket_fav_dark.svg" width={34} height={34} alt="viasocket" />
                        </Link>
                        <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">About viaSocket</h6>
                        <p className="md:text-xl text-base ">
                            viasocket is an innovative and versatile workflow automation platform designed to streamline
                            and simplify the integration of your favorite applications and tools.
                        </p>
                        <div>
                            <Link href="/" target="_blank">
                                <button
                                    className="font-medium text-[#2D81F7] flex items-center"
                                    aria-label="load more apps"
                                >
                                    Learn More
                                    <MdChevronRight fontSize={22} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
