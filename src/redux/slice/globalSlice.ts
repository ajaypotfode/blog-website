// import { isUserLogedIn } from "@/service/authApiService"
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

interface GlobalInitialState {
    loading: { [key: string]: boolean }
    error: { [key: string]: string }
    isLogedIn: boolean,
    formErrors: { [key: string]: string }
}

const initialState: GlobalInitialState = {
    loading: {},
    error: {},
    isLogedIn: false,
    formErrors: {}
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        isUserLogedIn: (state, action) => {
            state.isLogedIn = action.payload
        },
        setFormErrors: (state, action) => {
            state.formErrors = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state, action) => {
                const key = action.type.replace('/pending', '')
                state.loading[key] = true
                delete state.error[key]
            })
            .addMatcher(isFulfilled, (state, action) => {
                const key = action.type.replace('/fulfilled', '')
                state.loading[key] = false
                delete state.error[key]
            })
            .addMatcher(isRejected, (state, action) => {
                const key = action.type.replace('/rejected', '')
                state.loading[key] = false

                // console.log("error message in Global Slice :", action.payload);
                if (action.payload) {
                    toast.error(`${action.payload}`)
                }

                // delete state.error[key]
            })
    }
})


export const { isUserLogedIn, setFormErrors } = globalSlice.actions;
export default globalSlice.reducer
