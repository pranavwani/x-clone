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

export const getPostByIDQuery = graphql(`
    #graphql
    query getPostByID($getPostByIdId: ID!) {
      getPostByID(id: $getPostByIdId) {
        id
        content
        imageURL
        author {
          firstName
          lastName
          profileImageUrl
          id
        }
        replies {
          id
          content
          imageURL
          author {        
            firstName
            lastName
            profileImageUrl
            id
          }
        }
      }
    }
`)