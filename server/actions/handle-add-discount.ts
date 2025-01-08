"use server";

import { DiscountSchema } from "@/types/discount-schema";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { eq } from "drizzle-orm";
import { discounts } from "../db/schema";
import { db } from "../db/db";

const actionClient = createSafeActionClient();

const session = await auth();

export const handleAddDiscount = actionClient
  .schema(DiscountSchema)
  .action(
    async ({
      parsedInput: {
        code,
        isFixed,
        active,
        canBeCombined,
        amount,
        expires,
        limits,
        note,
      },
    }) => {


       // Check if the discount code already exists
       const existingDiscount = await db.query.discounts.findFirst({
        where:eq(discounts.code,code)
      })

      if(existingDiscount){
        return { error: "Discount code already exists"}
      }

      //Check for session
      if (!session?.user?.id) {
        return { error: "User not found" };
      }


      // Create the discount
      await db.insert(discounts).values({
        code,
        isFixed,
        active,
        canBeCombined,
        amount,
        expires: expires ? expires.toISOString() : null, 
        limits,
        note,
        createdAt: new Date(),
        userCreatedId: session?.user?.id,
      })

      return { success: "Discount created successfully" };
    }
  );
