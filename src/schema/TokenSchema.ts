import mongoose, { Schema, Types, Model } from "mongoose";

export interface FCMToken {
    userId: Types.ObjectId
    fcmToken: string;
    createdAt: Date;
    updatedAt: Date;
    deviceId: string;
}


const FCMTokenSchema: Schema<FCMToken> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    fcmToken: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    },

}, { timestamps: true })


const UserTokenModel: Model<FCMToken> = mongoose.models.fcmTokens || mongoose.model("fcmTokens", FCMTokenSchema)

export default UserTokenModel
