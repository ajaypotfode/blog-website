import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface Comment extends Document {
    _id: Types.ObjectId,
    userId: Types.ObjectId | null,
    blogId: Types.ObjectId;
    comment: string;
}



const CommentSchema: Schema<Comment> = new Schema({
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
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true })

CommentSchema.index(
    { blogId: 1 }
)


CommentSchema.index({ blogId: 1 });
CommentSchema.index({ blogId: 1, userId: 1 });
CommentSchema.index({ blogId: 1, userId: 1, comment: 1 });

const CommentModel: Model<Comment> = mongoose.models.comments || mongoose.model<Comment>("comments", CommentSchema);

export default CommentModel