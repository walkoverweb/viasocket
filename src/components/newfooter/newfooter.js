import Image from 'next/image';
import Link from 'next/link';

const NewFooter = ({ footerData }) => {
    const groupedData = footerData?.reduce((acc, obj) => {
        const groupName = obj.group_name;
        if (obj?.hidden === null) {
            if (!acc[groupName]) {
                acc[groupName] = [];
            }
            acc[groupName].push(obj);
        }

        return acc;
    }, {});

    const renderedGroups =
        groupedData &&
        Object.entries(groupedData).map(([groupName, items]) => {
            if (items.length > 0) {
                return (
                    <div className="flex flex-col gap-8 w-full" key={groupName}>
                        <h2 className="font-bold">{groupName}</h2>
                        <div className="flex flex-col gap-4">
                            {items.map(
                                (item, index) =>
                                    !item.hidden && (
                                        <Link
                                            target="_blank"
                                            href={
                                                item?.link
                                                    ? item.link
                                                    : `/${item?.name.toLowerCase().replace(/\s+/g, '-')}`
                                            }
                                            key={index}
                                            aria-label={item?.name}
                                        >
                                            {item?.name}
                                        </Link>
                                    )
                            )}
                        </div>
                    </div>
                );
            }
        });
    return (
        <>
            <div className="grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 border border-black border-b border-0">
                <div className="grid grid-cols-1 gap-y-8 lg:gap-y-24 w-full justify-between p-6 sm:p-12 order-last lg:order-first border border-black border-b-0 border-r-0    border-t-0 border-l md:order-4">
                    <div className="flex flex-col gap-2 mb-12 sm:mb-24 py-4">
                        <Link href="/" aria-label="socket fav icon">
                            <Image
                                src="/assets/brand/socket_fav_dark.svg"
                                width={46}
                                height={46}
                                alt="socket fav icon"
                            />
                        </Link>
                        <p>© 2024 viaSocket</p>
                        <p>All rights reserved.</p>
                    </div>
                    <div className="flex items-end gap-2 w-full flex-wrap my-8">
                        <span>A product of</span>
                        <Link href="https://walkover.in/" target="_blank" aria-label="walkover">
                            <Image src="/assets/brand/walkover.svg" alt="walkover" width={100} height={20} />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 w-full border-l border-b border-black p-6 sm:p-16  md:order-1">
                    {renderedGroups.slice(0, 2)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 w-full border-l border-black p-6 sm:p-16 min-[768px]:border-l min-[1024px]:border-l md:order-2  border-b min-[1024]:border-b-0 ">
                    {renderedGroups.slice(2, 4)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 w-full  min-[768px]:border-l border-black p-6 sm:p-16 border-b min-[1024]:border-b-0  border-l min-[768px]:border-t-0 md:order-3">
                    {renderedGroups.slice(4, 6)}
                </div>
            </div>
        </>
    );
};
export default NewFooter;
