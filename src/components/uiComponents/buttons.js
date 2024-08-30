import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';

//Link button
export function LinkButton({ title, href }) {
    return (
        <>
            <Link
                href={href}
                className="text-link flex items-center gap-0 hover:gap-3 hover:underline transition-all  ease-in-out w-fit"
            >
                {title} <MdChevronRight fontSize={22} />{' '}
            </Link>
        </>
    );
}

//Button content with icon
export function BtnContWithIcon({ title }) {
    return (
        <>
            <span className="flex items-center gap-0 hover:gap-3 transition-all  ease-in-out w-fit">
                {title} <MdChevronRight fontSize={22} />{' '}
            </span>
        </>
    );
}
