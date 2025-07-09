import BlogModel from "@/model/blogSchema"
import { databaseConnection } from "@/utils/db"
import { getLoggedInUser } from "@/utils/jwtVerification"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {

        const logedUser = await getLoggedInUser()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }
        await databaseConnection();

        const blogs = await BlogModel.find({ author: logedUser.id }).populate("author", "userName").select('-description -image -category')


        return NextResponse.json({ message: "All Blogs Fetched SuccessFully!!", success: true, result: blogs })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}