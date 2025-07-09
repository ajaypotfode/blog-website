// import { CustomeUser } from '@/model/userSchema'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || ""

export const generateToken = (user: { id: Types.ObjectId}) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '1d' })
}


// export const verifyToken = (token: string) => {
//     return jwt.verify(token, JWT_SECRET)
// }


export const getLoggedInUser = async () => {
    const cookie = await cookies();
    const token = cookie.get("blogToken")?.value

    if (!token) return null

    const user = jwt.verify(token, JWT_SECRET) as { id: Types.ObjectId }

    return { id: user.id }
}