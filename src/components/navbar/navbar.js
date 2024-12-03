import { MdMenu, MdLogin, MdPersonAdd } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.scss';

export default function Navbar({ navData, utm }) {
    let shorterData;
    if (navData?.length > 0) {
        shorterData = navData?.sort((a, b) => {
            return parseInt(a.priority) - parseInt(b.priority);
        });
    }
    let borderClass;
    let backgroundClass;
    if (utm && utm === '/pricing') {
        borderClass = 'border-b-0';
    }
    if (utm && utm === '/index') {
        backgroundClass = 'bg-[#FFFFFF80] ';
    }

    return (
        <>
            <div className="container justify-between lg:flex hidden">
                <Link
                    href="/"
                    aria-label="logo"
                    className={`h-[56px] w-[192px] flex  justify-center items-center border border-black ${borderClass} ${backgroundClass} `}
                >
                    <Image
                        src="/assets/brand/logo.svg"
                        className="h-[32px] w-auto "
                        width={60}
                        height={60}
                        alt="viasocket"
                    />
                </Link>

                <div className="flex">
                    {shorterData &&
                        shorterData?.map((option, index) => {
                            return (
                                <Link
                                    key={index}
                                    target={option.link?.startsWith('http') ? '_blank' : '_self'}
                                    href={option.link || '#'}
                                >
                                    <div
                                        className={`w-[142px] h-[56px] text-sm flex  justify-center items-center font-semibold border border-r-0  border-black ${borderClass} ${backgroundClass}`}
                                    >
                                        {option.name}
                                    </div>
                                </Link>
                            );
                        })}
                    <Link
                        className={`w-[142px] h-[56px] text-sm flex  justify-center items-center font-semibold border border-r-0  border-black ${borderClass} ${backgroundClass}`}
                        href={`/login?utm_source=${utm}`}
                    >
                        Login
                    </Link>
                    <Link
                        className={`w-[142px] h-[56px] text-sm flex  justify-center bg-accent text-white items-center font-semibold border  border-black ${borderClass} `}
                        href={`/signup?utm_source=${utm}`}
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
            <div className="container justify-between  flex lg:hidden">
                <Link
                    href="/"
                    aria-label="logo"
                    className={`h-[56px] w-[192px] hidden sm:flex justify-center items-center border border-black ${borderClass} ${backgroundClass}`}
                >
                    <Image
                        src="/assets/brand/logo.svg"
                        className="h-[32px] w-auto "
                        width={48}
                        height={48}
                        alt="viasocket"
                    />
                </Link>
                <Link
                    href="/"
                    aria-label="logo"
                    className={`h-[56px] w-[56px] flex sm:hidden  justify-center items-center border border-black ${borderClass} ${backgroundClass}`}
                >
                    <Image
                        src="/assets/brand/favicon_dark.svg"
                        className="h-[32px] w-auto "
                        width={48}
                        height={48}
                        alt="viasocket"
                    />
                </Link>
                <div className=" flex">
                    <Link
                        className={`h-[56px] w-[56px] flex justify-center items-center border border-black border-r-0 ${borderClass} ${backgroundClass}`}
                        href={`/login?utm_source=${utm}`}
                        aria-label="Login"
                    >
                        <MdLogin size={24} />
                    </Link>
                    <Link
                        className={`h-[56px] w-[56px] flex justify-center items-center border border-black bg-accent text-white border-r-0 ${borderClass} `}
                        href={`/signup?utm_source=${utm}`}
                        aria-label="Sign Up"
                    >
                        <MdPersonAdd size={24} />
                    </Link>

                    <div className="dropdown dropdown-end  ">
                        <button
                            tabIndex={0}
                            className={`h-[56px] w-[56px] flex justify-center items-center border border-black ${borderClass} ${backgroundClass}`}
                            aria-label="Menu"
                        >
                            <MdMenu size={24} />
                        </button>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu  shadow bg-white border border-gray-300 w-48 "
                        >
                            {shorterData &&
                                shorterData.map((option, index) => (
                                    <li key={index}>
                                        <Link
                                            href={option.link || '#'}
                                            className="text-black text-sm hover:bg-gray-100 block px-2 "
                                        >
                                            {option.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
