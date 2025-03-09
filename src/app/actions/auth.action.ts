"use server"
import {signIn , signOut} from "@/lib/auth"
import { prisma } from "@/lib/prismadb"


export async function doSocialLogin(formData:any) {
    const action = formData.get("action")
    await signIn(action, {redirectTo: "/home"})
}
export async function doLogOut() {
    await signOut({redirectTo: "/"})
}

export async function doCredentialsLogin(data: {
    email:string
    password :string
}) {
   try{ 
        const response = await signIn("credentials" , {
            email: data.email,
            password: data.password
        })

        return response
   } catch (error){
        throw error
   }
}

export async function ensureUniqueUsername(username : string , maxAttempts = 5) {
    try{
        let attempts = 0
        const baseUsername = username
        let user = await prisma.user.findUnique({
            where: {username : username}
        })

        while(user && attempts < maxAttempts){
            const randomNumber = Math.floor(100000 + Math.random() * 900000)
            username=`${baseUsername}${randomNumber}`
            user = await prisma.user.findUnique({
                where: {username: username} 
            })
        }

        if (attempts >= maxAttempts ){
            throw new Error(
                "Unable to generate a unique username after"
            )
        }

        return username
    }catch (error) {
        throw error
    }
}