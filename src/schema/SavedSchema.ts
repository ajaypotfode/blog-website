import mongoose, { Schema, Types, Document, Model } from "mongoose";

export interface SavedBlog extends Document {
    _id: Types.ObjectId,
    autherId: Types.ObjectId,
    blogId: Types.ObjectId
}

const SavedBlogSchema: Schema<SavedBlog> = new Schema({
    autherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "blogs"
    }
}, { timestamps: true })


const SavedBlogModel:Model<SavedBlog> = mongoose.models.savedBlogs || mongoose.model("savedBlogs", SavedBlogSchema)

export default SavedBlogModel
