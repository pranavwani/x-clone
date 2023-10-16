import {graphql} from "@/gql";

export const followUserMutation = graphql(`#graphql
    mutation FollowUser($followingId: ID!) {
      followUser(followingID: $followingId)
    }
`)

export const unfollowUserMutation = graphql(`#graphql
    mutation UnfollowUser($followingId: ID!) {
      unfollowUser(followingID: $followingId)
    }
`)