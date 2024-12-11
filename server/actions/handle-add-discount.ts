"use server";

import { DiscountSchema } from "@/types/discount-schema";
import { createSafeActionClient } from "next-safe-action";
import { discountCodes } from "@/server/data/discounts";
import { auth } from "../auth";

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
      //Normally here I will just send the data to the database.
      //But for now I will just create a new object and return it
      //Will get the user id from the session
      //const userCreatedId = session?.user?.id;

      //Checking if discount code already exists
      const discount = discountCodes.filter(
        (discount) => discount.code === code
      );
      if (discount.length > 0) {
        return {
          error: "Discount code already exists , please choose another one",
        };
      }

      // Insert the user into the database
      //await db.insert(discounts).values({code, isFixed , active , canBeCombined , amount ,expires , limits ,note ,userCreatedId})

      return {
        error:
          "Cannot Upload Promotion For This Moment , But you can see in inspect that data works on click",
      };
    }
  );
