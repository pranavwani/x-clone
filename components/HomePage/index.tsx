import React, {useEffect, useMemo, useState} from "react";
import CreatePost from "@/components/CreatePost";
import {Post} from "@/gql/graphql";
import XLayout from "@/components/Layout/XLayout";
import {useGetAllPosts} from "@/hooks/post";
import Posts from "@/components/Posts";
import HeaderMenu from "@/components/HeaderMenu";
import TabLayout from "@/components/Layout/TabLayout";
import {useRecoilValue} from "recoil";
import {userState} from "@/store/atoms/user";
import {homePageTabs} from "@/utils/tabs";

const HomePage: React.FC = () => {
    const {posts = []} = useGetAllPosts()
    const tabs = useMemo(() => homePageTabs(), [])
    const [activeTab, setActive] = useState(tabs[0].id)
    const [filteredPosts, setFilteredPosts] = useState(posts)
    const user = useRecoilValue(userState)

    useEffect(() => {
        if (activeTab === tabs[1].id) {
            const followingPosts = posts?.filter((post) => user.following?.some((following) => following?.id === post?.author?.id));

            setFilteredPosts(followingPosts || []);
        } else setFilteredPosts(posts);
    }, [user.following, posts, activeTab, tabs])

    return <XLayout>
        <HeaderMenu/>
        <TabLayout tabs={tabs} activeTab={activeTab} setActive={setActive}>
            <div className="hidden sm:block text-xl font-semibold pl-4 pt-3 my-2 w-full">
                <span>Home</span>
            </div>
        </TabLayout>
        <CreatePost type={0}/>
        <Posts posts={filteredPosts as Post[]}/>
    </XLayout>
}

export default HomePage