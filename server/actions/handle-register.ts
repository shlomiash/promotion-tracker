'use server'

import { RegisterSchema } from "@/types/register-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "@/server/db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt'
const actionClient = createSafeActionClient();


//Here we will insert the new user into the database
//We will make sure that the user does not already exist
//We will hash the password and store it in the database
//We will return a success message if the user was created successfully
//We will return an error message if the user could not be created

export const handleRegister = actionClient
  .schema(RegisterSchema).action(async ({ parsedInput: { email, password ,name} }) => {

    try{
  //Check if the user already exists
      const exisitngUser = await db.query.users.findFirst({
        where:eq(users.email, email)
      })

      if(exisitngUser){
        return {error: 'User already exists!'}
      }

      //Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user into the database
      await db.insert(users).values({
        email,
        password: hashedPassword,
        name,
      });

      return {suceess: "Email Successfully Registered!"};

  }catch(e){
    console.log(e)
    return {error: 'Could not register user'}
  }
    
    

  });
