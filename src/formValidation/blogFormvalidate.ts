import { setFormErrors } from "@/redux/slice/globalSlice";
import { BlogData } from "@/types/BlogTypes";
import { Dispatch } from "@reduxjs/toolkit";

const blogFormValidate = (formData: BlogData, dispatch: Dispatch): boolean => {
    const blogErrors = { title: "", category: "", image: "", description: "" }
    let validate = true

    if (!formData.title) {
        blogErrors.title = "blog Title Is required"
        validate = false
    }

    if (!formData.category) {
        blogErrors.category = "blog category Is Required"
        validate = false
    }

    if (!formData.description) {
        blogErrors.description = "blog Description Is Required"
        validate = false
    }

    if (!formData.image) {
        blogErrors.image = "blog Image Is Required"
        validate = false
    }

    dispatch(setFormErrors(blogErrors))
    return validate

}

export default blogFormValidate