import { MdMenu } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.scss';
import NotificationBar from '../notificationBar/notificationbar';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Navbar = ({ navData }) => {
    var shorterData;
    if (navData?.length > 0) {
        shorterData = navData?.sort((a, b) => {
            return parseInt(a.priority) - parseInt(b.priority);
        });
    }
    return (
        <>
            <div className={`${styles.navbar_cont} flex w-full flex-col `}>
                <NotificationBar />
                <div className={`${styles.navbar} flex justify-between items-center w-full py-4 container my-auto`}>
                    <Link href="/" aria-label="logo">
                        <Image
                            className="h-[40px] w-auto"
                            src={'/assets/brand/logo.svg'}
                            width={1080}
                            height={400}
                            alt="viasocket"
                        />
                    </Link>

                    <div className="gap-6 lg:flex hidden items-center">
                        {shorterData &&
                            shorterData.map((option, index) => {
                                if (option.group_name === null && option.is_mininavonly === null) {
                                    if (option.is_parent) {
                                        return (
                                            <div className="dropdown dropdown-bottom" key={index}>
                                                <div
                                                    tabIndex={0}
                                                    role="button"
                                                    className=" flex items-center gap-1 hover:underline"
                                                    aria-label="nav option"
                                                >
                                                    <span>{option?.name}</span>
                                                    <MdOutlineKeyboardArrowDown size={20} />
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100  w-52"
                                                >
                                                    {shorterData.map((child, childIndex) => {
                                                        if (child.group_name && child.group_name === option.name) {
                                                            return (
                                                                <li key={childIndex}>
                                                                    {child.name === 'Live Chat' ? (
                                                                        <button
                                                                            onClick={openChatWidget}
                                                                            aria-label="Chat"
                                                                        >
                                                                            Live Chat
                                                                        </button>
                                                                    ) : (
                                                                        <Link
                                                                            href={`${child.link ? child.link : ''}`}
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
                                            <Link
                                                key={index}
                                                href={`${option.link ? option.link : '#'}`}
                                                className="  hover:underline"
                                                target={option?.name?.toLowerCase() === 'home' ? '' : '_blank'}
                                                aria-label={option?.name}
                                            >
                                                {option?.name}
                                            </Link>
                                        );
                                    }
                                }
                            })}
                        <Link href="/login" className="btn btn-outline btn-primary btn-sm ">
                            Login
                        </Link>
                        <Link href="/signup" className="btn btn-accent btn-sm outline-primary outline-1 outline">
                            Sign Up
                        </Link>
                    </div>
                    <div className="dropdown dropdown-end lg:hidden block">
                        <div tabIndex={0} role="button" className="" aria-label="dropdown nav">
                            <MdMenu className="w-[24px] h-[24px]" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2  bg-base-100  w-52 shadow-lg">
                            {shorterData &&
                                shorterData.map((option, index) => {
                                    if (!option.is_parent) {
                                        return (
                                            <li key={index}>
                                                <Link
                                                    href={`${option.link ? option.link : '#'}`}
                                                    target="_blank"
                                                    aria-label={option?.name}
                                                >
                                                    {' '}
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

export default Navbar;
