import Image from 'next/image';

export default function SingleAppsEvents({ plugins }) {
    return (
        <>
            {plugins?.events.length > 0 && (
                <div className="py-24 bg-white">
                    <div className="flex flex-col gap-9 container">
                        {<h2 className="text-3xl font-bold">Actions and Triggers</h2>}
                        {plugins?.events.some((event) => event.type === 'trigger') && (
                            <div className="flex-col flex gap-3">
                                <h3 className="text-xl font-semibold">Triggers</h3>
                                <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
                                    {plugins?.events.map((event) => {
                                        if (event.type === 'trigger') {
                                            return (
                                                <div
                                                    key={event.rowid}
                                                    className="flex gap-3 border border-gray-300 rounded-sm p-3 items-center"
                                                >
                                                    <Image
                                                        width={24}
                                                        height={24}
                                                        className="w-auto h-[28px]"
                                                        src={
                                                            plugins?.iconurl
                                                                ? plugins?.iconurl
                                                                : 'https://placehold.co/40x40'
                                                        }
                                                        alt={plugins?.name}
                                                    />

                                                    <div>
                                                        <h4 className="font-semibold">{event?.name}</h4>
                                                        <p>{event?.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        )}
                        {plugins?.events.some((event) => event?.type === 'action') && (
                            <div className="flex-col flex gap-3">
                                <h3 className="text-xl font-semibold">Actions</h3>
                                <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
                                    {plugins?.events.map((event) => {
                                        if (event.type === 'action') {
                                            return (
                                                <div
                                                    key={event.rowid}
                                                    className="flex gap-3 border border-gray-300 rounded-sm p-3 items-center"
                                                >
                                                    <Image
                                                        width={24}
                                                        height={24}
                                                        className="w-auto h-[28px]"
                                                        src={
                                                            plugins?.iconurl
                                                                ? plugins?.iconurl
                                                                : 'https://placehold.co/40x40'
                                                        }
                                                        alt={plugins?.name}
                                                    />

                                                    <div>
                                                        <h4 className="font-semibold">{event?.name}</h4>
                                                        <p>{event?.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
