// import { Editor } from "@tiptap/react"

// import { ObjectId, Types } from "mongoose"

export interface Params {
    params: {
        blogId: string
    }
}


export type BlogData = {
    blogId?: string,
    title: string,
    category: string,
    image: string,
    description: string,
}

export interface BlogResult {
    _id: string,
    title: string,
    category: string,
    author: { _id: string, userName: string },
    image: string,
    description: string,
    date: string,
    __v: number
}


export interface AdminBlogType {
    _id: string,
    title: string,
    author: { _id: string, userName: string },
    description: string,
    date: string,
    __v: number
}

interface CommonResponse {
    message: string,
    success: boolean,
    error?: unknown
}

export interface GetBlogsResponse extends CommonResponse {
    result?: BlogResult[]
}

export interface GetAdminBlogsResponse extends CommonResponse {
    result?: AdminBlogType[]
}

export interface GetSingleBlogResponse extends CommonResponse {
    result?: BlogResult
}

export interface BlogInitialState {
    blogdata: BlogData,
    blogs: BlogResult[]
    singleBlog: BlogResult | null,
    subscriberModel: boolean,
    adminBlogs: AdminBlogType[],
    // instanceOfRichtext: null | ((value: string) => boolean)
}


// export interface ResponseEmailType {
//     title: string,
//     _id: object,
//     author: { _id: string, userName: string },
//     // date:
// }