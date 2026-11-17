// components/LoginForm.tsx
"use client"
import { openToastAtom } from '@/atom/toastAtom';
import { loginDataAtom, loginFormErrors, showPasswordAtom } from '@/atom/userAtom';
import { SmallComponentSpinner } from '@/component/Loaders';
import ThemeToggle from '@/component/toggleTheme';
import loginFormValidate from '@/formValidation/loginFormValidate';
// import { useLoginProvider, useLoginUserMutation } from '@/mutation/authMutation';
import { useAtom, useSetAtom } from 'jotai';
import { ArrowLeft, Eye, EyeClosed } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
// import { useRouter } from "next/navigation"
import { useState } from 'react';
// import { useEffect } from 'react';
// import { BsEye, BsEyeSlash } from 'react-icons/bs';

const LoginForm = () => {
    const [loginData, setLoginData] = useAtom(loginDataAtom);
    const openToast = useSetAtom(openToastAtom)
    const [showPassword, setShowPassword] = useAtom(showPasswordAtom);
    const [formErrors, setFormErrors] = useAtom(loginFormErrors);
    const [loading, setloading] = useState(false);
    const [isGoogleLoginPending, setIsGoogleLoginPending] = useState(false)
    // const [_, setLogeduser] = useAtom(loggedInUserAtom)
    // const router = useRouter()

    // const { mutate, isPending } = useLoginUserMutation();
    // const { mutate: googleLogin, isGoogleLoginPending } = useLoginProvider();


    const customeLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validate, loginErros } = loginFormValidate(loginData);
        setFormErrors(loginErros)

        if (loading || !validate) return;

        try {
            const response = await signIn('credentials', {
                email: loginData.email,
                password: loginData.password,
                // callbackUrl: loginData.callbackUrl,
                redirect: false,
            });
            if (response?.error) {
                openToast({
                    type: "error",
                    message: response.error
                });
            } else {
                setloading(false);
                setLoginData({ email: '', password: '' })
                window.location.href = '/'
            }
        } catch (err) {
            console.error("error:", err);

            openToast({ type: "error", message: "Failed To Login" })
        }
        // console.log("response is :", response);
    }


    const handleGoogleLogin = async () => {
        setIsGoogleLoginPending(true);

        try {
            await signIn(
                "google",
                { callbackUrl: "/" },
                { prompt: "select_account" }
            )

        } catch (err) {
            console.error("error:", err);
            openToast({
                type: "error",
                message: "Failed To Login"
            });
            setIsGoogleLoginPending(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Link href="/" className=" flex absolute top-8 left-8 items-center text-sm font-medium text-disabled hover:text-primary transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back home
            </Link>
            <div className='absolute top-8 right-8 '>
                <ThemeToggle />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-primary  rounded-xl flex items-center justify-center text-primary-foreground font-serif font-bold text-2xl shadow-lg">
                        M
                    </div>
                </div>
                <h2 className="text-center text-3xl font-serif font-bold tracking-tight text-primary">
                    Welcome back
                </h2>
                <p className="mt-2 text-center text-sm text-disabled">
                    Sign in to your account to continue
                </p>
            </div>

            <div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-[400px]"
            >
                <div className="bg-surface py-8 px-4 shadow-xl shadow-black/5 sm:rounded-2xl sm:px-10 border border-border/50">
                    <form className="space-y-6" onSubmit={customeLogin}>

                        <div className="space-y-2">
                            <label className="block mb-1 text-sm font-medium text-secondary-foreground" htmlFor='email'>Email address</label>
                            <input
                                type="email"
                                name='email'
                                id='email'
                                value={loginData.email || ""}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                placeholder="Enter your email"
                                className="w-full mobile:text-lg text-sm px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-primary"
                            // required
                            />
                            {formErrors.email && <p className='mobile:text-sm text-xs text-red-700'>{formErrors.email}</p>}
                        </div>

                        <div className='relative'>
                            <label className="block mb-1 text-sm font-medium text-secondary-foreground">Password</label>
                            <input
                                type={showPassword.login ? "text" : "password"}
                                name='password'
                                value={loginData.password || ""}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                placeholder="Enter your password"
                                className="w-full mobile:text-lg text-sm  px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-primary"
                            // required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => ({ ...prev, login: !prev.login }))}
                                className="absolute outline-none inset-y-0 right-0 top-7 pr-3 flex items-center dark:text-white cursor-pointer"
                                tabIndex={-1}
                            >
                                {showPassword.login ?
                                    (<Eye className='text-primary' />)
                                    :
                                    (<EyeClosed className='text-primary' />)
                                }
                            </button>
                            {formErrors.password && <p className='mobile:text-sm text-xs text-red-700'>{formErrors.password}</p>}
                        </div>

                        <button className="w-full flex items-center justify-center mobile:text-lg button" disabled={loading}>
                            {loading ? (
                                <>
                                    <SmallComponentSpinner />
                                    Signing in...
                                </>
                            ) : "Sign in"}
                        </button>
                    </form>

                    <button
                        onClick={(e) => { e.preventDefault(); handleGoogleLogin(); }}
                        disabled={isGoogleLoginPending}
                        type="button"
                        className="flex cursor-pointer w-full items-center mt-4 justify-center gap-2 rounded border border-border bg-surface p-2.5 text-sm font-medium text-secondary-foreground hover:bg-background"
                    >
                        {/* Simple Inline Google Icon SVG */}

                        <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                        {/* <Google/> */}
                    </button>


                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-surface text-disabled">New to MyBlogs?</span>
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
