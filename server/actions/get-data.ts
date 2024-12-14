'use server'

import { DateRange } from "react-day-picker"
import { db } from "@/server/db/db";
import { and, eq, gte, lte } from "drizzle-orm";
import { discounts } from "@/server/db/schema";
import { Discount } from "../data/discounts";

export const getDiscounts = async () =>{
    const discounts = await db.query.discounts.findMany();
    console.log('discounts',discounts);
    return discounts;
}


export const getDiscountById = async (id: string) =>{
    const discount = await db.query.discounts.findFirst({
        where: eq(discounts.id,id)
    })
    if(!discount) return null;
    return discount as Discount;
}

export const getDiscountsByUserId = async (id: string) =>{
    const discount = await db.query.discounts.findMany({
        where:eq(discounts.userCreatedId,id)
    })
    if(!discount) return null;
    return discount as Discount[];
}


export const getDiscountsByCreationDate = async (rangeDate: DateRange | undefined) =>{
    if(!rangeDate || !rangeDate.from || !rangeDate.to) return null;

    const dateDiscounts = await db.query.discounts.findMany({
        where: and(
            gte(discounts.createdAt, rangeDate.from!), // Greater than or equal to rangeDate.from
            lte(discounts.createdAt, rangeDate.to!)   // Less than or equal to rangeDate.to
          ),
    })

    if(!dateDiscounts) return null;

    return dateDiscounts as Discount[];
}
 
