import { updatePersonalFeed } from "@/helpers/personalFeed";
import CommentModel from "@/schema/CommentSchema";
import { databaseConnection } from "@/utils/db";
import { getLoggedInUser } from "@/utils/jwtVerification";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import "@/schema/UserSchema";

export const POST = async (req: NextRequest) => {
    try {
        const { comment, blogId, category } = await req.json();
        const logedUser = await getLoggedInUser()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        await databaseConnection()

        // const date = new Date().toISOString().split('T')[0];
        const commentData = new CommentModel({
            userId: logedUser.id,
            blogId,
            comment
        })
        await commentData.save();
        const response = await commentData.populate("userId", "createdAt userName image");

        await updatePersonalFeed(logedUser.id, category, 4)
        return NextResponse.json({ message: "Comment Added SuccessFully!! ", success: true, result: response }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to Add Comment", success: false, error: message }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {
    const blogId = req.nextUrl.searchParams.get("blogId");
    const lastId = req.nextUrl.searchParams.get('lastId');
    const limit = 10;
    const logedUser = await getLoggedInUser();

    await databaseConnection()

    if (!logedUser) {
        return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
    }
    try {
        await databaseConnection()

        let totalComments: null | number = null

        if (!lastId) {
            totalComments = await CommentModel.countDocuments({ blogId })
        }

        const comments = await CommentModel.find({
            blogId,
            ...(lastId && { _id: { $lt: new Types.ObjectId(lastId) } })
        })
            .sort({ _id: -1 })
            .limit(limit)
            .populate("userId", "createdAt userName image");

        return NextResponse.json({
            message: "Comments Fetch SuccessFully!!",
            success: true,
            result: comments,
            ...(totalComments !== null && { total: totalComments })
        })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Comments", success: false, error: message }, { status: 500 })
    }
}