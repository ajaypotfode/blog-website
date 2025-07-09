import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks"
import { addSubscriber, deleteSubscriber, getSubscriber, getSubscriberEmail } from "@/redux/slice/subscriberSlice"
import { toast } from "react-toastify"
// import React from "react"


const UseSubscriberData = () => {
    const dispatch = useAppDispatch()
    const { email, subscribers } = useAppSelector(state => state.subscriber)
    const { loading, error } = useAppSelector(state => state.global)

    const handleSubscriberEmail = (email: string) => {
        dispatch(getSubscriberEmail(email))
    }

    const fetchSubscribers = () => {
        dispatch(getSubscriber())
    }

    const subscribe = async (autherId: string) => {
        if (email) {
            const response = await dispatch(addSubscriber({ email, autherId })).unwrap()
            if (response.success) {
                toast.success("Subscribed SuccessFully!!")
            }
        }
    }

    const handleDeleteSubscriber = async (subscriberId: string) => {
        const response = await dispatch(deleteSubscriber(subscriberId)).unwrap();
        if (response.success) {
            toast.success("Subscriber Deleted SuccessFully!!")
        }
    }


    return {
        email,
        subscribers,
        handleDeleteSubscriber,
        fetchSubscribers,
        handleSubscriberEmail,
        subscribe,
        loading,
         error 
    }
}

export default UseSubscriberData