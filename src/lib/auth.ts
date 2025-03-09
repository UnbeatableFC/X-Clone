import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prismadb"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret:process.env.AUTH_SECRET,
    providers: [Google({
        clientId:process.env.AUTH_GOOGLE_ID,
        clientSecret:process.env.AUTH_GOOGLE_SECRET,
        profile : async (profile) => {
            console.log(profile)
            return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                profileImage: profile.picture,
                username: ''
            }
        }
    })],
})