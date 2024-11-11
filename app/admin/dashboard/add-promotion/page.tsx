import { DiscountForm } from "@/components/admin/dashboard/adding-discounts/discount-form";
import NotAdminError from "@/components/admin/dashboard/not-admin-error";
import WelcomeMessage from "@/components/admin/dashboard/welcome-message";
import { auth } from "@/server/auth";

export default async function AddPromotionPage() { 

    const session = await auth();
    if(!session) return <NotAdminError />;

    return (
        <section className="m-4">
            <WelcomeMessage message="Add Your Promotion"/>
            <DiscountForm/>
        </section>
    )
}