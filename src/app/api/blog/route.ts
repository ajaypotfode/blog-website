import BlogModel from "@/schema/BlogSchema"
import { databaseConnection } from "@/utils/db"
import { NextResponse } from "next/server"
// Importing User model to ensure it's registered before using it in Blog API,
// since Blog references User via the 'author' field and we want to populate it even without login.
import "@/schema/UserSchema";


// get All Blogs Api
export const GET = async () => {
    // const category = req.nextUrl.searchParams.get("category");
    const limit = 10;

    try {
        await databaseConnection()

        const blogs = await BlogModel.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("author", "userName image")

        // if (category) {
        //     blogs = blogs.filter(blog => blog.category === category)
        // }
        // else {
        //     blogs = await BlogModel.find({ category }).populate("author", "userName")
        // }

        return NextResponse.json({ message: "All Blogs Fetched SuccessFully!!", success: true, result: blogs })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}


// // Add Blog Api
// export const POST = async (req: Request) => {
//     try {

//         const logedUser = await getLoggedInUser()
//         const { image, title, category, description,content } = await req.json()
//         await databaseConnection()

//         if (!logedUser) {
//             return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
//         }

//         const newBlog = new BlogModel({
//             title,
//             image,
//             category,
//             description,
//             content,
//             author: logedUser?.id,
//         })

//         await newBlog.save()

//         const response = await newBlog.populate("author", "userName")


//         // Commented this functionality cause when generating the live project link, as Resend could restrict sending
//         //  emails to addresses that are not registered or if not Having verified domain email.


//         // const subscribers = await SubscriberModel.find({ autherId: response.author?._id?.toString() })

//         // if (subscribers.length > 0) {
//         //     await Promise.all(subscribers.map((subscriber) => {
//         //         // if (typeof response.author === ) {
//         //         sendNotification(
//         //             subscriber.email,
//         //             response.title,
//         //             response._id?.toString(),
//         //             (response.author as User)?.userName || "Unknown Author"
//         //         )
//         //         // }
//         //     }))
//         // }


//         return NextResponse.json({ message: "blog Created SuccessFully!! ", success: true, result: response }, { status: 200 })

//     } catch (error: unknown) {
//         const message = error instanceof Error ? error.message : "Something Went Worong"
//         return NextResponse.json({ message: "failed to Add Blogs", success: false, error: message }, { status: 500 })
//     }
// }