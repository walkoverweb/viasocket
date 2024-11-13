import { MdMenu } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import styles from './newnavbar.module.scss';
import NotificationBar from '../notificationBar/notificationbar';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const NewNavbar = ({ navData, utm }) => {
    var shorterData;
    if (navData?.length > 0) {
        shorterData = navData?.sort((a, b) => {
            return parseInt(a.priority) - parseInt(b.priority);
        });
    }
    return (
        <>
            <div className={`${styles.navbar_cont} flex w-full flex-col mt-12`}>
                <div className={`${styles.navbar} flex justify-between items-center w-full container gap-4`}>
                    <div className="w-[165px] h-[56px] border border-black border-b-0 p-2 flex items-center justify-center px-20">
                        <Link className="flex flex-row gap-2 items-center justify-center" href="/" aria-label="logo">
                            <Image
                                className="h-[32px] w-[32px]"
                                src={'/assets/brand/favicon_dark.svg'}
                                width={32}
                                height={32}
                                alt="viasocket"
                            />
                            <span className="flex items-center font-normal text-md md:text-lg">SOCKET</span>
                        </Link>
                    </div>

                    <div className="lg:flex hidden menu-horizontal ">
                        {shorterData &&
                            shorterData.map((option, index) => {
                                if (option.group_name === null && option.is_mininavonly === null) {
                                    if (option.is_parent) {
                                        return (
                                            <div className="dropdown dropdown-bottom w-[165px]" key={index}>
                                                <div
                                                    tabIndex={0}
                                                    role="button"
                                                    className="btn h-[56px] w-full normal-case justify-between text-black font-times-now text-lg font-semibold border  border-black bg-white hover:bg-gray-50 text-md md:text-lg"
                                                    aria-label="nav option"
                                                >
                                                    <span>{option?.name}</span>
                                                    <MdOutlineKeyboardArrowDown size={20} />
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content menu shadow bg-base-100 w-full"
                                                >
                                                    {shorterData.map((child, childIndex) => {
                                                        if (child.group_name && child.group_name === option.name) {
                                                            return (
                                                                <li key={childIndex}>
                                                                    {child.name === 'Live Chat' ? (
                                                                        <button
                                                                            onClick={openChatWidget}
                                                                            className="btn h-[56px] normal-case text-black font-times-now text-lg font-normal"
                                                                            aria-label="Chat"
                                                                        >
                                                                            Live Chat
                                                                        </button>
                                                                    ) : (
                                                                        <Link
                                                                            href={`${child.link ? child.link : ''}`}
                                                                            className="btn h-[56px] normal-case text-black font-times-now text-lg font-normal"
                                                                            target="_blank"
                                                                            aria-label="logo"
                                                                        >
                                                                            {child.name}
                                                                        </Link>
                                                                    )}
                                                                </li>
                                                            );
                                                        }
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="w-[165px]" key={index}>
                                                <Link
                                                    href={`${option.link ? option.link : '#'}`}
                                                    className="btn h-[56px] w-full normal-case text-black font-times-now text-lg font-normal border border-r-0 border-b-0  border-black bg-white hover:bg-gray-50 text-md md:text-lg"
                                                    target={option?.name?.toLowerCase() === 'home' ? '' : '_blank'}
                                                    aria-label={option?.name}
                                                >
                                                    {option?.name}
                                                </Link>
                                            </div>
                                        );
                                    }
                                }
                            })}

                        <div className="w-[165px]">
                            <Link
                                href={`/login?utm_source=${utm}`}
                                className="btn h-[56px] w-full normal-case text-black font-times-now text-lg font-normal border border-r-0 border-b-0 border-black bg-white hover:bg-gray-50 text-md md:text-lg"
                            >
                                Login
                            </Link>
                        </div>

                        <div className="w-[165px]">
                            <Link
                                href={`/signup?utm_source=${utm}`}
                                className="btn h-[56px] w-full normal-case text-white font-times-now text-lg font-normal border border-black border-b-0 bg-red-700 hover:bg-red-800 text-md md:text-lg"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="dropdown dropdown-end lg:hidden block">
                        <div
                            tabIndex={0}
                            role="button"
                            className="w-[165px] h-[56px] flex items-center justify-center border border-black"
                            aria-label="dropdown nav"
                        >
                            <MdMenu className="w-[24px] h-[24px]" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-base-100 w-[165px] shadow-lg">
                            {shorterData &&
                                shorterData.map((option, index) => {
                                    if (!option.is_parent) {
                                        return (
                                            <li key={index}>
                                                <Link
                                                    href={`${option.link ? option.link : '#'}`}
                                                    target="_blank"
                                                    aria-label={option?.name}
                                                    className="text-black font-times-now text-lg font-normal"
                                                >
                                                    {option?.name}
                                                </Link>
                                            </li>
                                        );
                                    }
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewNavbar;
