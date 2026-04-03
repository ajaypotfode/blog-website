import BlogModel from "@/schema/BlogSchema"
import { databaseConnection } from "@/utils/db"
import { getLoggedInUser } from "@/utils/jwtVerification"
import { Types } from "mongoose"
import { NextRequest, NextResponse } from "next/server"
import "@/schema/UserSchema";

export const GET = async (req: NextRequest) => {
    const lastId = req.nextUrl.searchParams.get('lastId');
    const limit = 10;

    try {

        const logedUser = await getLoggedInUser()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }
        await databaseConnection();

        let totalBlogs: null | number = null

        if (!lastId) {
            totalBlogs = await BlogModel.countDocuments({ author: logedUser.id })
        }

        const blogs = await BlogModel.find({
            author: logedUser.id,
            ...(lastId && { _id: { $lt: new Types.ObjectId(lastId) } })
        })
            .sort({ _id: -1 })
            .limit(limit)
            .populate("author", "userName image")


        return NextResponse.json({
            message: "All Blogs Fetched SuccessFully!!",
            success: true,
            result: blogs,
            ...(totalBlogs !== null && { total: totalBlogs })
        })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}


// Add Blog Api
export const POST = async (req: Request) => {
    try {

        const logedUser = await getLoggedInUser()
        const { image, title, category, description, content } = await req.json()
        await databaseConnection()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        const newBlog = new BlogModel({
            title,
            image,
            category,
            description,
            content,
            author: logedUser?.id,
        })

        await newBlog.save()

        const response = await newBlog.populate("author", "userName")


        // Commented this functionality cause when generating the live project link, as Resend could restrict sending
        //  emails to addresses that are not registered or if not Having verified domain email.


        // const subscribers = await SubscriberModel.find({ autherId: response.author?._id?.toString() })

        // if (subscribers.length > 0) {
        //     await Promise.all(subscribers.map((subscriber) => {
        //         // if (typeof response.author === ) {
        //         sendNotification(
        //             subscriber.email,
        //             response.title,
        //             response._id?.toString(),
        //             (response.author as User)?.userName || "Unknown Author"
        //         )
        //         // }
        //     }))
        // }


        return NextResponse.json({ message: "blog Created SuccessFully!! ", success: true, result: response }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to Add Blogs", success: false, error: message }, { status: 500 })
    }
}

// Delete Blog Api
export const DELETE = async (req: NextRequest) => {
    try {

        const blogId = req.nextUrl.searchParams.get('blogId')
        const logedUser = await getLoggedInUser()

        await databaseConnection();

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!", success: false }, { status: 401 })
        }

        const deleteBlog = await BlogModel.findByIdAndDelete({ _id: blogId, author: logedUser.id }).populate('author', "userName")
        // const result = await deleteBlog?.populate('author', "userName")

        if (!deleteBlog) {
            return NextResponse.json({ message: "Blog Not Found!", success: false }, { status: 200 })
        }

        return NextResponse.json({ message: "blog Deleted SuccessFully!", success: true, result: deleteBlog }, { status: 200 })


    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to delete Blogs", success: false, error: message }, { status: 500 })
    }
}