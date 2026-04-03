import { commentBlogAPI, fetchCommentsAPI, getBlogAPI, getBlogByIdAPI, likeBlogAPI } from "@/service/blogApiService"
import { CommentData } from "@/types/BlogTypes"
import { useMutation } from "@tanstack/react-query"

export const useGetBlogsMutation = () => {
    return useMutation({
        mutationFn: () => {
            return getBlogAPI()
        }
    })
}

export const useGetBlogByIdMutation = () => {
    return useMutation({
        mutationFn: (blogId: string,) => {
            return getBlogByIdAPI(blogId)
        }
    })
}

export const useLikeBlogMutation = () => {
    return useMutation({
        mutationFn: (likeData: { blogId: string, category: string }) => {
            return likeBlogAPI(likeData)
        }
    })
}



export const useGetCommentMutation = () => {
    return useMutation({
        mutationFn: (params: { blogId: string, lastId?: string }) => {
            return fetchCommentsAPI(params)
        }
    })
}

export const useCommentBlogMutation = () => {
    return useMutation({
        mutationFn: (commentData: CommentData) => {
            return commentBlogAPI(commentData)
        }
    })
}