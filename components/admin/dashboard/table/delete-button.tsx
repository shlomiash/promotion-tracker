'use client'

import { Button } from "@/components/ui/button";
import { Discount } from "@/server/data/discounts";
import { handleDeleteDiscount } from "@/server/actions/handle-delete-button";

export function DeleteButton({ discount }: { discount: Discount }) {
  return (
    <Button variant="destructive" onClick={ () => handleDeleteDiscount(discount.id)}>
      Delete
    </Button>

  );
    
  
}
