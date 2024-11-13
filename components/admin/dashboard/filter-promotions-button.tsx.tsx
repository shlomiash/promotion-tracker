import CouponsByDate from "./reports/coupons-by-date";
import CouponsByUser from "./reports/coupons-user-button";
import ExportCVButton from "./reports/export-cv-button";

export default function FilterPromotionsButtons(){
    return (
        <div className="w-full flex justify-end gap-6 mt-8 mb-8 px-4">
            <ExportCVButton/>
            <CouponsByDate/>
            <CouponsByUser/>
        </div>
    )
}