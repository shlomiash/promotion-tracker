'use server'

import { DateRange } from "react-day-picker"

import { discountCodes } from "./data/discounts";


export const getDiscounts = async () =>{
    return discountCodes;
}


export const getDiscountById = async (id: number) =>{
    return discountCodes.find(discount => discount.id == id);
}

export const getDiscountsByUserId = async (userId: number) =>{
    return discountCodes.filter(discount => discount.userCreatedId == userId);
}

export const getDiscountsByCreationDate = async (rangeDate: DateRange | undefined) =>{
    if(!rangeDate || !rangeDate.from || !rangeDate.to) return null;
    return discountCodes.filter(discount => (discount.createdAt >= rangeDate.from!) && (discount.createdAt <= rangeDate.to!));
}
 
