'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function AddPromotionButton(){
    return (
        <div className="w-full flex justify-end mb-4">
            <Button>
                <Link href="/admin/dashboard/add-promotion">
                    Add Promotion
                </Link>
                </Button>
        </div>
    )
}