import type {GetServerSideProps, NextPage} from "next";
import XLayout from "@/components/Layout/XLayout";
import {Post, User} from "@/gql/graphql";
import {graphqlClient} from "@/clients/api";
import {getUserByID} from "@/graphql/query/user";
import ProfilePageHeader from "@/components/ProfilePageHeader";
import ProfilePageNav from "@/components/ProfilePageNav";
import Posts from "@/components/Posts";

interface ServerProps {
    userInfo?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    const {userInfo} = props

    return <XLayout>
        <ProfilePageNav user={userInfo as User}/>
        <ProfilePageHeader user={userInfo as User}/>
        <Posts posts={userInfo?.posts as Post[]}/>
    </XLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id as string | undefined

    if (!id) return {notFound: true, props: {userInfo: undefined}}

    const userInfo = await graphqlClient.request(getUserByID, {id})

    if (!userInfo?.getUserByID) return {notFound: true, props: {userInfo: undefined}}

    return {
        props: {
            userInfo: userInfo.getUserByID
        }
    }
}

export default UserProfilePage;

