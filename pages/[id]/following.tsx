import {GetServerSideProps, NextPage} from "next";
import {graphqlClient} from "@/clients/api";
import {getUserByIDQuery, getUserRelations} from "@/graphql/query/user";
import {User} from "@/gql/graphql";
import XLayout from "@/components/Layout/XLayout";
import Image from "next/image";
import React, {useMemo} from "react";
import FollowBtn from "@/components/FollowBtn";
import TabLayout from "@/components/Layout/TabLayout";
import Link from "next/link";
import ProfilePageNav from "../../components/NavBar";
import {followPageTabs} from "@/utils/tabs";
import {useRecoilValue} from "recoil";
import {userState} from "@/store/atoms/user";

interface ServerProps {
    following: [User]
    user: User
}

const UserFollowingPage: NextPage<ServerProps> = (props) => {
    const {following, user} = props
    const tabLayoutTabs = useMemo(() => followPageTabs(user), [user])
    const loggedInUser = useRecoilValue(userState)

    return <XLayout>
        <TabLayout tabs={tabLayoutTabs} activeTab={tabLayoutTabs[1].id}>
            <ProfilePageNav route={`/${user.id}`} subTitle={""} title={`${user?.firstName} ${user?.lastName}`}/>
        </TabLayout>
        {following?.map(following => (
            <div className="grid grid-cols-12 items-center p-2" key={following?.id}>
                <div className="col-span-2 flex justify-center items-center">
                    <Image
                        className="rounded-full"
                        src={following?.profileImageUrl || ""}
                        alt="User Profile Image"
                        width={45}
                        height={45}
                    />
                </div>
                <div className="col-span-10 flex items-center justify-between">
                    <div className="font-semibold hover:underline">
                        <Link href={`/${following?.id}`}>
                            {following?.firstName} {following?.lastName}
                        </Link>
                    </div>
                    <div className="mr-3">
                        {following?.id !== loggedInUser?.id && <FollowBtn
                            user={loggedInUser as User}
                            followingId={following?.id as string}
                            route={`/${user.id}/following`}
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
    const user = await graphqlClient.request(getUserByIDQuery, {id})

    return {
        props: {
            user: user.getUserByID,
            following: relations.getUserRelations?.following
        }
    }
}

export default UserFollowingPage;