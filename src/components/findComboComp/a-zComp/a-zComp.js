import Link from 'next/link';

export default function AZComp() {
    return (
        <ul className="flex gap-2">
            {Array.from({ length: 26 }, (_, i) => (
                <li key={i}>
                    <Link
                        className="px-2 py-2 transition-all rounded uppercase border hover:bg-secondary "
                        href={`/find-combinations/${String.fromCharCode(97 + i)}`}
                    >
                        {String.fromCharCode(97 + i)}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
