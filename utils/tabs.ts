import {User} from "@/gql/graphql";

const tabs = (user: User) => [
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

export default tabs