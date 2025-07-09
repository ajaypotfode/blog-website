// components/LoginForm.tsx
"use client"
import { FormSpinner } from '@/component/Loaders';
import UseAuthData from '@/hooks/useAuthData';
import Link from 'next/link';

const LoginForm = () => {
    const { loginData, handleLoginData, getLoginUser, handleAuthNavigation, loading, formErrors } = UseAuthData()

    return (
        <div className="h-screen flex flex-col bg-gray-200  overflow-y-auto">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4 text-black">
                <div className="text-2xl font-bold flex items-center space-x-2 gap-2">
                    <span className="font-bold text-4xl inline-block"><i className="bi bi-journal-text"></i></span> My Blogs
                </div>
                <div className="flex gap-4">
                    <span onClick={() => handleAuthNavigation('/')} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 h-fit cursor-pointer">Back</span>
                    {/* <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 h-fit">
                      Li
                    </button> */}
                </div>
            </header>
            <section className='w-full flex-1 flex justify-center items-center '>
                {
                    loading['loginUser'] ? <FormSpinner />
                        : (<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md shadow-effect">
                            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login to Add Blog</h2>
                            <form onSubmit={getLoginUser} className="space-y-4">
                                <div>
                                    {/* <label className="block mb-1 text-sm font-medium text-gray-700">Email</label> */}
                                    <input
                                        type="email"
                                        name='email'
                                        value={loginData.email || ""}
                                        onChange={handleLoginData}
                                        placeholder="Enter your email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
                                    // required
                                    />
                                    {formErrors.email && <p className='text-sm text-red-700'>{formErrors.email}</p>}
                                </div>
                                <div>
                                    {/* <label className="block mb-1 text-sm font-medium text-gray-700">Password</label> */}
                                    <input
                                        type="password"
                                        name='password'
                                        value={loginData.password || ""}
                                        onChange={handleLoginData}
                                        placeholder="Enter your password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
                                    // required
                                    />
                                    {formErrors.password && <p className='text-sm text-red-700'>{formErrors.password}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                                >
                                    Login
                                </button>
                            </form>
                            <span className='text-black mt-4'>Do not have Login Creadential Then, <p className='text-blue-500 underline inline-block cursor-pointer' onClick={() => handleAuthNavigation('/register')} >Register</p></span>
                        </div>
                        )
                }
            </section>
        </div>
    );
};

export default LoginForm;
