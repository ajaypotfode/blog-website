import UserModel, { CustomeUser } from "@/model/userSchema"
import { databaseConnection } from "@/utils/db"
import { generateToken } from "@/utils/jwtVerification"
import { compare } from "bcryptjs"
// import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export const POST = async (req: Request) => {
    try {
        const { email, password } = await req.json()
        await databaseConnection()

        const user = await UserModel.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "Invalid EmailId !!", success: false }, { status: 400 })
        }

        const isVerifiedPassword = await compare(password, user.password)

        if (!isVerifiedPassword) {
            return NextResponse.json({ message: "Invalid password!!", success: false }, { status: 400 })
        }
        // console.log("type of user iS :",typeof user);


        // const updatedUser = await UserModel.findOneAndUpdate({ isVerified: false, email }, { isVerified: true }, { new: true })

        const token = generateToken({
            id: user._id,
        })

        const result: CustomeUser = user.toObject()
        result.token = token
        result.password = ""

        const response = NextResponse.json({ message: "userLoged In SuccessFully", success: true, result: result }, { status: 200 })


        response.cookies.set('blogToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: "/"
        })

        return response

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}


