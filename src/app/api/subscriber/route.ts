// import SubscriberModel from "@/model/subscriberSchema";
import SubscriberModel from "@/schema/SubscriberSchema";
import { databaseConnection } from "@/utils/db"
import { getLoggedInUser } from "@/utils/jwtVerification";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { autherId } = await req.json()

        const logedUser = await getLoggedInUser()

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }
        await databaseConnection();

        const subscriber = await SubscriberModel.findOne({ userId: logedUser.id, autherId })


        if (subscriber) {
            return NextResponse.json({ message: "you have Already Subscibed!!", success: false }, { status: 200 })
        }

        const newSubscriber = new SubscriberModel({
            autherId,
            userId: logedUser.id
        })

        const result = await newSubscriber.save()

        return NextResponse.json({ message: "you have Subscribed!!", success: true, result: result }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}



export const GET = async (req: NextRequest) => {
    const lastId = req.nextUrl.searchParams.get('lastId');
    const limit = 1;

    try {
        const logedUser = await getLoggedInUser();
        await databaseConnection();

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        }

        let totalSubscribers: null | number = null

        if (!lastId) {
            totalSubscribers = await SubscriberModel.countDocuments({ autherId: logedUser.id })
        }

        const subscribers = await SubscriberModel.find({
            autherId: logedUser?.id,
            ...(lastId && { _id: { $lt: new Types.ObjectId(lastId) } })
        })
            .sort({ _id: -1 })
            .limit(limit)
            .populate("userId", "userName email image createdAt");

        return NextResponse.json({
            message: "You have successFully Fteched Subscribers!!",
            success: true,
            result: subscribers,
            ...(totalSubscribers !== null && { total: totalSubscribers })
        }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to fetch Blogs", success: false, error: message }, { status: 500 })
    }
}



export const DELETE = async (req: NextRequest) => {
    try {
        const subscriberId = req.nextUrl.searchParams.get('subscriberId')
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