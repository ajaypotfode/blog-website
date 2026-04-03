import BlogModel from "@/schema/BlogSchema";
import { databaseConnection } from "@/utils/db";
import { getLoggedInUser } from "@/utils/jwtVerification";
import { NextResponse } from "next/server";
import "@/schema/UserSchema";

export const GET = async () => {
    // const category = req.nextUrl.searchParams.get("category");
    const limit = 5;
    const logedUser = await getLoggedInUser();

    await databaseConnection()

    if (!logedUser) {
        return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
    }
    try {
        await databaseConnection()

        const blogs = await BlogModel.find()
            .sort({ viewCount: -1, likeCount: -1, })
            .limit(limit)
            .populate("author", "userName image")

        // if (category) {
        //     blogs = blogs.filter(blog => blog.category === category)
        // }
        // else {
        //     blogs = await BlogModel.find({ category }).populate("author", "userName")
        // }

        return NextResponse.json({ message: "Tranding Blogs Fetched SuccessFully!!", success: true, result: blogs })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Tranding Blogs", success: false, error: message }, { status: 500 })
    }
}