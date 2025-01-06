import Image from 'next/image';

export default function TrustedBy({ trustedBy }) {
    return (
        <>
            <div className="grid gap-3">
                <span className=" font-medium text-gray-400">Trusted by</span>
                <div className="flex gap-5 flex-wrap">
                    {trustedBy?.length > 0 &&
                        trustedBy?.map((img, index) => {
                            return (
                                <div className="flex gap-5 flex-wrap" key={index}>
                                    {img?.icon[0] && (
                                        <Image
                                            key={index}
                                            className="h-[20px] w-[auto] grayscale opacity-50"
                                            src={img.icon[0] || 'https://placehold.co/40x40'}
                                            width={100}
                                            height={20}
                                            alt={img?.name}
                                        />
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
