import Image from 'next/image';
import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';

export default function IntegrationsAbout({ plugins }) {
    return (
        <>
            <div className="py-24">
                <div className="flex lg:flex-row md:flex-row flex-col gap-10 container justify-between">
                    {plugins.length &&
                        plugins.map((plugin) => {
                            return (
                                <>
                                    <div className="flex flex-1 flex-col justify-start gap-4">
                                        <Image
                                            src={plugin?.iconurl || 'https://placehold.co/40x40'}
                                            width={34}
                                            height={34}
                                            alt={plugin?.name}
                                        />
                                        <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">
                                            {`About ${plugin?.name}`}
                                        </h6>
                                        <p className="md:text-xl text-base">{plugin?.description}</p>
                                        <div>
                                            <Link
                                                href={
                                                    plugin?.domain?.startsWith('http')
                                                        ? plugin?.domain
                                                        : 'http://' + plugin?.domain
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
                                </>
                            );
                        })}
                    {plugins?.length == 1 && (
                        <div className="flex flex-1 flex-col gap-4">
                            <Link href="/" aria-label="main link">
                                <Image src="/assets/brand/socket_fav_dark.svg" width={34} height={34} alt="viasocket" />
                            </Link>
                            <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">About viaSocket</h6>
                            <p className="md:text-xl text-base ">
                                viasocket is an innovative and versatile workflow automation platform designed to
                                streamline and simplify the integration of your favorite applications and tools.
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
                    )}
                </div>
            </div>
        </>
    );
}
