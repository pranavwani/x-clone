import type {GetServerSideProps, NextPage} from "next";
import XLayout from "@/components/Layout/XLayout";
import {Post, User} from "@/gql/graphql";
import {graphqlClient} from "@/clients/api";
import {getUserByIDQuery} from "@/graphql/query/user";
import ProfilePageHeader from "@/components/ProfilePageHeader";
import NavBar from "@/components/NavBar";
import Posts from "@/components/Posts";
import TabLayout from "@/components/Layout/TabLayout";
import {useMemo} from "react";
import {profilePageTabs} from "@/utils/tabs";

interface ServerProps {
    user?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    const {user} = props
    const tabs = useMemo(() => profilePageTabs(user as User), [user])

    return <XLayout>
        <NavBar route={"/"} subTitle={`${user?.posts?.length} Posts`} title={`${user?.firstName} ${user?.lastName}`}/>
        <ProfilePageHeader user={user as User}/>
        <TabLayout tabs={tabs} activeTab={tabs[0].id} />
        <Posts posts={user?.posts as Post[]}/>
    </XLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id as string | undefined

    if (!id) return {notFound: true, props: {user: undefined}}

    const user = await graphqlClient.request(getUserByIDQuery, {id})

    if (!user?.getUserByID) return {notFound: true, props: {user: undefined}}

    return {
        props: {
            user: user.getUserByID
        }
    }
}

export default UserProfilePage;

