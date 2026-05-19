"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

// ✅ ОБОВʼЯЗКОВО: опис props
type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded shadow-sm p-3 hover:shadow-md transition"
    >
      {/* IMAGE */}
      <div className="relative w-full h-[200px]">
        <Image
          src={`/images/${product.image}`}
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

        <span className="text-sm text-gray-400 line-through">
          {product.oldPrice} ₴
        </span>
      </div>

      {/* RATING (якщо є) */}
      {/* <div className="mt-1 text-xs text-gray-500">⭐ {product.rating}</div> */}
      {/* ⭐ рейтинг */}
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

      {/* HOVER BUTTON */}
      <button
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

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// import ProductCard from "@/components/ProductCard";
// import CatalogSlider from "@/components/CatalogSlider";
// import type { Product } from "@/types/product";

// // 🔹 categories
// const categories = [
//   { image: "Slide1.png", title: "Ігрові ноутбуки" },
//   { image: "Slide2.png", title: "Для навчання та роботи" },
//   { image: "Slide3.png", title: "Для дизайну та 3D" },
//   { image: "Slide4.png", title: "Топ продажів" },
//   { image: "Slide5.png", title: "Бюджетні рішення" },
//   { image: "Slide6.png", title: "З сенсорним екраном" },
// ];

// // 🔹 FILTER STRUCTURE (заглушка)
// const filterSections = [
//   "Наявність",
//   "Знижка",
//   "Бренд",
//   "Тип",
//   "Діагональ екрану",
//   "Роздільна здатність екрану",
//   "Тип екрану",
//   "Частота оновлення екрану",
//   "Особливості дисплея",
//   "Процесор",
//   "Кількість ядер",
//   "Виробник відеокарти",
//   "Тип відеокарти",
//   "Графічний адаптер",
//   "Об'єм відеопам'яті",
//   "Оперативна пам'ять",
//   "Характеристики оперативної пам'яті",
//   "Об'єм SSD",
//   "Операційна система",
//   "Тип покриття",
//   "Тип матриці",
//   "Тип акумулятору",
//   "Особливості",
// ];

// // 🔹 FAKE OPTIONS
// const fakeOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];

// export default function Catalog() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // 🔹 FILTERS
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   // 🔹 SORT
//   const [sort, setSort] = useState("popular");

//   const LIMIT = 9;

//   // 🔹 SIDEBAR STATE
//   const [openSections, setOpenSections] = useState<string[]>([]);
//   const [checked, setChecked] = useState<Record<string, string[]>>({});

//   const toggleSection = (section: string) => {
//     setOpenSections((prev) =>
//       prev.includes(section)
//         ? prev.filter((s) => s !== section)
//         : [...prev, section],
//     );
//   };

//   const toggleCheckbox = (section: string, option: string) => {
//     setChecked((prev) => {
//       const current = prev[section] || [];

//       return {
//         ...prev,
//         [section]: current.includes(option)
//           ? current.filter((o) => o !== option)
//           : [...current, option],
//       };
//     });
//   };

//   // 🔹 pagination helper
//   const getPagination = (current: number, total: number) => {
//     const delta = 1;
//     const range: (number | string)[] = [];

//     const left = Math.max(2, current - delta);
//     const right = Math.min(total - 1, current + delta);

//     range.push(1);

//     if (left > 2) range.push("...");

//     for (let i = left; i <= right; i++) {
//       range.push(i);
//     }

//     if (right < total - 1) range.push("...");

//     if (total > 1) range.push(total);

//     return range;
//   };

//   // 🔹 fake API
//   useEffect(() => {
//     const data: Product[] = new Array(50).fill(null).map((_, i) => ({
//       id: i,
//       image: "Product photo.png",
//       title: `Ноутбук ${i + 1}`,
//       rating: Math.floor(Math.random() * 5) + 1,
//       oldPrice: 25000,
//       price: Math.floor(Math.random() * 50000),
//     }));

//     const filteredBase = data.filter((p) => {
//       const min = minPrice ? Number(minPrice) : 0;
//       const max = maxPrice ? Number(maxPrice) : Infinity;

//       return p.price >= min && p.price <= max;
//     });

//     const filtered = [...filteredBase];

//     switch (sort) {
//       case "cheap":
//         filtered.sort((a, b) => a.price - b.price);
//         break;
//       case "expensive":
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//       case "name":
//         filtered.sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       default:
//         filtered.sort((a, b) => b.rating - a.rating);
//     }

//     const start = (page - 1) * LIMIT;
//     const end = start + LIMIT;

//     setTotalPages(Math.ceil(filtered.length / LIMIT));
//     setProducts(filtered.slice(start, end));

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [page, minPrice, maxPrice, sort]);

