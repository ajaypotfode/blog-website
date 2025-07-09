import { setFormErrors } from "@/redux/slice/globalSlice"
import { UserData } from "@/types/AuthTypes"
import { Dispatch } from "@reduxjs/toolkit"
// import { ThunkDispatch } from "@reduxjs/toolkit"

const signupFormValidate = (formData: UserData, dispatch: Dispatch): boolean => {
    const signupErrors = { email: "", password: "", userName: "" }
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

    dispatch(setFormErrors(signupErrors))

    return validate
}

export default signupFormValidate