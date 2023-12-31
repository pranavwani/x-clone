import React from "react";
import Link from "next/link";
import {BiArrowBack} from "react-icons/bi";

interface ProfilePageNavProps {
    title: string
    subTitle: string
    route: string
}

const NavBar: React.FC<ProfilePageNavProps> = ({ title, subTitle, route }) => {
    return <nav className="flex items-center gap-1 pl-2 py-1 text-xl">
        <Link href={route} className="hover:bg-gray-100 dark:hover:bg-gray-900 p-2 rounded-full">
            <BiArrowBack/>
        </Link>
        <div className="pl-5">
            <h1 className="font-semibold">{title}</h1>
            <h1 className="text-xs text-gray-700 dark:text-gray-500">{subTitle}</h1>
        </div>
    </nav>
}

export default NavBar