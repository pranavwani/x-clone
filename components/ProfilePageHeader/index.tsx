import React, {useCallback, useMemo} from 'react';
import Image from 'next/image';
import {MdOutlineDateRange} from 'react-icons/md';
import {User} from '@/gql/graphql';
import {useCurrentUser} from "@/hooks/user";
import Link from "next/link";
import FollowBtn from "@/components/FollowBtn";

interface ProfilePageHeaderProps {
    user: User;
}

const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({user}) => {
    const createdAt = new Date(Number(user?.createdAt));
    const {user: loggedInUser} = useCurrentUser()
    const joinedAtString = `${createdAt.toLocaleString('default', {
        month: 'long',
    })} ${createdAt.getFullYear()}`;

    return (
        <div>
            <div className="relative">
                <div
                    className="h-[100px] sm:h-[200px] bg-cover bg-center bg-no-repeat bg-gray-200 dark:bg-gray-900"></div>

                <div className="absolute top-[50px] sm:top-[125px] left-[20px]">
                    {user?.profileImageUrl && (
                        <Image
                            className="rounded-full border-4 border-white dark:border-black w-24 h-24 sm:w-32 sm:h-32"
                            src={user?.profileImageUrl}
                            alt="User's Profile Image"
                            width={140}
                            height={140}
                        />
                    )}
                </div>
                <div className="mt-4 mr-3">
                    {
                        loggedInUser?.id !== user.id &&
                        <FollowBtn followingId={user.id} user={loggedInUser as User} route={`/${user.id}`}/>
                    }
                </div>
            </div>
            <div className="p-4 mt-5 sm:mt-10 bg-white dark:bg-black">
                <div className="mt-5">
                    <h1 className="text-xl font-semibold">
                        {user?.firstName} {user?.lastName}
                    </h1>
                </div>
                <div className="flex items-center gap-2 mt-5 text-gray-700 dark:text-gray-500">
                    <MdOutlineDateRange/>
                    <span>Joined {joinedAtString}</span>
                </div>
                <div className="flex items-center gap-5 mt-2 text-sm text-gray-700 dark:text-gray-500">
                    <div className="flex hover:underline cursor-pointer">
                        <Link href={`${user.id}/following`}>
                            <span className="text-black dark:text-white font-semibold">{user.following?.length}</span>
                            <span>&nbsp;Following</span>
                        </Link>
                    </div>
                    <div className="flex hover:underline cursor-pointer">
                        <Link href={`${user.id}/followers`}>
                            <span className="text-black dark:text-white font-semibold">{user.followers?.length}</span>
                            <span>&nbsp;Followers</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePageHeader;
