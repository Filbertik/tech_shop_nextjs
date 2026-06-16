"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import AccountSidebar from "@/components/account/AccountSidebar";
import AccountContent from "@/components/account/AccountContent";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 👉 беремо tab з URL
  const tabFromUrl = searchParams.get("tab") || "account";

  const [active, setActive] = useState(tabFromUrl);

  // ✅ синхронізація при зміні URL (наприклад клік по header)
  useEffect(() => {
    setActive(tabFromUrl);
  }, [tabFromUrl]);

  // ✅ кастомний setActive який ще й міняє URL
  const handleSetActive = (value: string) => {
    setActive(value);
    router.push(`/account?tab=${value}`);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1200px] flex flex-col items-start pt-[40px]">
        {/* ================= BREADCRUMBS ================= */}
        <div className="flex items-center gap-2 text-[16px] text-gray-500">
          <Link href="/">Головна</Link>
          <Image
            src="/images/Catalog/caret-right.svg"
            alt="arrow"
            width={16}
            height={16}
          />
          <span>Мій акаунт</span>
        </div>

        {/* ================= TITLE ================= */}
        <h1 className="mt-[28px] text-[24px] font-semibold text-black">
          Мій акаунт
        </h1>

        {/* ================= MAIN ================= */}
        <div className="mt-[28px] flex gap-[32px]">
          <AccountSidebar active={active} setActive={handleSetActive} />
          <AccountContent active={active} />
        </div>
      </div>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// import AccountSidebar from "@/components/account/AccountSidebar";
// import AccountContent from "@/components/account/AccountContent";

// export default function Page() {
//   const [active, setActive] = useState("account");

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-[1200px] flex flex-col items-start pt-[40px]">
//         {/* ================= BREADCRUMBS ================= */}
//         <div className="flex items-center gap-2 text-[16px] text-gray-500">
//           <Link href="/">Головна</Link>
//           <Image
//             src="/images/Catalog/caret-right.svg"
//             alt="arrow"
//             width={16}
//             height={16}
//           />
//           <span>Мій акаунт</span>
//         </div>

//         {/* ================= TITLE ================= */}
//         <h1 className="mt-[28px] text-[24px] font-semibold text-black text-right">
//           Мій акаунт
//         </h1>

//         {/* ================= MAIN ================= */}
//         <div className="mt-[28px] flex gap-[32px]">
//           <AccountSidebar active={active} setActive={setActive} />
//           <AccountContent active={active} />
//         </div>
//       </div>
//     </div>
//   );
// }

// // export default function Page() {
// //   return (
// //     <div style={{ padding: "40px" }}>
// //       {/* <div style={ padding: "40px" }> */}

// //       <h1>Account Page</h1>
// //       {/* <p>Це заготовка сторінки "Account Page".</p> */}
// //       <p>{`Це заготовка сторінки "Account Page".`}</p>
// //     </div>
// //   );
// // }
