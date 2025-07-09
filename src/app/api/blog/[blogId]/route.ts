import BlogModel from "@/model/blogSchema";
// import { Params } from "@/types/BlogTypes";
import { databaseConnection } from "@/utils/db";
import { getLoggedInUser } from "@/utils/jwtVerification";
import { NextRequest, NextResponse } from "next/server";


// Get Blog Details Api
export const GET = async (req: NextRequest, { params }: { params: Promise<{ blogId: string }> }) => {
    try {
        const { blogId } = await params
        await databaseConnection()

        const blog = await BlogModel.findById({ _id: blogId }).populate('author', "userName")

        if (!blog) {
            return NextResponse.json({ message: "Blog Not Available!!", success: false }, { status: 404 })
        }

        return NextResponse.json({ message: "successFully Fetched Blog", success: true, result: blog }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}



// Delete Blog Api
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ blogId: string }> }) => {
    try {

        const { blogId } = await params
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


// update Blog Api
export const POST = async (req: Request, { params }: { params: Promise<{ blogId: string }> }) => {
    try {
        const { blogId } = await params
        const logedUser = await getLoggedInUser()
        const { image, title, category, description } = await req.json()

        await databaseConnection()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        // const date = new Date().toISOString().split('T')[0];
        const updateBlog = await BlogModel.findOneAndUpdate(
            { _id: blogId, author: logedUser.id },
            {
                title,
                image,
                category,
                description,
            },
            { new: true }
        ).populate("author", "userName")

        if (!updateBlog) {
            return NextResponse.json({ message: "Blog Not Found!", success: false }, { status: 200 })
        }

        // const response = await update.populate("author", "userName")

        return NextResponse.json({ message: "blog updated SuccessFully!! ", success: true, result: updateBlog }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}