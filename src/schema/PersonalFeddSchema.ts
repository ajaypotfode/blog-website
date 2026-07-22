import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface PersonalFeed extends Document {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    tags: { tag: string, score: number, lastUpdate: Date }[],
}


const PersonalFeedSchema: Schema<PersonalFeed> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        unique: true
        // default: null
    },
    tags: [
        {
            tag: { type: String },
            score: { type: Number, default: 0 },
            lastUpdate: { type: Date }
        }
    ]
})

// this use to get Like Document for matched User And Blog
// InteractionSchema.index(
//     { blogId: 1, userId: 1, type: 1 },
//     {
//         partialFilterExpression: {
//             type: 'LIKE',
//             userId: { $exists: true, $ne: null }
//         },
//         unique: true
//     }
// )


const PersonalFeedModel: Model<PersonalFeed> = mongoose.models.myFeeds || mongoose.model<PersonalFeed>("myFeeds", PersonalFeedSchema);

export default PersonalFeedModel