import React from "react";
import Image from "next/image";
import {FaXTwitter} from "react-icons/fa6";
import {User} from "@/gql/graphql";

interface HeaderMenuProps {
    user: User
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ user }) => {

    // Function to show the sidebar
    function openSidebar() {
        const sidebarMenu= document.getElementById("sidebarMenu") as HTMLElement

        sidebarMenu?.classList.remove('-translate-x-full');
        sidebarMenu.classList.add("shadow-lg")
    }

    return <div id="topbarMenu" className="sm:hidden flex w-screen p-2 border-b-[1px] border-gray-100 dark:border-gray-900">
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
}

export default HeaderMenu