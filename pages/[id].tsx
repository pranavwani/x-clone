import type {GetServerSideProps, NextPage} from "next";
import XLayout from "@/components/Layout/XLayout";
import {BiArrowBack} from "react-icons/bi";
import Image from "next/image";
import FeedCard from "@/components/FeedCard";
import {Post, User} from "@/gql/graphql";
import Link from "next/link"
import {graphqlClient} from "@/clients/api";
import {getUserByID} from "@/graphql/query/user";

interface ServerProps {
    userInfo?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    const {userInfo} = props

    return <div>
        <XLayout>
            <div>
                <nav className="flex items-center gap-3 pl-2 text-xl">
                    <Link href="/" className="hover:bg-gray-100 p-2 rounded-full">
                        <BiArrowBack />
                    </Link>
                    <div className="pl-5">
                        <h1 className="font-semibold">{userInfo?.firstName} {userInfo?.lastName}</h1>
                        <h1 className="text-xs text-gray-700">{userInfo?.posts?.length} Posts</h1>
                    </div>
                </nav>
                <div className="pl-4 pb-5 pt-10 bg-gray-200 border-b border-slate-200">
                    {
                        userInfo?.profileImageUrl
                        && <Image
                            className="rounded-full border-4 border-white"
                            src={userInfo?.profileImageUrl}
                            alt="user-profile-image"
                            width={120}
                            height={120}
                        />
                    }
                    <div className="mt-5">
                        <h1 className="text-xl font-semibold">{userInfo?.firstName} {userInfo?.lastName}</h1>
                    </div>
                </div>
                <div>
                    {
                        userInfo?.posts
                        && userInfo?.posts?.map(post => (post ? <FeedCard data={post as Post} key={post.id} />: null ))
                    }
                </div>
            </div>
        </XLayout>
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id as string | undefined

    if (!id) return { notFound: true, props: {userInfo: undefined} }

    const userInfo = await graphqlClient.request(getUserByID, { id })

    if (!userInfo?.getUserByID) return { notFound: true, props: { userInfo: undefined } }

    return {
        props: {
            userInfo: userInfo.getUserByID
        }
    }
}

export default UserProfilePage;

