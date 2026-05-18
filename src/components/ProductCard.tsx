"use client";

import Image from "next/image";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded p-4 hover:shadow-md transition">
      <Image
        src={`/images/${product.image}`}
        alt={product.title}
        width={200}
        height={200}
        className="mx-auto"
      />

      <h3 className="mt-3 text-sm">{product.title}</h3>

      {/* рейтинг (поки статичний) */}
      <p className="text-yellow-500 text-sm">★★★★★</p>

      {/* ціни */}
      <div className="mt-2">
        <p className="text-lg font-semibold">
          {product.price.toLocaleString()} грн
        </p>

        <p className="text-sm text-gray-400 line-through">
          {product.oldPrice.toLocaleString()} грн
        </p>
      </div>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import Link from "next/link";

// type Product = {
//   image: string;
//   title: string;
//   rating: number;
//   oldPrice: string;
//   price: string;
// };

// type Props = {
//   product: Product;
// };

// export default function ProductCard({ product }: Props) {
//   return (
//     <Link href="/catalog" className="group">
//       <div
//         className="
//           relative
//           p-[30px_20px]
//           w-[302px]
//           h-[427px]
//           bg-white
//           rounded-[4px]
//           shadow-[0_9px_22px_rgba(21,53,90,0.1)]
//           flex flex-col justify-between
//           transition
//           duration-300
//           group-hover:-translate-y-2
//           group-hover:shadow-lg
//         "
//       >
//         {/* IMAGE */}
//         <div className="relative flex justify-center">
//           <Image
//             src="/images/Sale/sale bage.png"
//             alt="sale"
//             width={50}
//             height={50}
//             className="absolute top-0 left-0"
//           />

//           <Image
//             src={`/images/Sale/${product.image}`}
//             alt={product.title}
//             width={262}
//             height={197}
//             className="object-contain"
//           />
//         </div>

//         {/* CONTENT */}
//         <div className="mt-4 flex flex-col gap-2">
//           {/* rating */}
//           <div className="flex gap-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Image
//                 key={star}
//                 src={
//                   star <= product.rating
//                     ? "/images/Bestsellers/Star Icon f.svg"
//                     : "/images/Bestsellers/Star Icon.svg"
//                 }
//                 alt="star"
//                 width={16}
//                 height={16}
//               />
//             ))}
//           </div>

//           <p className="text-[16px] line-clamp-2">{product.title}</p>

//           <div>
//             <span className="text-[12px] line-through text-gray-400">
//               {product.oldPrice}
//             </span>
//             <p className="text-[18px] font-semibold">{product.price}</p>
//           </div>
//         </div>

//         {/* BUTTON */}
//         <div
//           className="
//             absolute
//             bottom-4
//             left-1/2
//             -translate-x-1/2
//             opacity-0
//             translate-y-4
//             group-hover:opacity-100
//             group-hover:translate-y-0
//             transition
//           "
//         >
//           <button
//             className="w-[100px] py-2 bg-black text-white rounded"
//             onClick={(e) => e.preventDefault()}
//           >
//             У кошик
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// }
