"use client"
import { savedBlogsAtom, totalSavedBlogsAtom } from '@/atom/adminBlogAtom';
import { SmallComponentSpinner } from '@/component/Loaders';
import { useGetSavedBlogsMutation, useUnsaveBlogMutation } from '@/mutation/adminBlogMutation';
import { useAtom, useSetAtom } from 'jotai';
import { Bookmark, BookmarkX, Eye, Heart, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns';
import Avatar from '@/component/Avatar';
import { openToastAtom } from '@/atom/toastAtom';
import { openConfirmModalAtom } from '@/atom/confirmationAtom';
import { List, useDynamicRowHeight } from 'react-window';


const SavedBlogs = () => {
    const openToast = useSetAtom(openToastAtom);
    const confirmModal = useSetAtom(openConfirmModalAtom)
    const [savedBlogs, setSavedBlogs] = useAtom(savedBlogsAtom);
    const [totalSaved, setTotalSaved] = useAtom(totalSavedBlogsAtom);
    const [isfetchingMore, setIsFetchingMore] = useState(false);
    const { isPending: isSavedBlogsPending, mutate: getSavedBlogs } = useGetSavedBlogsMutation();
    const { isPending: isUnsavePending, mutate: unsaveBlog, variables } = useUnsaveBlogMutation();


    const rowHeight = useDynamicRowHeight({
        defaultRowHeight: 50
    });


    const fetchSavedBlogs = (lastId?: string) => {

        if (lastId) setIsFetchingMore(true)
        getSavedBlogs(
            lastId,
            {
                onSuccess: (data) => {
                    if (data.total) {
                        setTotalSaved(data.total)
                        setSavedBlogs(data.result);
                    } else {
                        setIsFetchingMore(false)
                        setSavedBlogs([...savedBlogs, ...data.result]);
                    }
                },
                onError: (err: Error) => {
                    setIsFetchingMore(false)
                    openToast({ type: "error", message: err.message || "Failed To Saved Blogs" })
                }
            },
        );
    }


    const handleUnsaveBlog = async (savedId: string) => {

        const response = await confirmModal({
            message: "Do you Want to Unsave This Blog",
            title: "Unsave Blog"
        })

        if (!response) return
        unsaveBlog(
            savedId,
            {
                onSuccess: (data) => {
                    const filteredBlogs = savedBlogs.filter(blog => blog._id !== data.result._id);
                    setSavedBlogs(filteredBlogs);
                    setTotalSaved(totalSaved - 1)
                    openToast({ type: "success", message: "Blog Removed Successfully!!" })

                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To Remove Blog" })
                }
            },
        );
    }

    useEffect(() => {
        fetchSavedBlogs();
    }, [])


    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
            <div className="mb-8 md:mb-10">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-primary flex items-center gap-3">
                    <Bookmark className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
                    <span>Saved Stories</span>
                </h1>
                <p className="text-gray-800 mt-1 text-sm sm:text-base">
                    {(isSavedBlogsPending && !isfetchingMore) ? 'Loading...' : `${totalSaved ?? 0} saved ${totalSaved === 1 ? 'story' : 'stories'}`}
                </p>
            </div>

            {(isSavedBlogsPending && !isfetchingMore) ? (
                <div className="flex justify-center py-20">
                    <SmallComponentSpinner />
                </div>
            ) : savedBlogs.length === 0 ? (
                <div className="text-center py-16 sm:py-20 px-4">
                    <Bookmark className="w-12 h-12 sm:w-14 sm:h-14 text-gray-800 mx-auto mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">No saved stories yet</h3>
                    <p className="text-sm text-gray-800 mb-6 max-w-xs mx-auto">
                        Bookmark stories you want to read later by clicking the bookmark icon on any post.
                    </p>
                    <Link href="/">
                        <button className="underline">Browse Stories</button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4">

                    <List
                        className="max-h-[80vh]! "
                        rowCount={savedBlogs.length}
                        rowHeight={rowHeight}
                        rowProps={{ savedBlogs }}
                        rowComponent={({ index, style, savedBlogs }) => {
                            const blog = savedBlogs[index];
                            return (
                                <div style={style} className='py-3!'>
                                    <div className="   bg-white rounded-2xl border border-gray-300/50 hover:shadow-sm transition-shadow overflow-hidden"   >
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 p-4 sm:p-6">

                                            {blog.blogId.image && (
                                                <img
                                                    src={blog.blogId.image}
                                                    alt={blog.blogId.title}
                                                    className="w-full h-36 rounded-xl object-cover mb-3 sm:w-20 sm:h-16 sm:rounded-lg sm:mb-0 sm:mt-0.5 "
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                                        {blog.blogId.category}
                                                    </span>
                                                    <span className="text-xs text-gray-800">
                                                        {format(new Date(blog.blogId.createdAt), 'MMM d, yyyy')}
                                                    </span>
                                                </div>

                                                <Link href={`/blog-details/${blog.blogId._id}`}>
                                                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 text-sm sm:text-base leading-snug">
                                                        {blog.blogId.title}
                                                    </h3>
                                                </Link>

                                                <p className="text-xs sm:text-sm text-gray-800 line-clamp-2 mt-1 leading-relaxed">
                                                    {blog.blogId.description}
                                                </p>
                                                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <Avatar src={blog.blogId?.author.image ?? ""} fallback={blog.blogId.author.userName} className='h-8 w-8 text-xs' />
                                                        {/* <span className="text-xs text-gray-800 truncate max-w-[120px]">{blog.blogId?.author?.userName}</span> */}
                                                    </div>
                                                    <span className="flex items-center gap-1 text-xs text-gray-800">
                                                        <Eye className="w-3.5 h-3.5 flex-shrink-0" /><span>{blog.blogId.viewCount}</span>
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs text-gray-800">
                                                        <Heart className="w-3.5 h-3.5 flex-shrink-0" /><span>{blog.blogId.likeCount}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-300/40 px-4 py-2.5 flex flex-col gap-2 bg-gray-50/60 sm:flex-row sm:justify-between sm:items-center sm:px-6 sm:py-3 sm:bg-transparent">
                                            <Link
                                                href={`/blog-details/${blog.blogId._id}`}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors sm:hidden"
                                            >
                                                Read story →
                                            </Link>
                                            <button
                                                onClick={() => handleUnsaveBlog(blog._id)}
                                                disabled={(variables === blog._id && isUnsavePending)}
                                                className="flex items-center gap-1.5 rounded-full font-medium text-amber-600 
                                              border border-amber-200 hover:bg-amber-50 transition-colors px-3 py-1.5 text-xs self-end
                                              sm:px-4 sm:text-sm sm:self-auto" >
                                                {(variables === blog._id && isUnsavePending) ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    : <BookmarkX className="w-3 h-3" />
                                                }
                                                <span>Unsave</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                    />

                    {(totalSaved !== savedBlogs.length) && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => fetchSavedBlogs(savedBlogs[savedBlogs.length - 1]._id)}
                                disabled={isfetchingMore}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50 transition-colors"
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

        </div >
    )
}

export default SavedBlogs