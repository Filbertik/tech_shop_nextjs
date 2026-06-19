import Link from "next/link";
import Image from "next/image";

import ContactInfo from "@/components/checkout/ContactInfo";
import DeliveryAddress from "@/components/checkout/DeliveryAddress";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function Page() {
  return (
    <div className="max-w-[1210px] mx-auto px-4 py-10">
      {/* ================= BREADCRUMBS ================= */}
      <div className="flex items-center gap-2 text-[16px] text-gray-500">
        <Link href="/">Головна</Link>

        <Image
          src="/images/Catalog/caret-right.svg"
          alt="arrow"
          width={16}
          height={16}
        />

        <span>Оформлення замовлення</span>
      </div>

      {/* ================= TITLE ================= */}
      <h1 className="mt-7 text-[24px] font-semibold text-center">
        Оформлення замовлення
      </h1>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="mt-7 flex gap-10 items-start">
        {/* LEFT BLOCK */}
        <div className="w-[643px] flex flex-col gap-6">
          <ContactInfo />
          <DeliveryAddress />
          <PaymentMethod />
        </div>

        {/* RIGHT BLOCK */}
        <div className="w-[526px]">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

// export default function Page() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Checkout Page</h1>
//       <p>`Це заготовка сторінки Checkout Page.`</p>
//     </div>
//   );
// }
