// import { Blog } from "@/schema/blogSchema";
import api from "@/axios/axios";
import { CommentData, GetBlogsResponse, GetCommentedBlogResponse, GetCommentsResponse, GetLikedBlogResponse, GetSingleBlogResponse } from "@/types/BlogTypes";

export const getBlogAPI = async (): Promise<GetBlogsResponse> => {

    const response = await api.get<GetBlogsResponse>('/api/blog');
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


export const likeBlogAPI = async (likeData: { blogId: string, category: string }): Promise<GetLikedBlogResponse> => {

    const response = await api.post<GetLikedBlogResponse>('/api/blog/like', likeData);
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)

}


export const commentBlogAPI = async (commentData: CommentData): Promise<GetCommentedBlogResponse> => {

    const response = await api.post<GetCommentedBlogResponse>('/api/blog/comment', commentData);
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)

}


export const fetchCommentsAPI = async (params: { blogId: string, lastId?: string }): Promise<GetCommentsResponse> => {

    const response = await api.get<GetCommentsResponse>('/api/blog/comment', { params });
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)

}


export const getTrendingBlogAPI = async (): Promise<GetBlogsResponse> => {
    // const data = JSON.stringify(loginData)

    const response = await api.get<GetBlogsResponse>('/api/blog/trending');
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


export const getBlogByIdAPI = async (blogdata: { blogId: string, sessionId?: string }): Promise<GetSingleBlogResponse> => {
    // const data = JSON.stringify(loginData)

    const params = { sessionId: blogdata.sessionId }
    const response = await api.get<GetSingleBlogResponse>(`/api/blog/${blogdata.blogId}`, { params });
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)

}

