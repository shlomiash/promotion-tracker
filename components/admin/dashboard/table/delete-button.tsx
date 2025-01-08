'use client'

import { Button } from "@/components/ui/button";
import { Discount } from "@/server/data/discounts";
import { handleDeleteDiscount } from "@/server/actions/handle-delete-button";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export function DeleteButton({ discount }: { discount: Discount }) {

  const router = useRouter();

  return (
      <Button variant="destructive" onClick={  () => {
         handleDeleteDiscount(discount.id);
      }}>
      Delete
    </Button>

  );
}