//   const pages = getPagination(page, totalPages);

//   // 🔹 RESET
//   const resetFilters = () => {
//     setMinPrice("");
//     setMaxPrice("");
//     setChecked({});
//     setOpenSections([]);
//     setPage(1);
//   };

//   return (
//     <section className="w-full flex justify-center">
//       <div className="w-[1440px] px-[80px] py-[40px]">
//         {/* 🔹 Breadcrumbs */}
//         <div className="flex items-center gap-2 text-[16px] text-[var(--gray)]">
//           <Link href="/">Головна</Link>

//           <Image
//             src="/images/Catalog/caret-right.svg"
//             alt="arrow"
//             width={16}
//             height={16}
//           />

//           <span>Ноутбуки</span>
//         </div>

//         {/* 🔹 Title */}
//         <h1 className="mt-[28px] text-[24px] font-semibold">Ноутбуки</h1>

//         <div className="mt-[28px] w-[1280px] flex gap-[24px]">
//           {/* 🔹 SIDEBAR */}
//           <aside className="w-[302px]">
//             <div className="bg-white p-4 shadow-sm rounded">
//               <h3 className="font-semibold mb-4">Фільтри</h3>

//               {/* 🔹 PRICE */}
//               <div>
//                 <p className="mb-2 text-sm">Ціна</p>

//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     placeholder="Від"
//                     value={minPrice}
//                     onChange={(e) => {
//                       setPage(1);
//                       setMinPrice(e.target.value);
//                     }}
//                     className="w-full border px-2 py-1 rounded"
//                   />

//                   <input
//                     type="number"
//                     placeholder="До"
//                     value={maxPrice}
//                     onChange={(e) => {
//                       setPage(1);
//                       setMaxPrice(e.target.value);
//                     }}
//                     className="w-full border px-2 py-1 rounded"
//                   />
//                 </div>
//               </div>

//               {/* 🔹 RESET */}
//               <button
//                 onClick={resetFilters}
//                 className="mt-6 w-full border py-2 rounded hover:bg-gray-100 transition"
//               >
//                 Скинути фільтри
//               </button>

//               {/* 🔹 FILTER SECTIONS */}
//               <div className="mt-6 flex flex-col gap-[12px]">
//                 {filterSections.map((section) => {
//                   const isOpen = openSections.includes(section);

//                   return (
//                     <div key={section}>
//                       {/* HEADER */}
//                       <div
//                         className="flex justify-between items-center cursor-pointer"
//                         onClick={() => toggleSection(section)}
//                       >
//                         <p className="text-[18px] font-bold leading-[150%] text-[var(--black)]">
//                           {section}
//                         </p>

//                         <Image
//                           src={`/images/Catalog/${
//                             isOpen ? "minus.svg" : "plus.svg"
//                           }`}
//                           alt="toggle"
//                           width={16}
//                           height={16}
//                         />
//                       </div>

//                       {/* CONTENT */}
//                       {isOpen && (
//                         <div className="mt-3 flex flex-col gap-2">
//                           {fakeOptions.map((opt) => {
//                             const isChecked = checked[section]?.includes(opt);

//                             return (
//                               <div
//                                 key={opt}
//                                 className="flex items-center gap-2 cursor-pointer"
//                                 onClick={() => toggleCheckbox(section, opt)}
//                               >
//                                 <Image
//                                   src={`/images/Catalog/${
//                                     isChecked
//                                       ? "checkboxes_.svg"
//                                       : "checkboxes.svg"
//                                   }`}
//                                   alt="checkbox"
//                                   width={16}
//                                   height={16}
//                                 />

//                                 <span className="text-sm">
//                                   {opt} ({Math.floor(Math.random() * 100)})
//                                 </span>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </aside>

//           {/* 🔹 RIGHT */}
//           <div className="w-[954px]">
//             <CatalogSlider categories={categories} />

//             <div className="flex justify-between items-center mt-[24px]">
//               <p className="text-sm text-gray-500">
//                 Знайдено товарів: {products.length}
//               </p>

//               <div className="flex items-center gap-2">
//                 <span className="text-sm">Сортувати:</span>

//                 <select
//                   value={sort}
//                   onChange={(e) => {
//                     setPage(1);
//                     setSort(e.target.value);
//                   }}
//                   className="border px-2 py-1 rounded"
//                 >
//                   <option value="popular">Популярні</option>
//                   <option value="cheap">Дешеві → дорогі</option>
//                   <option value="expensive">Дорогі → дешеві</option>
//                   <option value="name">За ім’ям</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>

//             {/* PAGINATION (без змін) */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
