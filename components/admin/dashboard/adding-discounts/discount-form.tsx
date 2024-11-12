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
import { CalendarIcon, TrendingUpDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch"
import FormError from "@/components/auth/form-error";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDiscountById } from "@/server/get-data";
import { useQuery } from "@tanstack/react-query";
import { Discount } from "@/server/data/discounts";
import { handleEditDiscount } from "@/server/handle-edit-discount";

//------------------------------------------------------------------
//WE NEED TO THINK IFFFF WE NEED TO SETUP A BOOLEAN FOR EDIT OR ADD
//------------------------------------------------------------------


export const DiscountForm = () => {

  const router = useRouter();

  const [error ,setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  
    const {data:discount} = useQuery<Discount | undefined>({
      queryKey:['discountById'],
      queryFn:() => getDiscountById(Number(id)),
      enabled: !!id,
    });

 

  const form = useForm<z.infer<typeof DiscountSchema>>({
    resolver: zodResolver(DiscountSchema),
    defaultValues: {
      code: discount?.code || "",
      expires: discount?.expires || undefined,
      isFixed: true,
      amount: 0,
      canBeCombined: false,
      active: false,
      note: "",
    },
  });

  // Update form values when `discount` is loaded
  useEffect(() => {
    if (discount) {
      form.reset({
        code: discount.code || "",
        isFixed: discount.isFixed ?? false, // Using nullish coalescing to handle undefined
        limits: discount.limits || undefined,
        expires: discount.expires || undefined,
        amount: discount.amount || 0,
        canBeCombined: discount.canBeCombined || false,
        active: discount.active || false,
        note: discount.note || "",
      });
    }
  }, [discount, form]);


  const onSubmit = async (values: z.infer<typeof DiscountSchema>) => {

    let result ;
    if(id) {
       result = await handleEditDiscount(values, Number(id));
      console.log('updated values are ' , values , 'id is ' , id);
      if(result?.error){
        setError(result.error);
        return;
      }
    }
    else{
       result = await handleAddDiscount(values);
       console.log(values);
       if(result?.data?.error){
        setError(result.data.error);
        return;
      }
    }

    

    
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
                        defaultValue={discount?.isFixed ? "fixed" : "percentage"}
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
                    selected={discount?.expires || undefined}
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
                        <Switch defaultChecked={discount?.active} onCheckedChange={field.onChange}/>
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
          <FormError message={error} />
        </div>
        <Button type="submit" className="w-full">
          Add Promotion
        </Button>
          </div>
      </form>
    </Form>
  );
};
