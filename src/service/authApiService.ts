import { LoginData, LoginResponse, LogoutResponse, SignUpResponse, UserData } from "@/types/AuthTypes";
import axios from "axios";



export const signupUserAPI = async (userData: UserData): Promise<SignUpResponse> => {
    const data = JSON.stringify(userData);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/api/signup',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios.request<SignUpResponse>(config)
        return response.data
    } catch (error: unknown) {
        console.error('Signup failed:', error);
        throw error;
    }

}


export const loginUserAPI = async (loginData: LoginData): Promise<LoginResponse> => {
    const data = JSON.stringify(loginData)
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/api/login',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios.request<LoginResponse>(config)
        return response.data
    } catch (error: unknown) {
        console.error('Login failed:', error);
        throw error;
    }
}


export const logoutUserAPI = async (): Promise<LogoutResponse> => {
    // const data = JSON.stringify(loginData)
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/api/logout',
        headers: {
            'Content-Type': 'application/json',
        },
        // data: data
    };

    try {
        const response = await axios.request<LogoutResponse>(config)
        return response.data
    } catch (error: unknown) {
        console.error('Logout failed:', error);
        throw error;
    }
}