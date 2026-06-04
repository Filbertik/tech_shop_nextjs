"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
};

export default function RecentViewed() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = "recentViewed";
    const ids: number[] = JSON.parse(localStorage.getItem(key) || "[]");

    console.log("📦 IDS FROM LOCALSTORAGE:", ids);

    if (ids.length === 0) {
      fetch("/api/products/popular")
        .then((res) => res.json())
        .then((data) => {
          console.log("🔥 FALLBACK DATA:", data);
          setProducts(data);
          setLoading(false);
        });

      return;
    }

    fetch(`/api/products/by-ids?ids=${ids.join(",")}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ FETCHED PRODUCTS:", data);

        if (data.length === 0) {
          return fetch("/api/products/popular")
            .then((res) => res.json())
            .then((fallback) => {
              setProducts(fallback);
              setLoading(false);
            });
        }

        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-[60px]">
      <h2 className="text-[24px] font-semibold">Ви нещодавно переглядали</h2>

      <div className="mt-[28px] grid grid-cols-4 gap-[20px]">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border p-[12px] rounded animate-pulse">
                <div className="h-[160px] bg-gray-200" />
              </div>
            ))
          : products.map((product) => (
              <div key={product.id} className="border p-[12px] rounded">
                <div className="h-[160px] flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={140}
                    height={140}
                  />
                </div>

                <p className="mt-[12px] text-[14px]">{product.title}</p>

                <p className="mt-[8px] font-semibold">{product.price} ₴</p>
              </div>
            ))}
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// type Product = {
//   id: string;
//   title: string;
//   image: string;
//   price: number;
// };

// export default function RecentViewed() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const key = "recentViewed";
//     const ids: string[] = JSON.parse(localStorage.getItem(key) || "[]");

//     // 👉 якщо нема ID — fallback
//     if (ids.length === 0) {
//       fetch("/api/products/popular")
//         .then((res) => res.json())
//         .then((data) => {
//           setProducts(data.slice(0, 4));
//           setLoading(false);
//         });

//       return;
//     }

//     // 👉 якщо є recent viewed
//     fetch(`/api/products/by-ids?ids=${ids.join(",")}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.length === 0) {
//           // fallback якщо щось пішло не так
//           return fetch("/api/products/popular")
//             .then((res) => res.json())
//             .then((fallback) => {
//               setProducts(fallback.slice(0, 4));
//               setLoading(false);
//             });
//         }

//         setProducts(data.slice(0, 4));
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="mt-[60px]">
//       <h2 className="text-[24px] font-semibold">Ви нещодавно переглядали</h2>

//       <div className="mt-[28px] grid grid-cols-4 gap-[20px]">
//         {loading
//           ? // 👉 SKELETONS
//             Array.from({ length: 4 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="border border-gray-200 p-[12px] rounded-[8px] animate-pulse"
//               >
//                 <div className="w-full h-[160px] bg-gray-200 rounded" />

//                 <div className="mt-[12px] h-[14px] bg-gray-200 rounded w-[80%]" />
//                 <div className="mt-[6px] h-[14px] bg-gray-200 rounded w-[60%]" />

//                 <div className="mt-[10px] h-[16px] bg-gray-300 rounded w-[40%]" />
//               </div>
//             ))
//           : // 👉 PRODUCTS
//             products.map((product) => (
//               <div
//                 key={product.id}
//                 className="border border-gray-200 p-[12px] rounded-[8px] hover:shadow-md transition"
//               >
//                 {/* IMAGE */}
//                 <div className="w-full h-[160px] flex items-center justify-center">
//                   <Image
//                     src={product.image}
//                     alt={product.title}
//                     width={140}
//                     height={140}
//                     className="object-contain"
//                   />
//                 </div>

//                 {/* TITLE */}
//                 <p className="mt-[12px] text-[14px] line-clamp-2">
//                   {product.title}
//                 </p>

//                 {/* PRICE */}
//                 <p className="mt-[8px] font-semibold text-[16px]">
//                   {product.price} ₴
//                 </p>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import { useEffect, useState } from "react";
// // import Image from "next/image";

// // type Product = {
// //   id: string;
// //   title: string;
// //   image: string;
// //   price: number;
// // };

// // export default function RecentViewed() {
// //   const [products, setProducts] = useState<Product[]>([]);

// //   useEffect(() => {
// //     const key = "recentViewed";
// //     const ids: string[] = JSON.parse(localStorage.getItem(key) || "[]");

// //     if (ids.length === 0) return;

// //     fetch(`/api/products/by-ids?ids=${ids.join(",")}`)
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setProducts(data.slice(0, 4));
// //       });
// //   }, []);

// //   if (products.length === 0) return null;

// //   return (
// //     <div className="mt-[60px]">
// //       <h2 className="text-[24px] font-semibold">Ви нещодавно переглядали</h2>

// //       <div className="mt-[28px] grid grid-cols-4 gap-[20px]">
// //         {products.map((product) => (
// //           <div
// //             key={product.id}
// //             className="border border-gray-200 p-[12px] rounded-[8px] hover:shadow-md transition"
// //           >
// //             {/* IMAGE */}
// //             <div className="w-full h-[160px] flex items-center justify-center">
// //               <Image
// //                 src={product.image}
// //                 alt={product.title}
// //                 width={140}
// //                 height={140}
// //                 className="object-contain"
// //               />
// //             </div>

// //             {/* TITLE */}
// //             <p className="mt-[12px] text-[14px] line-clamp-2">
// //               {product.title}
// //             </p>

// //             {/* PRICE */}
// //             <p className="mt-[8px] font-semibold text-[16px]">
// //               {product.price} ₴
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // "use client";

// // // type Product = {
// // //   id: number;
// // //   title: string;
// // //   image: string;
// // //   price: number;
// // // };

// // // const mockProducts: Product[] = [
// // //   {
// // //     id: 1,
// // //     title: "Ноутбук ASUS Vivobook 15",
// // //     image: "/images/product-1.png",
// // //     price: 25999,
// // //   },
// // //   {
// // //     id: 2,
// // //     title: "Ноутбук Lenovo IdeaPad 5",
// // //     image: "/images/product-2.png",
// // //     price: 28999,
// // //   },
// // //   {
// // //     id: 3,
// // //     title: "Ноутбук HP Pavilion",
// // //     image: "/images/product-3.png",
// // //     price: 30999,
// // //   },
// // //   {
// // //     id: 4,
// // //     title: "Ноутбук Acer Aspire 7",
// // //     image: "/images/product-4.png",
// // //     price: 27999,
// // //   },
// // //   {
// // //     id: 5,
// // //     title: "Ноутбук Dell Inspiron",
// // //     image: "/images/product-5.png",
// // //     price: 31999,
// // //   },
// // // ];

// // // export default function RecentViewed() {
// // //   // 👉 беремо тільки 4 останніх
// // //   const products = mockProducts.slice(0, 4);

// // //   return (
// // //     <div className="mt-[60px]">
// // //       {/* HEADER */}
// // //       <h2 className="text-[24px] font-semibold">Ви нещодавно переглядали</h2>

// // //       {/* PRODUCTS */}
// // //       <div className="mt-[28px] grid grid-cols-4 gap-[20px]">
// // //         {products.map((product) => (
// // //           <div
// // //             key={product.id}
// // //             className="border border-gray-200 p-[12px] rounded-[8px]"
// // //           >
// // //             {/* IMAGE */}
// // //             <div className="w-full h-[160px] bg-gray-100 flex items-center justify-center">
// // //               <span className="text-sm text-gray-400">image</span>
// // //             </div>

// // //             {/* TITLE */}
// // //             <p className="mt-[12px] text-[14px] line-clamp-2">
// // //               {product.title}
// // //             </p>

// // //             {/* PRICE */}
// // //             <p className="mt-[8px] font-semibold text-[16px]">
// // //               {product.price} ₴
// // //             </p>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }
