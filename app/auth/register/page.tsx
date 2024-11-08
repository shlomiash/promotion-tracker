import NotAdminError from "@/components/admin/dashboard/not-admin-error";
import { RegisterForm } from "@/components/auth/register-form";
import { auth } from "@/server/auth";

export default async function RegisterPage() {

    const session = await auth();
    if(!session) return <NotAdminError />;

  return <RegisterForm/>
}