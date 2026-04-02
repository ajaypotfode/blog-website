import { BlogResult } from '@/types/BlogTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'
import { format } from 'date-fns'
// import parse from 'html-react-parser'

interface CardProps {
    blog: BlogResult
}


const BlogCard: React.FC<CardProps> = ({ blog }) => {
    return (
        <>
            <div className="max-w-5xl min-w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1">
                <div className="group relative overflow-hidden rounded-xl bg-gray-200 w-full aspect-[16/10]">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        quality={100}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 text-sm px-3 py-1 rounded-full font-medium">
                        {blog.category}
                    </span>
                </div>
                <div className="p-8 flex flex-col justify-between">

                    <div className='text-start'>
                        <p className="text-sm text-gray-500 mb-2">
                            {format(new Date(blog.createdAt), 'MMM d, yyyy')} • {blog.viewCount} views
                        </p>

                        <h2 className="text-xl text-start font-bold leading-snug mb-4 title-truncate  ">
                            {blog.title}
                        </h2>
                        {/* <p className="text-gray-600 text-sm multi-line-truncate blog-description "> */}
                        <p
                            className='text-gray-600 text-sm multi-line-truncate blog-description'
                            dangerouslySetInnerHTML={{
                                __html: blog?.description ?? ''
                            }} />
                        {/* </p> */}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-t-gray-300/50 mt-6">
                        <div className="flex items-center gap-3">
                            {/* <img
                                src="/avatar.jpg"
                                className="w-8 h-8 rounded-full"
                                alt="author"
                            /> */}
                            <Avatar src={blog.author.image} fallback={blog.author.userName} className={"h-8 w-8 text-xs"} />
                            <span className="text-gray-700 font-medium">
                                {blog.author.userName}
                            </span>
                        </div>

                        <button className="text-blue-600 font-medium flex items-center ">
                            <Link href={`/blog-details/${blog._id}`}>Read More</Link>
                            <i className="bi bi-arrow-right text-2xl ml-2 "></i>
                        </button>
                    </div>

                </div>
            </div>

            {/* <div key={idx} className="relative group border xl:w-[23%] lg:w-[30%] md:w-[40%] sm:[50%] mobile:w-full w-[90%]  shadow-effect-on mobile:h-[450px] h-[400px] overflow-hidden flex flex-col " >
                 <Image className='w-full   mobile:h-52 h-44 object-cover' src={blog.image} height={120} width={120} quality={100} alt={post.title} />
                 <div className="w-fit bg-black text-white sm:text-lg mobile:text-md text-sm mobile:px-3 px-2 py-1 mt-2 ml-3">
                     {post.category}
                 </div>
                 <div className="text-start mt-2 h-[180px] p-4 ">
                     <h2 className="md:text-2xl text-xl font-bold title-truncate">{post.title}</h2>
                     <div className="text-sm text-black multi-line-truncate blog-description">
                         {parse(post.description)}
                     </div>
                 </div>
                 <div className="mt-auto pt-2 text-start cursor-pointer absolute left-2 bottom-2 flex items-center gap-2">
                     <Link href={`/blog-details/${post._id}`}>Read More</Link>
                     <i className="bi bi-arrow-right text-2xl ml-2 "></i>
                 </div>
             </div> */}
        </>
    )
}

export default BlogCard