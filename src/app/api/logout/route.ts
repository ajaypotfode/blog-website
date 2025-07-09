
import { getLoggedInUser } from "@/utils/jwtVerification"
import { NextResponse } from "next/server"

export const POST = async () => {
    try {
        const logedUser = await getLoggedInUser()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        // await databaseConnection();

        // const user=await UserModel.findOneAndUpdate({ email: logedUser.email, isVerified: true }, { isVerified: false })

        const response = NextResponse.json({ message: "user Logged Out SuccessFully!!", success: true }, { status: 200 })

        response.cookies.set('blogToken', "", {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            // maxAge: 60 * 60 * 24,
            path: "/"
        })

        return response

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}

