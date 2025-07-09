import { setFormErrors } from "@/redux/slice/globalSlice";
import { LoginData } from "@/types/AuthTypes";
import { Dispatch } from "@reduxjs/toolkit";

const loginFormValidate = (formData: LoginData, dispatch: Dispatch): boolean => {
    const loginErros = { email: "", password: "" }
    let validate = true

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        loginErros.email = "Email must Be Valid"
        validate = false
    }

    if (!formData.password) {
        loginErros.password = "Passwrd is required"
        validate = false
    }
    dispatch(setFormErrors(loginErros))
    return validate
}

export default loginFormValidate