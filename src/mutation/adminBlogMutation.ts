import { addBlogAPI, addSavedBlogAPI, deleteBlogAPI, getAdminBlogAPI, getMyFeedAPI, getSavedBlogAPI, getTopStories, removeSavedBlogAPI } from "@/service/adminBlogApiService"
import { getTrendingBlogAPI } from "@/service/blogApiService"
import { BlogData } from "@/types/BlogTypes"
import { useMutation } from "@tanstack/react-query"

export const useAddBlogMutation = () => {
    return useMutation({
        mutationFn: (blogData: BlogData) => {
            return addBlogAPI(blogData)
        }
    })
}


export const useGetBlogsMutation = () => {
    return useMutation({
        mutationFn: (lastId?: string) => {
            return getAdminBlogAPI(lastId)
        }
    })
}

export const useDeleteBlogMutation = () => {
    return useMutation({
        mutationFn: (blogId: string) => {
            return deleteBlogAPI(blogId)
        }
    })
}


export const useGetTopStoriesMutation = () => {
    return useMutation({
        mutationFn: () => {
            return getTopStories();
        }
    })
}


export const useGetTrendingBlogsMutation = () => {
    return useMutation({
        mutationFn: () => {
            return getTrendingBlogAPI()
        }
    })
}

export const useGetRecomendedBlogsMutation = () => {
    return useMutation({
        mutationFn: () => {
            return getMyFeedAPI()
        }
    })
}


export const useGetSavedBlogsMutation = () => {
    return useMutation({
        mutationFn: (lastId?: string) => {
            return getSavedBlogAPI(lastId);
        }
    })
}


export const useSaveBlogMutation = () => {
    return useMutation({
        mutationFn: (blogId: string) => {
            return addSavedBlogAPI(blogId)
        },
        retry: false
    })
}


export const useUnsaveBlogMutation = () => {
    return useMutation({
        mutationFn: (savedId: string) => {
            return removeSavedBlogAPI(savedId)
        },
        retry: false
    })
}



// export const useGetBlogByIdMutation = () => {
//     return useMutation({
//         mutationFn:(blogData: { blogId: string, sessionId?: string }) => {
//             return getBlogByIdAPI(blogData)
//         }
//     })
// }

// export const useLikeBlogMutation = () => {
//     return useMutation({
//         mutationFn:(likeData: { blogId: string, category: string }) => {
//             return likeBlogAPI(likeData)
//         }
//     })
// }