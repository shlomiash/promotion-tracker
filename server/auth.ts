import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials"
import { LoginSchema } from "@/types/login-schema"
import { db } from "@/server/db/db"
import { eq } from "drizzle-orm"
import { users } from "./db/schema"

const admin = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session:{strategy:"jwt"},
  providers: [
    //This is a custom provider that allows users to sign in with email and password
    Credentials({

      authorize: async (credentials) => { 

        const validateFields = LoginSchema.safeParse(credentials);

        if(!validateFields.success) return null;

        const { email, password } = validateFields.data;

        const existingUser = await db.query.users.findFirst({
          where:eq(users.email,email)
        });

        if(existingUser?.password === password){
          return {id:existingUser.id,image:'https://github.com/shadcn.png'};
        }

       return null;

      }
    })
    

  ],
})