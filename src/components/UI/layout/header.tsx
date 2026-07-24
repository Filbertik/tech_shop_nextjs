"use client";

import { layoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import { Navbar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";

import CartModal from "@/components/cart/CartModal";

export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt={siteConfig.title}
      width={94}
      height={14}
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuth, status, setAuthState } = useAuthStore();
  const { openCart } = useCartStore();

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // ✅ ДОДАЛИ
  const openLogin = () => {
    setIsRegistrationOpen(false);
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegistrationOpen(true);
  };

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.error(error);
    }
    setAuthState("unauthenticated", null);
    router.push("/");
  };

  const getNavItems = () => {
    return siteConfig.navItems
      .filter((item) => item.href !== "/ingredients" || isAuth)
      .map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1 whitespace-nowrap
              ${isActive ? "text-blue-500" : "text-foreground"}
              hover:text-blue-300
              transition-colors duration-200`}
          >
            {item.label}
          </Link>
        );
      });
  };

  return (
    <>
      {/* 🔹 TOP BANNER */}
      <div
        className="w-full h-[48px] flex items-center justify-center text-white text-sm font-medium"
        style={{
          backgroundImage: "url('/80.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        Безкоштовна доставка від 2000₴
      </div>

      {/* 🔹 MAIN NAVBAR */}
      <div className="w-full bg-white flex justify-center">
        <div
          className="w-[1440px] px-[80px]"
          style={{ height: layoutConfig.headerHeight }}
        >
          <Navbar
            className="w-full bg-transparent px-0"
            style={{ height: layoutConfig.headerHeight }}
          >
            <div className="flex items-center w-full h-full">
              {/* LOGO */}
              <div className="w-[94px] mr-[74px] flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <Logo />
                </Link>
              </div>

              {/* NAV */}
              <div className="w-[407px] flex items-center gap-4 flex-shrink-0">
                {getNavItems()}
              </div>

              {/* SEARCH */}
              <div className="w-[390px] ml-[74px] relative flex-shrink-0">
                <input
                  type="text"
                  placeholder="Я шукаю..."
                  className="
                  w-[390px]
                  h-[44px]
                  px-[14px]
                  pr-[40px]
                  border border-[var(--borders)]
                  rounded-[4px]
                  outline-none
                  text-sm
                  "
                />
                <Image
                  src="/MagnifyingGlass.svg"
                  alt="search"
                  width={16}
                  height={16}
                  className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>

              {/* RIGHT SIDE */}
              <div className="w-[200px] ml-auto flex justify-end items-center gap-4 flex-shrink-0">
                {status === "loading" ? (
                  <p>Загрузка...</p>
                ) : !isAuth ? (
                  <>
                    <Button onPress={openLogin}>Логін</Button>
                    <Button onPress={openRegister}>Реєстрація</Button>
                  </>
                ) : (
                  <>
                    <Link href="/account?tab=orders">
                      <Image
                        src="/images/heder/Scales.svg"
                        alt="orders"
                        width={24}
                        height={24}
                      />
                    </Link>

                    <Link href="/account?tab=wishlist">
                      <Image
                        src="/images/heder/Heart.svg"
                        alt="wishlist"
                        width={24}
                        height={24}
                      />
                    </Link>

                    <Link href="/account?tab=account">
                      <Image
                        src="/images/heder/User.svg"
                        alt="account"
                        width={24}
                        height={24}
                      />
                    </Link>

                    <button onClick={openCart}>
                      <Image
                        src="/images/heder/ShoppingCartSimple.svg"
                        alt="cart"
                        width={24}
                        height={24}
                        className="cursor-pointer hover:opacity-70 transition"
                      />
                    </button>

                    <button
                      onClick={handleSignOut}
                      className="text-sm text-red-500 ml-2"
                    >
                      Вийти
                    </button>
                  </>
                )}
              </div>
            </div>
          </Navbar>
        </div>
      </div>

      {/* 🔹 MODALS */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        openLogin={openLogin} // ✅ ДОДАЛИ
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        openRegister={openRegister} // ✅ ДОДАЛИ
      />

      <CartModal />
    </>
  );
}

// "use client";

// import { layoutConfig } from "@/config/layout.config";
// import { siteConfig } from "@/config/site.config";
// import { Navbar, Button } from "@heroui/react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import RegistrationModal from "../modals/registration.modal";
// import LoginModal from "../modals/login.modal";
// import { useState } from "react";
// import { signOutFunc } from "@/actions/sign-out";
// import { useAuthStore } from "@/store/auth.store";
// import { useCartStore } from "@/store/cart.store"; //add cat

// // ✅ ДОДАЛИ
// import CartModal from "@/components/cart/CartModal";

// export const Logo = () => {
//   return (
//     <Image
//       src="/logo.png"
//       alt={siteConfig.title}
//       width={94}
//       height={14}
//       priority
//     />
//   );
// };

// export default function Header() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { isAuth, status, setAuthState } = useAuthStore();
//   const { openCart } = useCartStore(); //open cart

//   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);

//   const handleSignOut = async () => {
//     try {
//       await signOutFunc();
//     } catch (error) {
//       console.error(error);
//     }
//     setAuthState("unauthenticated", null);
//     router.push("/");
//   };

//   const getNavItems = () => {
//     return siteConfig.navItems
//       .filter((item) => item.href !== "/ingredients" || isAuth)
//       .map((item) => {
//         const isActive = pathname === item.href;

//         return (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={`px-3 py-1 whitespace-nowrap
//               ${isActive ? "text-blue-500" : "text-foreground"}
//               hover:text-blue-300
//               transition-colors duration-200`}
//           >
//             {item.label}
//           </Link>
//         );
//       });
//   };

//   return (
//     <>
//       {/* 🔹 TOP BANNER */}
//       <div
//         className="w-full h-[48px] flex items-center justify-center text-white text-sm font-medium"
//         style={{
//           backgroundImage: "url('/80.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         Безкоштовна доставка від 2000₴
//       </div>

//       {/* 🔹 MAIN NAVBAR */}
//       <div className="w-full bg-white flex justify-center">
//         <div
//           className="w-[1440px] px-[80px]"
//           style={{ height: layoutConfig.headerHeight }}
//         >
//           <Navbar
//             className="w-full bg-transparent px-0"
//             style={{ height: layoutConfig.headerHeight }}
//           >
//             <div className="flex items-center w-full h-full">
//               {/* LOGO */}
//               <div className="w-[94px] mr-[74px] flex-shrink-0">
//                 <Link href="/" className="flex items-center">
//                   <Logo />
//                 </Link>
//               </div>

//               {/* NAV */}
//               <div className="w-[407px] flex items-center gap-4 flex-shrink-0">
//                 {getNavItems()}
//               </div>

//               {/* SEARCH */}
//               <div className="w-[390px] ml-[74px] relative flex-shrink-0">
//                 <input
//                   type="text"
//                   placeholder="Я шукаю..."
//                   className="
//                   w-[390px]
//                   h-[44px]
//                   px-[14px]
//                   pr-[40px]
//                   border border-[var(--borders)]
//                   rounded-[4px]
//                   outline-none
//                   text-sm
//                   "
//                 />
//                 <Image
//                   src="/MagnifyingGlass.svg"
//                   alt="search"
//                   width={16}
//                   height={16}
//                   className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
//                 />
//               </div>

//               {/* RIGHT SIDE */}
//               <div className="w-[200px] ml-auto flex justify-end items-center gap-4 flex-shrink-0">
//                 {status === "loading" ? (
//                   <p>Загрузка...</p>
//                 ) : !isAuth ? (
//                   <>
//                     <Button onPress={() => setIsLoginOpen(true)}>Логін</Button>
//                     <Button onPress={() => setIsRegistrationOpen(true)}>
//                       Реєстрація
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Link href="/account?tab=orders">
//                       <Image
//                         src="/images/heder/Scales.svg"
//                         alt="orders"
//                         width={24}
//                         height={24}
//                       />
//                     </Link>

//                     <Link href="/account?tab=wishlist">
//                       <Image
//                         src="/images/heder/Heart.svg"
//                         alt="wishlist"
//                         width={24}
//                         height={24}
//                       />
//                     </Link>

//                     <Link href="/account?tab=account">
//                       <Image
//                         src="/images/heder/User.svg"
//                         alt="account"
//                         width={24}
//                         height={24}
//                       />
//                     </Link>

//                     <button onClick={openCart}>
//                       <Image
//                         src="/images/heder/ShoppingCartSimple.svg"
//                         alt="cart"
//                         width={24}
//                         height={24}
//                         className="cursor-pointer hover:opacity-70 transition"
//                       />
//                     </button>

//                     {/* <Link href="/cart">
//                       <Image
//                         src="/images/heder/ShoppingCartSimple.svg"
//                         alt="cart"
//                         width={24}
//                         height={24}
//                       />
//                     </Link> */}

//                     <button
//                       onClick={handleSignOut}
//                       className="text-sm text-red-500 ml-2"
//                     >
//                       Вийти
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </Navbar>
//         </div>
//       </div>

//       {/* 🔹 MODALS */}
//       <RegistrationModal
//         isOpen={isRegistrationOpen}
//         onClose={() => setIsRegistrationOpen(false)}
//       />
//       <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

//       {/* ✅ ОСЬ ТУТ ДОДАЛИ */}
//       <CartModal />
//     </>
//   );
// }

// // "use client";

// // import { layoutConfig } from "@/config/layout.config";
// // import { siteConfig } from "@/config/site.config";
// // import { Navbar, Button } from "@heroui/react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { usePathname, useRouter } from "next/navigation";
// // import RegistrationModal from "../modals/registration.modal";
// // import LoginModal from "../modals/login.modal";
// // import { useState } from "react";
// // import { signOutFunc } from "@/actions/sign-out";
// // import { useAuthStore } from "@/store/auth.store";

// // export const Logo = () => {
// //   return (
// //     <Image
// //       src="/logo.png"
// //       alt={siteConfig.title}
// //       width={94}
// //       height={14}
// //       priority
// //     />
// //   );
// // };

// // export default function Header() {
// //   const pathname = usePathname();
// //   const router = useRouter();
// //   const { isAuth, status, setAuthState } = useAuthStore();

// //   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
// //   const [isLoginOpen, setIsLoginOpen] = useState(false);

// //   const handleSignOut = async () => {
// //     try {
// //       await signOutFunc();
// //     } catch (error) {
// //       console.error(error);
// //     }
// //     setAuthState("unauthenticated", null);
// //     router.push("/");
// //   };

// //   const getNavItems = () => {
// //     return siteConfig.navItems
// //       .filter((item) => item.href !== "/ingredients" || isAuth)
// //       .map((item) => {
// //         const isActive = pathname === item.href;

// //         return (
// //           <Link
// //             key={item.href}
// //             href={item.href}
// //             className={`px-3 py-1 whitespace-nowrap
// //               ${isActive ? "text-blue-500" : "text-foreground"}
// //               hover:text-blue-300
// //               transition-colors duration-200`}
// //           >
// //             {item.label}
// //           </Link>
// //         );
// //       });
// //   };

// //   return (
// //     <>
// //       {/* 🔹 TOP BANNER */}
// //       <div
// //         className="w-full h-[48px] flex items-center justify-center text-white text-sm font-medium"
// //         style={{
// //           backgroundImage: "url('/80.png')",
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //         }}
// //       >
// //         Безкоштовна доставка від 2000₴
// //       </div>

// //       {/* 🔹 MAIN NAVBAR */}
// //       <div className="w-full bg-white flex justify-center">
// //         <div
// //           className="w-[1440px] px-[80px]"
// //           style={{ height: layoutConfig.headerHeight }}
// //         >
// //           <Navbar
// //             className="w-full bg-transparent px-0"
// //             style={{ height: layoutConfig.headerHeight }}
// //           >
// //             <div className="flex items-center w-full h-full">
// //               {/* LOGO */}
// //               <div className="w-[94px] mr-[74px] flex-shrink-0">
// //                 <Link href="/" className="flex items-center">
// //                   <Logo />
// //                 </Link>
// //               </div>

// //               {/* NAV */}
// //               <div className="w-[407px] flex items-center gap-4 flex-shrink-0">
// //                 {getNavItems()}
// //               </div>

// //               {/* SEARCH */}
// //               <div className="w-[390px] ml-[74px] relative flex-shrink-0">
// //                 <input
// //                   type="text"
// //                   placeholder="Я шукаю..."
// //                   className="
// //                   w-[390px]
// //                   h-[44px]
// //                   px-[14px]
// //                   pr-[40px]
// //                   border border-[var(--borders)]
// //                   rounded-[4px]
// //                   outline-none
// //                   text-sm
// //                   "
// //                 />
// //                 <Image
// //                   src="/MagnifyingGlass.svg"
// //                   alt="search"
// //                   width={16}
// //                   height={16}
// //                   className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
// //                 />
// //               </div>

// //               {/* RIGHT SIDE */}
// //               <div className="w-[200px] ml-auto flex justify-end items-center gap-4 flex-shrink-0">
// //                 {status === "loading" ? (
// //                   <p>Загрузка...</p>
// //                 ) : !isAuth ? (
// //                   <>
// //                     <Button onPress={() => setIsLoginOpen(true)}>Логін</Button>
// //                     <Button onPress={() => setIsRegistrationOpen(true)}>
// //                       Реєстрація
// //                     </Button>
// //                   </>
// //                 ) : (
// //                   <>
// //                     {/* ORDERS */}
// //                     <Link href="/account?tab=orders">
// //                       <Image
// //                         src="/images/heder/Scales.svg"
// //                         alt="orders"
// //                         width={24}
// //                         height={24}
// //                         className="cursor-pointer hover:opacity-70 transition"
// //                       />
// //                     </Link>

// //                     {/* WISHLIST */}
// //                     <Link href="/account?tab=wishlist">
// //                       <Image
// //                         src="/images/heder/Heart.svg"
// //                         alt="wishlist"
// //                         width={24}
// //                         height={24}
// //                         className="cursor-pointer hover:opacity-70 transition"
// //                       />
// //                     </Link>

// //                     {/* ACCOUNT */}
// //                     <Link href="/account?tab=account">
// //                       <Image
// //                         src="/images/heder/User.svg"
// //                         alt="account"
// //                         width={24}
// //                         height={24}
// //                         className="cursor-pointer hover:opacity-70 transition"
// //                       />
// //                     </Link>

// //                     {/* CART */}
// //                     <Link href="/cart">
// //                       <Image
// //                         src="/images/heder/ShoppingCartSimple.svg"
// //                         alt="cart"
// //                         width={24}
// //                         height={24}
// //                         className="cursor-pointer hover:opacity-70 transition"
// //                       />
// //                     </Link>

// //                     {/* LOGOUT (опціонально) */}
// //                     <button
// //                       onClick={handleSignOut}
// //                       className="text-sm text-red-500 ml-2"
// //                     >
// //                       Вийти
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //             </div>
// //           </Navbar>
// //         </div>
// //       </div>

// //       {/* 🔹 MODALS */}
// //       <RegistrationModal
// //         isOpen={isRegistrationOpen}
// //         onClose={() => setIsRegistrationOpen(false)}
// //       />
// //       <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
// //     </>
// //   );
// // }

// // // "use client";

// // // import { layoutConfig } from "@/config/layout.config";
// // // import { siteConfig } from "@/config/site.config";
// // // import { Navbar, Button } from "@heroui/react";
// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import { usePathname } from "next/navigation";
// // // import RegistrationModal from "../modals/registration.modal";
// // // import LoginModal from "../modals/login.modal";
// // // import { useState } from "react";
// // // import { signOutFunc } from "@/actions/sign-out";
// // // import { useAuthStore } from "@/store/auth.store";

// // // export const Logo = () => {
// // //   return (
// // //     <Image
// // //       src="/logo.png"
// // //       alt={siteConfig.title}
// // //       width={94}
// // //       height={14}
// // //       priority
// // //     />
// // //   );
// // // };

// // // export default function Header() {
// // //   const pathname = usePathname();
// // //   const { isAuth, session, status, setAuthState } = useAuthStore();

// // //   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
// // //   const [isLoginOpen, setIsLoginOpen] = useState(false);

// // //   const handleSignOut = async () => {
// // //     try {
// // //       await signOutFunc();
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //     setAuthState("unauthenticated", null);
// // //   };

// // //   const getNavItems = () => {
// // //     return siteConfig.navItems
// // //       .filter((item) => item.href !== "/ingredients" || isAuth)
// // //       .map((item) => {
// // //         const isActive = pathname === item.href;

// // //         return (
// // //           <Link
// // //             key={item.href}
// // //             href={item.href}
// // //             className={`px-3 py-1 whitespace-nowrap
// // //               ${isActive ? "text-blue-500" : "text-foreground"}
// // //               hover:text-blue-300
// // //               transition-colors duration-200`}
// // //           >
// // //             {item.label}
// // //           </Link>
// // //         );
// // //       });
// // //   };

// // //   return (
// // //     <>
// // //       {/* 🔹 TOP BANNER */}
// // //       <div
// // //         className="w-full h-[48px] flex items-center justify-center text-white text-sm font-medium"
// // //         style={{
// // //           backgroundImage: "url('/80.png')",
// // //           backgroundSize: "cover",
// // //           backgroundPosition: "center",
// // //         }}
// // //       >
// // //         Безкоштовна доставка від 2000₴
// // //       </div>

// // //       {/* 🔹 MAIN NAVBAR */}
// // //       <div className="w-full bg-white flex justify-center">
// // //         <div
// // //           className="w-[1440px] px-[80px]"
// // //           style={{ height: layoutConfig.headerHeight }}
// // //         >
// // //           <Navbar
// // //             className="w-full bg-transparent px-0"
// // //             style={{ height: layoutConfig.headerHeight }}
// // //           >
// // //             <div className="flex items-center w-full h-full">
// // //               {/* LOGO */}
// // //               <div className="w-[94px] mr-[74px] flex-shrink-0">
// // //                 <Link href="/" className="flex items-center">
// // //                   <Logo />
// // //                 </Link>
// // //               </div>

// // //               {/* NAV */}
// // //               <div className="w-[407px] flex items-center gap-4 flex-shrink-0">
// // //                 {getNavItems()}
// // //               </div>

// // //               {/* SEARCH */}
// // //               <div className="w-[390px] ml-[74px] relative flex-shrink-0">
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Я шукаю..."
// // //                   className="
// // //                   w-[390px]
// // //                   h-[44px]
// // //                   px-[14px]
// // //                   pr-[40px]
// // //                   border border-[var(--borders)]
// // //                   rounded-[4px]
// // //                   outline-none
// // //                   text-sm
// // //                   "
// // //                 />
// // //                 <Image
// // //                   src="/MagnifyingGlass.svg"
// // //                   alt="search"
// // //                   width={16}
// // //                   height={16}
// // //                   className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
// // //                 />
// // //               </div>

// // //               {/* RIGHT SIDE */}
// // //               <div className="w-[168px] ml-auto flex justify-end items-center gap-2 flex-shrink-0">
// // //                 {status === "loading" ? (
// // //                   <p>Загрузка...</p>
// // //                 ) : !isAuth ? (
// // //                   <>
// // //                     <Button
// // //                       className="w-[80px]"
// // //                       onPress={() => setIsLoginOpen(true)}
// // //                     >
// // //                       Логін
// // //                     </Button>
// // //                     <Button
// // //                       className="w-[80px]"
// // //                       onPress={() => setIsRegistrationOpen(true)}
// // //                     >
// // //                       Реєстрація
// // //                     </Button>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     {/* 🔥 КЛІКАБЕЛЬНИЙ EMAIL */}
// // //                     <Link href="/account">
// // //                       <span
// // //                         className="
// // //                         text-sm
// // //                         truncate
// // //                         max-w-[120px]
// // //                         cursor-pointer
// // //                         hover:text-blue-500
// // //                         transition-colors
// // //                       "
// // //                       >
// // //                         {session?.user?.email}
// // //                       </span>
// // //                     </Link>

// // //                     <Button onPress={handleSignOut}>Вихід</Button>
// // //                   </>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </Navbar>
// // //         </div>
// // //       </div>

// // //       {/* 🔹 MODALS */}
// // //       <RegistrationModal
// // //         isOpen={isRegistrationOpen}
// // //         onClose={() => setIsRegistrationOpen(false)}
// // //       />
// // //       <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
// // //     </>
// // //   );
// // // }

// // // // "use client";

// // // // import { layoutConfig } from "@/config/layout.config";
// // // // import { siteConfig } from "@/config/site.config";
// // // // import { Navbar, Button } from "@heroui/react";
// // // // import Image from "next/image";
// // // // import Link from "next/link";
// // // // import { usePathname } from "next/navigation";
// // // // import RegistrationModal from "../modals/registration.modal";
// // // // import LoginModal from "../modals/login.modal";
// // // // import { useState } from "react";
// // // // import { signOutFunc } from "@/actions/sign-out";
// // // // import { useAuthStore } from "@/store/auth.store";

// // // // export const Logo = () => {
// // // //   return (
// // // //     <Image
// // // //       src="/logo.png"
// // // //       alt={siteConfig.title}
// // // //       width={94}
// // // //       height={14}
// // // //       priority
// // // //     />
// // // //   );
// // // // };

// // // // export default function Header() {
// // // //   const pathname = usePathname();
// // // //   const { isAuth, session, status, setAuthState } = useAuthStore();

// // // //   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
// // // //   const [isLoginOpen, setIsLoginOpen] = useState(false);

// // // //   const handleSignOut = async () => {
// // // //     try {
// // // //       await signOutFunc();
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //     }
// // // //     setAuthState("unauthenticated", null);
// // // //   };

// // // //   const getNavItems = () => {
// // // //     return siteConfig.navItems
// // // //       .filter((item) => item.href !== "/ingredients" || isAuth)
// // // //       .map((item) => {
// // // //         const isActive = pathname === item.href;

// // // //         return (
// // // //           <Link
// // // //             key={item.href}
// // // //             href={item.href}
// // // //             className={`px-3 py-1 whitespace-nowrap
// // // //               ${isActive ? "text-blue-500" : "text-foreground"}
// // // //               hover:text-blue-300
// // // //               transition-colors duration-200`}
// // // //           >
// // // //             {item.label}
// // // //           </Link>
// // // //         );
// // // //       });
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* 🔹 TOP BANNER */}
// // // //       <div
// // // //         className="w-full h-[48px] flex items-center justify-center text-white text-sm font-medium"
// // // //         style={{
// // // //           backgroundImage: "url('/80.png')",
// // // //           backgroundSize: "cover",
// // // //           backgroundPosition: "center",
// // // //         }}
// // // //       >
// // // //         Безкоштовна доставка від 2000₴
// // // //       </div>

