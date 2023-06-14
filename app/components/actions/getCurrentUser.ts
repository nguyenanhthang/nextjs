import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/app/libs/prisma';

async function getSession(){
    return await getServerSession(authOptions)
}
export default async function getCurrentUser(){
    try{
        const session = await getSession();
        if(!session?.user?.email){
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });
        if(!currentUser){
            return null;
        }
        return {
            ...currentUser,
            createAt: currentUser.createdAt.toISOString(),
            updateAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toString() || null
        }
    }
    catch(error: any){
        return null;
    }
}