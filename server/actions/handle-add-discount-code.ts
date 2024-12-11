"use server";

import { discountCodes } from "@/server/data/discounts";

export default async function handleAddDiscountCode(code: string | null ,total: number , activeDiscountsCombined: Set<string> , activeDiscountsSingle: Set<string>) {

    //All discounts should be applied from the initial total amount
    const temporaryDiscountTotal = 100;

  if (!code) return { error: "Promo Code consists from at least 1 letter!" };

  const discount = discountCodes.filter((discount) => discount.code === code);

  //Checking if discount code exists
  if (discount.length === 0) {
    return { error: "Discount code does not exist" };
  }

  //Checking if discount already been applied
  if(activeDiscountsCombined.has(code)) {
    return { error: "This discount already been applied" };
  }


  //Checking if discount can be applied 
  if (discount[0].limits == 0) {
    discount[0].active = false;
    //Update database logic here...
  }


  //Checking discount active status
  if (!discount[0].active) {
    return { error: "Discount code is not active" };
  }

  //Checking if discount has expired date
  const noExpiration = discount[0]?.expires === undefined;

    //HANDLE THIS
    if (!noExpiration) {
      if (new Date() > (discount[0]?.expires as Date)) {
        return { error: "Discount code has expired" };
      }
    }

  //We are going to check few cases to make error handling clear.
  if((activeDiscountsSingle.size > 0 && !discount[0].canBeCombined) || (activeDiscountsCombined.size > 0 && !discount[0].canBeCombined)) {
    return { error: "This Discount code cannot be combined with others"};
  }

  if((activeDiscountsSingle.size > 0 && discount[0].canBeCombined)  ) {
    return { error: "You already applied discount code that cannot be combined with others"};
  }

  if(!discount[0].canBeCombined){
    activeDiscountsSingle.add(code);
  }
    else {
        activeDiscountsCombined.add(code);
    }

//Checking if discount is fixed or percentage
  if(discount[0].isFixed) {
    total = total - discount[0].amount;
  }
  else {
    total = total - (temporaryDiscountTotal * discount[0].amount / 100);
  }

  //Updating logic for discounts that have limits
  if (discount[0].limits !== undefined) {
    discount[0].limits = discount[0].limits - 1;
    //Update database logic here...
  }

  return { success: "Disount code applied successfully!" , total: total  , activeDiscountsCombineded: activeDiscountsCombined , activeDiscountsSingled: activeDiscountsSingle };
}
