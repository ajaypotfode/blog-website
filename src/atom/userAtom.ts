import { User } from "@/types/AuthTypes";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const userStorageAtom = atomWithStorage<User | null>("blogUser", null)

export const signupDataAtom = atom({
    userName: "",
    image: "",
    email: "",
    password: ""
});

export const loginDataAtom = atom({
    email: "",
    password: ""
});

export const showPasswordAtom = atom({
    login: false,
    signup: false
})

export const loginFormErrors = atom({
    email: "",
    password: ""
});

export const signupFormErrors = atom({
    userName: "",
    image: "",
    email: "",
    password: ""
});

export const userAtom = atom((get) => {
    const storedData = get(userStorageAtom);
    return storedData
})

export const setUserAtom = atom(
    null,
    (_, set, data: User | null) => {
        set(userStorageAtom, data)
    }

)

export const isLoggedinAtom = atom((get) => !!get(userAtom));