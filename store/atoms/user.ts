import {atom, RecoilState} from "recoil";
import {User} from "@/gql/graphql";

export const userState: RecoilState<User> = atom({
    key: 'userState',
    default: {
        email: '',
        firstName: '',
        id: '',
    }
})