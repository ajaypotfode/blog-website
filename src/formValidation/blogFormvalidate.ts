import { BlogData } from "@/types/BlogTypes";

const blogFormValidate = (formData: BlogData) => {
    const blogErrors = { title: "", category: "", image: "", description: "", content: "" }
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

    if (!formData.content) {
        blogErrors.content = "blog Content Is Required"
        validate = false
    }

    if (!formData.image) {
        blogErrors.image = "blog Image Is Required"
        validate = false
    }

    return {
        validate,
        blogErrors
    }

}

export default blogFormValidate