import {useCurrentUser} from "@/hooks/user";
import HomePage from "@/components/HomePage";
import {User} from "@/gql/graphql";
import SignUp from "@/components/SignUp";
import {FaXTwitter} from "react-icons/fa6";

export default function Home() {
    const {user, fetchStatus} = useCurrentUser()

    if (user === undefined && fetchStatus === 'fetching') {
        return <div className="h-screen w-screen flex justify-center items-center text-6xl">
            <FaXTwitter/>
        </div>
    }

    if (user === null) return <SignUp />

    return <HomePage user={user as User}/>
}