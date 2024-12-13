import Image from 'next/image';
import { MdChevronRight, MdOpenInNew } from 'react-icons/md';

export default function IntegrationsAppOneComp({ appDetails }) {
    console.log('🚀 ~ IntegrationsAppOneComp ~ appDetails:', appDetails);
    return (
        <>
            <div style={{ background: appDetails?.brandcolor }}>
                <div className="container py-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 px-5 py-3 bg-white w-full max-w-[400px]">
                        <Image className="h-10 w-fit" src={appDetails?.iconurl} width={36} height={36} alt="Slack" />
                        <div>
                            <h2 className="text-2xl font-bold">{appDetails?.name}</h2>
                            <p className="text-sm text-gray-500">{appDetails?.category?.slice(0, 2).join(', ')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <button className="bg-white flex items-center gap-2 px-5 py-3 hover:bg-black hover:text-white transition-all">
                            Login to Slack <MdOpenInNew />{' '}
                        </button>
                        <button className="bg-white flex items-center gap-2 px-5 py-3 hover:bg-black hover:text-white transition-all ">
                            Login to viaSocket <MdOpenInNew />{' '}
                        </button>
                    </div>
                </div>
            </div>
            <div className="container cont ">
                <div className="flex items-center gap-2 text-lg">
                    <span className="flex items-center gap-0 underline">
                        Integrations <MdChevronRight fontSize={22} />{' '}
                    </span>
                    <span className="flex items-center gap-0 underline">
                        {appDetails?.name} <MdChevronRight fontSize={22} />
                    </span>
                </div>
            </div>
        </>
    );
}
