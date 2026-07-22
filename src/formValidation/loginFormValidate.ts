// import { LoginData } from "@/types/AuthTypes";

const loginFormValidate = (formData: { email: string, password: string }) => {
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

    return { validate, loginErros }
}

export default loginFormValidate