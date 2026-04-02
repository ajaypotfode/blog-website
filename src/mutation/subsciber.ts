import { addSubscriberAPI, deleteSubscriberAPI, getSubscriberAPI } from "@/service/subscriberApiService"
import { useMutation } from "@tanstack/react-query"

export const useGetSubscriberMutation = () => {
    return useMutation({
        mutationFn: (lastId?: string) => {
            return getSubscriberAPI(lastId)
        }
    })
}

export const useSubscribeMutation = () => {
    return useMutation({
        mutationFn: (autherId: string) => {
            return addSubscriberAPI(autherId)
        }
    })
}

export const useDeleteSubsciberMutation = () => {
    return useMutation({
        mutationFn: (subscriberId: string) => {
            return deleteSubscriberAPI(subscriberId)
        }
    })
}