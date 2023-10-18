import React, {useEffect, useState} from "react";
import CreatePost from "@/components/CreatePost";
import {Post, User} from "@/gql/graphql";
import XLayout from "@/components/Layout/XLayout";
import {useGetAllPosts} from "@/hooks/post";
import Posts from "@/components/Posts";
import HeaderMenu from "@/components/HeaderMenu";
import TabLayout from "@/components/Layout/TabLayout";

interface HomePageProps {
    user: User
}

const tabs = [
    {
        title: "For you",
        id: "for-you"
    },
    {
        title: "Following",
        id: "following"
    }
]

const HomePage: React.FC<HomePageProps> = ({user}) => {
    const {posts = []} = useGetAllPosts()
    const [activeTab, setActive] = useState(tabs[0].id)
    const [filteredPosts, setFilteredPosts] = useState(posts)

    useEffect(() => {
        if (activeTab === tabs[1].id) {
            const followingPosts = posts?.filter((post) => user.following?.some((following) => following?.id === post?.author?.id));

            setFilteredPosts(followingPosts || []);
        } else setFilteredPosts(posts);
    }, [user.following, posts, activeTab])

    return <XLayout>
        <HeaderMenu user={user as User}/>
        <TabLayout tabs={tabs} activeTab={activeTab} setActive={setActive}>
            <div className="hidden sm:block text-xl font-semibold pl-4 pt-3 my-2 w-full">
                <span>Home</span>
            </div>
        </TabLayout>
        <CreatePost user={user as User}/>
        <Posts posts={filteredPosts as Post[]}/>
    </XLayout>
}

export default HomePage