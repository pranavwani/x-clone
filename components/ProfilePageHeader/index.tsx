import React from "react";
import Image from "next/image";
import {MdOutlineDateRange} from "react-icons/md";
import {User} from "@/gql/graphql";

interface ProfilePageHeaderProps {
    user: User
}

const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({user}) => {
    const createdAt = new Date(Number(user?.createdAt))
    const joinedAtString = `${createdAt.toLocaleString('default', {month: 'long'})} ${createdAt.getFullYear()}`

    return <div className="pl-4 pb-5 pt-10 bg-gray-200 dark:bg-gray-900">
        {
            user?.profileImageUrl
            && <Image
                className="rounded-full border-4 border-white dark:border-black"
                src={user?.profileImageUrl}
                alt="user-profile-image"
                width={140}
                height={140}
            />
        }
        <div className="mt-5">
            <h1 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h1>
        </div>
        <div className="flex items-center gap-2 mt-5 text-gray-700 dark:text-gray-500">
            <MdOutlineDateRange/>
            <span>Joined {joinedAtString}</span>
        </div>
    </div>
}

export default ProfilePageHeader