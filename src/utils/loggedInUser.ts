// import { CustomeUser } from '@/model/userSchema'
import { authProviderOpptions } from '@/app/api/auth/[...nextauth]/option'
// import jwt from 'jsonwebtoken'
// import { Types } from 'mongoose'
import { getServerSession } from 'next-auth'
// import { headers } from 'next/headers'
// import { cookies } from 'next/headers'
// import { NextRequest } from 'next/server'

// const JWT_SECRET = process.env.JWT_SECRET || ""

// export const generateToken = (user: { id: Types.ObjectId }) => {
//     return jwt.sign(user, JWT_SECRET, { expiresIn: '1d' })
// }


// export const verifyToken = (token: string) => {
//     return jwt.verify(token, JWT_SECRET)
// }


export const getLoggedInUser = async () => {
    try {
        const session = await getServerSession(authProviderOpptions);

        if (session?.user && session.user.id) {
            return { id: session.user.id as string };
        }
        return null;
    } catch (error) {
        // Log specifically where the crash happened, then fail safely by returning null
        console.error("NextAuth session extraction failed inside helper:", error);
        return null;
    }
}