import React, {useCallback, useMemo} from "react";
import {FaXTwitter} from "react-icons/fa6";
import Image from "next/image";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {useCurrentUser} from "@/hooks/user";
import {RiFileListLine, RiHome7Fill, RiNotification3Line} from "react-icons/ri";
import {BsPeople, BsPerson, BsSearch} from "react-icons/bs";
import {HiOutlineMail} from "react-icons/hi";
import {FiBookmark} from "react-icons/fi";
import {CgMoreO} from "react-icons/cg";
import toast from "react-hot-toast";
import {graphqlClient} from "@/clients/api";
import {verifyUserGoogleTokenQuery} from "@/graphql/query/user";
import {useQueryClient} from "@tanstack/react-query";
import Link from "next/link";

interface XSidebarButtons {
    title: String,
    icon: React.ReactNode,
    link: string
}

interface XLayoutProps {
    children: React.ReactNode
}

const XLayout: React.FC<XLayoutProps> = (props) => {
    const { user } = useCurrentUser()
    const queryClient = useQueryClient()
    const sidebarMenuItems: XSidebarButtons[] = useMemo(() => [
        {
            title: 'Home',
            icon: <RiHome7Fill />,
            link: '/'
        },
        {
            title: 'Explore',
            icon: <BsSearch />,
            link: '/'
        },
        {
            title: 'Notifications',
            icon: <RiNotification3Line />,
            link: '/'
        },
        {
            title: 'Messages',
            icon: <HiOutlineMail />,
            link: '/'
        },
        {
            title: 'Lists',
            icon: <RiFileListLine />,
            link: '/'
        },
        {
            title: 'Bookmarks',
            icon: <FiBookmark />,
            link: '/'
        },
        {
            title: 'Communities',
            icon: <BsPeople />,
            link: '/'
        },
        {
            title: 'Verified',
            icon: <FaXTwitter />,
            link: '/'
        },
        {
            title: 'Profile',
            icon: <BsPerson />,
            link: `/${user?.id}`
        },
        {
            title: 'More',
            icon: <CgMoreO />,
            link: '/'
        }
    ], [user?.id]);

    const handleLoginWithGoogle = useCallback(
        async (cred: CredentialResponse) => {
            const googleToken = cred.credential

            if (!googleToken) return toast.error('Google token not found');

            const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, { token: googleToken });

            if (verifyGoogleToken) window.localStorage.setItem("__x_token", verifyGoogleToken)

            toast.success("Verified Success");

            await queryClient.invalidateQueries(["current-user"])
        },
        [queryClient]
    );

    return <div className='bg-white'>
        <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
            <div className="col-span-2 sm:col-span-3 sm:ml-12 relative">
                <div>
                    <div className="text-3xl h-fit w-fit hover:bg-gray-200 rounded-full p-2 ml-3 transition-all cursor-pointer">
                        <FaXTwitter />
                    </div>
                    <div className='mt-4 text-xl pr-12'>
                        <ul>
                            {sidebarMenuItems.map(item => (
                                <li key={crypto.randomUUID()}>
                                    <Link href={item.link} className='flex justify-start items-center gap-6 mt-3 hover:bg-gray-200 rounded-full py-2 px-5 w-fit transition-all cursor-pointer'>
                                        <span className='text-2xl'>{item.icon}</span>
                                        <span className="hidden sm:block">{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className='hidden mt-5 sm:block'>
                            <button className='bg-[#1d9bf0] p-3 text-xl text-white font-semibold w-full rounded-full'>Post</button>
                        </div>
                    </div>
                </div>
                {
                    user
                    && (
                        <div className="absolute bottom-5 flex gap-2 hover:bg-gray-200 p-3 rounded-full">
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
                                <h3 className="hidden font-semibold sm:block">{user.firstName} {user.lastName}</h3>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="col-span-10 sm:col-span-5 border-l-[1px] border-r-[1px] height-screen overflow-scroll border-gray-100">
                {props.children}
            </div>
            <div className="hidden sm:col-span-3 sm:block p-5 rounded-lg">
                {
                    !user && <div>
                        <GoogleLogin onSuccess={handleLoginWithGoogle}/>
                    </div>
                }
            </div>
        </div>
    </div>
}

export default XLayout