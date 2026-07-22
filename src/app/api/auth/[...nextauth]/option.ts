import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { databaseConnection } from '@/utils/db'
import UserModel from '@/schema/UserSchema'
import { compare } from 'bcryptjs'


export const authProviderOpptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      // authorization: {
      //   // params: {
      //   //   access_type: "offline",
      //   //   response_type: "code"
      //   // }
      // }
    }),
    CredentialsProvider({
      name: "Credentials Login",
      credentials: {
        email: { type: 'text' },
        password: { type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        await databaseConnection()
        const user = await UserModel.findOne({ email: credentials.email })

        if (!user){
          throw new Error("Invalid Email")
        }
        const isVerifiedPassword = await compare(credentials.password, user.password);
        
        if (!isVerifiedPassword){
           throw new Error("Invalid Password")
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.userName,
          image: user.image
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await databaseConnection();

          let existingUser = await UserModel.findOne({ email: user.email })

          if (!existingUser) {
            existingUser = await UserModel.create({
              userName: user.name,
              email: user.email,
              image: user.image,
              isVerified: true
            })
          }
          user.id = existingUser._id.toString()
          return true
        } catch (error) {
          console.error("Database user matching error:", error)
          return false
        }
      }
      return true
    },

    async jwt({ user, token }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ token, session }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
}