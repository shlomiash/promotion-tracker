
import AddPromotionButton from "@/components/admin/dashboard/adding-discounts/add-discount-button";
import AdminDashboard from "@/components/admin/dashboard/admin-dashboard";
import FilterPromotionsButtons from "@/components/admin/dashboard/filter-promotions-button.tsx";
import NotAdminError from "@/components/admin/dashboard/not-admin-error";
import WelcomeMessage from "@/components/admin/dashboard/welcome-message";
import { auth } from "@/server/auth";

export default async function Dashboard(){

    const session = await auth();
    if(!session) return <NotAdminError />;

    return (
        <main>
            <WelcomeMessage message="Welcome Dashboard"/>
            <AddPromotionButton/>
            <AdminDashboard/>
            <FilterPromotionsButtons/>
        </main>
    )
}