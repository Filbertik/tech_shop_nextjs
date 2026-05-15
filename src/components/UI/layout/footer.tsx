"use client";

import Image from "next/image";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // email regex (простий і достатній)
  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async () => {
    setError("");

    if (!validateEmail(email)) {
      setError("Введіть коректний email");
      return;
    }

    try {
      setStatus("loading");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      setStatus("success");
      setEmail("");
      // } catch (e) {
    } catch {
      setStatus("error");
      setError("Помилка відправки. Спробуйте пізніше.");
    }
  };

  return (
    <footer className="w-full flex justify-center bg-[#1b264f] relative">
      {/* BG */}
      <div className="absolute inset-0">
        <Image
          src="/images/footer/footer.png"
          alt="footer bg"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative w-[1440px] h-[320px] pt-[40px] px-[80px] flex flex-col justify-between">
        <div className="flex justify-between">
          {/* Column 1 */}
          <div className="w-[209px]">
            <h3 className="text-white font-bold text-[18px] mb-4">Компанія</h3>
            <ul className="text-white text-[16px] space-y-2">
              <li className="hover:opacity-70 cursor-pointer">Про нас</li>
              <li className="hover:opacity-70 cursor-pointer">Партнерство</li>
              <li className="hover:opacity-70 cursor-pointer">Контакти</li>
              <li className="hover:opacity-70 cursor-pointer">
                Політика конфіденційності
              </li>
              <li className="hover:opacity-70 cursor-pointer">
                Договір публічної оферти
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="w-[166px]">
            <h3 className="text-white font-bold text-[18px] mb-4">Покупцям</h3>
            <ul className="text-white text-[16px] space-y-2">
              <li className="hover:opacity-70 cursor-pointer">Доставка</li>
              <li className="hover:opacity-70 cursor-pointer">Оплата</li>
              <li className="hover:opacity-70 cursor-pointer">Гарантія</li>
              <li className="hover:opacity-70 cursor-pointer">
                Повернення та обмін
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-[360px]">
            <h3 className="text-white font-bold text-[18px] mb-3">
              Не пропускай гарячі релізи та знижки
            </h3>

            <p className="text-white text-[16px] mb-4">
              Підпишись — ми надсилаємо тільки корисне.
            </p>

            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border rounded-[10px] px-[10px] py-[12px] w-[350px] h-[48px] mb-2 bg-transparent text-white outline-none
                ${error ? "border-red-500" : "border-[var(--bg2)]"}`}
            />

            {/* error */}
            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

            {/* success */}
            {status === "success" && (
              <p className="text-green-400 text-sm mb-2">
                Ви успішно підписались 🎉
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="rounded-[4px] px-[32px] py-[12px] w-[171px] h-[50px] bg-primary text-white disabled:opacity-50"
            >
              {status === "loading" ? "Відправка..." : "Підписатися"}
            </button>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-[16px]">
            <Image
              src="/images/footer/Telegram.png"
              alt="tg"
              width={28}
              height={28}
            />
            <Image
              src="/images/footer/Viber.svg"
              alt="viber"
              width={28}
              height={28}
            />
            <Image
              src="/images/footer/Instagram.png"
              alt="ig"
              width={28}
              height={28}
            />
            <Image
              src="/images/footer/Tiktok.png"
              alt="tt"
              width={28}
              height={28}
            />
            <Image
              src="/images/footer/Youtube.png"
              alt="yt"
              width={28}
              height={28}
            />
          </div>
        </div>

        <div className="flex justify-start pr-[80px] pt-[20px]">
          <p className="text-[16px] text-[var(--gray2)]">© 2025 TechHive</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// "use client";

// import Image from "next/image";

// const Footer = () => {
//   return (
//     <footer className="w-full flex justify-center bg-[#1b264f] relative">
//       {/* Background image */}
//       <div className="absolute inset-0">
//         <Image
//           src="/images/footer/footer.png"
//           alt="footer bg"
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Content */}
//       <div className="relative w-[1440px] h-[320px] pt-[40px] px-[80px] flex flex-col justify-between">
//         {/* Top content (4 columns) */}
//         <div className="flex justify-between">
//           {/* Column 1 */}
//           <div className="w-[209px]">
//             <h3 className="text-white font-bold text-[18px] leading-[150%] mb-4">
//               Компанія
//             </h3>
//             <ul className="text-white text-[16px] leading-[150%] space-y-2">
//               <li>Про нас</li>
//               <li>Партнерство</li>
//               <li>Контакти</li>
//               <li>Політика конфіденційності</li>
//               <li>Договір публічної оферти</li>
//             </ul>
//           </div>

//           {/* Column 2 */}
//           <div className="w-[166px]">
//             <h3 className="text-white font-bold text-[18px] leading-[150%] mb-4">
//               Покупцям
//             </h3>
//             <ul className="text-white text-[16px] leading-[150%] space-y-2">
//               <li>Доставка</li>
//               <li>Оплата</li>
//               <li>Гарантія</li>
//               <li>Повернення та обмін</li>
//             </ul>
//           </div>

//           {/* Column 3 */}
//           <div className="w-[360px]">
//             <h3 className="text-white font-bold text-[18px] leading-[150%] mb-3">
//               Не пропускай гарячі релізи та знижки
//             </h3>
//             <p className="text-white text-[16px] mb-4">
//               Підпишись — ми надсилаємо тільки корисне.
//             </p>

//             <input
//               type="email"
//               placeholder="email"
//               className="border border-[var(--bg2)] rounded-[10px] px-[10px] py-[12px] w-[350px] h-[48px] mb-3 bg-transparent text-white outline-none"
//             />

//             <button className="rounded-[4px] px-[32px] py-[12px] w-[171px] h-[50px] bg-primary text-white">
//               Підписатися
//             </button>
//           </div>

//           {/* Column 4 (Socials) */}
//           <div className="flex flex-col gap-[16px]">
//             <Image
//               src="/images/footer/Telegram.png"
//               alt="tg"
//               width={28}
//               height={28}
//             />
//             <Image
//               src="/images/footer/Viber.svg"
//               alt="viber"
//               width={28}
//               height={28}
//             />
//             <Image
//               src="/images/footer/Instagram.png"
//               alt="ig"
//               width={28}
//               height={28}
//             />
//             <Image
//               src="/images/footer/Tiktok.png"
//               alt="tt"
//               width={28}
//               height={28}
//             />
//             <Image
//               src="/images/footer/Youtube.png"
//               alt="yt"
//               width={28}
//               height={28}
//             />
//           </div>
//         </div>

//         {/* Bottom text */}
//         <div className="flex justify-start pr-[80px] pt-[20px]">
//           <p className="text-[16px] text-[var(--gray2)]">© 2026 TechHive</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// // "use client";

// // import { siteConfig } from "@/config/site.config";
// // import { usePathname } from "next/navigation";

// // const Footer = () => {
// //   const pathname = usePathname();

// //   const currentNavItem = siteConfig.navItems.find(
// //     (item) => item.href === pathname,
// //   );

// //   const pageTitle = currentNavItem ? currentNavItem.label : siteConfig.title;

// //   return (
// //     <div className="w-full flex justify-center my-6">
// //       <h1 className="text-3xl font-bold">{pageTitle}</h1>
// //       <h2>footer content</h2>
// //     </div>
// //   );
// // };

// // export default Footer;
