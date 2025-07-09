import mongoose, { Schema, Document, Types } from "mongoose";

export interface User extends Document {
    _id: Types.ObjectId,
    email: string,
    password: string,
    userName: string,
    isVerified: boolean
}

// this is use to Add Token Field into result 
export interface CustomeUser extends User {
    token?: string
}

export const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, "email Should be Unique"],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    userName: {
        type: String,
        required: [true, "UserName IS required"],
        unique: [true, "UserName Should be Unique"],
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


const UserModel = mongoose.models.users as mongoose.Model<User> || mongoose.model<User>("users", UserSchema)

export default UserModel