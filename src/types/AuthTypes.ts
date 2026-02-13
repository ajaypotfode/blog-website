

export type UserData = {
    userName: string,
    password: string,
    email: string
}


export interface SignUpResponse {
    message: string,
    success: boolean,
    result?: {
        email: string,
        password: string,
        userName: string,
        isVerified: boolean,
        _id: string,
        createdAt: string,
        updatedAt: string,
        __v: number
    },
    error?: unknown
}

export type LoginData = {
    password: string,
    email: string
}

export interface LoginResponse {
    message: string,
    success: boolean,
    result?: {
        email: string,
        password: string,
        userName: string,
        isVerified: boolean,
        _id: string,
        createdAt: string,
        updatedAt: string,
        __v: number,
        token: string
    },
    error?: unknown
}

export interface LogoutResponse {
    message: string,
    success: boolean,
    error?: unknown
}


export interface AuthInitialState {
    loginData: LoginData,
    signupData: UserData
}