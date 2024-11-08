'use client'

import { Button } from "../ui/button";
import { Session } from "next-auth"
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function AdminButton({user}:Session) {
  return (
    <div className="flex gap-4">
        <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button variant={"link"} onClick={()=> signOut({redirectTo: '/'})} >
            Signout
        </Button>
    </div>
    
  );
}