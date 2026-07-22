"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItemType } from "@/types/cart";

// type CartState = {
//   items: CartItemType[];
//   isOpen: boolean;

//   addItem: (item: CartItemType) => void;
//   remove: (id: string) => void;
//   increase: (id: string) => void;
//   decrease: (id: string) => void;
//   clear: () => void;
//   openCart: () => void;
//   closeCart: () => void;
// };
type OrderData = {
  orderNumber: string;
  date: string;
  total: number;
  paymentMethod: string;
};

type CartState = {
  items: CartItemType[];
  isOpen: boolean;
  orderData: OrderData | null;

  addItem: (item: CartItemType) => void;
  remove: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;

  clear: () => void;
  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;

  setOrderData: (data: OrderData) => void;
};
// type CartState = {
//   items: CartItemType[];
//   isOpen: boolean;
//   orderData: OrderData | null;

//   addItem: (item: CartItemType) => void;
//   remove: (id: string) => void;
//   increase: (id: string) => void;
//   decrease: (id: string) => void;
//   clear: () => void;
//   openCart: () => void;
//   closeCart: () => void;

//   setOrderData: (data: OrderData) => void;
// };
// type OrderData = {
//   orderNumber: string;
//   date: string;
//   total: number;
//   paymentMethod: string;
// };

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      orderData: null,
      clearCart: () => set({ items: [], orderData: null }),

      addItem: (item) => {
        const quantity = item.quantity ?? 1;

        const existing = get().items.find((i) => i.id === item.id);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...get().items, { ...item, quantity }],
            isOpen: true,
          });
        }
      },

      remove: (id) => {
        set({
          items: get().items.filter((i) => i.id !== id),
        });
      },

      increase: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        });
      },

      decrease: (id) => {
        set({
          items: get()
            .items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
            )
            .filter((i) => i.quantity > 0), // 🔥 якщо 0 — видаляємо
        });
      },

      // clear: () => set({ items: [] }),
      clear: () => set({ items: [], orderData: null }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setOrderData: (data) => set({ orderData: data }),
    }),
    {
      name: "cart-storage", // 🔥 ключ в localStorage
    },
  ),
);

// "use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export type CartItemType = {
//   id: string;
//   title: string;
//   price: number;
//   oldPrice?: number;
//   image: string;
//   quantity: number;
// };

// type CartState = {
//   items: CartItemType[];
//   isOpen: boolean;

//   openCart: () => void;
//   closeCart: () => void;

//   addItem: (item: CartItemType) => void;
//   removeItem: (id: string) => void;
//   clearCart: () => void;

//   // ✅ ДОДАЛИ ТИПИ
//   increase: (id: string) => void;
//   decrease: (id: string) => void;
// };

// export const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isOpen: false,

//       openCart: () => set({ isOpen: true }),
//       closeCart: () => set({ isOpen: false }),
//       addItem: (item) => {
//         const quantity = item.quantity ?? 1; // ✅ гарантія

//         const existing = get().items.find((i) => i.id === item.id);

//         if (existing) {
//           set({
//             items: get().items.map((i) =>
//               i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
//             ),
//             isOpen: true,
//           });
//         } else {
//           set({
//             items: [...get().items, { ...item, quantity }], // ✅
//             isOpen: true,
//           });
//         }
//       },

//       // addItem: (item) => {
//       //   const existing = get().items.find((i) => i.id === item.id);

//       //   if (existing) {
//       //     set({
//       //       items: get().items.map((i) =>
//       //         i.id === item.id
//       //           ? { ...i, quantity: i.quantity + item.quantity }
//       //           : i,
//       //       ),
//       //       isOpen: true,
//       //     });
//       //   } else {
//       //     set({
//       //       items: [...get().items, item],
//       //       isOpen: true,
//       //     });
//       //   }
//       // },

//       // ✅ 🔥 ОСЬ СЮДИ ДОДАЛИ
//       increase: (id) =>
//         set({
//           items: get().items.map((i) =>
//             i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
//           ),
//         }),

//       decrease: (id) =>
//         set({
//           items: get()
//             .items.map((i) =>
//               i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
//             )
//             .filter((i) => i.quantity > 0),
//         }),

//       removeItem: (id) => {
//         set({
//           items: get().items.filter((i) => i.id !== id),
//         });
//       },

//       clearCart: () => set({ items: [] }),
//     }),
//     {
//       name: "cart-storage",
//     },
//   ),
// );

// // "use client";

// // import { create } from "zustand";
// // import { persist } from "zustand/middleware";

// // export type CartItemType = {
// //   id: string;
// //   title: string;
// //   price: number;
// //   oldPrice?: number;
// //   image: string;
// //   quantity: number;
// // };

