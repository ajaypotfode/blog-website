import SavedBlogModel from "@/schema/SavedSchema"
import { databaseConnection } from "@/utils/db"
import { getLoggedInUser } from "@/utils/jwtVerification"
import { Types } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    const lastId = req.nextUrl.searchParams.get('lastId');
    const limit = 10;

    try {
        const logedUser = await getLoggedInUser()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }
        await databaseConnection();

        let totalSavedBlogs: null | number = null

        if (!lastId) {
            totalSavedBlogs = await SavedBlogModel.countDocuments({ autherId: logedUser.id })
        }


        const blogs = await SavedBlogModel.find({
            autherId: logedUser.id,
            ...(lastId && { _id: { $lt: new Types.ObjectId(lastId) } })
        })
            .sort({ _id: -1 })
            .limit(limit)
            .populate({
                path: 'blogId',
                select: "title description category author image content viewCount likeCount createdAt",
                populate: {
                    path: 'author',
                    select: "userName image"
                }
            })
            .lean()


        return NextResponse.json({
            message: "All saved Blogs Fetched SuccessFully!!",
            success: true,
            result: blogs,
            ...(totalSavedBlogs !== null && { total: totalSavedBlogs })
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
        const { blogId } = await req.json()
        await databaseConnection()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        const isAlreadySaved = await SavedBlogModel.findOne({ blogId, autherId: logedUser.id });



        if (isAlreadySaved) {
            return NextResponse.json({ message: "You Already Saved Blog!! ", success: false }, { status: 200 })
        }

        const newBlog = new SavedBlogModel({
            blogId,
            autherId: logedUser.id
        })

        await newBlog.save()

        return NextResponse.json({ message: "blog Saved SuccessFully!! ", success: true }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to Save Blogs", success: false, error: message }, { status: 500 })
    }
}

// Delete Blog Api
export const DELETE = async (req: NextRequest) => {
    try {

        // const { savedId } = await req.json();
        const savedId = req.nextUrl.searchParams.get('savedId')
        const logedUser = await getLoggedInUser()

        await databaseConnection();

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!", success: false }, { status: 401 })
        }

        const deleteBlog = await SavedBlogModel.findByIdAndDelete({ _id: savedId })
        // const result = await deleteBlog?.populate('author', "userName")

        if (!deleteBlog) {
            return NextResponse.json({ message: "Blog Not Found!", success: false }, { status: 404 })
        }

        return NextResponse.json({ message: "Removed From Saved SuccessFully!", success: true, result: deleteBlog }, { status: 200 })


    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to Removed from Saved", success: false, error: message }, { status: 500 })
    }
}