"use client";

import { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem";

// ✅ ТИП ДАНИХ З API
type WishlistItemType = {
  id: string;
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
  };
};

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItemType[]>([]);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data: WishlistItemType[]) => setItems(data));
  }, []);

  const handleRemove = async (id: string) => {
    await fetch(`/api/wishlist/${id}`, {
      method: "DELETE",
    });

    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div style={{ padding: "0 60px", width: "769px" }}>
      <h2>Список бажань</h2>

      {items.map((item) => (
        <WishlistItem
          key={item.id}
          id={item.id}
          title={item.product.title}
          price={`${item.product.price} ₴`}
          image={item.product.images?.[0] || "/placeholder.png"} // ✅ захист
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import WishlistItem from "./WishlistItem";

// export default function Wishlist() {
//   const [items, setItems] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("/api/wishlist")
//       .then((res) => res.json())
//       .then(setItems);
//   }, []);

//   const handleRemove = async (id: string) => {
//     await fetch(`/api/wishlist/${id}`, {
//       method: "DELETE",
//     });

//     setItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <div style={{ padding: "0 60px", width: "769px" }}>
//       <h2>Список бажань</h2>

//       {items.map((item) => (
//         <WishlistItem
//           key={item.id}
//           id={item.id}
//           title={item.product.title}
//           price={`${item.product.price} ₴`}
//           image={item.product.images[0]}
//           onRemove={handleRemove}
//         />
//       ))}
//     </div>
//   );
// }

// // "use client";

// // import { useState } from "react";
// // import WishlistItem from "./WishlistItem";

// // type Item = {
// //   id: string;
// //   title: string;
// //   price: string;
// //   image: string;
// // };

// // export default function Wishlist() {
// //   const [items, setItems] = useState<Item[]>([
// //     {
// //       id: "1",
// //       title: "Ноутбук ASUS Vivobook",
// //       price: "36 600 ₴",
// //       image: "/images/product-1.jpg",
// //     },
// //     {
// //       id: "2",
// //       title: "MacBook Air M2",
// //       price: "52 000 ₴",
// //       image: "/images/product-2.jpg",
// //     },
// //     {
// //       id: "3",
// //       title: "Lenovo IdeaPad",
// //       price: "28 000 ₴",
// //       image: "/images/product-3.jpg",
// //     },
// //   ]);

// //   const handleRemove = (id: string) => {
// //     setItems((prev) => prev.filter((item) => item.id !== id));
// //   };

// //   return (
// //     <div
// //       style={{
// //         padding: "0 60px",
// //         width: "769px",
// //         maxHeight: "215px",
// //         overflowY: items.length > 6 ? "auto" : "hidden",
// //       }}
// //     >
// //       {/* TITLE */}
// //       <h2
// //         style={{
// //           fontFamily: "var(--font-family)",
// //           fontWeight: 700,
// //           fontSize: "18px",
// //           lineHeight: "150%",
// //           color: "#000",
// //         }}
// //       >
// //         Список бажань
// //       </h2>

// //       {/* TABLE HEADER */}
// //       <div
// //         style={{
// //           marginTop: "40px",
// //           padding: "0 0 8px 32px",
// //           width: "440px",
// //           height: "30px",
// //           display: "flex",
// //           justifyContent: "space-between",
// //           fontFamily: "var(--third-family)",
// //           fontSize: "14px",
// //           color: "#6c7275",
// //         }}
// //       >
// //         <span>Товар</span>
// //         <span>Ціна</span>
// //       </div>

// //       {/* LIST */}
// //       <div>
// //         {items.map((item) => (
// //           <WishlistItem key={item.id} {...item} onRemove={handleRemove} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // "use client";

// // // export default function Wishlist() {
// // //   const items = [
// // //     {
// // //       id: 1,
// // //       title: "Ноутбук ASUS Vivobook",
// // //       price: "25 000 ₴",
// // //       image: "/images/test-product.jpg",
// // //     },
// // //     {
// // //       id: 2,
// // //       title: "MacBook Air M1",
// // //       price: "35 000 ₴",
// // //       image: "/images/test-product.jpg",
// // //     },
// // //   ];

// // //   return (
// // //     <div style={{ padding: "0 60px", width: "769px" }}>
// // //       {/* TITLE */}
// // //       <h2 style={{ fontWeight: 700, fontSize: 18 }}>Список бажань</h2>

// // //       {/* HEADER */}
// // //       <div
// // //         style={{
// // //           marginTop: 40,
// // //           display: "flex",
// // //           justifyContent: "space-between",
// // //           width: 440,
// // //           padding: "0 0 8px 32px",
// // //           color: "#6c7275",
// // //           fontSize: 14,
// // //         }}
// // //       >
// // //         <span>Товар</span>
// // //         <span>Ціна</span>
// // //       </div>

// // //       {/* LIST */}
// // //       <div
// // //         style={{
// // //           marginTop: 10,
// // //           maxHeight: "700px",
// // //           overflowY: "auto",
// // //         }}
// // //       >
// // //         {items.map((item) => (
// // //           <div
// // //             key={item.id}
// // //             style={{
// // //               display: "flex",
// // //               alignItems: "center",
// // //               justifyContent: "space-between",
// // //               borderTop: "1px solid #e8ecef",
// // //               borderBottom: "1px solid #e8ecef",
// // //               padding: "22px 0",
// // //             }}
// // //           >
// // //             {/* LEFT */}
// // //             <div style={{ display: "flex", gap: 16, width: 290 }}>
// // //               <div
// // //                 style={{
// // //                   width: 50,
// // //                   height: 50,
// // //                   borderRadius: 14,
// // //                   background: "#fcfbff",
// // //                 }}
// // //               >
// // //                 X
// // //               </div>

// // //               <img src={item.image} style={{ width: 88, height: 74 }} />

// // //               <span>{item.title}</span>
// // //             </div>

// // //             {/* PRICE */}
// // //             <div>{item.price}</div>

// // //             {/* BUTTON */}
// // //             <button
// // //               style={{
// // //                 padding: "12px 32px",
// // //                 background: "#355ec0",
// // //                 color: "#fff",
// // //               }}
// // //             >
// // //               Додати в 🛒
// // //             </button>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // "use client";

// // // // import WishlistItem from "./WishlistItem";

// // // // const mockWishlist = [
// // // //   {
// // // //     id: 1,
// // // //     title: "Ноутбук ASUS Vivobook",
// // // //     price: "25 000 ₴",
// // // //     image: "/images/mock/product.jpg",
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     title: "Смартфон Samsung Galaxy",
// // // //     price: "18 500 ₴",
// // // //     image: "/images/mock/product.jpg",
// // // //   },
// // // // ];

// // // // export default function Wishlist() {
// // // //   return (
// // // //     <div className="px-[60px] w-[769px]">
// // // //       {/* ===== Заголовок ===== */}
// // // //       <h2 className="font-semibold text-[18px] text-black">Список бажань</h2>

// // // //       {/* ===== Header ===== */}
// // // //       <div className="mt-[40px] w-[440px] h-[30px] pl-[32px] pb-[8px] flex justify-between text-[14px] text-[#6c7275]">
// // // //         <span>Товар</span>
// // // //         <span>Ціна</span>
// // // //       </div>

// // // //       {/* ===== List ===== */}
// // // //       <div className="w-[649px] max-h-[708px] overflow-y-auto">
// // // //         {mockWishlist.map((item) => (
// // // //           <WishlistItem key={item.id} {...item} />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // export default function Wishlist() {
// // // // //   return <div>Контент: Список бажань</div>;
// // // // // }
