'use server'

import { DiscountSchema } from "@/types/discount-schema";
import {z} from 'zod';
import {discountCodes } from "./data/discounts";
import { auth } from "./auth";

const session = await auth();

export const handleEditDiscount = async (discount:z.infer<typeof DiscountSchema>,id:number) => {
    //We need to edit the discount with the id
    //Normally here I will just send the updated data to the database.
    //User created will be the user who is logged in got from session

    const existingDiscount = discountCodes.find((discount) => discount.id === id);

    // await db.update(discounts)
    // .set(discount , {userCreatedId: session?.user?.id})
    // .where(discounts.id.equals(id));


    return {error: 'Cannot Edit Promotion For This Moment , But you can see in inspect that data works on click'};

}
    