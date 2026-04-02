import api from "@/axios/axios";
import { LoginData, LoginResponse, LogoutResponse, SignUpResponse, UserData } from "@/types/AuthTypes";


export const signupUserAPI = async (userData: UserData): Promise<SignUpResponse> => {

    const response = await api.post<SignUpResponse>('/api/signup', userData);
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


export const loginUserAPI = async (loginData: LoginData): Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>('/api/login', loginData);
    if (response.data.success) {
        localStorage.setItem("blogUser", JSON.stringify(response.data.result))
        return response.data;
    }
    throw new Error(response.data.message)
}


export const logoutUserAPI = async (): Promise<LogoutResponse> => {
    // const data = JSON.stringify(loginData)

    const response = await api.post<LogoutResponse>('/api/logout');
    if (response.data.success) {
        localStorage.removeItem("blogUser")
        return response.data;
    }
    throw new Error(response.data.message)
}