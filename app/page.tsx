"use client";

import DiscountError from "@/components/client/discount-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [promoCode, setPromoCode] = useState<string>("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promoCodeText = (
      e.currentTarget.elements.namedItem("promo") as HTMLInputElement
    )?.value;
    setPromoCode(promoCodeText);
  };

  return (
      <main className=" p-4 mx-auto bg-white w-[350px] md:w-full rounded-2xl shadow-2xl">
        <div className="discount-card flex flex-col gap-2">
          <form onSubmit={handleSubmit}>
            <Label htmlFor="text" className="text-sm pb-2">
              Promo Code
            </Label>
            <div className="flex items-center gap-1.5 justify-center">
              <Input
                type="text"
                id="promo"
                placeholder="Enter promo code here..."
                className="text-[14px]"
              />
              <Button type="submit">Apply</Button>
            </div>
            <DiscountError code={promoCode} />
          </form>

          <div className="order-summary flex flex-col gap-2 mt-8">
            <Label htmlFor="text" className="text-sm pb-2">
              Order Summary
            </Label>
            <div className=" h-[125px] w-[290px] bg-[#f8f4fc] rounded-xl">
              <div className="px-4 py-4 text-sm flex flex-col gap-4">
                <div className="flex justify-between">
                    <p className="text-black/60 ">Order amount</p>
                    <p className="font-bold">100₪</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-black/60 ">Coupon discount</p>
                    <p className="font-bold">0₪</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-black/60 ">Total</p>
                    <p className="font-bold">100₪</p>
                </div>
              </div>        
            </div>
          </div>
          <div className="place-order flex justify justify-between items-center pt-8">
            <div>
              <h3 className="text-lg font-bold">Place Order</h3>
              <p className="text-sm text-black/60">Total : 100₪</p>
            </div>
            <Button>
              <ArrowRight/>
            </Button>
          </div>
        </div>
      </main>
    
  );
}
