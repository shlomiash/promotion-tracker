"use server";

import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { discounts } from "../db/schema";

export default async function handleAddDiscountCode(code: string | null ,total: number , activeDiscountsCombined: Set<string> , activeDiscountsSingle: Set<string>) {

    //All discounts should be applied from the initial total amount
    const temporaryDiscountTotal = 100;

  if (!code) return { error: "Promo Code consists from at least 1 letter!" };

  const existingDiscount = await db.query.discounts.findFirst({
      where:eq(discounts.code,code)
    });

  //Checking if discount code exists
  if (!existingDiscount) {
    return { error: "Discount code does not exist" };
  }

  //Checking if discount already been applied
  if(activeDiscountsCombined.has(code)) {
    return { error: "This discount already been applied" };
  }


  //Checking if discount can be applied 
  if (existingDiscount.limits == 0) {
    existingDiscount.active = false;
    //Update database logic here...
  }


  //Checking discount active status
  if (!existingDiscount.active) {
    return { error: "Discount code is not active" };
  }

  //Checking if discount has expired date
  const noExpiration = existingDiscount?.expires === null;

    //HANDLE THIS
    if (!noExpiration) {
      if (new Date() > new Date(existingDiscount?.expires!)) {
        return { error: "Discount code has expired" };
      }
    }

  //We are going to check few cases to make error handling clear.
  if((activeDiscountsSingle.size > 0 && !existingDiscount.canBeCombined) || (activeDiscountsCombined.size > 0 && !existingDiscount.canBeCombined)) {
    return { error: "This Discount code cannot be combined with others"};
  }

  if((activeDiscountsSingle.size > 0 && existingDiscount.canBeCombined)  ) {
    return { error: "You already applied discount code that cannot be combined with others"};
  }

  if(!existingDiscount.canBeCombined){
    activeDiscountsSingle.add(code);
  }
    else {
        activeDiscountsCombined.add(code);
    }

//Checking if discount is fixed or percentage
  if(existingDiscount.isFixed) {
    total = total - existingDiscount.amount;
  }
  else {
    total = total - (temporaryDiscountTotal * existingDiscount.amount / 100);
  }

  //Updating logic for discounts that have limits
  if (existingDiscount.limits !== null) {
    existingDiscount.limits = existingDiscount.limits - 1 ;
  }

  return { success: "Disount code applied successfully!" , total: total  , activeDiscountsCombineded: activeDiscountsCombined , activeDiscountsSingled: activeDiscountsSingle };
}
