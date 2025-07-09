"use client"

import { PageSpinner } from "@/component/Loaders"
import UseBlogData from "@/hooks/useBlogData"
import { format } from "date-fns"
// import { all } from "axios"
import { useEffect } from "react"

const BlogList = () => {
    const { adminBlogs, fetchAdminBlogs, getDeleteBlog, loading } = UseBlogData()

    useEffect(() => {
        fetchAdminBlogs()
    }, [])

    return (
        <div className="p-4 sm:w-[100%] w-[80%]">
            <h3 className="font-bold text-xl mb-4 text-start ">Your Blogs</h3>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md flex-1">
                {
                    loading['getAdminBlogs']
                        ? (<div className="flex flex-1  justify-center items-center sm:grid-cols-2 gap-8 mt-10 px-6 pb-20  w-full">
                            <PageSpinner />
                        </div>)
                        : (<table className="min-w-full table-auto ">
                            <thead className="bg-gray-200  text-gray-700 text-sm">
                                <tr className="text-left">
                                    <th className="p-4 whitespace-nowrap">AUTHOR NAME</th>
                                    <th className="p-4 whitespace-nowrap">BLOG TITLE</th>
                                    <th className="p-4">DATE</th>
                                    <th className="p-4 text-center">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-800">
                                {
                                    adminBlogs.map((blog) => (
                                        <tr className=" hover:bg-gray-50 text-left" key={blog._id}>
                                            <td className="p-4 flex items-center gap-3 whitespace-nowrap">
                                                <span>{blog.author.userName}</span>
                                            </td>
                                            <td className="p-4 flex-1">{blog.title}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                {
                                                    format(new Date(blog.date), 'dd MMM yyyy')
                                                }
                                            </td>
                                            <td className="p-4 cursor-pointer text-red-600 font-bold text-center" onClick={() => getDeleteBlog(blog._id)}>
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

export default BlogList