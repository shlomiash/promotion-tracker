'use client'

import { Button } from "../ui/button";
import { Session } from "next-auth"
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";


export default function AdminButton({user}:Session) {
  return (
    <div className="flex gap-4">
        <Button variant={"link"}>
          <Link href="/admin/dashboard" >
            Dashboard
          </Link>
        </Button>
        <Button variant={"link"}>
          <Link href="/auth/register" >
            Register new Admin
          </Link>
        </Button>
        <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button onClick={()=> signOut({redirectTo: '/'})} >
            SignOut
        </Button>
    </div>
    
  );
}