import { DiscountForm } from "@/components/admin/dashboard/adding-discounts/discount-form";
import WelcomeMessage from "@/components/admin/dashboard/welcome-message";

export default function AddPromotionPage() { 

    return (
        <section className="m-4">
            <WelcomeMessage message="Add Your Promotion"/>
            <DiscountForm/>
        </section>
    )
}