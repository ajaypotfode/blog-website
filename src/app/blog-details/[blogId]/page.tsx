// import React from 'react'
"use client"
import Image from "next/image"
import { use, useEffect, useState } from "react"
import { SmallComponentSpinner } from "@/component/Loaders"
import Link from "next/link"
import { useAtom, useSetAtom } from "jotai"
import { blogAtom, commentDataAtom, commentsAtom, totalCommentsAtom } from "@/atom/blogsAtom"
import { useCommentBlogMutation, useGetBlogByIdMutation, useGetCommentMutation, useLikeBlogMutation } from "@/mutation/blogMutation"
import { Bookmark, Heart, Loader2, MessageCircle, Send, UserCheck, UserPlus } from "lucide-react"
import { format } from "date-fns"
import { isLoggedinAtom, userAtom } from "@/atom/userAtom"
import { useSubscribeMutation } from "@/mutation/subsciber"
import { useSaveBlogMutation } from "@/mutation/adminBlogMutation"
import Avatar from "@/component/Avatar"
import { openToastAtom } from "@/atom/toastAtom"
import { List, useDynamicRowHeight } from "react-window"


const Blog = ({ params }: { params: Promise<{ blogId: string }> }) => {
    const [blogData, setBlogData] = useAtom(blogAtom);
    const openToast = useSetAtom(openToastAtom);
    //  const confirmModal
    const [comments, setComments] = useAtom(commentsAtom);
    const [commentData, setCommentData] = useAtom(commentDataAtom);
    const [totalComments, setTotalComments] = useAtom(totalCommentsAtom);
    const [isfetchingMore, setIsFetchingMore] = useState(false);
    const [isLoggedIn] = useAtom(isLoggedinAtom);
    const [loggedinUser] = useAtom(userAtom)
    const { isPending: isBlogPending, mutate: fetchBlogData, isError } = useGetBlogByIdMutation();
    const { isPending: isLikePending, mutate: likeBlog } = useLikeBlogMutation();
    const { isPending: isCommentPending, mutate: addComment } = useCommentBlogMutation();
    const { isPending: isSubscribePending, mutate: subscribe } = useSubscribeMutation();
    const { isPending: isSavePending, mutate: saveBlog } = useSaveBlogMutation();
    const { isPending: isCommentsPending, mutate: fetchComments } = useGetCommentMutation();
    const { blogId } = use(params);

    // this is to give dynamic hieght to List Rows
    const rowHeight = useDynamicRowHeight({
        defaultRowHeight: 50
    });


    const getBlog = () => {
        const payload = {
            blogId: blogId
        }
        fetchBlogData(
            payload,
            {
                onSuccess: (data) => {
                    setBlogData(data.result);
                    // setComments(data.comments)
                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To Fetch Blog" })
                }
            },

        )
    }


    const getComments = (lastId?: string) => {
        const payload = {
            blogId: blogId,
            lastId
        }
        if (lastId) setIsFetchingMore(true);
        fetchComments(
            payload,
            {
                onSuccess: (data) => {

                    if (data.total) {
                        setTotalComments(data.total);
                        setComments(data.result);
                    } else {
                        setComments([...comments, ...data.result]);
                        setIsFetchingMore(false);
                    }
                },
                onError: (err: Error) => {
                    setIsFetchingMore(false)
                    openToast({ type: "error", message: err.message || "Failed To Fetch Comments" })
                }
            },

        )
    }


    useEffect(() => {
        getBlog();
    }, []);

    // this made cuase of Hydration Issue 
    useEffect(() => {
        if (isLoggedIn) getComments();
    }, [isLoggedIn]);


    const submitComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!isLoggedIn) return openToast({ type: "info", message: "Sign in first" });
        if (isCommentPending || commentData.comment.trim() === '') return;

        const payload = {
            comment: commentData.comment,
            category: commentData.category,
            blogId
        }

        addComment(
            payload,
            {
                onSuccess: (data) => {
                    // setBlogData(data.result);
                    setCommentData({ comment: '', category: '' })
                    setComments(prev => [data.result, ...prev]);
                    setTotalComments(totalComments + 1)
                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To Add comment" })
                }
            },

        )

    }


    const addLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!blogData?.category || !isLoggedIn || isLikePending) return;

        const prevData = blogData;

        setBlogData({
            ...blogData,
            liked: blogData.liked ? false : true,
            likeCount: blogData.liked ? blogData.likeCount - 1 : blogData.likeCount + 1
        })

        const payload = {
            category: blogData!.category,
            blogId
        }

        likeBlog(
            payload,
            {
                onSuccess: () => {
                    // setBlogData(data.result);
                    // const likeCount=
                    // setComments(prev => [data.result, ...prev]);
                },
                onError: (err: Error) => {
                    setBlogData(prevData)
                    openToast({ type: "error", message: err.message || "Failed To Like" })
                }
            },

        )

    }


    const addSubscriber = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!isLoggedIn) return openToast({ type: "info", message: "Sign in first" });
        if (isSubscribePending || !blogData?.author || blogData.subscribed) return;

        subscribe(
            blogData?.author._id,
            {
                onSuccess: () => {
                    setBlogData({ ...blogData, subscribed: true })
                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To Subscribe" })
                }
            },

        )

    }

    const handleBlogSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!isLoggedIn) return openToast({ type: "info", message: "Sign in first" });
        if (isSavePending) return;

        saveBlog(
            blogId,
            {
                onSuccess: () => {
                    openToast({ type: "success", message: "Blog Saved Successfully!!" })

                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To Save Blog" })
                }
            },

        )

    }


    return (
        <>
            {isBlogPending ?
                <div className="min-h-[70vh] flex items-center justify-center">
                    <SmallComponentSpinner />
                </div> :
                (
                    (blogData && !isError) ?
                        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-black ">

                            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-800 hover:text-gray-900 mb-8 group transition-colors">
                                {/* <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> */}
                                Back to feed
                            </Link>

                            <header className="mb-10">
                                <div className="flex items-center space-x-4 mb-6">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full uppercase tracking-wider">
                                        {blogData.category}
                                    </span>
                                    <span className="text-gray-800 text-sm">
                                        {format(new Date(blogData.createdAt), 'MMMM d, yyyy')}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary leading-tight mb-6">
                                    {blogData.title}
                                </h1>

                                <p className="text-xl text-gray-800 leading-relaxed mb-8 font-serif italic">
                                    {blogData.description}
                                </p>

                                <div className="flex items-center justify-between border-y border-gray-300/60 py-4">
                                    <div className="flex items-center space-x-4">
                                        <Avatar src={blogData.author.image} fallback={blogData.author.userName} className="h-12 w-12 text-base" />
                                        <div>
                                            <p className="font-bold text-gray-900">{blogData.author.userName}</p>
                                            <p className="text-sm text-gray-800">Author • {blogData.viewCount} reads</p>
                                        </div>
                                    </div>
                                    {
                                        (loggedinUser?._id !== blogData.author._id) &&
                                        (isSubscribePending
                                            ? <SmallComponentSpinner />
                                            : <button
                                                onClick={addSubscriber}
                                                className={`flex items-center space-x-2 px-5 py-2 rounded-full text-sm font-medium border transition-all
                                                 ${blogData.subscribed
                                                        ? 'bg-black text-white border-black hover:bg-primary/90 cursor-not-allowed '
                                                        : 'bg-white text-gray-900 border-gray-300 hover:border-black hover:text-primary cursor-pointer '
                                                    }`}
                                            >
                                                {blogData.subscribed
                                                    ? <><UserCheck className="w-4 h-4" /><span>Subscribed</span></>
                                                    : <><UserPlus className="w-4 h-4" /><span>Subscribe</span></>
                                                }
                                            </button>)
                                    }

                                </div>
                            </header>

                            <div className="flex items-center justify-between mb-10 py-2 sticky top-20 bg-gray-50/95 backdrop-blur z-30 -mx-4 px-4 sm:mx-0 sm:px-0">
                                <div className="flex items-center space-x-6">
                                    <button
                                        onClick={addLike}
                                        disabled={isLikePending}
                                        className={`flex items-center space-x-2 transition-colors group cursor-pointer ${blogData.liked ? 'text-rose-500' : 'text-gray-800 hover:text-rose-500'}`}
                                    >
                                        <Heart className={`w-5 h-5 transition-all duration-200 ${blogData.liked ? 'fill-rose-500 scale-110' : 'group-hover:scale-110'}`} />
                                        <span className="text-sm font-medium">
                                            {blogData.likeCount > 0 ? blogData.likeCount : 'Like'}

                                        </span>
                                    </button>
                                    <a href="#comments" className="flex items-center space-x-2 text-gray-800 hover:text-blue-500 transition-colors group">
                                        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium">
                                            {totalComments}
                                        </span>
                                    </a>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {
                                        (loggedinUser?._id !== blogData.author._id) &&
                                        (isSavePending ? <SmallComponentSpinner />
                                            : <button
                                                disabled={isSavePending}
                                                onClick={handleBlogSave}
                                                className="text-gray-800 hover:text-gray-900 transition-colors cursor-pointer ">
                                                <Bookmark className="w-5 h-5" />
                                            </button>)
                                    }
                                    {/* <button onClick={() => {
                                        navigator.clipboard?.writeText(window.location.href);
                                        //  toast({ title: "Link copied!" });
                                    }}
                                        className="text-gray-800 hover:text-gray-900 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button> */}
                                </div>
                            </div>

                            {blogData.image && (
                                <div className="group relative overflow-hidden rounded-xl bg-gray-200 w-full aspect-[16/10] mb-12 ">
                                    <Image
                                        src={blogData.image}
                                        alt={blogData.title}
                                        fill
                                        quality={100}
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                // <figure className="mb-12">
                                //     <img src={blogData.image} alt={blogData.title} className="w-full h-auto rounded-2xl shadow-md object-cover max-h-[500px]" />
                                // </figure>
                            )}

                            {/* Content */}
                            <div
                                className=" prose prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-gray-700 prose-p:leading-loose prose-a:text-blue-600 hover:prose-a:text-blue-500"
                                dangerouslySetInnerHTML={{ __html: blogData.content }}
                            />

                            {/* Tags */}
                            {/* <div className="mt-16 pt-8 border-t border-gray-300 flex flex-wrap gap-2">
                    {[blogData.category, 'Reading', 'Writing'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
                            {tag}
                        </span>
                    ))}
                </div> */}

                            {/* Comments Section */}
                            <section id="comments" className="mt-16 pt-10 border-t border-gray-300">
                                <h2 className="text-2xl font-bold text-primary mb-8 flex items-center space-x-2">
                                    <MessageCircle className="w-6 h-6" />
                                    <span>Comments
                                        ({totalComments})
                                    </span>
                                </h2>

                                {isLoggedIn ? (

                                    <div className="flex space-x-4 mb-10">
                                        {/* <Avatar src={?.avatar} fallback={user?.name || "You"} size="md" /> */}
                                        <div className="flex-1">
                                            <textarea
                                                value={commentData.comment}
                                                onChange={e => setCommentData({ comment: e.target.value, category: blogData.category })}
                                                placeholder="Share your thoughts..."
                                                rows={3}
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-300/30 bg-white transition-all"
                                            />
                                            <div className="flex justify-end mt-2">
                                                <button
                                                    onClick={submitComment}
                                                    disabled={!commentData.comment.trim() || isCommentPending}
                                                    className="flex items-center space-x-2 px-5 py-2 bg-black text-white rounded-full text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                                >
                                                    {isCommentPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                                    <span>Post</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-10 p-5 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                                        <p className="text-sm text-blue-700 font-medium">Sign in to join the conversation</p>
                                        <Link href="/login">
                                            <button>Sign in</button>
                                            {/* <Button size="sm" className="rounded-full">Sign In</Button> */}
                                        </Link>
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {
                                        (isCommentsPending && !isfetchingMore) ? <SmallComponentSpinner />
                                            : (comments.length === 0 ?
                                                <p className="text-center text-gray-800 py-8">No comments yet. Be the first to share your thoughts!</p>
                                                : (
                                                    <>
                                                        <List
                                                            className="max-h-[400px]! "
                                                            rowCount={comments.length}
                                                            rowHeight={rowHeight}
                                                            rowProps={{ comments }}
                                                            rowComponent={({ index, style, comments }) => {
                                                                const comment = comments[index];
                                                                return (
                                                                    <div key={index} className="flex  py-2 space-x-4" style={style}>
                                                                        <Avatar src={comment.userId.image} fallback={comment.userId.userName} className="h-8 w-8 text-xs" />
                                                                        <div className="flex-1 bg-white border border-gray-300/50 rounded-2xl px-5 py-4">
                                                                            <div className="flex items-center space-x-2 mb-2">
                                                                                <span className="text-sm font-semibold text-gray-900">
                                                                                    {comment.userId.userName}
                                                                                </span>
                                                                                <span className="text-xs text-gray-800">
                                                                                    {format(new Date(comment.createdAt), 'MMM d, yyyy · h:mm a')}
                                                                                </span>
                                                                            </div>
                                                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                                                {comment.comment}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            }
                                                        />
                                                        {/* {comments.map((comment, index) => (
                                                            <div key={index} className="flex space-x-4">
                                                                <Avatar src={comment.userId.image} fallback={comment.userId.userName} className="h-8 w-8 text-xs" />
                                                                <div className="flex-1 bg-white border border-gray-300/50 rounded-2xl px-5 py-4">
                                                                    <div className="flex items-center space-x-2 mb-2">
                                                                        <span className="text-sm font-semibold text-gray-900">
                                                                            {comment.userId.userName}
                                                                        </span>
                                                                        <span className="text-xs text-gray-800">
                                                                            {format(new Date(comment.createdAt), 'MMM d, yyyy · h:mm a')}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-700 leading-relaxed">
                                                                        {comment.comment}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))} */}
                                                        {(totalComments !== comments.length) && (
                                                            <div className="flex justify-center mt-8">
                                                                <button
                                                                    onClick={() => getComments(comments[comments.length - 1]._id)}
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
                                                        )}

                                                    </>
                                                )
                                            )}
                                </div>
                            </section>

                        </article>
                        : (<div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                            <h2 className="text-2xl font-bold text-primary mb-2">Blog not found</h2>
                            <p className="text-gray-800 mb-6">The story you are looking for does not exist or has been removed.</p>
                            <Link href="/">
                                {/* <Button>Return Home</Button>*/}
                            </Link>
                        </div>)
                )
            }
        </>
    )
}

export default Blog