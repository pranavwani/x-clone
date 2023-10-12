import React from "react";
import Link from "next/link";
import {BiArrowBack} from "react-icons/bi";
import {User} from "@/gql/graphql";

interface ProfilePageNavProps {
    user: User
}

const ProfilePageNav: React.FC<ProfilePageNavProps> = ({user}) => {
    return <nav className="flex items-center gap-3 pl-2 text-xl">
        <Link href="/" className="hover:bg-gray-100 dark:hover:bg-gray-900 p-2 rounded-full">
            <BiArrowBack/>
        </Link>
        <div className="pl-5">
            <h1 className="font-semibold">{user?.firstName} {user?.lastName}</h1>
            <h1 className="text-xs text-gray-700">{user?.posts?.length} Posts</h1>
        </div>
    </nav>
}

export default ProfilePageNav