// // // //       {/* 🔹 MAIN NAVBAR */}
// // // //       <div className="w-full bg-white flex justify-center">
// // // //         <div
// // // //           className="w-[1440px] px-[80px]"
// // // //           style={{ height: layoutConfig.headerHeight }}
// // // //         >
// // // //           <Navbar
// // // //             className="w-full bg-transparent px-0"
// // // //             style={{ height: layoutConfig.headerHeight }}
// // // //           >
// // // //             <div className="flex items-center w-full h-full">
// // // //               {/* LOGO */}
// // // //               <div className="w-[94px] mr-[74px] flex-shrink-0">
// // // //                 <Link href="/" className="flex items-center">
// // // //                   <Logo />
// // // //                 </Link>
// // // //               </div>

// // // //               {/* NAV */}
// // // //               <div className="w-[407px] flex items-center gap-4 flex-shrink-0">
// // // //                 {getNavItems()}
// // // //               </div>

// // // //               {/* SEARCH */}
// // // //               <div className="w-[390px] ml-[74px] relative flex-shrink-0">
// // // //                 {/* <input
// // // //                   type="text"
// // // //                   placeholder="Я шукаю..."
// // // //                   className="w-full h-full pl-[14px] pr-[40px]
// // // //                   border border-[var(--borders)] rounded-[4px]
// // // //                   outline-none text-sm"
// // // //                 /> */}

