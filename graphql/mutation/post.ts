import {graphql} from "@/gql";

export const createPostMutation = graphql(`#graphql
    mutation CreatePost($payload: CreatePostData!) {
      createPost(payload: $payload) {
        id
      }
    }
`)