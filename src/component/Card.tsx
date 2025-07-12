import { BlogResult } from '@/types/BlogTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import parse from 'html-react-parser'

interface CardProps {
    blogs: BlogResult[]
}


const Card: React.FC<CardProps> = ({ blogs }) => {
    return (
        blogs && blogs.map((post: BlogResult, idx: number) => (
            <div key={idx} className="relative group border xl:w-[23%] lg:w-[30%] md:w-[40%] sm:[50%] mobile:w-full w-[90%]  shadow-effect-on mobile:h-[450px] h-[400px] overflow-hidden flex flex-col " >
                <Image className='w-full   mobile:h-52 h-44 object-cover' src={post.image} height='52' width='100' alt={post.title} />
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
            </div>

        ))
    )
}

export default Card