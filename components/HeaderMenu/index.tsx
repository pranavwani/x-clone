import React from "react";
import Image from "next/image";
import {FaXTwitter} from "react-icons/fa6";
import {useRecoilValue} from "recoil";
import {userState} from "@/store/atoms/user";

const HeaderMenu: React.FC = () => {
    const user = useRecoilValue(userState)

    // Function to show the sidebar
    function openSidebar() {
        const sidebarMenu = document.getElementById("sidebarMenu") as HTMLElement

        sidebarMenu?.classList.remove('-translate-x-full');
        sidebarMenu.classList.add("shadow-lg")
    }

    return <div id="topbarMenu" className="sm:hidden flex w-screen p-4">
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
            className="ml-[40%] text-2xl hover:bg-gray-200 dark:hover:bg-gray-900 rounded-full transition-all cursor-pointer"
        >
            <FaXTwitter/>
        </div>
    </div>
}

export default HeaderMenu