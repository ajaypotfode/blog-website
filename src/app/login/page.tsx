// components/LoginForm.tsx
"use client"
import { openToastAtom } from '@/atom/toastAtom';
import { loginDataAtom, loginFormErrors, showPasswordAtom } from '@/atom/userAtom';
import { SmallComponentSpinner } from '@/component/Loaders';
import loginFormValidate from '@/formValidation/loginFormValidate';
import { useLoginUserMutation } from '@/mutation/authMutation';
import { useAtom, useSetAtom } from 'jotai';
import { ArrowLeft, Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
// import { useRouter } from "next/navigation"
// import { useEffect } from 'react';
// import { BsEye, BsEyeSlash } from 'react-icons/bs';

const LoginForm = () => {
    const [loginData, setLoginData] = useAtom(loginDataAtom);
    const openToast = useSetAtom(openToastAtom)
    const [showPassword, setShowPassword] = useAtom(showPasswordAtom);
    const [formErrors, setFormErrors] = useAtom(loginFormErrors);
    // const router = useRouter()

    const { mutate, isPending } = useLoginUserMutation();


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validate, loginErros } = loginFormValidate(loginData);
        setFormErrors(loginErros)

        if (isPending || !validate) return;

        mutate(
            {
                email: loginData.email,
                password: loginData.password
            },
            {
                onSuccess: () => {
                    openToast({ type: "success", message: "Logged In Successfully!!" })
                    setLoginData({ email: "", password: "" })
                    // router.push('/')
                    window.location.href = '/'
                },
                onError: (err: Error) => {
                    console.log("error Is :", err);

                    openToast({
                        type: "error",
                        message: err.message || "Failed To Login"
                    })
                }
            },
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Link href="/" className="absolute top-8 left-8 flex items-center text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back home
            </Link>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center text-primary-foreground font-serif font-bold text-2xl shadow-lg">
                        M
                    </div>
                </div>
                <h2 className="text-center text-3xl font-serif font-bold tracking-tight text-primary">
                    Welcome back
                </h2>
                <p className="mt-2 text-center text-sm text-gray-800">
                    Sign in to your account to continue
                </p>
            </div>

            <div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-[400px]"
            >
                <div className="bg-white py-8 px-4 shadow-xl shadow-black/5 sm:rounded-2xl sm:px-10 border border-gray-300/50">
                    <form className="space-y-6" onSubmit={onSubmit}>

                        <div className="space-y-2">
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor='email'>Email address</label>
                            <input
                                type="email"
                                name='email'
                                id='email'
                                value={loginData.email || ""}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                placeholder="Enter your email"
                                className="w-full mobile:text-lg text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
                            // required
                            />
                            {formErrors.email && <p className='mobile:text-sm text-xs text-red-700'>{formErrors.email}</p>}
                        </div>

                        <div className='relative'>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                            <input
                                type={showPassword.login ? "text" : "password"}
                                name='password'
                                value={loginData.password || ""}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                placeholder="Enter your password"
                                className="w-full mobile:text-lg text-sm  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
                            // required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => ({ ...prev, login: !prev.login }))}
                                className="absolute outline-none inset-y-0 right-0 top-7 pr-3 flex items-center dark:text-white cursor-pointer"
                                tabIndex={-1}
                            >
                                {showPassword.login ?
                                    (<Eye className='text-black' />)
                                    :
                                    (<EyeClosed className='text-black' />)
                                }
                            </button>
                            {formErrors.password && <p className='mobile:text-sm text-xs text-red-700'>{formErrors.password}</p>}
                        </div>

                        <button className="w-full flex items-center mobile:text-lg button" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <SmallComponentSpinner />
                                    Signing in...
                                </>
                            ) : "Sign in"}
                        </button>
                    </form>

                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-800">New to MyBlogs?</span>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link href="/register" className="text-primary font-semibold hover:underline">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default LoginForm;
