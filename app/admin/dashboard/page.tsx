
import NotAdminError from "@/components/admin/dashboard/not-admin-error";
import { auth } from "@/server/auth";


export default async function Dashboard(){

    const session = await auth();
    if(!session) return <NotAdminError />;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Admin Dashboard</p>
        </div>
    )
}