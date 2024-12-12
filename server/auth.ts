import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials"
import { LoginSchema } from "@/types/login-schema"
import { db } from "@/server/db/db"
import { eq } from "drizzle-orm"
import { users } from "./db/schema"
import bcrypt from 'bcrypt'

const admin = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session:{strategy:"jwt"},
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to token
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token properties to the session
      session.user = {
        id: token.id as string,  // Retrieve id from token
        name: token.name ?? '',
        email: token.email ?? '',
        image: token.image as string | undefined,
        emailVerified: token.email_verified as Date | null
      };
      return session;
    },
  },
  providers: [
    //This is a custom provider that allows users to sign in with email and password
    Credentials({

      authorize: async (credentials) => { 

        const validateFields = LoginSchema.safeParse(credentials);

        if(!validateFields.success) return null;

        const { email, password } = validateFields.data;

        const user = await db.query.users.findFirst({
          where:eq(users.email,email)
        });

        if(!user || !user.password) return null

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
          console.log('password is not valid')
          return null;
        }
        
        console.log('user',user);
        return user;

      }
    })
    

  ],
})