'use server'

import { discountCodes } from "./data/discounts";


export const getDiscounts = async () =>{
    return discountCodes;
}
    
 
