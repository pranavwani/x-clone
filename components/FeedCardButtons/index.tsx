import React from "react";
import {BiBarChart, BiMessageRounded} from "react-icons/bi";
import {FaRetweet} from "react-icons/fa";
import {AiOutlineHeart} from "react-icons/ai";
import {FiUpload} from "react-icons/fi";

interface FeedCardButtonsProps {
    handleOpenReplyDialog?: any
}

const FeedCardButtons: React.FC<FeedCardButtonsProps> = ({handleOpenReplyDialog}) => {
    return <div className='flex justify-between text-gray-600 pr-3 pb-1 mt-[12px] items-center text-xl'>
        <div className='dark:hover:bg-blue-950 hover:bg-blue-100 rounded-full p-2 hover:text-[#1d9bf0]'
             onClick={handleOpenReplyDialog}>
            <BiMessageRounded/>
        </div>
        <div className='dark:hover:bg-[#1b2e16] hover:bg-green-100 rounded-full p-2 hover:text-[#40a327]'>
            <FaRetweet/>
        </div>
        <div className='dark:hover:bg-[#290113] hover:bg-red-100 rounded-full p-2 hover:text-[#f91880]'>
            <AiOutlineHeart/>
        </div>
        <div>
            <BiBarChart/>
        </div>
        <div>
            <FiUpload/>
        </div>
    </div>
}

export default FeedCardButtons