import Link from 'next/link';

const AlphabeticalComponent = ({ alphabet, appDetails, step }) => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className=" flex flex-col gap-6  w-full p-12">
            <h2 className="text-2xl font-semibold text-center">Select an app to integrate with</h2>
            <div className="flex flex-row flex-wrap justify-center gap-2">
                {/* <Link
                    key={9}
                    className="text-lg py-1 px-2 hover:bg-black hover:text-white transition-all duration-150 "
                    href={`/find-apps/0-9`}
                    aria-label="alphabet"
                >
                    0-9
                </Link> */}
                {alphabets.map((letter) => (
                    <Link
                        className={`text-lg py-1 px-2 hover:bg-black hover:text-white transition-all  duration-150 ${letter === alphabet ? 'font-bold' : ''}`}
                        key={letter}
                        href={
                            step === 2
                                ? `/find-apps/${alphabet}/${appDetails?.appslugname}/${letter.toLowerCase()}`
                                : `/find-apps/${letter.toLowerCase()}`
                        }
                        aria-label="alphabet"
                    >
                        {letter}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AlphabeticalComponent;
