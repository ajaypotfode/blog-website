import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface Interaction extends Document {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    blogId: Types.ObjectId;
    sessionId: string;
    type: string;
}



const InteractionSchema: Schema<Interaction> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'blogs',
        required: true
    },
    sessionId: {
        type: String,
        default: null
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true })

// this use to get Like Document for matched User And Blog 
InteractionSchema.index(
    { blogId: 1, userId: 1, type: 1 },
    {
        partialFilterExpression: {
            type: 'LIKE',
            userId: { $exists: true, $ne: null }
        },
        unique: true
    }
)

// InteractionSchema.index(
//     { blogId: 1, userId: 1, type: 1 },
//     {
//         partialFilterExpression: {
//             type: 'LIKE',
//             sessionId: { $exists: true, $ne: null }
//         },
//         unique: true
//     }
// )

InteractionSchema.index({ blogId: 1, type: 1, userId: 1 });
InteractionSchema.index({ blogId: 1, type: 1, sessionId: 1 });

const InteractionModel:Model<Interaction> = mongoose.models.interactions || mongoose.model<Interaction>("interactions", InteractionSchema);

export default InteractionModel