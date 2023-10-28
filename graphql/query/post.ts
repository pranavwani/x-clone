import {graphql} from "@/gql";

export const getAllPostsQuery = graphql(`#graphql
    query GetAllPosts {
        getAllPosts {
            id
            content
            imageURL
            author {
              id
              firstName
              lastName
              profileImageUrl
            }
        }
    }
`)

export const getSignedURLForPostQuery = graphql(`
    #graphql
    query getSignedURLForPost($imageName: String!, $imageType: String!) {
      getSignedURLForPost(imageName: $imageName, imageType: $imageType)
    }
`)

export const getPostsWithRepliesQuery = graphql(`
    #graphql
    query GetPostsWithReplies($authorId: ID!) {
      getPostsWithReplies(authorID: $authorId) {
        id
        content
        imageURL
        replies {
          id
          content
          imageURL
          author {
            id
            email
            lastName
            firstName
            profileImageUrl
          }
        }
        author {
          id
          email
          lastName
          firstName
          profileImageUrl
        }
      }
    }
`)