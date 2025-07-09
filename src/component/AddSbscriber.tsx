"use client"
import UseSubscriberData from '@/hooks/useSubscriberData'
import React from 'react'


const AddSbscriber = ({ handleSubscriberModel, autherId }: { handleSubscriberModel: () => void, autherId: string, }) => {

    const { email, subscribe, handleSubscriberEmail } = UseSubscriberData();

    return (
        <div className="add-chat-User_form fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-30" onClick={handleSubscriberModel}>
            {/* <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center"> */}
            {/* {
                loading['addChats'] ? <FormSpinner />
                    : ( */}

            <div className="bg-gray-100 p-8 rounded-2xl w-full max-w-md shadow-lg" onClick={(e) => e.stopPropagation()} >
                <h2 className="text-black text-2xl font-semibold mb-6 text-center">Add Email To Subscibe</h2>
                <form className="space-y-4" >
                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        onChange={(e) => handleSubscriberEmail(e.target.value)}
                        value={email}
                        className="w-full p-3 text-black border border-[#444] focus:outline-none "
                    />
                    {/* {} */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 "
                        onClick={(e) => {
                            e.preventDefault()
                            subscribe(autherId)
                        }
                        }
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div >
    )
}

export default AddSbscriber