// // type CartState = {
// //   items: CartItemType[];
// //   isOpen: boolean;

// //   openCart: () => void;
// //   closeCart: () => void;

// //   addItem: (item: CartItemType) => void;
// //   removeItem: (id: string) => void;
// //   clearCart: () => void;
// // };

// // export const useCartStore = create<CartState>()(
// //   persist(
// //     (set, get) => ({
// //       items: [],
// //       isOpen: false,

// //       openCart: () => set({ isOpen: true }),
// //       closeCart: () => set({ isOpen: false }),

// //       addItem: (item) => {
// //         const existing = get().items.find((i) => i.id === item.id);

// //         if (existing) {
// //           set({
// //             items: get().items.map((i) =>
// //               i.id === item.id
// //                 ? { ...i, quantity: i.quantity + item.quantity }
// //                 : i,
// //             ),
// //             isOpen: true, // 🔥 ДОДАЙ
// //           });
// //         } else {
// //           set({
// //             items: [...get().items, item],
// //             isOpen: true, // 🔥 ДОДАЙ
// //           });
// //         }
// //       },

// //       // addItem: (item) => {
// //       //   const existing = get().items.find((i) => i.id === item.id);

// //       //   if (existing) {
// //       //     set({
// //       //       items: get().items.map((i) =>
// //       //         i.id === item.id
// //       //           ? { ...i, quantity: i.quantity + item.quantity }
// //       //           : i,
// //       //       ),
// //       //     });
// //       //   } else {
// //       //     set({
// //       //       items: [...get().items, item],
// //       //     });
// //       //   }
// //       // },

// //       removeItem: (id) => {
// //         set({
// //           items: get().items.filter((i) => i.id !== id),
// //         });
// //       },

// //       clearCart: () => set({ items: [] }),
// //     }),
// //     {
// //       name: "cart-storage", // 🔥 ключ в localStorage
// //     },
// //   ),
// // );

// // // "use client";

// // // import { create } from "zustand";
// // // import { persist } from "zustand/middleware";
// // // import type { CartItemType } from "@/types/cart";

// // // type CartStore = {
// // //   items: CartItemType[];

// // //   addToCart: (item: Omit<CartItemType, "quantity">) => void;
// // //   remove: (id: string) => void;
// // //   increase: (id: string) => void;
// // //   decrease: (id: string) => void;

// // //   isOpen: boolean;
// // //   openCart: () => void;
// // //   closeCart: () => void;
// // // };

// // // export const useCartStore = create<CartStore>()(
// // //   persist(
// // //     (set, get) => ({
// // //       items: [],
// // //       isOpen: false,

// // //       addToCart: (item) => {
// // //         const items = get().items;
// // //         const existing = items.find((i) => i.id === item.id);

// // //         if (existing) {
// // //           set({
// // //             items: items.map((i) =>
// // //               i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
// // //             ),
// // //           });
// // //         } else {
// // //           set({
// // //             items: [...items, { ...item, quantity: 1 }],
// // //           });
// // //         }
// // //       },

// // //       remove: (id) =>
// // //         set({
// // //           items: get().items.filter((i) => i.id !== id),
// // //         }),

// // //       increase: (id) =>
// // //         set({
// // //           items: get().items.map((i) =>
// // //             i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
// // //           ),
// // //         }),

// // //       decrease: (id) =>
// // //         set({
// // //           items: get()
// // //             .items.map((i) =>
// // //               i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
// // //             )
// // //             .filter((i) => i.quantity > 0),
// // //         }),

// // //       openCart: () => set({ isOpen: true }),
// // //       closeCart: () => set({ isOpen: false }),
// // //     }),
// // //     {
// // //       name: "cart-storage",
// // //     },
// // //   ),
// // // );

// // // // "use client";

// // // // import { create } from "zustand";
// // // // import { persist } from "zustand/middleware";

// // // // export type CartItemType = {
// // // //   id: string;
// // // //   title: string;
// // // //   image: string;
// // // //   price: number;
// // // //   oldPrice?: number | null;
// // // //   quantity: number;
// // // // };

// // // // type CartStore = {
// // // //   items: CartItemType[];

// // // //   addToCart: (item: Omit<CartItemType, "quantity">) => void;
// // // //   remove: (id: string) => void;
// // // //   increase: (id: string) => void;
// // // //   decrease: (id: string) => void;

// // // //   isOpen: boolean;
// // // //   openCart: () => void;
// // // //   closeCart: () => void;
// // // // };

// // // // export const useCartStore = create<CartStore>()(
// // // //   persist(
// // // //     (set, get) => ({
// // // //       items: [],
// // // //       isOpen: false,

// // // //       addToCart: (item) => {
// // // //         const items = get().items;
// // // //         const existing = items.find((i) => i.id === item.id);

