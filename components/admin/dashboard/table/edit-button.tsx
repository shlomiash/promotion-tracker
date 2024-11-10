import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Discount } from "@/server/data/discounts";

export function EditButton({ discount }: { discount: Discount }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Discount</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Discount</DialogTitle>
          <DialogDescription>
            Edit your discount. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="">
              Code
            </Label>
            <Input
              id="code"
              defaultValue={discount.code}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="">
              Status
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue defaultValue="active" placeholder="active" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="active">active</SelectItem>
                  <SelectItem value="disabled">disabled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="">
              Amount
            </Label>

            <RadioGroup defaultValue="Fixed-price col-span-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fixed-price" id="fixed-price" />
                <Label htmlFor="fixed-price">Fixed-price</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Percentage" id="percentage" />
                <Label htmlFor="percentage">Percentage</Label>
              </div>
            </RadioGroup>
            <Input
              id="amount"
              defaultValue={discount.amount}
              className="ml-6 col-span-1"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="col-span-2">
              Limit(empty for unlimited)
            </Label>
            <Input
              id="limit"
              defaultValue={discount.code}
              className="col-span-2"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code">
              ExpireDate
            </Label>
            <RadioGroup defaultValue="Fixed-price" className="flex gap-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fixed-price" id="fixed-price" />
                <Label htmlFor="fixed-price">None</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Percentage" id="percentage" />
                <Label htmlFor="percentage">Yes</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant={"destructive"} type="submit">
            Delete
          </Button>
          <Button className="mb-4" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
