import React, {useCallback, useMemo} from "react";
import {graphqlClient} from "@/clients/api";
import {followUserMutation, unfollowUserMutation} from "@/graphql/mutation/user";
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/router";
import {User} from "@/gql/graphql";

interface FollowBtnProps {
    user: User,
    followingId: string,
    route: string
}

const FollowsBtn: React.FC<FollowBtnProps> = ({ user, followingId, route }) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const isFollowing = useMemo(() => {
        if (!user) return false

        return !(user?.following?.findIndex(following => following?.id === followingId) === -1);
    }, [followingId, user])

    const handleReload = useCallback(() => {
        return router.push(`${route}?forceReload=true`)
    }, [router, route])

    const handleFollowUser = useCallback(async () => {
        if (!user) return false

        await graphqlClient.request(followUserMutation, {followingId })

        await queryClient.invalidateQueries(["current-user"])

        await handleReload()
    }, [user, followingId, queryClient, handleReload])

    const handleUnfollowUser = useCallback(async () => {
        if (!user) return false

        await graphqlClient.request(unfollowUserMutation, {followingId})

        await queryClient.invalidateQueries(["current-user"])

        await handleReload()
    }, [user, followingId, queryClient, handleReload])

    return <div
        className="float-right bg-black text-white dark:bg-white dark:text-black rounded-full font-semibold text-sm px-5 py-2">
        {isFollowing ? <button onClick={handleUnfollowUser}>Unfollow</button> :
            <button onClick={handleFollowUser}>Follow</button>}
    </div>
}

export default FollowsBtn;