// // // //         if (existing) {
// // // //           set({
// // // //             items: items.map((i) =>
// // // //               i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
// // // //             ),
// // // //           });
// // // //         } else {
// // // //           set({
// // // //             items: [...items, { ...item, quantity: 1 }],
// // // //           });
// // // //         }
// // // //       },

// // // //       remove: (id) =>
// // // //         set({
// // // //           items: get().items.filter((i) => i.id !== id),
// // // //         }),

// // // //       increase: (id) =>
// // // //         set({
// // // //           items: get().items.map((i) =>
// // // //             i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
// // // //           ),
// // // //         }),

// // // //       decrease: (id) =>
// // // //         set({
// // // //           items: get()
// // // //             .items.map((i) =>
// // // //               i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
// // // //             )
// // // //             .filter((i) => i.quantity > 0),
// // // //         }),

// // // //       openCart: () => set({ isOpen: true }),
// // // //       closeCart: () => set({ isOpen: false }),
// // // //     }),
// // // //     {
// // // //       name: "cart-storage", // 🔥 ключ в localStorage
// // // //     },
// // // //   ),
// // // // );

// // // // // import { create } from "zustand";

// // // // // export type CartItemType = {
// // // // //   id: string;
// // // // //   title: string;
// // // // //   image: string;
// // // // //   price: number;
// // // // //   oldPrice?: number;
// // // // //   quantity: number;
// // // // // };

// // // // // type CartState = {
// // // // //   items: CartItemType[];
// // // // //   isOpen: boolean;

// // // // //   openCart: () => void;
// // // // //   closeCart: () => void;

// // // // //   addToCart: (product: Omit<CartItemType, "quantity">) => void;
// // // // //   increase: (id: string) => void;
// // // // //   decrease: (id: string) => void;
// // // // //   remove: (id: string) => void;

// // // // //   getTotal: () => number;
// // // // // };

// // // // // export const useCartStore = create<CartState>((set, get) => ({
// // // // //   items: [],
// // // // //   isOpen: false,

// // // // //   openCart: () => set({ isOpen: true }),
// // // // //   closeCart: () => set({ isOpen: false }),

// // // // //   addToCart: (product) => {
// // // // //     const items = get().items;
// // // // //     const existing = items.find((i) => i.id === product.id);

// // // // //     if (existing) {
// // // // //       set({
// // // // //         items: items.map((i) =>
// // // // //           i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
// // // // //         ),
// // // // //       });
// // // // //     } else {
// // // // //       set({
// // // // //         items: [...items, { ...product, quantity: 1 }],
// // // // //       });
// // // // //     }
// // // // //   },

// // // // //   increase: (id) =>
// // // // //     set({
// // // // //       items: get().items.map((i) =>
// // // // //         i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
// // // // //       ),
// // // // //     }),

// // // // //   decrease: (id) =>
// // // // //     set({
// // // // //       items: get()
// // // // //         .items.map((i) =>
// // // // //           i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
// // // // //         )
// // // // //         .filter((i) => i.quantity > 0),
// // // // //     }),

// // // // //   remove: (id) =>
// // // // //     set({
// // // // //       items: get().items.filter((i) => i.id !== id),
// // // // //     }),

// // // // //   getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
// // // // // }));

// // // // // // import { create } from "zustand";

// // // // // // type CartItem = {
// // // // // //   id: string;
// // // // // //   title: string;
// // // // // //   price: number;
// // // // // //   quantity: number;
// // // // // // };

// // // // // // type CartState = {
// // // // // //   items: CartItem[];
// // // // // //   addToCart: (item: CartItem) => void;
// // // // // //   removeFromCart: (id: string) => void;
// // // // // //   clearCart: () => void;
// // // // // // };

// // // // // // export const useCartStore = create<CartState>((set) => ({
// // // // // //   items: [],
// // // // // //   addToCart: (item) =>
// // // // // //     set((state) => {
// // // // // //       const existing = state.items.find((i) => i.id === item.id);
// // // // // //       if (existing) {
// // // // // //         return {
// // // // // //           items: state.items.map((i) =>
// // // // // //             i.id === item.id
// // // // // //               ? { ...i, quantity: i.quantity + 1 }
// // // // // //               : i
// // // // // //           ),
// // // // // //         };
// // // // // //       }
// // // // // //       return { items: [...state.items, { ...item, quantity: 1 }] };
// // // // // //     }),
// // // // // //   removeFromCart: (id) =>
// // // // // //     set((state) => ({
// // // // // //       items: state.items.filter((i) => i.id !== id),
// // // // // //     })),
// // // // // //   clearCart: () => set({ items: [] }),
// // // // // // }));
