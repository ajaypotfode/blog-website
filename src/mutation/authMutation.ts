import { loginUserAPI, logoutUserAPI, signupUserAPI } from "@/service/authApiService"
import { LoginData, UserData } from "@/types/AuthTypes"
import { useMutation } from "@tanstack/react-query"

export const useLoginUserMutation = () => {
    return useMutation({
        mutationFn: async (loginData: LoginData) => {
            return loginUserAPI(loginData)
        }
    })
}

export const useRegisterUserMutation = () => {
    return useMutation({
        mutationFn: async (signupData: UserData) => {
            return signupUserAPI(signupData)
        }
    })
}

export const useLogoutUserMutation = () => {
    return useMutation({
        mutationFn: async () => {
            return logoutUserAPI()
        }
    })
}