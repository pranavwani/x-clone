import React, {useCallback, useEffect, useMemo} from "react";
import Link from "next/link";
import {FaXTwitter} from "react-icons/fa6";
import Image from "next/image";
import {User} from "@/gql/graphql";
import {RiFileListLine, RiHome7Fill, RiNotification3Line} from "react-icons/ri";
import {BsPeople, BsPerson, BsSearch} from "react-icons/bs";
import {HiOutlineMail} from "react-icons/hi";
import {FiBookmark} from "react-icons/fi";
import {CgMoreO} from "react-icons/cg";

interface XSidebarButtons {
    title: String,
    icon: React.ReactNode,
    link: string,
    disabled: boolean
}

interface SidebarMenuProps {
    user: User
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ user }) => {
    const sidebarMenuItems: XSidebarButtons[] = useMemo(() => [
        {
            title: 'Home',
            icon: <RiHome7Fill/>,
            link: '/',
            disabled: true
        },
        {
            title: 'Explore',
            icon: <BsSearch />,
            link: '/',
            disabled: true
        },
        {
            title: 'Notifications',
            icon: <RiNotification3Line />,
            link: '/',
            disabled: true
        },
        {
            title: 'Messages',
            icon: <HiOutlineMail />,
            link: '/',
            disabled: true
        },
        {
            title: 'Lists',
            icon: <RiFileListLine />,
            link: '/',
            disabled: true
        },
        {
            title: 'Bookmarks',
            icon: <FiBookmark />,
            link: '/',
            disabled: true
        },
        {
            title: 'Communities',
            icon: <BsPeople />,
            link: '/',
            disabled: true
        },
        {
            title: 'Verified',
            icon: <FaXTwitter />,
            link: '/',
            disabled: true
        },
        {
            title: 'Profile',
            icon: <BsPerson/>,
            link: `/${user?.id}`,
            disabled: false
        },
        {
            title: 'More',
            icon: <CgMoreO />,
            link: '/',
            disabled: true
        }
    ], [user?.id]);

    // Function to close the sidebar
    const closeSidebar = useCallback(() => {
        const sidebarMenu= document.getElementById("sidebarMenu") as HTMLElement

        sidebarMenu?.classList.add('-translate-x-full');
        sidebarMenu?.classList.remove("shadow-lg")
    }, []);

    const handleOnPageClick: (event: any) => void = useCallback((event: any) => {
        const sidebarMenu= document.getElementById("sidebarMenu") as HTMLElement
        const topbarMenu= document.getElementById("topbarMenu") as HTMLElement

        if (!sidebarMenu?.contains(event.target) && !topbarMenu?.contains(event.target)) {
            closeSidebar()
        }
    }, [closeSidebar])

    useEffect(() => {
        document.addEventListener('click', handleOnPageClick)

        return () => {
            document.removeEventListener('click', handleOnPageClick)
        }
    }, [handleOnPageClick])

    return <div id="sidebarMenu" className="absolute shadow-lg sm:shadow-none h-screen sm:col-span-3 sm:ml-12 bg-white dark:bg-black sm:relative transform -translate-x-full sm:-translate-x-0 transition-transform duration-300 cursor-pointer z-50">
        <div>
            <div className="text-3xl h-fit w-fit hover:bg-gray-200 dark:hover:bg-gray-900 rounded-full p-2 ml-3 transition-all cursor-pointer" onClick={() => closeSidebar()}>
                <Link href="/">
                    <FaXTwitter/>
                </Link>
            </div>
            {user && <div className="mt-4 text-xl pr-12">
                <ul>
                    {sidebarMenuItems.map(item => (
                        <li key={crypto.randomUUID()}>
                            <Link
                                href={item.link}
                                className="flex justify-start items-center gap-6 mt-3 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-full py-2 px-5 w-fit transition-all cursor-pointer"
                                aria-disabled={item.disabled}
                            >
                                <span className='text-2xl'>{item.icon}</span>
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-5 ml-5">
                    <button
                        className="bg-[#1d9bf0] p-3 text-xl text-white font-semibold w-full rounded-full"
                        disabled={true}
                    >
                        Post
                    </button>
                </div>
            </div>
            }
        </div>
        {
            user
            && (
                <div className="absolute bottom-5">
                    <div
                        id="profileMenu"
                        className="hidden sm:right-0 w-[250px] rounded-3xl p-5 shadow-lg dark:shadow-sm shadow-gray-300 dark:shadow-gray-700 z-1 mb-5 bg-white dark:bg-black"
                    >
                        <button className="lgBtn font-semibold hover:bg-gray-200 dark:hover:bg-gray-900 p-2"
                                onClick={() => {
                                    localStorage.removeItem("__x_token")
                                    window.location.reload()
                                }}>
                            Log out @{user.firstName} {user.lastName}
                        </button>
                    </div>
                    <div
                        className="flex gap-2 items-center w-fit hover:bg-gray-200 dark:hover:bg-gray-900 p-3 rounded-full"
                        onClick={() => {
                            const profileMenu= document.getElementById("profileMenu") as HTMLElement

                            profileMenu.style.display = profileMenu?.style.display === "block" ? "none" : "block"
                        }}
                    >
                        {
                            user && user?.profileImageUrl && (
                                <Image
                                    className="rounded-full "
                                    src={user?.profileImageUrl}
                                    alt="user-image"
                                    height={40}
                                    width={40}
                                />
                            )
                        }
                        <div>
                            <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
}

export  default  SidebarMenu