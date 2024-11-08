'use server'

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { signIn} from '@/server/auth'
const actionClient = createSafeActionClient();

const admin = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
}

export const handleLogin = actionClient
  .schema(LoginSchema).action(async ({ parsedInput: { email, password} }) => {

    if(email !== admin.username || password !== admin.password)
    {
      return {error: 'Invalid credentials'};
    }
    
      await signIn("credentials", {
        email: email,
        password: password,
        redirectTo: "/admin/dashboard", //Redirect to home page after sign in
      });

      return {success: 'Logged in'};
    

  });
