import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials"
import { LoginSchema } from "@/types/login-schema"

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


        //LOGIC WITH NO DATABASE
        if(email === admin.username && password === admin.password){
          return { image: 'https://github.com/shadcn.png'};
        }


        // HERE WILL BE ALL THE VALIDATION NEEDED LIKE CHECKING ENCRYPTION PASSWORD AND CHECK USER 
        // IF EXISTS IN THE DATABASE FOR EXAMPLE

       return null;

      }
    })
    

  ],
})