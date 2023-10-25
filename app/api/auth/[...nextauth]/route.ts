import NextAuth, { NextAuthOptions  } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import AppleProvider from 'next-auth/providers/apple'
import { MongoClient } from 'mongodb'
import { cookies } from 'next/headers'
import generateToken from '../../../../src/utils/generateToken'

export const authOptions: NextAuthOptions  = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID,
            clientSecret: process.env.APPLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user }) {
            try {
                const client = new MongoClient(process.env.MONGODB_URI)
                const usersCollection = client.db().collection('users')

                const userData = await usersCollection.findOne({
                    email: user.email,
                })

                if (userData) return true

                const newUser = {
                    email: user.email,
                    role: 'SUPPLIER',
                    avatarURL: user.image,
                    userName: user.name,
                    createdAt: new Date(),
                    displayFields: ['userName', 'avatarURL', 'imagesURL', 'services', 'departments', 'email', 'description', 'contactInfo', 'teamMates', 'favoriteSuppliers', 'yachtRoute', 'yachts', 'country']
                }

                const result = await usersCollection.insertOne(newUser)

                if (result.insertedId) return true

                return false
            } catch {
                return false
            }
        },
        async jwt({ token, user }) {
            if (!user) return
            const client = new MongoClient(process.env.MONGODB_URI)
            const usersCollection = client.db().collection('users')

            const userData = await usersCollection.findOne({
                email: user.email,
            })

            const newToken = generateToken(
                userData._id.toString(),
                userData.role,
            )

            cookies().set('token', newToken, {
                expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            })

            token.accesToken = newToken

            return {
                email: userData.email,
            }
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
