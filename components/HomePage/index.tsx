import React, {useEffect, useState} from "react";
import CreatePost from "@/components/CreatePost";
import {Post, User} from "@/gql/graphql";
import XLayout from "@/components/Layout/XLayout";
import {useGetAllPosts} from "@/hooks/post";
import Posts from "@/components/Posts";
import HeaderMenu from "@/components/HeaderMenu";
import HomePageHeder from "@/components/HomePageHeader";

interface HomePageProps {
    user: User
}

const HomePage: React.FC<HomePageProps> = ({user}) => {
    const {posts = []} = useGetAllPosts()
    const [typeOfPosts, setTypeOfPosts] = useState(0)
    const [filteredPosts, setFilteredPosts] = useState(posts)

    useEffect(() => {
        if (typeOfPosts) {
            const followingPosts = posts?.filter((post) => user.following?.some((following) => following?.id === post?.author?.id));

            setFilteredPosts(followingPosts || []);
        } else setFilteredPosts(posts);
    }, [typeOfPosts, user.following, posts])

    return <XLayout>
        <HeaderMenu user={user as User}/>
        <HomePageHeder typeOfPosts={typeOfPosts} setTypeOfPosts={setTypeOfPosts}/>
        <CreatePost user={user as User}/>
        <Posts posts={filteredPosts as Post[]}/>
    </XLayout>
}

export default HomePage