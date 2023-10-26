import {useQuery} from "@tanstack/react-query";
import {graphqlClient} from "@/clients/api";
import {getCurrentUserQuery} from "@/graphql/query/user";
import {User} from "@/gql/graphql";

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["current-user"],
        queryFn: () => {
            return graphqlClient.request(getCurrentUserQuery)
        },
        enabled: false
    })

    return { ...query, user: query.data?.getCurrentUser as User }
}