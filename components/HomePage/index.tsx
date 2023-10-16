import React from "react";
import CreatePost from "@/components/CreatePost";
import {Post, User} from "@/gql/graphql";
import XLayout from "@/components/Layout/XLayout";
import {useGetAllPosts} from "@/hooks/post";
import Posts from "@/components/Posts";
import HeaderMenu from "@/components/HeaderMenu";

interface HomePageProps {
    user: User
}

const HomePage: React.FC<HomePageProps> = ({user}) => {
    const {posts = []} = useGetAllPosts()

    return <div>
        <HeaderMenu user={user as User}/>
        <XLayout>
            <CreatePost user={user as User}/>
            <Posts posts={posts as Post[]}/>
        </XLayout>
    </div>
}

export default HomePage