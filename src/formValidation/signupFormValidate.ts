import { UserData } from "@/types/AuthTypes"


const signupFormValidate = (formData: UserData) => {
    const signupErrors = { email: "", password: "", userName: "", image: "" }
    let validate = true

    if (!formData.userName || formData.userName.length < 2) {
        signupErrors.userName = "Username must have Atleast 2 characters"
        validate = false

    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        signupErrors.email = "Email must Be Valid"
        validate = false
    }

    if (!formData.password) {
        signupErrors.password = "password is required"
        validate = false
    }


    return { validate, signupErrors }
}

export default signupFormValidate