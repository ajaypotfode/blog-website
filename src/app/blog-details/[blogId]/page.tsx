// import React from 'react'
"use client"
import AddSbscriber from "@/component/AddSbscriber"
// import AddSbscriber from "@/component/AddSbscriber"
import UseBlogData from "@/hooks/useBlogData"
import Image from "next/image"
import { use, useEffect } from "react"
import parse from 'html-react-parser'
import { PageSpinner } from "@/component/Loaders"
import Link from "next/link"

const Blog = ({ params }: { params: Promise<{ blogId: string }> }) => {
    const { fetchBlogDetails, singleBlog, handleSubscriptionModel, subscriberModel, loading } = UseBlogData()
    // In a Client Component page, dynamic segments from props can be accessed using the "use" hook.
    const { blogId } = use(params)

    useEffect(() => {
        fetchBlogDetails(blogId)
        // console.log("params is :", params.blogId);

    }, [])

    return (
        <div className="h-screen overflow-y-auto  flex flex-col bg-white">

            <header className="flex justify-between p-6 z-20 bg-gray-200 ">
                <div className="flex text-black items-center space-x-2 h-fit">
                    <div className="text-2xl font-bold">
                        <Link href='/' className="flex items-center gap-2">
                            <span className="font-bold text-4xl inline-block"><i className="bi bi-journal-text"></i></span> My Blogs
                        </Link>
                    </div>
                </div>
                <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 h-fit" onClick={handleSubscriptionModel}>
                    Subscribe →
                </button>
            </header>

            {
                loading['blogDetails']
                    ? (<div className="flex flex-1  justify-center items-center sm:grid-cols-2 gap-8 mt-10 px-6 pb-20  w-full">
                        <PageSpinner />
                    </div>)
                    : (singleBlog && <main className="flex-1 flex flex-col items-center text-center mt-4 px-4 pb-32 z-20">
                        <h1 className="text-3xl font-bold mb-2 text-black">
                            {singleBlog.title}
                        </h1>
                        <div className="flex place-content-center items-center justify-center gap-4 mt-2 mb-6 flex-col">
                            <div className="border-2 w-20 h-20 place-content-center rounded-full  text-black text-4xl font-bold">
                                {singleBlog.author?.userName[0]}
                            </div>
                            <span className="text-gray-700 font-medium ">{singleBlog.author?.userName}</span>
                        </div>

                        <div className=" max-w-3xl  md:w-[60%] w-[80%] ">
                            <div className="w-full h-60 border border-black">
                                <Image src={singleBlog.image} alt={singleBlog.title} className="rounded shadow w-full h-full" width={100} height={100} />
                            </div>
                            <div className="text-black text-start tracking-tight whitespace-pre-wrap">
                                {parse(singleBlog.description)}
                            </div>
                        </div>
                        {subscriberModel && <AddSbscriber handleSubscriberModel={handleSubscriptionModel} autherId={singleBlog.author._id} />}
                    </main>)

            }

        </div>
    )
}

export default Blog