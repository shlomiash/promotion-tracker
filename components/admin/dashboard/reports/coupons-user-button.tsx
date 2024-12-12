'use client'


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Discount } from "@/server/data/discounts"
import { getDiscountById } from "@/server/actions/get-data"
import { useState } from "react"
 
export default function CouponsByUser() {

    const [userCoupons, setUserCoupons] = useState<Discount[] | null>(null);

    // When we click the button we will get the user id and then we will get the discounts by user id
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Get the user id from the form
        const userId = (
          e.currentTarget.elements.namedItem("user-id") as HTMLInputElement
        )?.value;

        //Get the discounts by user id
        const userDiscounts = await getDiscountById(userId);
    }

          //UI and logic for the component
  return (
    
        <Dialog>
        <DialogTrigger asChild>
            <Button >Coupons By User</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
            <DialogTitle>User Coupons</DialogTitle>
            <DialogDescription>
                Please Type a user id to see his coupons
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-6">
                    <Label className=" w-[20%]">
                    User ID
                    </Label>
                    <Input
                    id="user-id"
                    placeholder="103"
                    />
                <Button type="submit">Search Coupons</Button>
                </div>
            </form>
            <DialogFooter>
                <div className="w-full flex flex-col justify-center items-center">
                    {userCoupons?.map((coupon) => (
                        <div key={coupon.id} className="w-full bg-slate-100 mb-2 p-4 flex justify-between items-center">
                            <span>{coupon.code}</span>
                            <span>{coupon.active? <Badge className="bg-green-800">active</Badge> : <Badge className="bg-red-900" >disabled</Badge>}</span>
                        </div>
                        ))}
                </div>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    
  )
}