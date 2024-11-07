//This is a reusable component that has some of the same logic as the login and register pages. It is used in the login and register pages to display the form and handle the form submission.

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "../ui/button";
import Link from "next/link";
import BackButton from "./back-button";

type AuthCardProps = {
    children: React.ReactNode;
    cardTitle: string;
    backButtonHref: string;
    backButtonLabel: string;
}

export default function AuthCard({children,cardTitle,backButtonHref,backButtonLabel} : AuthCardProps){
    return (
        //Card Componenet from shadcn helps us to create a card with a title, content and footer.
    <Card>
        <CardHeader>
            <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        <CardFooter>
           <Button variant={"link"} asChild>
                {/* Back button as a different component makes the code more readble and nicer */}
                <BackButton label={backButtonLabel} href={backButtonHref}/>
           </Button>
        </CardFooter>
    </Card>
    )
}