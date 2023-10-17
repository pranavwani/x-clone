import React from "react";

interface HomePageHeaderProps {
    typeOfPosts: number,
    setTypeOfPosts: Function
}

const HomePageHeder: React.FC<HomePageHeaderProps> = ({typeOfPosts, setTypeOfPosts}) => {
    return <div>
        <div className="hidden sm:block text-xl font-semibold pl-4 pt-3 my-2 w-full">
            <span>Home</span>
        </div>
        <div className="flex items-center border-b-[1px] border-gray-100 dark:border-gray-700">
            <div
                className={`all-posts flex justify-center items-center relative w-full text-center py-3 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
                    typeOfPosts === 0 ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => setTypeOfPosts(0)}>
                For you
                {typeOfPosts === 0 &&
                    <div className="absolute bottom-0 w-[50px] h-[4px] bg-blue-400 rounded-full"></div>}
            </div>
            <div
                className={`following flex justify-center items-center relative w-full text-center py-3 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
                    typeOfPosts === 1 ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => setTypeOfPosts(1)}>
                Following
                {typeOfPosts === 1 &&
                    <div className="absolute bottom-0 w-[50px] h-[4px] bg-blue-400 rounded-full"></div>}
            </div>
        </div>
    </div>
}

export default HomePageHeder;