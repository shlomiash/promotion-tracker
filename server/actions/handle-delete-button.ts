'use server'

import { db } from "@/server/db/db";
import { discounts } from "../db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from 'next/cache'


export const handleDeleteDiscount = async (id:string) => {  
    try{
        await db.delete(discounts).where(eq(discounts.id,id));
        revalidatePath('/admin/dashboard');

    }catch(e){
        console.error(e);
    }

}
