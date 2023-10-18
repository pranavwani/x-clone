import type {GetServerSideProps, NextPage} from "next";
import XLayout from "@/components/Layout/XLayout";
import {Post, User} from "@/gql/graphql";
import {graphqlClient} from "@/clients/api";
import {getUserByID} from "@/graphql/query/user";
import ProfilePageHeader from "@/components/ProfilePageHeader";
import ProfilePageNav from "../components/NavBar";
import Posts from "@/components/Posts";

interface ServerProps {
    user?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    const {user} = props

    return <XLayout>
        <ProfilePageNav route={"/"} subTitle={`${user?.posts?.length} Posts`} title={`${user?.firstName} ${user?.lastName}`}/>
        <ProfilePageHeader user={user as User}/>
        <Posts posts={user?.posts as Post[]}/>
    </XLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id as string | undefined

    if (!id) return {notFound: true, props: {user: undefined}}

    const user = await graphqlClient.request(getUserByID, {id})

    if (!user?.getUserByID) return {notFound: true, props: {user: undefined}}

    return {
        props: {
            user: user.getUserByID
        }
    }
}

export default UserProfilePage;

