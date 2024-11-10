
//Starting with creating a simple navbar to start our auth flow.
import { auth } from "@/server/auth"
import AdminButton from "../auth/Admin-button";
import LoginButton from "../auth/login-button";
import Link from "next/link";


export default async function NavBarClient(){

    const session = await auth();

    return (
        <nav className=" pt-4 pb-4 px-2 md:pt-6 md:pb-8">
            <ul className="flex justify-between items-center w-full">
                <li className="text-sm tracking-wider">
                    <Link href="/">PROMOTION-TRACKER</Link>
                </li>
                <li>
                    {session? (
                        <AdminButton expires={session.expires} user={session?.user}/>
                    )
                      : <LoginButton/>} 
                </li>
            </ul>
        </nav>
    )
}