import {Post} from "@/gql/graphql";
import Feed from "@/components/Feed";
import ReplyDialog from "../ReplyDialog";
import FeedCardButtons from "@/components/FeedCardButtons";
import React, {useCallback, useEffect, useState} from "react";

interface FeedCardProps {
    data: Post
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const {data} = props
    const [isReplayDialogOpen, setReplyDialogOpen] = useState(false)

    const handleOpenReplyDialog = () => {
        setReplyDialogOpen(true)
    }

    const handleCloseReplyDialog = () => {
        setReplyDialogOpen(false)
    }

    // const handleOnPageClick1: (event: any) => void = useCallback((event: any) => {
    //     console.log('called')
    //     event.preventDefault()
    //     console.log(event.target)
    //     const replyDialogBox = document.getElementsByClassName('reply-dialog')[0]
    //     console.log(replyDialogBox)
    //     if (!replyDialogBox?.contains(event.target)) {
    //         setReplyDialogOpen(false)
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     document.addEventListener('click', handleOnPageClick1)
    //
    //     return () => {
    //         document.removeEventListener('click', handleOnPageClick1)
    //     }
    // }, [handleOnPageClick1]);

    return (
        <div className="border-t border-inherit pr-2 pl-4 pt-3 pb-0 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all cursor-pointer">
            <Feed post={data} showMedia={true}/>
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-1"></div>
                <div className="col-span-11">
                    <FeedCardButtons handleOpenReplyDialog={handleOpenReplyDialog}/>
                </div>
            </div>
            <ReplyDialog post={data} isOpen={isReplayDialogOpen} closeDialog={handleCloseReplyDialog}/>
        </div>
    );
};

export default FeedCard;
