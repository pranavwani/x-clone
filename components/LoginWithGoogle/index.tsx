import {useCallback} from "react";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import toast from "react-hot-toast";
import {graphqlClient} from "@/clients/api";
import {verifyUserGoogleTokenQuery} from "@/graphql/query/user";
import {useQueryClient} from "@tanstack/react-query";

export const LoginWithGoogle: React.FC = () => {
    const queryClient = useQueryClient()

    const handleLoginWithGoogle = useCallback(
        async (cred: CredentialResponse) => {
            const googleToken = cred.credential

            if (!googleToken) return toast.error('Google token not found');

            const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, { token: googleToken });

            if (verifyGoogleToken) window.localStorage.setItem("__x_token", verifyGoogleToken)

            toast.success("Verified Success");

            await queryClient.invalidateQueries(["current-user"])
        },
        [queryClient]
    );

    return <div>
        <GoogleLogin shape="circle" width="280" onSuccess={handleLoginWithGoogle} />
    </div>
}