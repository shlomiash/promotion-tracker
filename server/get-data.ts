'use server'

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
 
