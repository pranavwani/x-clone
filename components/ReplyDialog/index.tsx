import React from "react";
import {Post} from "@/gql/graphql";
import CreatePost from "@/components/CreatePost";
import Feed from "@/components/Feed";
import {AiOutlineClose} from "react-icons/ai";

interface ReplyDialogProps {
    post: Post,
    isOpen: boolean
    closeDialog: any
}

const ReplyDialog: React.FC<ReplyDialogProps> = ({post, isOpen, closeDialog}) => {
    return <div>
        <div
            className={
                `reply-dialog ${isOpen ? 'block' : 'hidden'} pr-2 pl-4 pt-3 pb-0 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fff] rounded-2xl z-[1000] max-w-[600px] w-full dark:bg-black`
            }
        >
            <div className="w-full h-full pb-4">
                <div className="flex items-center justify-center text-xl w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-900" onClick={closeDialog}>
                    <AiOutlineClose />
                </div>
            </div>
            <Feed post={post} showMedia={false} isOpen={isOpen}/>
            <CreatePost parentPostID={post.id}/>
        </div>
        <div className={`overlay ${isOpen ? 'block' : 'hidden'} fixed w-full h-full bg-[#79797999] dark:bg-[#5761775c] top-0 left-0 z-[999] cursor-default`}></div>
    </div>
}

export default ReplyDialog