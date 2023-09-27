import {useQuery} from "@tanstack/react-query";
import {graphqlClient} from "@/clients/api";
import {getCurrentUserQuery, getUserByID} from "@/graphql/query/user";

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["current-user"],
        queryFn: () => {
            return graphqlClient.request(getCurrentUserQuery)
        }
    })

    return { ...query, user: query.data?.getCurrentUser }
}