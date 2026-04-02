"use client"

import { blogsAtom, totalAdminBlogsAtom } from "@/atom/adminBlogAtom"
import { openConfirmModalAtom } from "@/atom/confirmationAtom"
import { openToastAtom } from "@/atom/toastAtom"
import Avatar from "@/component/Avatar"
import { SmallComponentSpinner } from "@/component/Loaders"
import { useDeleteBlogMutation, useGetBlogsMutation } from "@/mutation/adminBlogMutation"
import { format } from "date-fns"
// import { format } from "date-fns"
import { useAtom, useSetAtom } from "jotai"
import { BookOpen, Eye, Heart, Loader2, PenSquare, Trash2 } from "lucide-react"
import Link from "next/link"
// import { all } from "axios"
import { useEffect, useState } from "react"

const BlogList = () => {
    const openToast = useSetAtom(openToastAtom);
    const confirmModal = useSetAtom(openConfirmModalAtom);
    const [adminBlogs, setAdminBlogs] = useAtom(blogsAtom);
    const [totalBlogs, setTotalBlogs] = useAtom(totalAdminBlogsAtom);
    const [isfetchingMore, setIsFetchingMore] = useState(false);
    const { isPending: isBlogsPending, mutate: getBlogs } = useGetBlogsMutation();
    const { isPending: isDeleteBlogPending, mutate: deleteBlog, variables } = useDeleteBlogMutation();

    const fetchBlogs = (lastId?: string) => {
        if (lastId) setIsFetchingMore(true)
        getBlogs(
            lastId,
            {
                onSuccess: (data) => {
                    if (data.total) {
                        setTotalBlogs(data.total ?? 0);
                        setAdminBlogs(data.result);
                    } else {
                        setAdminBlogs([...adminBlogs, ...data.result]);
                        setIsFetchingMore(false)
                    }
                },
                onError: (err: Error) => {
                    setIsFetchingMore(false)
                    openToast({ type: "error", message: err.message || "Failed To Fetch Blogs" })
                }
            },
        );
    }



    const handleDeleteBlog = async (blogId: string) => {

        const response = await confirmModal({
            message: "Do you Want to Delete This story ",
            title: "Remove Blog"
        })

        if (!response) return

        deleteBlog(
            blogId,
            {
                onSuccess: (data) => {
                    //    const filteredBlog=
                    const filterBlog = adminBlogs.filter(blog => blog._id !== data.result?._id)
                    setAdminBlogs(filterBlog);
                    setTotalBlogs(totalBlogs - 1)
                    openToast({ type: "success", message: "Blog Deleted Successfully!!" })

                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To Delete Blog" })
                }
            },
        );
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary">My Stories</h1>
                        <p className="text-gray-800 mt-1">
                            {(isBlogsPending && !isfetchingMore) ? 'Loading...' : `${totalBlogs ?? 0} published ${totalBlogs === 1 ? 'story' : 'stories'}`}
                        </p>
                    </div>
                    <Link href="/admin/add-blog">
                        <button className="rounded-full flex items-center space-x-2">
                            <PenSquare className="w-4 h-4" />
                            <span>Write New</span>
                        </button>
                    </Link>
                </div>

                {(isBlogsPending && !isfetchingMore) ? (
                    <div className="flex justify-center py-20">
                        <SmallComponentSpinner />
                    </div>
                ) : adminBlogs.length === 0 ? (
                    <div className="text-center py-20">
                        <BookOpen className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-primary mb-2">No stories yet</h3>
                        <p className="text-gray-800 mb-6">You have not published any stories yet. Start writing!</p>
                        <Link href="/admin/add-blog">
                            <button className="rounded-full">Write Your First Story</button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {adminBlogs.map(blog => (
                            <div
                                key={blog._id}
                                className="bg-white rounded-2xl border border-gay-300/50 hover:shadow-sm transition-shadow overflow-hidden"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 p-4 sm:p-6">

                                    {blog.image && (
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-36 rounded-xl object-cover mb-3 sm:w-20 sm:h-16 sm:rounded-lg sm:mb-0 sm:mt-0.5 "
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                                {blog.category}
                                            </span>
                                            <span className="text-xs text-gray-800">
                                                {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                                            </span>
                                        </div>

                                        <Link href={`/blog-details/${blog._id}`}>
                                            <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 text-sm sm:text-base leading-snug">
                                                {blog.title}
                                            </h3>
                                        </Link>

                                        <p className="text-xs sm:text-sm text-gray-800 line-clamp-2 mt-1 leading-relaxed">
                                            {blog.description}
                                        </p>
                                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2">
                                            <div className="flex items-center gap-1.5">
                                                <Avatar src={blog.author.image ?? ""} fallback={blog.author.userName} className='h-8 w-8 text-xs' />
                                                {/* <span className="text-xs text-gray-800 truncate max-w-[120px]">{blog.blogId?.author?.userName}</span> */}
                                            </div>
                                            <span className="flex items-center gap-1 text-xs text-gray-800">
                                                <Eye className="w-3.5 h-3.5 flex-shrink-0" /><span>{blog.viewCount}</span>
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-800">
                                                <Heart className="w-3.5 h-3.5 flex-shrink-0" /><span>{blog.likeCount}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-300/40 px-4 py-2.5 flex flex-col gap-2 bg-gray-50/60 sm:flex-row sm:justify-between sm:items-center sm:px-6 sm:py-3 sm:bg-transparent">
                                    <Link
                                        href={`/blog-details/${blog._id}`}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors sm:hidden"
                                    >
                                        Read story →
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteBlog(blog._id)}
                                        disabled={(variables === blog._id && isDeleteBlogPending)}
                                        className=" flex items-center gap-1.5 rounded-full font-medium text-red-600 
                                                                          border border-red-200 hover:bg-red-50 transition-colors px-3 py-1.5 text-xs self-end
                                                                          sm:px-4 sm:text-sm sm:self-auto" >
                                        {(variables === blog._id && isDeleteBlogPending)
                                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> :
                                            <Trash2 className="w-3.5 h-3.5" />
                                        }
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {(totalBlogs !== adminBlogs.length) && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => fetchBlogs(adminBlogs[adminBlogs.length - 1]._id)}
                                    disabled={isfetchingMore}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium 
                            text-gray-800 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                >
                                    {isfetchingMore ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" />Loading...</>
                                    ) : (
                                        "View more"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </>
    )
}

export default BlogList