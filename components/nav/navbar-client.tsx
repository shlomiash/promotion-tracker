
//Starting with creating a simple navbar to start our auth flow.
import { auth } from "@/server/auth"
import AdminButton from "../auth/Admin-button";
import LoginButton from "../auth/login-button";


export default async function NavBarClient(){

    const session = await auth();

    return (
        <nav className="pt-6 pb-8 px-4">
            <ul className="flex justify-between">
                <li>PROMOTION-TRACKER</li>
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