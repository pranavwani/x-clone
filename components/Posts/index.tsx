import React from "react";
import {Post, User} from "@/gql/graphql";
import FeedCard from "@/components/FeedCard";

interface PostsProps {
    posts: Post[]
}

const Posts: React.FC<PostsProps> = ({posts}) => {
    return posts?.map(post => (post ? <FeedCard data={post as Post} key={post.id}/> : null))
}

export default Posts