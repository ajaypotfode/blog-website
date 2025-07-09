import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks"
import { addBlog, blogDetails, deleteBlog, getAdminBlogs, getBlogData, getBlogs, getSubdcriberModel, uploadImage } from "@/redux/slice/blogSlice"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
import { EditorRef } from "@/types/RichTextType"
import { toast } from "react-toastify"
import { getSubscriberEmail } from "@/redux/slice/subscriberSlice"
import { setFormErrors } from "@/redux/slice/globalSlice"
import blogFormValidate from "@/formValidation/blogFormvalidate"
// import Cookies from 'js-cookie'
// import { isUserLogedIn } from "@/service/authApiService"


const UseBlogData = () => {
    const { blogdata, blogs, singleBlog, subscriberModel, adminBlogs } = useAppSelector(state => state.blog)
    const { loading, error, isLogedIn, formErrors } = useAppSelector(state => state.global)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const imageRef: React.RefObject<HTMLInputElement | null> = useRef(null)
    const richTextRef: EditorRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState<number>(0)


    const handleBlogData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target
        dispatch(getBlogData({ ...blogdata, [name]: value }))
        // dispatch()
    }

    const handleRichtextChange = (value: string) => {

        dispatch(getBlogData({ ...blogdata, description: value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files
        if (image) {
            dispatch(uploadImage(image[0]))
        }
    }

    const fetchBlogs = (category: string) => {
        dispatch(getBlogs(category))
    }

    const fetchBlogDetails = (blogId: string) => {
        dispatch(blogDetails(blogId))
    }

    const fetchAdminBlogs = () => {
        dispatch(getAdminBlogs())
    }


    const getAddBlog = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!blogdata.image) {
            toast.info("wait for image Uploading!!")
            return;
        }

        if (blogFormValidate(blogdata, dispatch)) {
            const response = await dispatch(addBlog(blogdata)).unwrap()
            if (response.success) {
                // if (richTextRef) {
                richTextRef.current?.commands.setContent("")
                // }
                if (imageRef.current) {
                    imageRef.current.value = ""
                }
                toast.success("Blog Created SuccessFully")
            }
        }

        // console.log("blog data is :", blogdata);


    }


    const getDeleteBlog = async (blogId: string) => {
        const response = await dispatch(deleteBlog(blogId)).unwrap()

        if (response.success) {
            toast.success("Blog Deleted SuccessFully")
        }
    }


    const handleSubscriptionModel = () => {
        dispatch(getSubscriberEmail(""))
        dispatch(getSubdcriberModel())
        // ed
    }

    const handleAddBlog = () => {
        router.push('/admin/addblog')
        dispatch(setFormErrors({}))
    }

    // const getIsUserLogedin = () => {
    //     const status = localStorage.getItem('isLogedIn')
    //     if (status) {
    //         dispatch(isUserLogedIn(true))
    //     }
    //     else {
    //         dispatch(isUserLogedIn(false))
    //     }
    // }

    const handleAdminNavigation = (route: string) => {
        router.push(route)
        if (route === "/admin/addblog") {
            dispatch(setFormErrors({}))
        }

    }

    return {
        handleBlogData,
        handleRichtextChange,
        handleImageUpload,
        fetchBlogs,
        fetchAdminBlogs,
        fetchBlogDetails,
        getAddBlog,
        getDeleteBlog,
        // getBlogCategoryVise,
        handleSubscriptionModel,
        handleAddBlog,
        blogdata,
        blogs,
        singleBlog,
        subscriberModel,
        adminBlogs,
        imageRef,
        richTextRef,
        activeCategory,
        setActiveCategory,
        loading,
        error,
        isLogedIn,
        formErrors,
        handleAdminNavigation
    }
}

export default UseBlogData