'use server'

import { RegisterSchema } from "@/types/register-schema";
import { createSafeActionClient } from "next-safe-action";
const actionClient = createSafeActionClient();


//Here we will insert the new user into the database
//We will make sure that the user does not already exist
//We will hash the password and store it in the database
//We will return a success message if the user was created successfully
//We will return an error message if the user could not be created

export const handleRegister = actionClient
  .schema(RegisterSchema).action(async ({ parsedInput: { email, password ,name} }) => {

      return {error: 'Cannot create another user for now!'};
  });
