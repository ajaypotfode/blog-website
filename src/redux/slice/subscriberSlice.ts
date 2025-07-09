import { addSubscriberAPI, deleteSubscriberAPI, getSubscriberAPI } from "@/service/subscriberApiService";
import { GetSingleSubscriberResponse, GetSubscriberResponse, SubscriberData, SubscriberInitialState } from "@/types/SubscriberType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getSubscriber = createAsyncThunk<GetSubscriberResponse, void, { rejectValue: string }>("getSubscriber", async (_, { rejectWithValue }) => {
    try {
        const response = await getSubscriberAPI();
        return response

    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data.message || "Failed To Fetch Subscribers")
    }
})


export const addSubscriber = createAsyncThunk<GetSingleSubscriberResponse, SubscriberData, { rejectValue: string }>("addSubscriber", async (subscriberData, { rejectWithValue }) => {
    try {
        const response = await addSubscriberAPI(subscriberData)
        if (!response.success) {
            return rejectWithValue(response.message)
        }
        return response

    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data.message || "Failed To Add Subscriber")
    }
})



export const deleteSubscriber = createAsyncThunk<GetSingleSubscriberResponse, string, { rejectValue: string }>("deleteSubscriber", async (subscriberId, { rejectWithValue }) => {
    try {
        const response = await deleteSubscriberAPI(subscriberId);

        if (!response.success) {
            return rejectWithValue(response.message)
        }
        return response

    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data.message || "Failed To Delete Subscriber")
    }
})



const initialState: SubscriberInitialState = {
    subscribers: [],
    email: ""
}


const subscriberSlice = createSlice({
    name: "subscriber",
    initialState,
    reducers: {
        getSubscriberEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubscriber.fulfilled, (state, action) => {
                state.subscribers = action.payload.result || []
            })
            .addCase(addSubscriber.fulfilled, (state, action) => {
                if (action.payload.result) {
                    state.subscribers.push(action.payload.result)
                    state.email = ""
                }
            })
            .addCase(deleteSubscriber.fulfilled, (state, action) => {
                if (action.payload.result?._id) {
                    state.subscribers = state.subscribers.filter(subscriber => subscriber._id !== action.payload.result?._id)
                }
            })

    }
})


export const { getSubscriberEmail } = subscriberSlice.actions
export default subscriberSlice.reducer