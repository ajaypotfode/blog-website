// import { Blog } from "@/model/blogSchema";
import { BlogData, GetAdminBlogsResponse, GetBlogsResponse, GetSingleBlogResponse } from "@/types/BlogTypes";
import axios from "axios";
// import axios, { AxiosResponse } from "axios";

export const getBlogAPI = async (category: string): Promise<GetBlogsResponse> => {
    // const data = JSON.stringify(loginData)
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/blog?category=${category}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.request<GetBlogsResponse>(config)
        return response.data
    } catch (error: unknown) {
        console.error('failed To Fetch Blogs :', error);
        throw error;
    }
}



export const addBlogAPI = async (blogData: BlogData): Promise<GetSingleBlogResponse> => {
    const data = JSON.stringify(blogData)
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/api/blog',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios.request<GetSingleBlogResponse>(config)
        // console.log("add blog response is :", response);

        return response.data
    } catch (error: unknown) {
        console.error('failed To Add Blogs :', error);
        throw error;
    }
}



// export const updateBlogAPI = async ({ title, blogId, category, image, description }: BlogData): Promise<GetSingleBlogResponse> => {
//     const data = JSON.stringify({ title, category, image, description })
//     const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: `/api/blog/${blogId}`,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         data: data
//     };

//     try {
//         const response = await axios.request<GetSingleBlogResponse>(config)
//         return response.data
//     } catch (error: unknown) {
//         console.error('failed To Update Blogs :', error);
//         throw error
//     }
// }


export const deleteBlogAPI = async (blogId: string): Promise<GetSingleBlogResponse> => {
    // const data = JSON.stringify({ title, category, image, description })
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `/api/blog/${blogId}`,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await axios.request<GetSingleBlogResponse>(config)
        return response.data
    } catch (error: unknown) {
        console.error('failed To delete Blogs :', error);
        throw error;
    }
}


export const getOneBlogAPI = async (blogId: string): Promise<GetSingleBlogResponse> => {
    // const data = JSON.stringify(loginData)
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/blog/${blogId}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.request<GetSingleBlogResponse>(config)
        return response.data
    } catch (error: unknown) {
        console.error('failed To Fetch Blog :', error);
        throw error;
    }
}


export const getAdminBlogAPI = async (): Promise<GetAdminBlogsResponse> => {
    // const data = JSON.stringify(loginData)
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/admin-blogs`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.request<GetAdminBlogsResponse>(config)
        return response.data
    } catch (error: unknown) {
        console.error('failed To getAdmin Blogs :', error);
        throw error;
    }
}