// // // //                 <input
// // // //                   type="text"
// // // //                   placeholder="Я шукаю..."
// // // //                   className="
// // // //                   w-[390px]
// // // //                   h-[44px]
// // // //                   px-[14px]
// // // //                   pr-[40px]
// // // //                   border border-[var(--borders)]
// // // //                   rounded-[4px]
// // // //                   outline-none
// // // //                   text-sm
// // // //                   "
// // // //                 />
// // // //                 {/* <input
// // // //                   type="text"
// // // //                   placeholder="Я шукаю..."
// // // //                   className="
// // // //                   w-[390px]
// // // //                   h-[44px]
// // // //                   px-[14px]
// // // //                   pr-[40px]
// // // //                   border border-[var(--borders)]
// // // //                   rounded-[4px]
// // // //                   outline-none
// // // //                   text-sm
// // // //                   "
// // // //                 /> */}
// // // //                 <Image
// // // //                   src="/MagnifyingGlass.svg"
// // // //                   alt="search"
// // // //                   width={16}
// // // //                   height={16}
// // // //                   className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
// // // //                 />
// // // //               </div>

// // // //               {/* RIGHT SIDE */}
// // // //               <div className="w-[168px] ml-auto flex justify-end items-center gap-2 flex-shrink-0">
// // // //                 {status === "loading" ? (
// // // //                   <p>Загрузка...</p>
// // // //                 ) : !isAuth ? (
// // // //                   <>
// // // //                     <Button
// // // //                       className="w-[80px]"
// // // //                       onPress={() => setIsLoginOpen(true)}
// // // //                     >
// // // //                       Логін
// // // //                     </Button>
// // // //                     <Button
// // // //                       className="w-[80px]"
// // // //                       onPress={() => setIsRegistrationOpen(true)}
// // // //                     >
// // // //                       Реєстрація
// // // //                     </Button>
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <span className="text-sm truncate max-w-[120px]">
// // // //                       {session?.user?.email}
// // // //                     </span>
// // // //                     <Button onPress={handleSignOut}>Вихід</Button>
// // // //                   </>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </Navbar>
// // // //         </div>
// // // //       </div>

// // // //       {/* 🔹 MODALS */}
// // // //       <RegistrationModal
// // // //         isOpen={isRegistrationOpen}
// // // //         onClose={() => setIsRegistrationOpen(false)}
// // // //       />
// // // //       <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
// // // //     </>
// // // //   );
// // // // }
