import {useCurrentUser} from "@/hooks/user";
import HomePage from "@/components/HomePage";
import SignUp from "@/components/SignUp";
import {FaXTwitter} from "react-icons/fa6";
import {useEffect, useRef} from "react";
import {useSetRecoilState} from "recoil";
import {userState} from "@/store/atoms/user";
import {User} from "@/gql/graphql";

export default function Home() {
    const {user, fetchStatus, refetch} = useCurrentUser()
    const hasFetched = useRef(false)
    const setUser = useSetRecoilState(userState)

    useEffect(() => {
        if (fetchStatus === "idle" && !hasFetched.current && !user?.id) {
            refetch()
            hasFetched.current = true
        }

        if (user?.id && user?.email) setUser(user as User)


    }, [fetchStatus, refetch, setUser, user]);


    if (user === undefined && fetchStatus === 'fetching') {
        return <div className="h-screen w-screen flex justify-center items-center text-6xl">
            <FaXTwitter/>
        </div>
    }

    if (user === null) return <SignUp/>

    return <HomePage />
}