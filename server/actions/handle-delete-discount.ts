"use server";

import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { discounts } from "../db/schema";


export default async function handleDeleteDiscountCode(code: string | null ,currentTotal: number ) {
   
    if (!code) return { error: "No code was provided." };
    const existingDiscount = await db.query.discounts.findFirst({
          where:eq(discounts.code,code)
        });

    if (!existingDiscount) {
        return { error: "Discount code does not exist" };
    }

    return {newTotal : currentTotal + existingDiscount.amount};

}
