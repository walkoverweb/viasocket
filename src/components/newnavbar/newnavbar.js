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
                <div className={`${styles.navbar} flex justify-between items-center w-full container `}>
                    <div className="border-2 border-black p-4">
                        <Link href="/" aria-label="logo">
                            <Image
                                className="h-[40px] w-auto"
                                src={'/assets/brand/logo.svg'}
                                width={1080}
                                height={400}
                                alt="viasocket"
                            />
                        </Link>
                    </div>

                    <div className="gap-6 lg:gap-0 lg:flex hidden ">
                        {shorterData &&
                            shorterData.map((option, index) => {
                                if (option.group_name === null && option.is_mininavonly === null) {
                                    if (option.is_parent) {
                                        return (
                                            <div className="dropdown dropdown-bottom " key={index}>
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
                                                    className="dropdown-content z-[1] menu  shadow bg-base-100  w-52"
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
                                                className="  hover:underline border border-black p-6"
                                                target={option?.name?.toLowerCase() === 'home' ? '' : '_blank'}
                                                aria-label={option?.name}
                                            >
                                                {option?.name}
                                            </Link>
                                        );
                                    }
                                }
                            })}
                        <div className="border border-black p-3 bg-white">
                            <Link href={`/login?utm_source=${utm}`} className="btn p-4  bg-white btn-sm border-none ">
                                Login
                            </Link>
                        </div>
                        <div className="border border-black p-3 bg-red-700">
                            <Link
                                href={`/signup?utm_source=${utm}`}
                                className="btn bg-red-700 btn-sm p-4 border-none text-white"
                            >
                                Sign Up
                            </Link>
                        </div>
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

export default NewNavbar;
