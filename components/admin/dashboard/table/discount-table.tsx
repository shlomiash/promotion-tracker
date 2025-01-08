'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { EditButton } from "./edit-button";
import { useQuery } from "@tanstack/react-query";
import { Discount } from "@/server/data/discounts";
import { getDiscounts } from "@/server/actions/get-data";
import { DeleteButton } from "./delete-button";


export default function DiscountTable() {

  // This optino is without fetch with api route , which i think its easier in nextjs
  const { data:discounts = [],isLoading} = useQuery<Discount[]>({
    queryKey:['discounts'],
    queryFn:getDiscounts,
  })

  if (isLoading) return <p>Loading...</p>;
          //UI and logic for the component

    return (
            <Table>
      <TableCaption>A list of your discounts.</TableCaption>
      <TableHeader>
        <TableRow>
          
          <TableHead >Code</TableHead>
          <TableHead >Status</TableHead>
          <TableHead>Limits</TableHead>
          <TableHead >Amount</TableHead>
          <TableHead >Expires</TableHead>
          <TableHead >Created At</TableHead>
          <TableHead >User_Id</TableHead>
          <TableHead >note</TableHead>
          <TableHead>EDIT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {  discounts?.map((discount) => (
          <TableRow key={discount.id}>
        
            <TableCell >{discount.code}</TableCell>
            <TableCell >{discount.active? <Badge className="bg-green-800">active</Badge> : <Badge className="bg-red-900" >disabled</Badge>}</TableCell>
            <TableCell>{discount.limits}</TableCell>
            <TableCell >
              <span>{discount.amount}</span>
              <span>{discount.isFixed? '₪' : '%'}</span>
              </TableCell>
            <TableCell >{discount.expires}</TableCell>
            <TableCell >{discount.createdAt?.toLocaleDateString()}</TableCell>
            <TableCell >{discount.userCreatedId}</TableCell>
            <TableCell >{discount.note}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <EditButton discount={discount}/>
                <DeleteButton discount={discount}/>
              </div>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        
    )   
}