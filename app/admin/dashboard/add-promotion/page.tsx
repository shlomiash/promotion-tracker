import { DiscountForm } from "@/components/admin/dashboard/adding-discounts/discount-form";
import NotAdminError from "@/components/admin/dashboard/not-admin-error";
import WelcomeMessage from "@/components/admin/dashboard/welcome-message";
import { auth } from "@/server/auth";

//Add Promotion Page
export default async function AddPromotionPage() { 

    // Check if the user is an admin
    const session = await auth();
    if(!session) return <NotAdminError />;

    

    return (
        <section className="m-4">
            <WelcomeMessage message="Add Your Promotion"/>
            <DiscountForm/>
        </section>
    )
}