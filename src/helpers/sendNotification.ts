import SubscriberModel from "@/schema/SubscriberSchema";
import UserTokenModel from "@/schema/TokenSchema";
import admin from 'firebase-admin'
import { NextResponse } from "next/server";

export const sendNotification = async (userId: string, blogTitle: string) => {
    const subscribers = await SubscriberModel.find({ autherId: userId }).distinct('userId');

    const tokens = await UserTokenModel.find({
        userId: { $in: subscribers }
    }).distinct('fcmToken');

    const message = {
        notification: {
            title: "New Blog Posted ",
            body: blogTitle
        },
        tokens: tokens
    }

    await admin.messaging().sendEachForMulticast(message);

    console.log("token Send Success");
    return NextResponse.json({ message: "Notification Send!! ", success: true })
}