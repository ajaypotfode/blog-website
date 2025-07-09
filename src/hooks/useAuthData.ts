"use client"
import loginFormValidate from "@/formValidation/loginFormValidate"
import signupFormValidate from "@/formValidation/signupFormValidate"
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks"
import { getLoginData, getSignupData, loginUser, logoutUser, signupUser } from "@/redux/slice/authSlice"
import { isUserLogedIn, setFormErrors } from "@/redux/slice/globalSlice"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const UseAuthData = () => {
    const { loginData, signupData } = useAppSelector(state => state.auth)
    const { formErrors, loading } = useAppSelector(state => state.global)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        // console.log("login");

        dispatch(getLoginData({ ...loginData, [name]: value }))
        dispatch(setFormErrors({ ...formErrors, [name]: "" }))

    }

    const handleSignupData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        dispatch(getSignupData({ ...signupData, [name]: value }))
        dispatch(setFormErrors({ ...formErrors, [name]: "" }))

    }

    const getSignupUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (signupFormValidate(signupData, dispatch)) {
            const response = await dispatch(signupUser(signupData)).unwrap()
            if (response.success) {
                // window.location.href = '/login'
                router.push('/login')
                toast.success('Blog Account Created SuccessFully!!!')
            }
        }
    }

    const getLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // if (loginData) {
        if (loginFormValidate(loginData, dispatch)) {
            const response = await dispatch(loginUser(loginData)).unwrap()
            if (response.success) {
                window.location.href = '/'
                toast.success('user Loged In SuccessFully!!!')
            }
        }
    }

    const getLogoutUser = async () => {
        const response = await dispatch(logoutUser()).unwrap()
        if (response.success) {
            toast.success('user Loged Out SuccessFully!!!')
            router.push('/login')
        }
    }

    const handleAuthNavigation = (route: string) => {
        router.push(route)
        dispatch(setFormErrors({}))
        if (route === '/login' || route === '/') {
            dispatch(getLoginData({ email: "", password: "" }))
        } else dispatch(getSignupData({ email: "", userName: "", password: "" }))
    }

    const setIsUserLogedin = (value: boolean) => {
        dispatch(isUserLogedIn(value))
    }

    return {
        handleLoginData,
        handleSignupData,
        loginData,
        signupData,
        getLoginUser,
        getSignupUser,
        getLogoutUser,
        handleAuthNavigation,
        setIsUserLogedin,
        formErrors,
        loading
    }
}

export default UseAuthData