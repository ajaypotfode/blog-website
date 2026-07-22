import api from "@/axios/axios";
import { BlogData, CommonResponse, GetBlogsResponse, GetSingleBlogResponse, SavedBlogsResponse, UnsavedBlogsResponse } from "@/types/BlogTypes";

export const addBlogAPI = async (blogData: BlogData): Promise<GetSingleBlogResponse> => {

    const response = await api.post<GetSingleBlogResponse>('/api/admin-blogs', blogData);
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


export const getAdminBlogAPI = async (lastId?: string): Promise<GetBlogsResponse> => {
    // const data = JSON.stringify(loginData)
    // const config = {
    //     method: 'get',
    //     maxBodyLength: Infinity,
    //     url: `/api/admin-blogs?pageNum=${pageNum}`,
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };

    // try {
    //     const response = await axios.request<GetBlogsResponse>(config)
    //     return response.data
    // } catch (error: unknown) {
    //     console.error('failed To Fetch Blogs :', error);
    //     throw error;
    // }
    const params = { lastId }
    const response = await api.get<GetBlogsResponse>('/api/admin-blogs', { params });
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)

}



export const getTopStories = async (): Promise<GetBlogsResponse> => {

    const response = await api.get<GetBlogsResponse>('/api/admin-blogs/top-stories');
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)

}


export const deleteBlogAPI = async (blogId: string): Promise<GetSingleBlogResponse> => {

    const params = { blogId }
    const response = await api.delete<GetSingleBlogResponse>('/api/admin-blogs', { params });
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


export const getMyFeedAPI = async (): Promise<GetBlogsResponse> => {

    const response = await api.get<GetBlogsResponse>('/api/admin-blogs/my-feed');
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


export const getSavedBlogAPI = async (lastId?: string): Promise<SavedBlogsResponse> => {

    const params = { lastId }
    const response = await api.get<SavedBlogsResponse>('/api/admin-blogs/saved', { params });
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


export const addSavedBlogAPI = async (blogId: string): Promise<CommonResponse> => {

    const response = await api.post<GetBlogsResponse>('/api/admin-blogs/saved', { blogId });
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}


export const removeSavedBlogAPI = async (savedId: string): Promise<UnsavedBlogsResponse> => {
    const params = { savedId }
    const response = await api.delete<UnsavedBlogsResponse>('/api/admin-blogs/saved', { params });
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message)
}

