import { GraphQLClient } from "graphql-request"

const isClient = typeof  window !== 'undefined'

export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_X_CLONE_API_ENDPOINT as string, {
    headers: () => ({
        Authorization: isClient ? `Bearer ${window.localStorage.getItem('__x_token')}` : ""
    })
})