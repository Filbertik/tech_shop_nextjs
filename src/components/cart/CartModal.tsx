"use client";

import { useCartStore } from "@/store/cart.store";
import CartItem from "./CartItem";
import Image from "next/image";

export default function CartModal() {
  const { isOpen, closeCart } = useCartStore();
  const items = useCartStore((s) => s.items ?? []);

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="fixed top-0 right-0 w-full h-full bg-black/30 flex justify-end z-50">
      <div className="w-[590px] bg-white p-[40px] flex flex-col">
        <div className="flex justify-between">
          <h2>Кошик</h2>

          <button onClick={closeCart}>
            <Image src="/images/cat/x.svg" alt="close" width={20} height={20} />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-4 max-h-[300px] overflow-y-auto">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 flex justify-between">
          <span>Разом:</span>
          <span>{total} ₴</span>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useCartStore } from "@/store/cart.store";
// import CartItem from "./CartItem";
// import Image from "next/image";

// export default function CartModal() {
//   const { isOpen, closeCart } = useCartStore();
//   const items = useCartStore((s) => s.items ?? []);

//   if (!isOpen) return null;

//   const total = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );

//   return (
//     <div className="fixed top-0 right-0 w-full h-full bg-black/30 flex justify-end z-50">
//       <div className="w-[590px] bg-white p-[40px] rounded-l-[4px] flex flex-col">
//         {/* HEADER */}
//         <div className="flex justify-between items-center w-[510px]">
//           <h2 className="text-[24px] font-semibold">У вашому кошику</h2>

//           <button
//             onClick={closeCart}
//             className="w-[50px] h-[50px] flex items-center justify-center shadow"
//           >
//             <Image src="/images/cat/x.svg" alt="close" width={20} height={20} />
//           </button>
//         </div>

//         {/* LIST */}
//         <div className="mt-[72px] w-[510px] max-h-[300px] overflow-y-auto flex flex-col gap-4">
//           {items.map((item) => (
//             <CartItem key={item.id} item={item} />
//           ))}
//         </div>

//         {/* TOTAL */}
//         <div className="mt-[72px] flex justify-between w-[510px] text-[24px] font-semibold">
//           <span>Разом:</span>
//           <span>{total} ₴</span>
//         </div>

//         {/* BUTTONS */}
//         <div className="mt-[36px] w-[510px] flex flex-col gap-5">
//           <button className="h-[50px] bg-[#355EC0] text-white rounded">
//             Оформити замовлення
//           </button>

//           <button className="h-[50px] border border-[#355EC0] text-[#355EC0] rounded">
//             Купити у розсрочку
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import { useCartStore } from "@/store/cart.store";
// // import CartItem from "./CartItem";
// // import Image from "next/image";

// // export default function CartModal() {
// //   const { isOpen, closeCart, items } = useCartStore();
// //   // const { isOpen, closeCart, items, getTotal } = useCartStore();

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed top-0 right-0 w-full h-full bg-black/30 flex justify-end z-50">
// //       <div className="w-[590px] bg-white p-[40px] rounded-l-[4px] flex flex-col">
// //         {/* HEADER */}
// //         <div className="flex justify-between items-center w-[510px]">
// //           <h2 className="text-[24px] font-semibold">У вашому кошику</h2>

// //           <button
// //             onClick={closeCart}
// //             className="w-[50px] h-[50px] flex items-center justify-center shadow"
// //           >
// //             <Image src="/images/cat/x.svg" alt="close" width={20} height={20} />
// //           </button>
// //         </div>

// //         {/* LIST */}
// //         <div className="mt-[72px] w-[510px] max-h-[300px] overflow-y-auto flex flex-col gap-4">
// //           {items.map((item) => (
// //             <CartItem key={item.id} item={item} />
// //           ))}
// //         </div>

// //         {/* TOTAL */}
// //         <div className="mt-[72px] flex justify-between w-[510px] text-[24px] font-semibold">
// //           <span>Разом:</span>
// //           <span>
// //             {items.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₴
// //           </span>
// //           {/* <span>{getTotal()} ₴</span> */}
// //         </div>

// //         {/* BUTTONS */}
// //         <div className="mt-[36px] w-[510px] flex flex-col gap-5">
// //           <button className="h-[50px] bg-[#355EC0] text-white rounded">
// //             Оформити замовлення
// //           </button>

// //           <button className="h-[50px] border border-[#355EC0] text-[#355EC0] rounded">
// //             Купити у розсрочку
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
