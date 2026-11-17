"use client"
import { openToastAtom } from '@/atom/toastAtom';
import { showPasswordAtom, signupDataAtom, signupFormErrors } from '@/atom/userAtom';
import { SmallComponentSpinner } from '@/component/Loaders';
import ThemeToggle from '@/component/toggleTheme';
import signupFormValidate from '@/formValidation/signupFormValidate';
import { useRegisterUserMutation } from '@/mutation/authMutation';
import { useUploadImageMutation } from '@/mutation/uploadImageMutation';
import { useAtom, useSetAtom } from 'jotai';
import { ArrowLeft, Eye, EyeClosed, } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const RegisterForm = () => {
    const [signupData, setSignupData] = useAtom(signupDataAtom);
    const openToast = useSetAtom(openToastAtom)
    const [showPassword, setShowPassword] = useAtom(showPasswordAtom);
    const [formErrors, setFormErrors] = useAtom(signupFormErrors);
    const { isPending: imageUploadPending, mutate: uploadImage } = useUploadImageMutation();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const { mutate: signUp, isPending: isSignupPending } = useRegisterUserMutation();


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validate, signupErrors } = signupFormValidate(signupData);
        setFormErrors(signupErrors)

        if (isSignupPending || !validate) return;

        signUp(
            {
                email: signupData.email,
                password: signupData.password,
                userName: signupData.userName,
                image: signupData.image
            },
            {
                onSuccess: () => {
                    openToast({ type: "success", message: "Account Registered Successfully!!" })
                    setSignupData({ email: "", password: "", userName: "", image: "" })
                    router.push('/login')
                    if (inputFileRef.current?.value) { inputFileRef.current.value = "" }
                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To Sugn up" })
                }
            },
        );
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        if (e.target.files[0].size >= 3 * 1024 * 1024) {
            openToast({ message: "File must be less than 3MB", type: 'info' });
            return;
        }

        uploadImage(
            e.target.files[0],
            {
                onSuccess: (data) => {
                    setSignupData({ ...signupData, image: data.newBlob.url })
                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To upload Image" })
                }
            })
    }


    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Link href="/" className="absolute top-8 left-8 flex items-center text-sm font-medium text-disabled hover:text-primary transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back home
            </Link>
            <div className='absolute top-8 right-8 '>
                <ThemeToggle />
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-serif font-bold text-2xl shadow-lg">
                        M
                    </div>
                </div>
                <h2 className="text-center text-3xl font-serif font-bold tracking-tight text-primary">
                    Create an Account
                </h2>
                <p className="mt-2 text-center text-sm text-disabled">
                    Join a community of readers and writers
                </p>
            </div>

            <div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-[400px]"
            >
                <div className="bg-surface py-8 px-4 shadow-xl shadow-black/5 sm:rounded-2xl sm:px-10 border border-border/50">
                    <form className="space-y-6" onSubmit={onSubmit}>

                        <div className="space-y-2 relative ">
                            <label className="block mb-1 text-sm font-medium text-secondary-foreground" htmlFor='image'>Upload Profile Pic</label>
                            <input
                                type="file"
                                name='image'
                                accept=".png, .jpg, .jpeg, .webp"
                                id='image'
                                ref={inputFileRef}
                                onChange={handleImageUpload}
                                placeholder="upload File"
                                className="w-full mobile:text-lg text-sm px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-primary"
                            // required
                            />
                            {imageUploadPending && <div className='absolute outline-none inset-y-0 right-0 top-7'>
                                <SmallComponentSpinner />
                            </div>}
                            {formErrors.email && <p className='mobile:text-sm text-xs text-red-700'>{formErrors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block mb-1 text-sm font-medium text-secondary-foreground" htmlFor='userName'>User Name</label>
                            <input
                                type="text"
                                name='userName'
                                id='userName'
                                value={signupData.userName || ""}
                                onChange={(e) => setSignupData({ ...signupData, userName: e.target.value })}
                                placeholder="Enter your userName"
                                className="w-full mobile:text-lg text-sm px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-primary"
                            // required
                            />
                            {formErrors.userName && <p className='mobile:text-sm text-xs text-red-700'>{formErrors.userName}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block mb-1 text-sm font-medium text-secondary-foreground" htmlFor='email'>Email address</label>
                            <input
                                type="email"
                                name='email'
                                id='email'
                                value={signupData.email || ""}
                                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
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
                                value={signupData.password || ""}
                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
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

                        <button className="w-full mobile:text-lg button flex justify-center items-center" disabled={isSignupPending}>
                            {isSignupPending ? (
                                <>
                                    <SmallComponentSpinner />
                                    Registering...
                                </>
                            ) : "Register"}
                        </button>
                    </form>

                    <div className="mt-8 relative">
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-surface text-disabled">Already have an account</span>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-primary font-semibold hover:underline">
                            Sign in instead
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
