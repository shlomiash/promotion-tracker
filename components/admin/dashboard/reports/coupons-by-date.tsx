
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
import { getDiscountsByCreationDate, getDiscountsByUserId } from "@/server/get-data"
import { useCallback, useEffect, useState } from "react"

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
export default function CouponsByUser() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2024, 10, 1),
        to: addDays(new Date(2024, 10, 1), 20),
      })

      const [dateCoupons, setDateCoupons] = useState<Discount[] | null>(null);

      const handleSubmit = useCallback(async () => {
        const dateDiscounts = await getDiscountsByCreationDate(date);
        return setDateCoupons(dateDiscounts);
      }, [date]);

      useEffect(() => {
        handleSubmit();
          }, [date]);

  return (
        <Dialog>
        <DialogTrigger asChild>
            <Button >Coupons By Date</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
            <DialogTitle>Coupons By Date</DialogTitle>
            <DialogDescription>
                Please pick a date range to see the coupons created on that range
            </DialogDescription>
            </DialogHeader>
            <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
            <DialogFooter>
                <div className="w-full flex flex-col justify-center items-center">
                    {dateCoupons?.map((coupon) => (
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







// 'use client'

// import { addDays, format } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"
// import { DateRange } from "react-day-picker"
 
// import { cn } from "@/lib/utils"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Discount } from "@/server/data/discounts"
// import { useState } from "react"

// import { Button } from "@/components/ui/button"


// export default function CouponsByDate(){

//     const [date, setDate] = useState<DateRange | undefined>({
//         from: new Date(2022, 0, 20),
//         to: addDays(new Date(2022, 0, 20), 20),
//       })

//     return (
//         <Dialog>
//         <DialogTrigger asChild>
//             <Button >Coupons By Date</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[625px]">
//             <DialogHeader>
//             <DialogTitle>Date Creation Coupons</DialogTitle>
//             <DialogDescription>
//                 Please pick a date range to see the coupons created on that range
//             </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input
//               id="name"
//               defaultValue="Pedro Duarte"
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input
//               id="username"
//               defaultValue="@peduarte"
//               className="col-span-3"
//             />
//           </div>
//         </div>
//             <DialogFooter>
//                 <div className="w-full flex flex-col justify-center items-center">
//                     {/* {userCoupons?.map((coupon) => (
//                         <div key={coupon.id} className="w-full bg-slate-100 mb-2 p-4 flex justify-between items-center">
//                             <span>{coupon.code}</span>
//                             <span>{coupon.active? <Badge className="bg-green-800">active</Badge> : <Badge className="bg-red-900" >disabled</Badge>}</span>
//                         </div>
//                         ))} */}
//                 </div>
//             </DialogFooter>
//         </DialogContent>
//         </Dialog>
//     )
// }