import {User} from "@/gql/graphql";

export const homePageTabs = () => [
    {
        title: "For you",
        id: "for-you"
    },
    {
        title: "Following",
        id: "following"
    }
]

export const followPageTabs = (user: User) => [
    {
        title: "Followers",
        id: "followers",
        route: `/${user?.id}/followers`
    },
    {
        title: "Following",
        id: "following",
        route: `/${user?.id}/following`
    }
]

export const profilePageTabs = (user: User) => [
    {
        title: "Posts",
        id: "posts",
        route: `/${user?.id}`
    },
    {
        title: "Replies",
        id: "replies",
        route: `/${user?.id}/with_replies`
    }
]