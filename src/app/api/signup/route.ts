import UserModel from "@/model/userSchema";
import { databaseConnection } from "@/utils/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { email, password, userName } = await req.json();
        await databaseConnection()

        const user = await UserModel.findOne({
            $or: [
                { email }, { userName }
            ]
        })

        if (user) {
            return NextResponse.json({ message: "user is Already Present", success: false }, { status: 200 })
        }

        const hashedPassword = await hash(password, 10)

        const newUser = new UserModel({
            userName,
            password: hashedPassword,
            email
        })

        const result = await newUser.save();

        return NextResponse.json({ message: "user Created SuccessFully!! ", success: true, result: result }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}


// this is only for testing purpose
export const GET = async () => {
    try {
        const response = await UserModel.find();
        return NextResponse.json({ message: "successfully Fetched Users!! ", success: true, result: response }, { status: 200 })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}