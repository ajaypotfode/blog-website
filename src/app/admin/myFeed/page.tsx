"use client"
import { recomendedBlogsAtom, trendingBlogsAtom, topstoriesAtom } from '@/atom/adminBlogAtom'
import { openToastAtom } from '@/atom/toastAtom'
import { userAtom } from '@/atom/userAtom'
import BlogCard from '@/component/BlogCard'
import { SmallComponentSpinner } from '@/component/Loaders'
import { useGetRecomendedBlogsMutation, useGetTopStoriesMutation, useGetTrendingBlogsMutation } from '@/mutation/adminBlogMutation'
import { useAtom, useSetAtom } from 'jotai'
import { Clock, Loader2, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'

const MyFeed = () => {
    const openToast = useSetAtom(openToastAtom)
    const [recommendedBlogs, setRecomendedBlogs] = useAtom(recomendedBlogsAtom);
    const [adminBlogs, setAdminBlogs] = useAtom(topstoriesAtom);
    //   const [topStories, setTopStories] = useAtom(topstoriesAtom);
    const [trendingBlogs, setTrendingBlogs] = useAtom(trendingBlogsAtom);
    const [logedInUser] = useAtom(userAtom);
    const { isPending: isBlogsPending, mutateAsync: getBlogs } = useGetTopStoriesMutation();
    const { isPending: isTrendingBlogsPending, mutateAsync: getTrendingBlogs } = useGetTrendingBlogsMutation();
    const { isPending: isRecomendedBlogsPending, mutateAsync: getRecomendedBlogs } = useGetRecomendedBlogsMutation();

    const fetchBlogs = () => {
        getBlogs(
            undefined,
            {
                onSuccess: (data) => {
                    setAdminBlogs(data.result)
                },
                onError: (err: Error) => {
                    console.log("erro is :", err.message);
                    openToast({ type: "error", message: err.message || "Failed To Fetch Blogs" })
                }
            },
        );
    }

    const fetchTrendingBlogs = () => {
        getTrendingBlogs(
            undefined,
            {
                onSuccess: (data) => {
                    setTrendingBlogs(data.result)
                },
                onError: (err: Error) => {
                    console.log("erro is :", err.message);
                    openToast({ type: "error", message: err.message || "Failed To Fetch Trending Blogs" })
                }
            },
        );
    }

    const fetchRecomendedBlogs = () => {
        getRecomendedBlogs(
            undefined,
            {
                onSuccess: (data) => {
                    setRecomendedBlogs(data.result)
                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To Fetch Recomended Blogs" })
                }
            },
        );
    }


    const fetchData = async () => {
        await Promise.all([
            fetchBlogs(),
            fetchTrendingBlogs(),
            fetchRecomendedBlogs()
        ]);
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Main Feed Column */}
            <div className="lg:col-span-8 space-y-12">

                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                        Welcome back, {logedInUser?.userName}
                    </h1>
                    <p className="text-gray-800 text-lg mb-8">
                        Here is what we have picked for you today.
                    </p>

                    <div className="flex items-center space-x-2 mb-6 pb-2 border-b border-gray-300">
                        <Sparkles className="w-5 h-5 text-blue-500" />
                        <h2 className="text-xl font-bold">Your Feed</h2>
                    </div>

                    {
                        isRecomendedBlogsPending ? (
                            <div className="py-12 flex justify-center"><SmallComponentSpinner /></div>
                        ) :
                            recommendedBlogs.length > 0 ? (
                                <div className="space-y-8">
                                    {
                                        recommendedBlogs.map((blog, index) => (
                                            <BlogCard key={index} blog={blog} />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="bg-white p-8 rounded-2xl border border-gray-300 text-center">
                                    <p className="text-gray-800 mb-4">Your feed is empty. Follow some categories or authors!</p>
                                    <Link href="/" className="text-blue-600 font-medium hover:underline">Explore blogs</Link>
                                </div>
                            )}
                </div>

                <div>
                    <div className="flex items-center space-x-2 mb-6 pb-2 border-b border-gray-300">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <h2 className="text-xl font-bold">Your Top Stories</h2>
                    </div>

                    {
                        isBlogsPending ? (
                            <div className="py-12 flex justify-center"><SmallComponentSpinner /></div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {
                                    adminBlogs.map((blog, index) => (
                                        <BlogCard key={index} blog={blog} />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-10">

                <div className="sticky top-24">
                    <div className="bg-white rounded-2xl p-6 border border-gray-300/50 shadow-sm">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold font-serif">Trending Now</h3>
                        </div>

                        {
                            isTrendingBlogsPending ? (
                                <div className="py-8 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
                            ) :
                                (
                                    <div className="space-y-6">
                                        {trendingBlogs.map((blog, idx) => (
                                            <Link key={blog._id} href={`/blog-details/${blog._id}`} className="group flex items-start space-x-4">
                                                <span className="text-3xl font-serif font-black text-gray-200 group-hover:text-blue-100 transition-colors">
                                                    0{idx + 1}
                                                </span>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                                        {blog.title}
                                                    </h4>
                                                    <div className="flex flex-wrap items-center text-xs text-gray-800 gap-x-2">
                                                        <span>{blog.author.userName}</span>
                                                        <span>•</span>
                                                        <span>{blog.viewCount} views</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                        {/* <button className="w-full mt-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                            See full trending list
                        </button> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyFeed