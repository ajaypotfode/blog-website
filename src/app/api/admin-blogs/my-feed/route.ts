import BlogModel, { Blog } from "@/schema/BlogSchema"
import PersonalFeedModel from "@/schema/PersonalFeddSchema"
import { databaseConnection } from "@/utils/db"
import { getLoggedInUser } from "@/utils/jwtVerification"
import { NextResponse } from "next/server"

export const GET = async () => {
    const requiredLimit = 10;

    try {

        const logedUser = await getLoggedInUser()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        await databaseConnection();
        // this is use to get Top Categories based on Likes, comments and View interest
        const personalFeed = await PersonalFeedModel.findOne({ userId: logedUser.id });
        const topCategories = personalFeed?.tags.sort((a, b) => b.score - a.score).slice(0, 4);
        const totalScore = topCategories?.reduce((sum, t) => sum + t.score, 0);

        let blogs: Blog[] = []

        if (topCategories?.length !== 0 && totalScore) {

            const promises = topCategories?.map((cat) => {
                const limit = Math.round(Math.max(1, (cat.score / totalScore) * requiredLimit));

                return BlogModel.find({
                    category: cat.tag
                }).sort({ createdAt: -1, viewCount: -1, likeCount: -1 })
                    .limit(limit)
                    .populate("author", "userName image")
            }) || [];

            const result = await Promise.all(promises);

            blogs = result.flat();
        }

        if (blogs.length < requiredLimit) {
            const result = await BlogModel.find({
                _id: { $nin: blogs.map(b => b._id) }
            }).sort({ viewCount: -1, likeCount: -1 })
                .limit(requiredLimit - blogs.length)
                .populate("author", "userName image");

            blogs.push(...result)

        }

        return NextResponse.json({ message: "Recomended Blogs Fetched SuccessFully!!", success: true, result: blogs })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch recomended Blogs", success: false, error: message }, { status: 500 })
    }
}