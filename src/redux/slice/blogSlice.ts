import { addBlogAPI, deleteBlogAPI, getAdminBlogAPI, getBlogAPI, getOneBlogAPI, /*updateBlogAPI*/ } from "@/service/blogApiService";
import { imageDb } from "@/service/firebaseService";
import { BlogData, BlogInitialState, GetAdminBlogsResponse, GetBlogsResponse, GetSingleBlogResponse } from "@/types/BlogTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export const uploadImage = createAsyncThunk<string, File, { rejectValue: string }>("uploadImage", async (image, { rejectWithValue }) => {
    try {
        const imageRef = ref(imageDb, `images/${image.name}`);
        const metadata = { contentType: image.type };
        const uploadResult = await uploadBytes(imageRef, image, metadata);
        // console.log("image Url Is :", uploadResult);
        return await getDownloadURL(uploadResult.ref);
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.message)
    }
}
);


// createAsyncThunk<ReturnType, ArgumentType, Options>(...)
export const getBlogs = createAsyncThunk<GetBlogsResponse, string, { rejectValue: string }>("getBlogs", async (category, { rejectWithValue }) => {
    try {
        const response = await getBlogAPI(category);

        // if (!response.success) {
        //     rejectWithValue(response)
        // }
        return response

    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "failed To Fetch Blogs")
    }
})


export const addBlog = createAsyncThunk<GetSingleBlogResponse, BlogData, { rejectValue: string }>("addBlog", async (blogData, { rejectWithValue }) => {
    try {
        const response = await addBlogAPI(blogData)
        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "failed To Add Blog")
    }

})


// export const updateBlog = createAsyncThunk<GetSingleBlogResponse, BlogData, { rejectValue: string }>("updateBlog", async (blogData, { rejectWithValue }) => {
//     try {
//         const response = await updateBlogAPI(blogData)

//         if (!response.success) {
//             return rejectWithValue(response.message)
//         }

//         return response
//     } catch (error) {
//         const err = error as AxiosError<{ message: string }>
//         return rejectWithValue(err.response?.data?.message || "failed To Update Blog")
//     }

// })



export const deleteBlog = createAsyncThunk<GetSingleBlogResponse, string, { rejectValue: string }>("deleteBlog", async (blogId, { rejectWithValue }) => {
    try {
        const response = await deleteBlogAPI(blogId)

        if (!response.success) {
            return rejectWithValue(response.message)
        }

        return response

    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "failed To Delete Blog")
    }
})


export const blogDetails = createAsyncThunk<GetSingleBlogResponse, string, { rejectValue: string }>("blogDetails", async (blogId, { rejectWithValue }) => {
    try {
        const response = await getOneBlogAPI(blogId)

        if (!response.success) {
            return rejectWithValue(response.message)
        }

        return response

    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "failed To Fetch Blog Details")
    }
})


export const getAdminBlogs = createAsyncThunk<GetAdminBlogsResponse, void, { rejectValue: string }>("getAdminBlogs", async (_, { rejectWithValue }) => {
    try {
        const response = await getAdminBlogAPI();

        // if (!response.success) {
        //     rejectWithValue(response)
        // }
        return response

    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "failed To Fetch Admin Blogs")
    }
})


const initialState: BlogInitialState = {
    blogdata: {
        title: "",
        category: "",
        image: "",
        description: "",
    },
    blogs: [],
    singleBlog: null,
    subscriberModel: false,
    adminBlogs: [],
    // instanceOfRichtext: null
}


const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        getBlogData: (state, action) => {
            state.blogdata = action.payload
        },
        getSubdcriberModel: (state) => {
            state.subscriberModel = !state.subscriberModel
        },
        // getInstanceOfRichTextEditor: (state, action) => {
        //     state.instanceOfRichtext = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.blogs = action.payload?.result || []
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                if (action.payload.result) {
                    state.blogs.push(action.payload.result)
                    state.subscriberModel = false
                    state.blogdata = { title: "", category: "", image: "", description: "" }
                }
            })
            // .addCase(updateBlog.fulfilled, (state) => {
            //     state.blogdata = { title: "", category: "", image: "", description: "" }
            // })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                if (action.payload.result?._id) {
                    // console.log("blog Id And delete Id is :", action.payload.result?._id

                    state.adminBlogs = state.adminBlogs.filter(blog => blog._id !== action.payload.result?._id)
                    // console.log("blog Id And delete Id is :", test);
                }
            })
            .addCase(blogDetails.fulfilled, (state, action) => {
                state.singleBlog = action.payload?.result || null
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.blogdata.image = action.payload

            })
            .addCase(getAdminBlogs.fulfilled, (state, action) => {
                state.adminBlogs = action.payload?.result || []
            })
    }
})


export const { getBlogData, getSubdcriberModel } = blogSlice.actions
export default blogSlice.reducer