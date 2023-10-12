import {FaXTwitter} from "react-icons/fa6";
import {LoginWithGoogle} from "@/components/LoginWithGoogle";

const SignUp: React.FC = () => {
    return <div className="sm:grid grid-cols-12 h-screen">
        <div className="hidden col-span-6 text-[400px] sm:flex justify-center items-center">
            <FaXTwitter />
        </div>
        <div className="sm:hidden text-5xl ml-10 mt-10">
            <FaXTwitter />
        </div>
        <div className="sm:col-span-6 p-[16px] h-screen flex sm:items-center">
            <div className="p-[20px]">
                <div className="my-[50px]">
                    <span className="text-4xl sm:text-6xl font-extrabold">Happening now</span>
                </div>
                <div className="mb-10">
                    <span className="text-2xl sm:text-3xl font-bold">Join today.</span>
                </div>
                <LoginWithGoogle />
            </div>
        </div>
    </div>
}

export  default SignUp