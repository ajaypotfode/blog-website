import { GetSingleSubscriberResponse, GetSubscriberResponse, SubscriberData } from "@/types/SubscriberType";
import axios from "axios";

export const getSubscriberAPI = async (): Promise<GetSubscriberResponse> => {
    // const data = JSON.stringify({ title, category, image, description })
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/api/subscriber',
        headers: {
            'Content-Type': 'application/json',
        },
        // data: data
    };

    try {
        const response = await axios.request<GetSubscriberResponse>(config)
        return response.data
    } catch (error: unknown) {
        console.error('failed To Fetch Subscribers :', error);
        throw error;
    }
}



export const addSubscriberAPI = async (subscriberData: SubscriberData): Promise<GetSingleSubscriberResponse> => {
    const data = JSON.stringify(subscriberData)
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/api/subscriber',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios.request<GetSingleSubscriberResponse>(config)
        return response.data
    } catch (error: unknown) {
        console.error('failed To Add Subscribers :', error);
        throw error;
    }
}


export const deleteSubscriberAPI = async (subscriberId: string): Promise<GetSingleSubscriberResponse> => {
    const data = JSON.stringify({ subscriberId })
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: '/api/subscriber',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios.request<GetSingleSubscriberResponse>(config)
        return response.data
    } catch (error: unknown) {
        console.error('failed delete Subscribers :', error);
        throw error;
    }
}