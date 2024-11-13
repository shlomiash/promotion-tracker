//Discounts API route
import { discountCodes } from "@/server/data/discounts";

export async function GET() {
    return new Response(JSON.stringify(discountCodes));
}