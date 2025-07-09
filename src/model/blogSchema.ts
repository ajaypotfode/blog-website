import mongoose, { Schema, Document, Types } from "mongoose"
import { User } from "./userSchema"

export interface Blog extends Document {
    _id: Types.ObjectId,
    // _v: number,
    title: string,
    category: string,
    author: Types.ObjectId | User
    image: string,
    description: string,
    date: Date
}


const BlogSchema: Schema<Blog> = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})


const BlogModel = mongoose.models.blogs as mongoose.Model<Blog> || mongoose.model<Blog>("blogs", BlogSchema)

export default BlogModel