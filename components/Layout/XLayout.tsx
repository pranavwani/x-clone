import React, {useCallback, useEffect, useMemo, useState} from "react";
import {FaXTwitter} from "react-icons/fa6";
import Image from "next/image";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {useCurrentUser} from "@/hooks/user";
import {RiFileListLine, RiHome7Fill, RiNotification3Line} from "react-icons/ri";
import {BsPeople, BsPerson, BsSearch} from "react-icons/bs";
import {HiOutlineMail} from "react-icons/hi";
import {FiBookmark, FiSearch} from "react-icons/fi";
import {CgMoreO} from "react-icons/cg";
import toast from "react-hot-toast";
import {graphqlClient} from "@/clients/api";
import {verifyUserGoogleTokenQuery} from "@/graphql/query/user";
import {useQueryClient} from "@tanstack/react-query";
import Link from "next/link";
import {log} from "util";

interface XSidebarButtons {
    title: String,
    icon: React.ReactNode,
    link: string,
    disabled: boolean
}

interface XLayoutProps {
    children: React.ReactNode
}

const XLayout: React.FC<XLayoutProps> = (props) => {
    const {user} = useCurrentUser()
    const queryClient = useQueryClient()
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
    const bottombarMenuItems: XSidebarButtons[] = useMemo(() => [
        {
            title: 'Home',
            icon: <RiHome7Fill/>,
            link: '/',
            disabled: false
        },
        {
            title: 'Search',
            icon: <FiSearch />,
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
    ], [])
    const profileMenu: HTMLElement = document.getElementById("profileMenu") as HTMLElement
    const sidebarMenu: HTMLElement = document.getElementById("sidebarMenu") as HTMLElement
    const topbarMenu: HTMLElement = document.getElementById("topbarMenu") as HTMLElement

    const handleLoginWithGoogle = useCallback(
        async (cred: CredentialResponse) => {
            const googleToken = cred.credential

            if (!googleToken) return toast.error('Google token not found');

            const {verifyGoogleToken} = await graphqlClient.request(verifyUserGoogleTokenQuery, {token: googleToken});

            if (verifyGoogleToken) window.localStorage.setItem("__x_token", verifyGoogleToken)

            toast.success("Verified Success");

            await queryClient.invalidateQueries(["current-user"])
        },
        [queryClient]
    );

    // Function to show the sidebar
    function openSidebar() {
        sidebarMenu?.classList.remove('-translate-x-full');
        sidebarMenu.classList.add("shadow-lg")
    }

    // Function to close the sidebar
    function closeSidebar() {
        sidebarMenu?.classList.add('-translate-x-full');
        sidebarMenu?.classList.remove("shadow-lg")
    }

    const handleOnPageClick: (event: any) => void = (event: any) => {
        if (!sidebarMenu?.contains(event.target) && !topbarMenu?.contains(event.target)) {
            closeSidebar()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOnPageClick)

        return () => {
            document.removeEventListener('click', handleOnPageClick)
        }
    }, [handleOnPageClick])

    return <div>
        <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
            <div id="topbarMenu" className="sm:hidden flex w-screen p-2 border-b-[1px] border-gray-100">
                <div
                    className="hover:bg-gray-200 dark:hover:bg-gray-900 rounded-full"
                    onClick={() => {
                        openSidebar()
                    }}
                >
                    {
                        user && user?.profileImageUrl && (
                            <Image
                                className="rounded-full "
                                src={user?.profileImageUrl}
                                alt="user-image"
                                height={25}
                                width={25}
                            />
                        )
                    }
                </div>
                <div
                    className="absolute right-[50%] text-2xl hover:bg-gray-200 dark:hover:bg-gray-900 rounded-full transition-all cursor-pointer"
                >
                    <FaXTwitter/>
                </div>
            </div>
            <div id="sidebarMenu" className="absolute shadow-lg sm:shadow-none h-screen sm:col-span-3 sm:ml-12 bg-white sm:relative transform -translate-x-full sm:-translate-x-0 transition-transform duration-300 cursor-pointer">
                <div>
                    <div
                        className="text-3xl h-fit w-fit hover:bg-gray-200 dark:hover:bg-gray-900 rounded-full p-2 ml-3 transition-all cursor-pointer">
                        <FaXTwitter/>
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
                                className="flex gap-2 w-fit hover:bg-gray-200 dark:hover:bg-gray-900 p-3 rounded-full"
                                onClick={() => {
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
            <div
                className="col-span-12 sm:col-span-5 border-l-[1px] border-r-[1px] height-screen overflow-scroll border-gray-100 dark:border-gray-700">
                {props.children}
            </div>
            <div className="hidden sm:col-span-3 sm:block p-5 border-gray-100 dark:border-gray-700">
                {
                    !user && <div className="border-[1px] border-inherit p-4 rounded-2xl">
                        <div className="py-2">
                            <span className="text-xl font-extrabold">New to X?</span>
                        </div>
                        <div className="pb-2">
                            <span
                                className="text-xs text-gray-500">Sign up now to get your own personalized timeline!</span>
                        </div>

                        <GoogleLogin shape="circle" width="250" onSuccess={handleLoginWithGoogle}/>
                    </div>
                }
            </div>
            <div className="sm:hidden w-screen border-y-[1px] fixed bottom-0 bg-white">
                {user &&
                    <ul className="flex justify-around">
                        {bottombarMenuItems.map(item => (
                            <li key={crypto.randomUUID()} className="pt-4 pb-4">
                                <Link href={item.link}
                                      className="mt-3 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-full w-fit transition-all cursor-pointer disabled:opacity-50"
                                      aria-disabled={item.disabled}
                                >
                                    <span className='text-2xl'>{item.icon}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    </div>
}

export default XLayout