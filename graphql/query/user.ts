import {graphql} from "@/gql";

export const verifyUserGoogleTokenQuery = graphql(`
    #graphql
    query verifyUserGoogleTokenQuery($token: String!) {
        verifyGoogleToken(token: $token)
    }
`)

export const getCurrentUserQuery = graphql(`
    #graphql
    query GetCurrentUser {
      getCurrentUser {
        id
        firstName
        lastName
        email
        profileImageUrl
        posts {
            id
            content
            author {
                id
                firstName
                lastName
                profileImageUrl
            }
        }
        following {
          firstName
          lastName
          id
        }
        followers {
          firstName
          lastName
          id
        }
        recommendedUsers {
          id
          firstName
          lastName
          profileImageUrl
        }
      }
    }
`)

export const getUserByID = graphql(`
    #graphql
    query GetUserByID($id: ID!){
      getUserByID(id: $id) {
        id
        firstName
        lastName
        email
        profileImageUrl
        createdAt
        following {
          firstName
          lastName
          id
        }
        followers {
          firstName
          lastName
          id
        }
        posts {
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
    }
`)

export const getUserRelations = graphql(`#graphql
    query GetUserRelations($getUserRelationsId: ID!) {
      getUserRelations(id: $getUserRelationsId) {
        followers {
          firstName
          lastName
          id
          profileImageUrl
        }
        following {
          firstName
          lastName
          id
          profileImageUrl
        }
      }
    }
`)