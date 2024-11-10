
import AddPromotionButton from "@/components/admin/dashboard/adding-discounts/add-discount-button";
import AdminDashboard from "@/components/admin/dashboard/admin-dashboard";
import NotAdminError from "@/components/admin/dashboard/not-admin-error";
import WelcomeDashboard from "@/components/admin/dashboard/welcome-dashboard";
import { auth } from "@/server/auth";





export default async function Dashboard(){

    const session = await auth();
    if(!session) return <NotAdminError />;

    return (
        <main>
            <WelcomeDashboard/>
            <AddPromotionButton/>
            <AdminDashboard/>
        </main>
    )
}