"use server";

import { discountCodes } from "@/server/data/discounts";

export default async function handleDeleteDiscountCode(code: string | null ,currentTotal: number ) {
   
    if (!code) return { error: "No code was provided." };
    const discount = discountCodes.find((discount) => discount.code === code);

    if (!discount) {
        return { error: "Discount code does not exist" };
    }

    return {newTotal : currentTotal + discount.amount};

}
