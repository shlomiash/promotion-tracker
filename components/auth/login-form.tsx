//This is our login form component that will be used in the login page.

import AuthCard from "@/components/auth/auth-card";

export default function LoginForm() {
    return ( 
    <AuthCard backButtonHref="/" cardTitle="Nice to see you again!" backButtonLabel="Return to Homepage" >
        {/* This is where the login form will be */}
        <h1>LoginForm</h1>
    </AuthCard>
    )
}