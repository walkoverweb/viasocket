import Link from 'next/link';
import { MdFace } from 'react-icons/md';

export default function FeatureGridComp({ features }) {
    console.log('🚀 ~ FeatureGridComp ~ features:', features);
    function handleGridLayout(blockIndex) {
        let gridClass;
        switch (blockIndex % 5) {
            case 0:
                gridClass = 'row-span-4';
                break;
            case 1:
                gridClass = 'row-span-5';
                break;
            case 2:
                gridClass = 'row-span-4';
                break;
            case 3:
                gridClass = 'row-span-5';
                break;
            case 4:
                gridClass = 'row-span-5';
                break;
            default:
                gridClass = '';
                break;
        }
        return (
            'p-10 border border-black border-t-0 border-l-0 flex flex-col text-center items-center gap-8 h-full justify-center ' +
            gridClass
        );
    }
    return (
        <div className="container">
            <div className=" features_grid grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 border border-black border-b-0 border-r-0">
                {features?.length > 0 &&
                    features?.slice(0, 20).map((feature, index) => {
                        if (feature?.hidden != false) {
                            console.log(feature.hidden, index);
                            return (
                                <Link
                                    href={`/feature/${feature?.slug}`}
                                    key={index}
                                    className={handleGridLayout(index)}
                                >
                                    <MdFace fontSize={48} />
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-lg font-semibold">{feature?.name}</h2>
                                        <p>{feature?.description}</p>
                                    </div>
                                </Link>
                            );
                        }
                    })}
            </div>
        </div>
    );
}
