import mongoose, { Schema, Types, Document, Model } from "mongoose";

export interface Subscriber extends Document {
    _id: Types.ObjectId,
    autherId: Types.ObjectId,
    userId: Types.ObjectId
}

const SubscriberSchema: Schema<Subscriber> = new Schema({
    autherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }
}, { timestamps: true })

SubscriberSchema.index({ autherId: 1, userId: 1 })

const SubscriberModel:Model<Subscriber>  = mongoose.models.subscribers|| mongoose.model("subscribers", SubscriberSchema)

export default SubscriberModel
