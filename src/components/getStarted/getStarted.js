import Link from 'next/link';
import { MdOutlineArrowForward } from 'react-icons/md';

export default function GetStarted({ data, isHero }) {
    return (
        <>
            <div className="grid gap-10 ">
                {isHero === 'false' && (
                    <h2 className="md:text-6xl text-4xl font-medium">
                        We'll help you get
                        <br /> started
                    </h2>
                )}

                <div className="flex  lg:gap-6 gap-4  flex-wrap">
                    {data[0] &&
                        data?.map((faq, index) => {
                            if (faq?.ishero === isHero || faq?.isonlyhero === isHero) {
                                if (!faq?.name) {
                                    return null;
                                }

                                return (
                                    <Link
                                        key={index}
                                        href={faq?.link && faq?.link}
                                        target={faq?.link === '#chat' ? '' : '_blank'}
                                        onClick={() => faq?.link === '#chat' && window.chatWidget.open()}
                                        aria-label="chat"
                                    >
                                        <button
                                            className={`flex text-start justify-start gap-1 btn  ${
                                                index == 0 && 'btn-accent outline outline-primary outline-1'
                                            } ${index == 1 && 'btn-primary btn-outline '} ${
                                                index !== 1 && index !== 0 && 'btn-ghost'
                                            }`}
                                            aria-label="get started"
                                        >
                                            <span>{faq?.name}</span>
                                            <MdOutlineArrowForward />
                                        </button>
                                    </Link>
                                );
                            }
                        })}
                </div>
            </div>
        </>
    );
}
