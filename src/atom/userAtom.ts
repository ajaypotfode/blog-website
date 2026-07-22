import { atom } from "jotai";
// import { atomWithStorage } from "jotai/utils";

// const userStorageAtom = atomWithStorage<User | null>("blogUser", null)

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

// export const loggedInUserAtom = atom<string | undefined>(undefined)

export const loggedinUserAtom = atom<{
    id: string, image: string, name: string, email: string
} | null>(null)


// export const loggedinUserAtom = atom((get) => !!get(userAtom));