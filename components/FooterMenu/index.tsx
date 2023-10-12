import Link from "next/link";
import React, {useMemo} from "react";
import {RiHome7Fill, RiNotification3Line} from "react-icons/ri";
import {FiSearch} from "react-icons/fi";
import {HiOutlineMail} from "react-icons/hi";
import {User} from "@/gql/graphql";

interface BottombarMenuButtons {
    title: String,
    icon: React.ReactNode,
    link: string,
    disabled: boolean
}

const FooterMenu: React.FC = () => {
    const bottombarMenuItems: BottombarMenuButtons[] = useMemo(() => [
        {
            title: 'Home',
            icon: <RiHome7Fill/>,
            link: '/',
            disabled: false
        },
        {
            title: 'Search',
            icon: <FiSearch/>,
            link: '/',
            disabled: true
        },
        {
            title: 'Notifications',
            icon: <RiNotification3Line/>,
            link: '/',
            disabled: true
        },
        {
            title: 'Messages',
            icon: <HiOutlineMail/>,
            link: '/',
            disabled: true
        },
    ], [])

    return <div
        className="sm:hidden w-screen border-y-[1px] border-gray-100 dark:border-gray-700 fixed bottom-0 bg-white dark:bg-black z-40">

        <ul className="flex justify-around">
            {bottombarMenuItems.map(item => (
                <li key={crypto.randomUUID()}>
                    <Link href={item.link}
                          className="block p-4 rounded-full transition-all cursor-pointer disabled:opacity-50"
                          aria-disabled={item.disabled}
                    >
                        <span className='text-2xl'>{item.icon}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
}

export default FooterMenu