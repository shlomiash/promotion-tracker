'use client';

import { useCallback, useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"


  type Discount = {
    id: number;
    code: string;
    limits: number;
    amount: string;
    userCreatedId: number;
    note: string;
    createdAt: string;
    expires: string;
    canBeCombined: boolean;
    active: boolean;
  }


export default function DiscountTable() {

    const [data, setData] = useState<Discount[] | null>(null);

    const getAllDiscounts = useCallback(async () => {
        const response = await fetch('/api/discount');
        const result = await response.json();
        setData(result);
        
    }, []);

    useEffect(() => {
        getAllDiscounts();
    },[]);


    return (
            <Table>
      <TableCaption>A list of your discounts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden font-medium">ID</TableHead>
          <TableHead >Code</TableHead>
          <TableHead >Status</TableHead>
          <TableHead>Limits</TableHead>
          <TableHead className="hidden md:table-cell" >Amount</TableHead>
          <TableHead className="hidden">User_Id</TableHead>
          <TableHead className="hidden" >Expires</TableHead>
          <TableHead className="hidden">Created At</TableHead>
          <TableHead className="hidden">note</TableHead>
          <TableHead>EDIT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((discount) => (
          <TableRow key={discount.id}>
            <TableCell className="hidden font-medium">{discount.id}</TableCell>
            <TableCell >{discount.code}</TableCell>
            <TableCell >{discount.active? <Badge className="bg-green-800">active</Badge> : <Badge className="bg-red-900" >disabled</Badge>}</TableCell>
            <TableCell>{discount.limits}</TableCell>
            <TableCell className="hidden md:table-cell">{discount.amount}</TableCell>
            <TableCell className="hidden">{discount.expires}</TableCell>
            <TableCell className="hidden">{discount.createdAt}</TableCell>
            <TableCell className="hidden">{discount.userCreatedId}</TableCell>
            <TableCell className="hidden">{discount.note}</TableCell>
            <TableCell><Button>EDIT</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        
    )   
}