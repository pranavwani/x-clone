/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "#graphql\n    mutation CreatePost($payload: CreatePostData!) {\n      createPost(payload: $payload) {\n        id\n      }\n    }\n": types.CreatePostDocument,
    "#graphql\n    mutation FollowUser($followingId: ID!) {\n      followUser(followingID: $followingId)\n    }\n": types.FollowUserDocument,
    "#graphql\n    mutation UnfollowUser($followingId: ID!) {\n      unfollowUser(followingID: $followingId)\n    }\n": types.UnfollowUserDocument,
    "#graphql\n    query GetAllPosts {\n        getAllPosts {\n            id\n            content\n            imageURL\n            author {\n              id\n              firstName\n              lastName\n              profileImageUrl\n            }\n        }\n    }\n": types.GetAllPostsDocument,
    "\n    #graphql\n    query getSignedURLForPost($imageName: String!, $imageType: String!) {\n      getSignedURLForPost(imageName: $imageName, imageType: $imageType)\n    }\n": types.GetSignedUrlForPostDocument,
    "\n    #graphql\n    query getPostByID($getPostByIdId: ID!) {\n      getPostByID(id: $getPostByIdId) {\n        id\n        content\n        imageURL\n        author {\n          firstName\n          lastName\n          profileImageUrl\n          id\n        }\n        replies {\n          id\n          content\n          imageURL\n          author {        \n            firstName\n            lastName\n            profileImageUrl\n            id\n          }\n        }\n      }\n    }\n": types.GetPostByIdDocument,
    "\n    #graphql\n    query verifyUserGoogleTokenQuery($token: String!) {\n        verifyGoogleToken(token: $token)\n    }\n": types.VerifyUserGoogleTokenQueryDocument,
    "\n    #graphql\n    query GetCurrentUser {\n      getCurrentUser {\n        id\n        firstName\n        lastName\n        email\n        profileImageUrl\n        posts {\n            id\n            content\n            author {\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n        }\n        following {\n          firstName\n          lastName\n          id\n        }\n        followers {\n          firstName\n          lastName\n          id\n        }\n        recommendedUsers {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n": types.GetCurrentUserDocument,
    "\n    #graphql\n    query GetUserByID($id: ID!){\n      getUserByID(id: $id) {\n        id\n        firstName\n        lastName\n        email\n        profileImageUrl\n        createdAt\n        following {\n          firstName\n          lastName\n          id\n        }\n        followers {\n          firstName\n          lastName\n          id\n        }\n        posts {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageUrl\n          }\n        }\n      }\n    }\n": types.GetUserByIdDocument,
    "#graphql\n    query GetUserRelations($getUserRelationsId: ID!) {\n      getUserRelations(id: $getUserRelationsId) {\n        followers {\n          firstName\n          lastName\n          id\n          profileImageUrl\n        }\n        following {\n          firstName\n          lastName\n          id\n          profileImageUrl\n        }\n      }\n    }\n": types.GetUserRelationsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation CreatePost($payload: CreatePostData!) {\n      createPost(payload: $payload) {\n        id\n      }\n    }\n"): (typeof documents)["#graphql\n    mutation CreatePost($payload: CreatePostData!) {\n      createPost(payload: $payload) {\n        id\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation FollowUser($followingId: ID!) {\n      followUser(followingID: $followingId)\n    }\n"): (typeof documents)["#graphql\n    mutation FollowUser($followingId: ID!) {\n      followUser(followingID: $followingId)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation UnfollowUser($followingId: ID!) {\n      unfollowUser(followingID: $followingId)\n    }\n"): (typeof documents)["#graphql\n    mutation UnfollowUser($followingId: ID!) {\n      unfollowUser(followingID: $followingId)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetAllPosts {\n        getAllPosts {\n            id\n            content\n            imageURL\n            author {\n              id\n              firstName\n              lastName\n              profileImageUrl\n            }\n        }\n    }\n"): (typeof documents)["#graphql\n    query GetAllPosts {\n        getAllPosts {\n            id\n            content\n            imageURL\n            author {\n              id\n              firstName\n              lastName\n              profileImageUrl\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query getSignedURLForPost($imageName: String!, $imageType: String!) {\n      getSignedURLForPost(imageName: $imageName, imageType: $imageType)\n    }\n"): (typeof documents)["\n    #graphql\n    query getSignedURLForPost($imageName: String!, $imageType: String!) {\n      getSignedURLForPost(imageName: $imageName, imageType: $imageType)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query getPostByID($getPostByIdId: ID!) {\n      getPostByID(id: $getPostByIdId) {\n        id\n        content\n        imageURL\n        author {\n          firstName\n          lastName\n          profileImageUrl\n          id\n        }\n        replies {\n          id\n          content\n          imageURL\n          author {        \n            firstName\n            lastName\n            profileImageUrl\n            id\n          }\n        }\n      }\n    }\n"): (typeof documents)["\n    #graphql\n    query getPostByID($getPostByIdId: ID!) {\n      getPostByID(id: $getPostByIdId) {\n        id\n        content\n        imageURL\n        author {\n          firstName\n          lastName\n          profileImageUrl\n          id\n        }\n        replies {\n          id\n          content\n          imageURL\n          author {        \n            firstName\n            lastName\n            profileImageUrl\n            id\n          }\n        }\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query verifyUserGoogleTokenQuery($token: String!) {\n        verifyGoogleToken(token: $token)\n    }\n"): (typeof documents)["\n    #graphql\n    query verifyUserGoogleTokenQuery($token: String!) {\n        verifyGoogleToken(token: $token)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetCurrentUser {\n      getCurrentUser {\n        id\n        firstName\n        lastName\n        email\n        profileImageUrl\n        posts {\n            id\n            content\n            author {\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n        }\n        following {\n          firstName\n          lastName\n          id\n        }\n        followers {\n          firstName\n          lastName\n          id\n        }\n        recommendedUsers {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetCurrentUser {\n      getCurrentUser {\n        id\n        firstName\n        lastName\n        email\n        profileImageUrl\n        posts {\n            id\n            content\n            author {\n                id\n                firstName\n                lastName\n                profileImageUrl\n            }\n        }\n        following {\n          firstName\n          lastName\n          id\n        }\n        followers {\n          firstName\n          lastName\n          id\n        }\n        recommendedUsers {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetUserByID($id: ID!){\n      getUserByID(id: $id) {\n        id\n        firstName\n        lastName\n        email\n        profileImageUrl\n        createdAt\n        following {\n          firstName\n          lastName\n          id\n        }\n        followers {\n          firstName\n          lastName\n          id\n        }\n        posts {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageUrl\n          }\n        }\n      }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetUserByID($id: ID!){\n      getUserByID(id: $id) {\n        id\n        firstName\n        lastName\n        email\n        profileImageUrl\n        createdAt\n        following {\n          firstName\n          lastName\n          id\n        }\n        followers {\n          firstName\n          lastName\n          id\n        }\n        posts {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageUrl\n          }\n        }\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetUserRelations($getUserRelationsId: ID!) {\n      getUserRelations(id: $getUserRelationsId) {\n        followers {\n          firstName\n          lastName\n          id\n          profileImageUrl\n        }\n        following {\n          firstName\n          lastName\n          id\n          profileImageUrl\n        }\n      }\n    }\n"): (typeof documents)["#graphql\n    query GetUserRelations($getUserRelationsId: ID!) {\n      getUserRelations(id: $getUserRelationsId) {\n        followers {\n          firstName\n          lastName\n          id\n          profileImageUrl\n        }\n        following {\n          firstName\n          lastName\n          id\n          profileImageUrl\n        }\n      }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;