import React, {useCallback, useMemo} from 'react';
import Image from 'next/image';
import {MdOutlineDateRange} from 'react-icons/md';
import {User} from '@/gql/graphql';
import {useCurrentUser} from "@/hooks/user";
import {graphqlClient} from "@/clients/api";
import {followUserMutation, unfollowUserMutation} from "@/graphql/mutation/user";
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/router";

interface ProfilePageHeaderProps {
    user: User;
}

const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({user}) => {
    const createdAt = new Date(Number(user?.createdAt));
    const currentUser = useCurrentUser()
    const queryClient = useQueryClient()
    const router = useRouter()
    const joinedAtString = `${createdAt.toLocaleString('default', {
        month: 'long',
    })} ${createdAt.getFullYear()}`;

    const isFollowing = useMemo(() => {
        if (!currentUser || !currentUser.user) return false

        return !(currentUser.user?.following?.findIndex(following => following?.id === user.id) === -1);
    }, [currentUser, user.id])

    const handleReload = useCallback(() => {
        return router.push(`/${user.id}?forceReload=true`)
    }, [user])

    const handleFollowUser = useCallback(async () => {
        await graphqlClient.request(followUserMutation, {followingId: user.id})

        await queryClient.invalidateQueries(["current-user"])

        await handleReload()
    }, [handleReload, queryClient, user.id])

    const handleUnfollowUser =  useCallback(async () => {
        await graphqlClient.request(unfollowUserMutation, {followingId: user.id})

        await queryClient.invalidateQueries(["current-user"])

        await handleReload()
    }, [handleReload, queryClient, user.id])

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
                {
                    currentUser.user?.id !== user.id && <div
                        className="float-right bg-black text-white rounded-full px-5 py-2 font-semibold text-sm mr-4 mt-3">
                        {isFollowing ? <button onClick={handleUnfollowUser}>Unfollow</button> :
                            <button onClick={handleFollowUser}>Follow</button>}
                    </div>
                }
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
                    <div className="flex gap-1">
            <span className="text-black dark:text-white font-semibold">
              {user.following?.length}
            </span>
                        <span>Following</span>
                    </div>
                    <div className="flex gap-1">
            <span className="text-black dark:text-white font-semibold">
              {user.followers?.length}
            </span>
                        <span>Followers</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePageHeader;
