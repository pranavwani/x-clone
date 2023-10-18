import {GetServerSideProps, NextPage} from "next";
import {graphqlClient} from "@/clients/api";
import {getCurrentUserQuery, getUserByID, getUserRelations} from "@/graphql/query/user";
import {useCurrentUser} from "@/hooks/user";
import {User} from "@/gql/graphql";
import XLayout from "@/components/Layout/XLayout";
import Image from "next/image";
import React, {useMemo} from "react";
import FollowBtn from "@/components/FollowBtn";
import TabLayout from "@/components/Layout/TabLayout";
import Link from "next/link";
import ProfilePageNav from "../../components/NavBar";
import tabs from "@/utils/tabs";

interface ServerProps {
    followers: [User]
    user: User
}

const UserFollowingPage: NextPage<ServerProps> = (props) => {
    const {followers, user} = props
    const tabLayoutTabs = useMemo(() => tabs(user), [user])
    const {user: loggedInUser} = useCurrentUser()

    return <XLayout>
        <TabLayout tabs={tabLayoutTabs} activeTab={tabLayoutTabs[0].id}>
            <ProfilePageNav route={`/${user.id}`} subTitle={""} title={`${user?.firstName} ${user?.lastName}`}/>
        </TabLayout>
        {followers?.map(follower => (
            <div className="grid grid-cols-12 items-center p-2" key={follower?.id}>
                <div className="col-span-2 flex justify-center items-center">
                    <Image
                        className="rounded-full"
                        src={follower?.profileImageUrl || ""}
                        alt="User Profile Image"
                        width={45}
                        height={45}
                    />
                </div>
                <div className="col-span-10 flex items-center justify-between">
                    <div className="font-semibold hover:underline">
                        <Link href={`/${follower?.id}`}>
                            {follower?.firstName} {follower?.lastName}
                        </Link>
                    </div>
                    <div className="mr-3">
                        {follower?.id !== loggedInUser?.id && <FollowBtn
                            user={user as User}
                            followingId={follower?.id as string}
                            route={`/${user.id}/followers`}
                        />}
                    </div>
                </div>
            </div>
        ))}
    </XLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id as string | undefined

    if (!id) return {notFound: true, props: {user: undefined}}

    const relations = await graphqlClient.request(getUserRelations, {getUserRelationsId: id})
    const user = await graphqlClient.request(getUserByID, {id})

    return {
        props: {
            user: user.getUserByID,
            followers: relations.getUserRelations?.followers
        }
    }
}

export default UserFollowingPage;