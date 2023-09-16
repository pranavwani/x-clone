import {graphql} from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
    #graphql
    query verifyUserGoogleTokenQuery($token: String!) {
        verifyGoogleToken(token: $token)
    }
`)