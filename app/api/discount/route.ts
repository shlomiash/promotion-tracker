import { NextRequest, NextResponse } from "next/server";
import { discountCodes } from "@/server/data/discounts";

export async function GET(req : NextRequest, res:NextResponse) {
    return new Response(JSON.stringify(discountCodes));
}