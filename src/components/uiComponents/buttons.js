import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';

export default function LinkButton({ title, href }) {
    return (
        <>
            <Link
                href={href}
                className="text-link flex items-center gap-0 hover:gap-6 hover:underline transition-all  ease-in-out w-fit"
            >
                {title} <MdChevronRight fontSize={22} />{' '}
            </Link>
        </>
    );
}
