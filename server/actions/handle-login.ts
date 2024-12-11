"use server";

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { signIn } from "@/server/auth";
import { db } from "@/server/db/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
const actionClient = createSafeActionClient();

export const handleLogin = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {

  const emailCheck = email.toLowerCase();
  
  const existingUser = await db.query.users.findFirst({
    where:eq(users.email,emailCheck)
  });

  if(!existingUser){
      console.log("User not found");
      return { error: "Invalid credentials" };
  }

    await signIn("credentials", {
      email: emailCheck,
      password: password,
      redirectTo: "/admin/dashboard", //Redirect to home page after sign in
    });

    return { success: "Logged in" };
  });
