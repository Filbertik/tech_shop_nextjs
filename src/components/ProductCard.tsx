"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // ❗ блокує перехід по Link
    e.stopPropagation(); // ❗ блокує bubbling

    console.log("Додано в кошик:", product.id);
    // 👉 тут буде твоя логіка кошика
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded shadow-sm p-3 hover:shadow-md transition"
    >
      {/* IMAGE */}
      <div className="relative w-full h-[200px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      {/* TITLE */}
      <h3 className="mt-3 text-sm font-medium line-clamp-2">{product.title}</h3>

      {/* PRICE */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[16px] font-bold">{product.price} ₴</span>

        {product.oldPrice && (
          <span className="text-sm text-gray-400 line-through">
            {product.oldPrice} ₴
          </span>
        )}
      </div>

      {/* RATING */}
      <div className="flex items-center gap-2 h-[20px]">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Image
              key={star}
              src={
                star <= product.rating
                  ? "/images/Bestsellers/Star Icon f.svg"
                  : "/images/Bestsellers/Star Icon.svg"
              }
              alt="star"
              width={16}
              height={16}
            />
          ))}
        </div>

        <span className="text-sm text-gray-600">{product.rating}</span>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleAddToCart}
        className="
          mt-3 w-full py-2 text-sm rounded
          bg-black text-white
          opacity-0 translate-y-2
          group-hover:opacity-100 group-hover:translate-y-0
          transition
        "
      >
        В кошик
      </button>
    </Link>
  );
}

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import type { Product } from "@/types/product";

// // ✅ ОБОВʼЯЗКОВО: опис props
// type ProductCardProps = {
//   product: Product;
// };

// export default function ProductCard({ product }: ProductCardProps) {
//   return (
//     <Link
//       href={`/product/${product.id}`}
//       className="group block bg-white rounded shadow-sm p-3 hover:shadow-md transition"
//     >
//       {/* IMAGE */}
//       <div className="relative w-full h-[200px]">
//         <Image
//           src={product.image} // ✅ ВИПРАВЛЕНО
//           alt={product.title}
//           fill
//           className="object-contain"
//         />
//       </div>
//       {/* <div className="relative w-full h-[200px]">
//         <Image
//           src={`/images/${product.image}`}
//           alt={product.title}
//           fill
//           className="object-contain"
//         />
//       </div> */}

//       {/* TITLE */}
//       <h3 className="mt-3 text-sm font-medium line-clamp-2">{product.title}</h3>

//       {/* PRICE */}
//       <div className="mt-2 flex items-center gap-2">
//         <span className="text-[16px] font-bold">{product.price} ₴</span>

//         {product.oldPrice && (
//           <span className="text-sm text-gray-400 line-through">
//             {product.oldPrice} ₴
//           </span>
//         )}

//         {/* <span className="text-sm text-gray-400 line-through">
//           {product.oldPrice} ₴
//         </span> */}
//       </div>

//       {/* RATING (якщо є) */}
//       {/* <div className="mt-1 text-xs text-gray-500">⭐ {product.rating}</div> */}
//       {/* ⭐ рейтинг */}
//       <div className="flex items-center gap-2 h-[20px]">
//         <div className="flex gap-1">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <Image
//               key={star}
//               src={
//                 star <= product.rating
//                   ? "/images/Bestsellers/Star Icon f.svg"
//                   : "/images/Bestsellers/Star Icon.svg"
//               }
//               alt="star"
//               width={16}
//               height={16}
//             />
//           ))}
//         </div>

//         <span className="text-sm text-gray-600">{product.rating}</span>
//       </div>

//       {/* HOVER BUTTON */}
//       <button
//         className="
//           mt-3 w-full py-2 text-sm rounded
//           bg-black text-white
//           opacity-0 translate-y-2
//           group-hover:opacity-100 group-hover:translate-y-0
//           transition
//         "
//       >
//         В кошик
//       </button>
//     </Link>
//   );
// }
