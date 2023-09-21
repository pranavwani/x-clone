import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "@/clients/api";
import {getAllPostsQuery} from "@/graphql/query/post";
import {createPostMutation} from "@/graphql/mutation/post";
import {CreatePostData} from "@/gql/graphql";
import toast from "react-hot-toast";

export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: CreatePostData) => graphqlClient.request(createPostMutation, { payload }),
        onMutate: () => toast.loading('Creating Post', { id: '1' }),
        onSuccess: async () => {
            await queryClient.invalidateQueries(["all-posts"])
            toast.success('Post created', { id: '1' })
        }
    });
}

export const useGetAllPosts = () => {
    const query = useQuery({
        queryKey: ["all-posts"],
        queryFn: () => {
            return graphqlClient.request(getAllPostsQuery)
        }
    })

    return { ...query, posts: query.data?.getAllPosts }
}