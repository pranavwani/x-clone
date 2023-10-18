import {RiFileListLine, RiHome7Fill, RiNotification3Line} from "react-icons/ri";
import {BsPeople, BsPerson, BsSearch} from "react-icons/bs";
import {HiOutlineMail} from "react-icons/hi";
import {FiBookmark} from "react-icons/fi";
import {FaXTwitter} from "react-icons/fa6";
import {CgMoreO} from "react-icons/cg";
import React from "react";
import {User} from "@/gql/graphql";

export interface XSidebarButtons {
    title: String,
    icon: React.ReactNode,
    link: string,
    disabled: boolean
}

const sidebarMenuItems = (user: User): XSidebarButtons[] => {
    return [
        {
            disabled: true,
            icon: <RiHome7Fill />,
            link: '/',
            title: 'Home'
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
            icon: <BsPerson />,
            link: `/${user?.id}`,
            disabled: false
        },
        {
            title: 'More',
            icon: <CgMoreO />,
            link: '/',
            disabled: true
        }
    ];
}

export default sidebarMenuItems;