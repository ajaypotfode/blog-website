"use client"

import UseSubscriberData from "@/hooks/useSubscriberData"
import { useEffect } from "react"
import { format } from 'date-fns'
import { PageSpinner } from "@/component/Loaders"

const Subscribers = () => {
    const { subscribers, fetchSubscribers, handleDeleteSubscriber, loading } = UseSubscriberData()

    useEffect(() => {
        fetchSubscribers()
    }, [])

    return (
        <div className="mobile:p-4  w-full">
            <h3 className="font-bold mobile:text-xl text-md mb-4 text-start ">Your Subscribers</h3>
            <div className=" bg-white rounded-lg shadow-md">
                {loading['getSubscriber']
                    ? (<div className="flex flex-1  justify-center items-center sm:grid-cols-2 gap-8 mt-10 px-6 pb-20  w-full">
                        <PageSpinner />
                    </div>)
                    : (<table className="min-w-full table-auto">
                        <thead className=" bg-gray-200  text-gray-700 mobile:text-sm text-xs">
                            <tr className="text-left">
                                <th className="mobile:p-4 p-2  whitespace-nowrap">Email</th>
                                <th className="mobile:p-4 p-2 ">DATE</th>
                                <th className="mobile:p-4 p-2  text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800">
                            {subscribers && subscribers.map((subscriber) => (
                                <tr className=" hover:bg-gray-50 text-left mobile:text-sm text-xs" key={subscriber._id}>
                                    <td className="p-4 flex items-center gap-3 whitespace-nowrap">
                                        <span>{subscriber.email}</span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        {
                                            format(new Date(subscriber.date), 'dd MMM yyyy')
                                        }
                                    </td>
                                    <td className="p-4 cursor-pointer text-red-600 font-bold text-center" onClick={() => handleDeleteSubscriber(subscriber._id)}>
                                        <i className="bi bi-x-lg font-bold"></i>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>)
                }
            </div>
        </div>

    )
}

export default Subscribers