'use server'

import {discountCodes } from "./data/discounts";

export const handleDeleteDiscount = async (id:number) => {
    //We need to delete the discount with the id
    //Normally here I will just delete the data from the database.

    const existingDiscount = discountCodes.find((discount) => discount.id === id);

    // await db.delete(discounts).where(eq(existingDiscount.id, id));

    return {error: 'Cannot Deleter Promotion For This Moment'};

}
    