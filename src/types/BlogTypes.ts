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
    content: string;
}

export interface BlogResult {
    _id: string,
    title: string,
    category: string,
    author: { _id: string, userName: string; image: string },
    image: string,
    content: string;
    description: string,
    likeCount: number;
    viewCount: number;
    date: string,
    __v: number,
    createdAt: string;
    subscribed: boolean;
    liked: boolean;

}

export interface SavedBlogResult {
    _id: string,
    autherId: string,
    blogId: BlogResult,
    createdAt: string,
    updatedAt: string,
}

export interface Comment {
    blogId: string;
    userId: { _id: string; createdAt: string, userName: string; image: string };
    comment: string;
    _id:string;
createdAt:string;
}

export interface CommentData {
    blogId: string,
    comment: string,
    category: string
}


// export interface AdminBlogType {
//     _id: string,
//     title: string,
//     author: { _id: string, userName: string },
//     description: string,
//     date: string,
//     __v: number
// }

export interface CommonResponse {
    message: string,
    success: boolean,
    error?: unknown,
}

export interface GetBlogsResponse extends CommonResponse {
    result: BlogResult[];
    total?: number;
}

export interface SavedBlogsResponse extends CommonResponse {
    result: SavedBlogResult[],
    total: number
}

export interface UnsavedBlogsResponse extends CommonResponse {
    result: {
        _id: string,
        autherId: string,
        blogId: BlogResult,
        createdAt: string,
        updatedAt: string,
    }
}

export interface GetSingleBlogResponse extends CommonResponse {
    result: BlogResult,
    // comments: Comment[]
}

export interface GetLikedBlogResponse extends CommonResponse {
    result: { blogId: string, count: number }
}

export interface GetCommentsResponse extends CommonResponse {
    result: Comment[];
    total: number;
}

export interface GetCommentedBlogResponse extends CommonResponse {
    result: Comment
}

// export interface BlogInitialState {
//     blogdata: BlogData,
//     blogs: BlogResult[]
//     singleBlog: BlogResult | null,
//     subscriberModel: boolean,
//     adminBlogs: AdminBlogType[],
//     sidebar: boolean
//     // instanceOfRichtext: null | ((value: string) => boolean)
// }


// export interface ResponseEmailType {
//     title: string,
//     _id: object,
//     author: { _id: string, userName: string },
//     // date:
// }