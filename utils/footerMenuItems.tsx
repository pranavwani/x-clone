import {RiHome7Fill, RiNotification3Line} from "react-icons/ri";
import {FiSearch} from "react-icons/fi";
import {HiOutlineMail} from "react-icons/hi";
import React from "react";

export interface FooterMenuItems {
    title: String,
    icon: React.ReactNode,
    link: string,
    disabled: boolean
}

const footerMenuItems: FooterMenuItems[] = [
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
]

export default footerMenuItems;