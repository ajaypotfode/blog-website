"use client"

import { useEffect, useState } from "react"
import { format } from 'date-fns'
import { Loader2, Users, UserX } from "lucide-react"
import Link from "next/link"
import { useAtom, useSetAtom } from "jotai"
import { subscribersAtom, totalSubscribersAtom } from "@/atom/adminBlogAtom"
import { useDeleteSubsciberMutation, useGetSubscriberMutation } from "@/mutation/subsciber"
import Avatar from "@/component/Avatar"
import { openToastAtom } from "@/atom/toastAtom"
import { openConfirmModalAtom } from "@/atom/confirmationAtom"
import { SmallComponentSpinner } from "@/component/Loaders"
import { List, useDynamicRowHeight } from "react-window"


const Subscribers = () => {
    const [subscribers, setSubscribers] = useAtom(subscribersAtom);
    const [totalSubscribers, setTotalSubscribers] = useAtom(totalSubscribersAtom);
    const [isfetchingMore, setIsFetchingMore] = useState(false);
    const openToast = useSetAtom(openToastAtom);
    const confirmModal = useSetAtom(openConfirmModalAtom);
    const { isPending: isSubscribePending, mutate: getSubscribers } = useGetSubscriberMutation();
    const { isPending: isDeletePending, mutate: deleteSubscriber, variables } = useDeleteSubsciberMutation();

    // this is to give dynamic hieght to List Rows
    const rowHeight = useDynamicRowHeight({
        defaultRowHeight: 50
    });


    const fetchSubscribers = (lastId?: string) => {
        if (lastId) setIsFetchingMore(true)
        getSubscribers(
            lastId,
            {
                onSuccess: (data) => {
                    if (data.total) {
                        setTotalSubscribers(data.total);
                        setSubscribers(data.result);
                    } else {
                        setSubscribers([...subscribers, ...data.result]);
                        setIsFetchingMore(false)
                    }
                },
                onError: (err: Error) => {
                    setIsFetchingMore(false)
                    openToast({ type: "error", message: err.message || "Failed To Fetch Subscribers" })
                }
            },
        );
    }

    const handleDeleteSubscriber = async (blogId: string) => {

        const response = await confirmModal({
            message: "Do you Want to remove this Subscriber",
            title: "Remove Subscriber"
        })

        if (!response) return

        deleteSubscriber(
            blogId,
            {
                onSuccess: (data) => {
                    //    const filteredBlog=
                    const filterSubscriber = subscribers.filter(subscriber => subscriber._id !== data.result?._id)
                    setSubscribers(filterSubscriber);
                    setTotalSubscribers(totalSubscribers - 1)
                    openToast({ type: "success", message: "Subscriber Removed Successfully!!" })

                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To Remove Subsriber" })
                }
            },
        );
    }

    useEffect(() => {
        fetchSubscribers();
    }, [])

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
            <div className="mb-8 md:mb-10">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-primary">Your Subscribers</h1>
                <p className="text-gray-800 mt-1 text-sm sm:text-base">
                    {(isSubscribePending && !isfetchingMore) ? 'Loading...' : `${totalSubscribers ?? 0} ${totalSubscribers === 1 ? 'person follows' : 'people follow'} your stories`}
                </p>
            </div>

            {(isSubscribePending && !isfetchingMore) ? (
                <div className="flex justify-center py-20">
                    <SmallComponentSpinner />
                </div>
            ) : subscribers.length === 0 ? (
                <div className="text-center py-16 sm:py-20 px-4">
                    <Users className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">No subscribers yet</h3>
                    <p className="text-sm text-gray-800 mb-6 max-w-xs mx-auto">
                        Write great stories to grow your audience.
                    </p>
                    <Link href="/admin/add-blog">
                        <button className="underline">Write a Story</button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4">

                    <List
                        className="max-h-[80vh]!"
                        rowCount={subscribers.length}
                        rowHeight={rowHeight}
                        rowProps={{ subscribers }}
                        rowComponent={({ index, style, subscribers }) => {
                            const subsciber = subscribers[index];
                            return (
                                <div
                                    style={style}
                                    className="py-2!"
                                >
                                    <div className="flex  items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-gray-300/50 hover:shadow-sm transition-shadow overflow-hidden">
                                        <Avatar src={subsciber.userId?.image ?? ""} fallback={subsciber.userId.userName} className="h-10 w-10 text-sm" />

                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                                {subsciber.userId.userName}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-800 truncate">
                                                {subsciber.userId.email}
                                            </p>
                                            <p className="text-xs text-gray-800 mt-0.5">
                                                Since {format(new Date(subsciber.createdAt), 'MMM d, yyyy')}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteSubscriber(subsciber._id)}
                                            disabled={(variables === subsciber._id && isDeletePending)}
                                            className="flex-shrink-0 flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-full text-sm font-medium text-rose-600 border border-rose-200 hover:bg-rose-50 disabled:opacity-50 transition-colors"
                                        >
                                            {(variables === subsciber._id && isDeletePending) ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                : <UserX className="w-3.5 h-3.5 flex-shrink-0" />
                                            }
                                            <span className="hidden sm:inline">Remove</span>
                                        </button>
                                    </div>
                                </div>

                            )
                        }}
                    />
                    {
                        (totalSubscribers !== subscribers.length) && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => fetchSubscribers(subscribers[subscribers.length - 1]._id)}
                                    disabled={(isfetchingMore)}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                >
                                    {isfetchingMore ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" />Loading...</>
                                    ) : (
                                        "View more"
                                    )}
                                </button>
                            </div>
                        )
                    }
                </div>
            )}

        </div>
    )
}

export default Subscribers