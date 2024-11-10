"use client";

import { DiscountSchema } from "@/types/discount-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleAddDiscount } from "@/server/handle-add-discount";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch"
import FormError from "@/components/auth/form-error";
import { useRouter } from "next/navigation";

//------------------------------------------------------------------
//WE NEED TO THINK IFFFF WE NEED TO SETUP A BOOLEAN FOR EDIT OR ADD
//------------------------------------------------------------------


export const DiscountForm = () => {

  const router = useRouter();

  const form = useForm<z.infer<typeof DiscountSchema>>({
    resolver: zodResolver(DiscountSchema),
    defaultValues: {
      code: "",
      isFixed: true,
      amount: 0,
      canBeCombined: false,
      active: false,
      note: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof DiscountSchema>) => {
    const result = await handleAddDiscount(values);
    console.log(values);
    router.push('/admin/dashboard')
    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 ">
          
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Summer20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="isFixed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue="fixed"
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fixed" id="fixed" />
                          <Label htmlFor="fixed">Fixed</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="percentage" id="percentage" />
                          <Label htmlFor="r2">Percentage</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Name your price"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
                control={form.control}
                name="limits"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Limits</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="number"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
          control={form.control}
          name="expires"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expire Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Leave blank if there is no expiration date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
              <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-col">
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Label>Disabled</Label>
                        <Switch id="active" onCheckedChange={field.onChange}/>
                      <Label >Active</Label>
                    </div>
                  </FormControl>
              <FormDescription>
              </FormDescription>
            </FormItem>
          )}
        />
              <FormField
          control={form.control}
          name="canBeCombined"
          render={({ field }) => (
            <FormItem className="flex flex-col">
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Label>Single-use </Label>
                        <Switch id="canBeCombined" onCheckedChange={field.onChange}/>
                      <Label >Stackable</Label>
                    </div>
                  </FormControl>
              <FormDescription>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add note for this promotion..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormError message={"Cannot Upload Promotion For This Moment , But you can see in inspect that data works on click"} />
        </div>
        <Button type="submit" className="w-full">
          Add Promotion
        </Button>
          </div>
      </form>
    </Form>
  );
};