import { updatePersonalFeed } from "@/helpers/personalFeed";
import BlogModel from "@/schema/BlogSchema";
import InteractionModel from "@/schema/InteractionSchema";
import { databaseConnection } from "@/utils/db";
import { getLoggedInUser } from "@/utils/jwtVerification";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { blogId, category } = await req.json();
        const logedUser = await getLoggedInUser()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        await databaseConnection()

        const existing = await InteractionModel.findOne({
            userId: logedUser.id,
            blogId,
            type: 'LIKE'
        })

        let likedBlog: { blogId: string, count: number } | null = null

        if (existing) { 
            // UNLIKE
            await Promise.all([
                InteractionModel.deleteOne({ _id: existing._id }),
                BlogModel.findByIdAndUpdate(
                    blogId,
                    { $inc: { likeCount: -1 } }
                )
            ])

            await updatePersonalFeed(logedUser.id, category, -2);

            likedBlog = { blogId, count: -1 }
        } else {
            // LIKE
            await Promise.all([
                InteractionModel.create({
                    blogId: blogId,
                    userId: logedUser?.id,
                    type: "LIKE"
                }),

                BlogModel.findByIdAndUpdate(
                    blogId,
                    { $inc: { likeCount: 1 } }
                )

            ])
            await updatePersonalFeed(logedUser.id, category, 2);

            likedBlog = { blogId, count: 1 }

        }

        return NextResponse.json({ message: "Like Added SuccessFully!! ", success: true, result: likedBlog }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to Add Like", success: false, error: message }, { status: 500 })
    }
}