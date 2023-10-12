import React from "react";
import {useCurrentUser} from "@/hooks/user";
import {LoginWithGoogle} from "@/components/LoginWithGoogle";
import SidebarMenu from "@/components/SidebarMenu";
import {User} from "@/gql/graphql";
import FooterMenu from "@/components/FooterMenu";
import HeaderMenu from "@/components/HeaderMenu";

interface XLayoutProps {
    children: React.ReactNode
}

const XLayout: React.FC<XLayoutProps> = (props) => {
    const {user} = useCurrentUser()

    return <div>
        <div className="sm:grid grid-cols-12 h-screen w-screen sm:px-56">
            <HeaderMenu user={user as User} />
            <SidebarMenu user={user as User} />
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

                        <LoginWithGoogle />
                    </div>
                }
            </div>
            <FooterMenu />
        </div>
    </div>
}

export default XLayout