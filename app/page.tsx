"use client";
import { CheckCircle2 } from "lucide-react";
import DiscountError from "@/components/client/discount-error";
import DiscountSuccess from "@/components/client/discount-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import handleAddDiscountCode from "@/server/actions/handle-add-discount-code";
import { XIcon, ArrowRight } from "lucide-react";
import { useState } from "react";
import handleDeleteDiscountCode from "@/server/actions/handle-delete-discount";

export default function Home() {
  //We are seperating the active discounts into two sets, one for the combined discounts and one for the single discounts
  const [activeDiscountsCombined, setActiveDiscountsCombined] = useState<
    Set<string>
  >(new Set());
  const [activeDiscountsSingle, setActiveDiscountsSingle] = useState<
    Set<string>
  >(new Set());
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(100);

  //Handling logic when clicking the apply button, we are getting the promo code from the input field and sending it to the server to check if it's valid
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promoCode = (
      e.currentTarget.elements.namedItem("promo") as HTMLInputElement
    )?.value;

    const {
      error,
      success,
      total,
      activeDiscountsCombineded,
      activeDiscountsSingled,
    } = await handleAddDiscountCode(
      promoCode,
      totalAmount,
      activeDiscountsCombined,
      activeDiscountsSingle
    ); //100 is the total amount

    if (error) {
      setSuccess(null);
      setError(error);
      return;
    }

    if (success) {
      setSuccess(success);
      setActiveDiscountsCombined(activeDiscountsCombineded);
      setActiveDiscountsSingle(activeDiscountsSingled);
      setTotalAmount(Math.max(total, 0));
      setError(null);
      return;
    }
  };

  //Quite a simple UI with alot of logic behind going. We can if we want to export it to a seperate component and redner it here
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
          <DiscountError message={error} />
          <DiscountSuccess message={success} />
        </form>

        <div className="order-summary flex flex-col gap-2 mt-8">
          <Label htmlFor="text" className="text-sm pb-2">
            Order Summary
          </Label>
          <div className=" h-[95px] w-[290px] bg-[#f8f4fc] rounded-xl">
            <div className="px-4 py-4 text-sm flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-black/60 ">Order amount</p>
                <p className="font-bold">100₪</p>
              </div>
              <div className="flex justify-between">
                <p className="text-black/60 ">Total</p>
                <p className="font-bold">{totalAmount}₪</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {Array.from(activeDiscountsCombined).map((code) => (
            <div
              key={code}
              className="flex justify-between bg-green-200 mb-2 items-center"
            >
              <p className="py-3 px-5  flex gap-2 items-center">
                <CheckCircle2 className="size-4" />
                The discount code :{code}
                has been applied successfully! 🎉🎉
              </p>
              <button
                onClick={async () => {
                  const {newTotal} = await handleDeleteDiscountCode(code,totalAmount);
                  setTotalAmount(newTotal as number);
                  activeDiscountsCombined.delete(code);
                  setActiveDiscountsCombined(new Set(activeDiscountsCombined));
                }}
              >
                <XIcon className="size-4 mr-8" />
              </button>
            </div>
          ))}

          {Array.from(activeDiscountsSingle).map((code) => (
            <div
              key={code}
              className="flex justify-between bg-green-200 mb-2 items-center"
            >
              <p className="py-3 px-5 flex gap-2 items-center">
                <CheckCircle2 className="size-4" />
                The discount code :{code}
                has been applied successfully! 🎉🎉
              </p>
              <button
                onClick={async () => {
                  const {newTotal} = await handleDeleteDiscountCode(code,totalAmount);
                  setTotalAmount(newTotal as number);
                  activeDiscountsSingle.delete(code);
                  setActiveDiscountsSingle(new Set(activeDiscountsSingle));
                }}
              >
                <XIcon className="size-4 mr-8" />
              </button>
            </div>
          ))}
        </div>
        <div className="place-order flex justify justify-between items-center pt-8">
          <div>
            <h3 className="text-lg font-bold">Place Order</h3>
            <p className="text-sm text-black/60">Total : {totalAmount}₪</p>
          </div>
          <Button>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </main>
  );
}
