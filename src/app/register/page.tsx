// components/LoginForm.tsx
"use client"
import { FormSpinner } from '@/component/Loaders';
import UseAuthData from '@/hooks/useAuthData';
// import Link from 'next/link';
// import React, { useState } from 'react';

const RegisterForm = () => {
    const { signupData, getSignupUser, handleSignupData, handleAuthNavigation, loading, formErrors } = UseAuthData()

    return (
        <div className="h-screen flex flex-col bg-gray-200  overflow-y-auto">
            {/* Header */}
            <section className='w-full flex-1 flex justify-center items-center '>
                {
                    loading['signupUser'] ? <FormSpinner />
                        : (<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md shadow-effect">
                            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Create Blog Account</h2>
                            <form onSubmit={getSignupUser} className="space-y-4">
                                <div>
                                    {/* <label className="block mb-1 text-sm font-medium text-black">User Name</label> */}
                                    <input
                                        type="text"
                                        name='userName'
                                        value={signupData.userName || ""}
                                        onChange={handleSignupData}
                                        placeholder="Enter your UserName"
                                        className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    // required
                                    />
                                    {formErrors.userName && <p className='text-sm text-red-700'>{formErrors.userName}</p>}
                                </div>
                                <div>
                                    {/* <label className="block mb-1 text-sm font-medium text-black">Email</label> */}
                                    <input
                                        type="email"
                                        name='email'
                                        value={signupData.email || ""}
                                        onChange={handleSignupData}
                                        placeholder="Enter your password"
                                        className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    // required
                                    />
                                    {formErrors.email && <p className='text-sm text-red-700'>{formErrors.email}</p>}
                                </div>
                                <div>
                                    {/* <label className="block mb-1 text-sm font-medium text-black">Password</label> */}
                                    <input
                                        type="password"
                                        name='password'
                                        value={signupData.password || ""}
                                        onChange={handleSignupData}
                                        placeholder="Enter your password"
                                        className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    // required
                                    />
                                    {formErrors.password && <p className='text-sm text-red-700'>{formErrors.password}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                                >
                                    Register
                                </button>
                            </form>
                            <span className='text-black mt-4'>Already Have an Account Then, <p className='text-blue-500 underline cursor-pointer inline-block' onClick={() => handleAuthNavigation('/login')}>Login</p></span>
                        </div>)
                }
            </section>
        </div>
    );
};

export default RegisterForm;
