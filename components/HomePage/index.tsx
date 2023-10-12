import React from "react";
import CreatePost from "@/components/CreatePost";
import {Post, User} from "@/gql/graphql";
import XLayout from "@/components/Layout/XLayout";
import {useGetAllPosts} from "@/hooks/post";
import Posts from "@/components/Posts";

interface HomePageProps {
    user: User
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
    const { posts = [] } = useGetAllPosts()

    return <XLayout>
        <CreatePost user={user as User} />
        <Posts posts={posts as Post[]} />
    </XLayout>
}

export default  HomePage