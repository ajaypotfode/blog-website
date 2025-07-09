import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice';
import blogReducer from './slice/blogSlice';
import subscriberReducer from './slice/subscriberSlice'
import globalReducer from './slice/globalSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,
        subscriber: subscriberReducer,
        global: globalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store