import UserTokenModel from "@/schema/TokenSchema";
import { databaseConnection } from "@/utils/db";
import { getLoggedInUser } from "@/utils/loggedInUser";
// import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { token, deviceId } = await req.json();

        const logedUser = await getLoggedInUser();

        if (!logedUser) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 401 })
        };

        await databaseConnection();

        const isToken = await UserTokenModel.exists({
            userId: logedUser.id,
            fcmToken: token,
        });

        if (!isToken) {
            await UserTokenModel.findOneAndUpdate(
                { userId: logedUser.id },
                {
                    userId: logedUser.id,
                    deviceId,
                    fcmToken: token,
                },
                { upsert: true }
            )
        }

        // console.log("loged In User Is :", logedUser.id);

        // const result = await UserTokenModel.updateOne({
        //     userId: logedUser.id,
        //     deviceId: deviceId
        // },
        //     {
        //         $set: {
        //             "fcmTokens.$.fcmToken": token,
        //             "fcmTokens.$.updatedAt": new Date()
        //         }
        //     },
        // );

        // if (result.matchedCount === 0) {
        //     await UserTokenModel.updateOne(
        //         {
        //             userId: logedUser.id
        //         },
        //         {
        //             $push: {
        //                 fcmTokens: {
        //                     fcmToken: token,
        //                     deviceId,
        //                     createdAt: new Date(),
        //                     updatedAt: new Date()
        //                 }
        //             }
        //         },
        //         { upsert: true }
        //     );
        // }



        return NextResponse.json({ message: "Token Saved Successfully", success: true }, { status: 200 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something Went Worong"
        return NextResponse.json({ message: "failed to Save Token", success: false, error: message }, { status: 500 })
    }

}