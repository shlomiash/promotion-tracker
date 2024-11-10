'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function ExportPromotionsButton(){
    return (
        <div className="w-full flex justify-end mt-8 mb-8">
            <Button>
                <Link href="/admin/dashboard/add-promotion">
                    Export Discounts
                </Link>
            </Button>
        </div>
    )
}