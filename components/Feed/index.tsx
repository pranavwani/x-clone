import React from "react";
import Link from "next/link";
import Image from "next/image";
import {Post} from "@/gql/graphql";

interface FeedProps {
    post: Post
    showMedia: boolean
    isOpen?: boolean
}

const Feed: React.FC<FeedProps> = ({post, showMedia, isOpen}) => {
    return <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1 relative">
            <div className={` ${isOpen ? 'block' : 'hidden'} connect-post-line w-[2px] bg-gray-300 dark:bg-gray-700 h-[100%] absolute top-0 left-1/2`}></div>
            <div className="absolute">
                <Link href={`/${post?.author?.id}`}>
                    {post.author?.profileImageUrl && <Image
                        src={post.author.profileImageUrl}
                        alt="user-image"
                        height={50}
                        width={50}
                        className="rounded-full"
                    />}
                </Link>
            </div>
        </div>
        <div className="col-span-11 pl-1 pb-1">
            <h4 className="font-semibold hover:underline">
                <Link href={`/${post?.author?.id}`}>
                    {post.author?.firstName} {post.author?.lastName}
                </Link>
            </h4>
            <p className='text-sm cursor-text'>{post.content}</p>
            {
                post.imageURL
                && showMedia ? <Image src={post.imageURL} alt='post-iamge' height={300} width={300} className="m-2 ml-0 rounded-2xl border-[1px] border-gray-200 dark:border-gray-700"/> : post.imageURL
            }
        </div>
    </div>
}

export default Feed