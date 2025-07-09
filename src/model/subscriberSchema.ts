import mongoose, { Schema, Types, Document } from "mongoose";

export interface Subscriber extends Document {
    _id: Types.ObjectId,
    autherId: Types.ObjectId,
    email: string,
    date: Date
}

const SubscriberSchema: Schema<Subscriber> = new Schema({
    autherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    email: {
        type: String,
        required: [true, "Subscriber Email Is Important"]
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })


const SubscriberModel = mongoose.models.subscribers as mongoose.Model<Subscriber> || mongoose.model("subscribers", SubscriberSchema)

export default SubscriberModel
