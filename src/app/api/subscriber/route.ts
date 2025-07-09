import SubscriberModel from "@/model/subscriberSchema";
import { databaseConnection } from "@/utils/db"
import { getLoggedInUser } from "@/utils/jwtVerification";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { autherId, email } = await req.json()

        await databaseConnection();

        const subscriber = await SubscriberModel.findOne({ email, autherId })

        // console.log("subscriber is :", subscriber);


        if (subscriber) {
            return NextResponse.json({ message: "you have Already Subscibed!!", success: false }, { status: 200 })
        }

        const newSubscriber = new SubscriberModel({
            autherId,
            email,
        })

        const result = await newSubscriber.save()

        return NextResponse.json({ message: "you have Subscribed!!", success: true, result: result }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}



export const GET = async () => {
    try {
        const logedUser = await getLoggedInUser();
        await databaseConnection();

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        const subscribers = await SubscriberModel.find({ autherId: logedUser?.id })
        return NextResponse.json({ message: "You have successFully Fteched Subscribers!!", success: true, result: subscribers }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}



export const DELETE = async (req: Request) => {
    try {
        const { subscriberId } = await req.json()
        const logedUser = await getLoggedInUser()
        await databaseConnection()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        const subscriber = await SubscriberModel.findOneAndDelete({ _id: subscriberId })

        if (!subscriber) {
            return NextResponse.json({ message: "not have Subscriber!!", success: false }, { status: 200 })
        }
        return NextResponse.json({ message: "You have successFully Fteched Subscribers!!", success: true, result: subscriber }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}