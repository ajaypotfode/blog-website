import api from "@/axios/axios";
// import { signIn } from 'next-auth/react'
import { /*LoginData, LoginResponse,*/ LogoutResponse, SignUpResponse, UserData } from "@/types/AuthTypes";


export const signupUserAPI = async (userData: UserData): Promise<SignUpResponse> => {

    const response = await api.post<SignUpResponse>('/api/signup', userData);
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


// export const loginUserAPI = async (loginData: LoginData): Promise<LoginResponse> => {
//     const response = await signIn('credentials', {
//         email: loginData.email,
//         password: loginData.password,
//         callbackUrl: loginData.callbackUrl,
//         redirect: false,
//     });
//     // console.log("response is :",response);

//     return response
//     // const response = await api.post<LoginResponse>('/api/login', loginData);
//     // if (response.data.success) {
//     //     localStorage.setItem("blogUser", JSON.stringify(response.data.result))
//     //     return response.data;
//     // }
//     // throw new Error(response.data.message)
// }

// export const loginProviderAPI = async (provider: string): Promise<LoginResponse> => {
//     const response = await signIn(provider);
//     // console.log("response is :",response);

//     return response
//     // const response = await api.post<LoginResponse>('/api/login', loginData);
//     // if (response.data.success) {
//     //     localStorage.setItem("blogUser", JSON.stringify(response.data.result))
//     //     return response.data;
//     // }
//     // throw new Error(response.data.message)
// }


export const logoutUserAPI = async (): Promise<LogoutResponse> => {
    // const data = JSON.stringify(loginData)

    const response = await api.post<LogoutResponse>('/api/logout');
    if (response.data.success) {
        localStorage.removeItem("blogUser")
        return response.data;
    }
    throw new Error(response.data.message)
}