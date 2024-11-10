"use client";

import { Button } from "../ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminButton({ user }: Session) {
  return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
              <AvatarImage src={user?.image ?? undefined} />
              <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        <DropdownMenuItem> 
            <Link href="/" >
               Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem> 
            <Link href="/admin/dashboard" >
               Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/auth/register"  >
              Register new Admin
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-primary w-full rounded-2xl flex justify-center text-white mt-2">
            <span className="cursor-pointer " onClick={()=> signOut({redirectTo: '/'})}>SignOut</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
  );
}
