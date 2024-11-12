import { Button } from "@/components/ui/button";
import { Discount } from "@/server/data/discounts";
import Link from "next/link";

export function EditButton({ discount }: { discount: Discount }) {
  return (
    <Button asChild variant="outline">
      <Link href={`/admin/dashboard/add-promotion?id=${discount.id}`}>
        Edit
      </Link>
    </Button>
  );
}
