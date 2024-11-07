//Starting with creating a simple navbar to start our auth flow.

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NavBarClient(){
    return (
        <nav className="pt-6 pb-8 px-4">
            <ul className="flex justify-between">
                <li>PROMOTION-TRACKER</li>
                <li>
                    <Button asChild>
                        <Link href="auth/login">Login</Link>
                    </Button>  
                </li>
            </ul>
        </nav>
    )
}