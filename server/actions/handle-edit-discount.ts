"use server";

import { DiscountSchema } from "@/types/discount-schema";
import { z } from "zod";
import { auth } from "../auth";
import { db } from "../db/db";
import { discounts } from "../db/schema";
import { eq } from "drizzle-orm";

const session = await auth();

export const handleEditDiscount = async (
  discount: z.infer<typeof DiscountSchema>,
  id: string
) => {
  //We need to edit the discount with the id

  await db.update(discounts)
  .set({...discount, expires: discount.expires ? discount.expires.toISOString() : null, userCreatedId: session?.user?.id})
  .where(eq(discounts.id, id));

  return {
    error:
      "Cannot Edit Promotion For This Moment , But you can see in inspect that data works on click",
  };
};
