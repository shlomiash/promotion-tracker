export default function DiscountError({code}:{code:string}) {
    if (!code) return <p className="pt-2 text-[#FF0000] text-[12px]">Promo Code consists from at least 1 letter.</p>;
    return null
}