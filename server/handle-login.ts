'use server'

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { signIn} from '@/server/auth'
const actionClient = createSafeActionClient();

export const handleLogin = actionClient
  .schema(LoginSchema).action(async ({ parsedInput: { email, password} }) => {
    
      await signIn("credentials", {
        email: email,
        password: password,
        redirectTo: "/admin/dashboard", //Redirect to home page after sign in
      });
    

  });
