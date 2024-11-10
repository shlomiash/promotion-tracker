'use server'

import { DiscountSchema } from "@/types/discount-schema";
import { createSafeActionClient } from "next-safe-action";
import { Discount } from "./data/discounts";


const actionClient = createSafeActionClient();

const discountObject:Discount = {
  code: "",
  limits: undefined,
  amount: 0,
  expires: undefined,
  canBeCombined: false,
  isFixed: false,
  active: false,
  note: "",
  createdAt: new Date(),
  userCreatedId: 0,
  id: 0
}

export const handleAddDiscount = actionClient
  .schema(DiscountSchema).action(async ({ parsedInput: {code, isFixed , active , canBeCombined , amount ,expires , limits ,note} }) => {
    
    //Normally here I will just send the data to the database.
    //But for now I will just create a new object and return it
    discountObject.code = code;
    discountObject.active = active;
    discountObject.canBeCombined = canBeCombined;
    discountObject.isFixed = isFixed;
    discountObject.amount = amount;
    discountObject.expires = expires;
    discountObject.limits = limits;
    discountObject.note = note;
    discountObject.createdAt = new Date();

    //I will get the user id who created the promtion from the session
    discountObject.userCreatedId = 11;

    //To make it work I need to write to the discounts.ts file in the data folder - //ONLY BECAUSE I AM NOT USING A DATABASE

    return discountObject;
  });
