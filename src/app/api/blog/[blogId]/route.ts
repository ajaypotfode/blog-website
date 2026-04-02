import { updatePersonalFeed } from "@/helpers/personalFeed";
import BlogModel from "@/schema/BlogSchema";
// import CommentModel from "@/schema/CommentSchema";
import InteractionModel from "@/schema/InteractionSchema";
// import { Params } from "@/types/BlogTypes";
import { databaseConnection } from "@/utils/db";
import { getLoggedInUser } from "@/utils/jwtVerification";
import { NextRequest, NextResponse } from "next/server";
import "@/schema/UserSchema";
import SubscriberModel from "@/schema/SubscriberSchema";


// Get Blog Details Api
export const GET = async (req: NextRequest, { params }: { params: Promise<{ blogId: string }> }) => {
    try {
        const { blogId } = await params
        const sessionId = req.nextUrl.searchParams.get("sessionId") || null;
        const logedUser = await getLoggedInUser();
        await databaseConnection()

        const blog = await BlogModel.findById(blogId).populate('author', "userName image").lean()

        if (!blog) {
            return NextResponse.json({ message: "Blog Not Available!!", success: false }, { status: 404 })
        }

        const isSubscribed = await SubscriberModel.exists({ autherId: blog.author._id, userId: logedUser?.id });
        const isLiked = await InteractionModel.exists({ blogId: blog._id, userId: logedUser?.id, type: 'LIKE' })

        // const comments = await CommentModel.find({ blogId: blog._id })
        //     .sort({ createdAt: -1 })
        //     .populate("userId", "createdAt userName image");

        const lastHour = new Date(Date.now() - 60 * 60 * 1000);

        const existingView = await InteractionModel.findOne({
            blogId: blog._id,
            $or: [
                { userId: logedUser?.id },
                { sessionId: sessionId }

            ],
            type: "VIEW",
            createdAt: { $gte: lastHour }
        });

        // console.log("is Existing View :", existingView);


        if (!existingView) {

            await Promise.all([
                InteractionModel.create({
                    blogId: blog._id,
                    sessionId,
                    userId: logedUser?.id,
                    type: "VIEW"
                }),
                BlogModel.findByIdAndUpdate(blog._id, {
                    $inc: { viewCount: 1 }
                })
                //     )
            ])

            if (logedUser?.id) await updatePersonalFeed(logedUser.id, blog.category, 0.5)
        }

        // const blogObj = blog.toObject();

        const result = {
            ...blog,
            subscribed: !!isSubscribed,
            liked: !!isLiked
        }


        return NextResponse.json({ message: "successFully Fetched Blog", success: true, result: result }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
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