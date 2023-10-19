import React, {useCallback} from "react";
import {useCurrentUser} from "@/hooks/user";
import {LoginWithGoogle} from "@/components/LoginWithGoogle";
import SidebarMenu from "@/components/SidebarMenu";
import {User} from "@/gql/graphql";
import FooterMenu from "@/components/FooterMenu";
import HeaderMenu from "@/components/HeaderMenu";
import Image from "next/image";
import {graphqlClient} from "@/clients/api";
import {followUserMutation} from "@/graphql/mutation/user";
import {useQueryClient} from "@tanstack/react-query";

interface XLayoutProps {
    children: React.ReactNode
}

const XLayout: React.FC<XLayoutProps> = (props) => {
    const {user} = useCurrentUser()
    const queryClient = useQueryClient()

    const handleFollow = useCallback(async (followingId: string) => {
        await graphqlClient.request(followUserMutation, {followingId})

        await queryClient.invalidateQueries(["current-user"])
    }, [])

    return <div>
        <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
            <SidebarMenu user={user as User}/>
            <div
                className="col-span-12 sm:col-span-5 sm:border-l-[1px] sm:border-r-[1px] height-screen overflow-scroll border-gray-100 dark:border-gray-700 mb-[58px] sm:mb-0">
                {props.children}
            </div>
            <div className="hidden sm:col-span-4 sm:block p-5">
                <div className="bg-[#f6f9f9] dark:bg-[#16181c] p-4 rounded-2xl">
                    {
                        !user ? <div>
                                <div className="py-2">
                                    <span className="text-xl font-extrabold">New to X?</span>
                                </div>
                                <div className="pb-2">
                                    <span className="text-xs text-gray-500">Sign up now to get your own personalized timeline!</span>
                                </div>

                                <LoginWithGoogle/>
                            </div>
                            : <div className="p-4 pl-0 rounded-2xl">
                                <h1 className="text-xl font-bold mb-5">Who to Follow</h1>
                                {
                                    user.recommendedUsers?.map(user => (
                                        <div key={user?.id} className="flex items-center gap-3">
                                            <Image
                                                className="rounded-full"
                                                src={user?.profileImageUrl || ""}
                                                alt="User Profile Image"
                                                width={45}
                                                height={45}
                                            />
                                            <span className="font-semibold">{user?.firstName} {user?.lastName}</span>
                                            <button
                                                className="bg-black text-white dark:bg-white dark:text-black rounded-full px-5 py-2 font-semibold text-sm ml-12"
                                                onClick={() => handleFollow(user?.id as string)}
                                            >
                                                Follow
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
            <FooterMenu/>
        </div>
    </div>
}

export default XLayout