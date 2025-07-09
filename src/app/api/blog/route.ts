import BlogModel from "@/model/blogSchema"
import { databaseConnection } from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"
import { getLoggedInUser } from "@/utils/jwtVerification"
// Importing User model to ensure it's registered before using it in Blog API,
// since Blog references User via the 'author' field and we want to populate it even without login.
import UserModel, { User } from "@/model/userSchema";
import { sendNotification } from "@/utils/sendEmial";
import SubscriberModel from "@/model/subscriberSchema";
// Touch the model to avoid TS unused import warning
void UserModel;

// get All Blogs Api
export const GET = async (req: NextRequest) => {
    const category = req.nextUrl.searchParams.get("category")

    try {
        await databaseConnection()

        let blogs
        if (category === 'all') {
            blogs = await BlogModel.find().populate("author", "userName")
        } else {
            blogs = await BlogModel.find({ category }).populate("author", "userName")
        }

        return NextResponse.json({ message: "All Blogs Fetched SuccessFully!!", success: true, result: blogs })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}


// Add Blog Api
export const POST = async (req: Request) => {
    try {

        const logedUser = await getLoggedInUser()
        const { image, title, category, description } = await req.json()
        await databaseConnection()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        const date = new Date().toISOString().split('T')[0];


        const newBlog = new BlogModel({
            title,
            image,
            category,
            description,
            author: logedUser?.id,
            date
        })

        await newBlog.save()

        const response = await newBlog.populate("author", "userName")

        const subscribers = await SubscriberModel.find({ autherId: response.author?._id?.toString() })

        if (subscribers.length > 0) {
            await Promise.all(subscribers.map((subscriber) => {
                // if (typeof response.author === ) {
                sendNotification(
                    subscriber.email,
                    response.title,
                    response._id?.toString(),
                    (response.author as User)?.userName || "Unknown Author"
                )
                // }
            }))
        }


        return NextResponse.json({ message: "blog Created SuccessFully!! ", success: true, result: response }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to Add Blogs", success: false, error: message }, { status: 500 })
    }
}