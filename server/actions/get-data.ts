'use server'

import { DateRange } from "react-day-picker"
import { db } from "@/server/db/db";
import { eq } from "drizzle-orm";
import { discounts } from "../db/schema";
import { Discount } from "../data/discounts";

export const getDiscounts = async () =>{
    const discounts = await db.query.discounts.findMany();
    console.log('discounts',discounts);
    return discounts;
}


export const getDiscountById = async (id: string) =>{
    const discount = await db.query.discounts.findMany({
        where:eq(discounts.userCreatedId,id)
    })
    if(!discount) return null;
    return discount as Discount[];
}

// export const getDiscountsByUserId = async (userId: number) =>{
//     return discountCodes.filter(discount => discount.userCreatedId == userId);
// }

// export const getDiscountsByCreationDate = async (rangeDate: DateRange | undefined) =>{
//     if(!rangeDate || !rangeDate.from || !rangeDate.to) return null;
//     return discountCodes.filter(discount => (discount.createdAt >= rangeDate.from!) && (discount.createdAt <= rangeDate.to!));
// }
 
