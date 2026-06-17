"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart.store";
import type { CartItemType } from "@/types/cart";

type ApiCartItem = {
  product: {
    id: string;
    title: string;
    images: string[];
    price: number;
    oldPrice?: number | null;
  };
  quantity: number;
};

type ApiCartResponse = {
  items: ApiCartItem[];
};

export const useCartSync = (isLoggedIn: boolean) => {
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    if (!isLoggedIn) return;

    const sync = async () => {
      try {
        // 1. sync local cart
        await fetch("/api/cart/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items }),
        });

        // 2. fetch DB cart
        const res = await fetch("/api/cart");
        if (!res.ok) return;

        const data: ApiCartResponse = await res.json();

        // 3. NORMALIZE → CartItemType (IMPORTANT PART)
        const normalized: CartItemType[] = data.items.map((i) => ({
          id: i.product.id,
          title: i.product.title,
          image: i.product.images?.[0] ?? "",
          price: i.product.price,
          oldPrice: i.product.oldPrice ?? undefined, // 🔥 FIX NULL
          quantity: i.quantity,
        }));

        useCartStore.setState({
          items: normalized,
        });
      } catch (error) {
        console.error("Cart sync error:", error);
      }
    };

    sync();
  }, [isLoggedIn]); // 🔥 ВАЖЛИВО: items прибрати
};

// "use client";

// import { useEffect } from "react";
// import { useCartStore } from "@/store/cart.store";

// type ApiCartItem = {
//   product: {
//     id: string;
//     title: string;
//     images: string[];
//     price: number;
//   };
//   quantity: number;
// };

// type ApiCartResponse = {
//   items: ApiCartItem[];
// };

// export const useCartSync = (isLoggedIn: boolean) => {
//   const items = useCartStore((s) => s.items);

//   useEffect(() => {
//     if (!isLoggedIn) return;

//     const sync = async () => {
//       try {
//         // 🔥 1. відправили локальний кошик
//         await fetch("/api/cart/sync", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ items }),
//         });

//         // 🔥 2. отримали кошик з БД
//         const res = await fetch("/api/cart");

//         if (!res.ok) {
//           console.error("Cart fetch failed:", res.status);
//           return;
//         }

//         const data: ApiCartResponse = await res.json();

//         // 🔥 3. перезаписали Zustand
//         useCartStore.setState({
//           items: data.items.map((i) => ({
//             id: i.product.id,
//             title: i.product.title,
//             image: i.product.images?.[0] ?? "",
//             price: i.product.price,
//             quantity: i.quantity,
//           })),
//         });
//       } catch (error) {
//         console.error("Cart sync error:", error);
//       }
//     };

//     sync();
//   }, [isLoggedIn, items]);
// };

// // "use client";

// // import { useEffect } from "react";
// // import { useCartStore } from "@/store/cart.store";

// // export const useCartSync = (isLoggedIn: boolean) => {
// //   const items = useCartStore((s) => s.items);

// //   useEffect(() => {
// //     if (!isLoggedIn) return;

// //     const sync = async () => {
// //       // 🔥 1. відправили локальний кошик
// //       await fetch("/api/cart/sync", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ items }),
// //       });

// //       // 🔥 2. отримали кошик з БД
// //       const res = await fetch("/api/cart");
// //       let data;

// //       try {
// //         data = await res.json();
// //       } catch (e) {
// //         console.error("JSON parse error", e);
// //         return;
// //       }
// //       //   const data = await res.json();

// //       // 🔥 3. перезаписали Zustand
// //       useCartStore.setState({
// //         items: data.items.map((i: any) => ({
// //           id: i.product.id,
// //           title: i.product.title,
// //           image: i.product.images[0],
// //           price: i.product.price,
// //           quantity: i.quantity,
// //         })),
// //       });
// //     };

// //     sync();
// //   }, [isLoggedIn]);
// // };
