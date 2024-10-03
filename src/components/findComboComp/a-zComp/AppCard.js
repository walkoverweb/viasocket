import Image from 'next/image';

export default function AppCard({ appName, appslug }) {
    console.log(appName, 8757826);
    console.log(appslug, 7812478);
    return (
        <div className="border p-16 rounded flex flex-col gap-6 items-center justify-center">
            <div className="flex items-center gap-2">
                <Image src={`/icons/${appName}.png`} width={28} height={28} alt={appName} />
                <h1 className="capitalize text-xl font-semibold">{appName}</h1>
            </div>
            <a className="text-link capitalize" href={`/integrations/${appName}`}>
                Go to {appName} integrations
            </a>
        </div>
    );
}
