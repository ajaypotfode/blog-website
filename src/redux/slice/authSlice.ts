import { loginUserAPI, logoutUserAPI, signupUserAPI } from "@/service/authApiService";
import { AuthInitialState, LoginData, LoginResponse, LogoutResponse, SignUpResponse, UserData } from "@/types/AuthTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const signupUser = createAsyncThunk<SignUpResponse, UserData, { rejectValue: string }>("signupUser", async (signupData, { rejectWithValue }) => {
    try {
        const response = await signupUserAPI(signupData)
        if (!response.success) {
            return rejectWithValue(response.message)
        }
        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "Failed To SignUp User")
    }

})



export const loginUser = createAsyncThunk<LoginResponse, LoginData, { rejectValue: string }>("loginUser", async (loginData, { rejectWithValue }) => {
    try {
        const response = await loginUserAPI(loginData)

        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "Failed To Log in User")
    }

})


export const logoutUser = createAsyncThunk<LogoutResponse, void, { rejectValue: string }>("logOutUser", async (_, { rejectWithValue }) => {
    try {
        const response = await logoutUserAPI()

        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "Failed To LogOut")
    }

})


// export const logoutUser = createAsyncThunk<
//   LogoutResponse,
//   void,
//   { rejectValue: string }
// >('logOutUser', async (_, { rejectWithValue }) => {
//   try {
//     const response = await logoutUserAPI()
//     return response
//   } catch (error) {
//     const err = error as AxiosError

//     // Optional: Extract a meaningful error message
//     const errorMessage = err.response?.data?.message || err.message || 'Logout failed'

//     return rejectWithValue(errorMessage)
//   }
// })

const initialState: AuthInitialState = {
    loginData: { email: "", password: "" },
    signupData: { email: "", password: "", userName: "" }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        getSignupData: (state, action) => {
            state.signupData = action.payload
        },
        getLoginData: (state, action) => {
            // console.log("login Data is :", action.payload);

            state.loginData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(signupUser.fulfilled, (state) => {
                state.signupData = { email: "", password: "", userName: "" }
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loginData = { email: "", password: "" }
            })
    }
})


export const { getLoginData, getSignupData } = authSlice.actions
export default authSlice.reducer

