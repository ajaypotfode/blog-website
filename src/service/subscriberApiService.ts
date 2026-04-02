import api from "@/axios/axios";
import { GetSingleSubscriberResponse, GetSubscriberResponse } from "@/types/SubscriberType";

export const getSubscriberAPI = async (lastId?: string): Promise<GetSubscriberResponse> => {
    const params = { lastId }
    const response = await api.get<GetSubscriberResponse>('/api/subscriber', { params });
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


export const addSubscriberAPI = async (autherId: string): Promise<GetSingleSubscriberResponse> => {

    const response = await api.post<GetSingleSubscriberResponse>('/api/subscriber', { autherId });
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


export const deleteSubscriberAPI = async (subscriberId: string): Promise<GetSingleSubscriberResponse> => {

    const params = { subscriberId }
    const response = await api.delete<GetSingleSubscriberResponse>('/api/subscriber', { params });
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}