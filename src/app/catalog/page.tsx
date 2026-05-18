"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ProductCard from "@/components/ProductCard";
import CatalogSlider from "@/components/CatalogSlider";
import type { Product } from "@/types/product";

// 🔹 categories
const categories = [
  { image: "Slide1.png", title: "Ігрові ноутбуки" },
  { image: "Slide2.png", title: "Для навчання та роботи" },
  { image: "Slide3.png", title: "Для дизайну та 3D" },
  { image: "Slide4.png", title: "Топ продажів" },
  { image: "Slide5.png", title: "Бюджетні рішення" },
  { image: "Slide6.png", title: "З сенсорним екраном" },
];

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔹 FILTERS
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🔹 SORT (оновлений)
  const [sort, setSort] = useState("popular"); // popular | cheap | expensive | name

  const LIMIT = 9;

  // 🔹 pagination helper
  const getPagination = (current: number, total: number) => {
    const delta = 1;
    const range: (number | string)[] = [];

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) range.push("...");

    if (total > 1) range.push(total);

    return range;
  };

  // 🔹 fake API + FILTER + SORT
  useEffect(() => {
    let data: Product[] = new Array(50).fill(null).map((_, i) => ({
      id: i,
      image: "Product photo.png",
      title: `Ноутбук ${i + 1}`,
      rating: Math.floor(Math.random() * 5) + 1, // для популярності
      oldPrice: 25000,
      price: Math.floor(Math.random() * 50000),
    }));

    // 🔹 FILTER
    let filtered = data.filter((p) => {
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;

      return p.price >= min && p.price <= max;
    });

    // 🔹 SORT
    switch (sort) {
      case "cheap":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "popular":
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    // 🔹 PAGINATION
    const start = (page - 1) * LIMIT;
    const end = start + LIMIT;

    setTotalPages(Math.ceil(filtered.length / LIMIT));
    setProducts(filtered.slice(start, end));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, minPrice, maxPrice, sort]);

  const pages = getPagination(page, totalPages);

  // 🔹 RESET
  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <section className="w-full flex justify-center">
      <div className="w-[1440px] px-[80px] py-[40px]">
        {/* 🔹 Breadcrumbs */}
        <div className="flex items-center gap-2 text-[16px] text-[var(--gray)]">
          <Link href="/">Головна</Link>

          <Image
            src="/images/Catalog/caret-right.svg"
            alt="arrow"
            width={16}
            height={16}
          />

          <span>Ноутбуки</span>
        </div>

        {/* 🔹 Title */}
        <h1 className="mt-[28px] text-[24px] font-semibold">Ноутбуки</h1>

        <div className="mt-[28px] w-[1280px] flex gap-[24px]">
          {/* 🔹 SIDEBAR */}
          <aside className="w-[302px]">
            <div className="bg-white p-4 shadow-sm rounded">
              <h3 className="font-semibold mb-4">Фільтри</h3>

              {/* 🔹 PRICE */}
              <div>
                <p className="mb-2 text-sm">Ціна</p>

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Від"
                    value={minPrice}
                    onChange={(e) => {
                      setPage(1);
                      setMinPrice(e.target.value);
                    }}
                    className="w-full border px-2 py-1 rounded"
                  />

                  <input
                    type="number"
                    placeholder="До"
                    value={maxPrice}
                    onChange={(e) => {
                      setPage(1);
                      setMaxPrice(e.target.value);
                    }}
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
              </div>

              {/* 🔹 RESET */}
              <button
                onClick={resetFilters}
                className="mt-6 w-full border py-2 rounded hover:bg-gray-100 transition"
              >
                Скинути фільтри
              </button>
            </div>
          </aside>

          {/* 🔹 RIGHT */}
          <div className="w-[954px]">
            <CatalogSlider categories={categories} />

            {/* 🔥 SORT BAR (ПОВЕРНУЛИ НА МІСЦЕ) */}
            <div className="flex justify-between items-center mt-[24px]">
              <p className="text-sm text-gray-500">
                Знайдено товарів: {products.length}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-sm">Сортувати:</span>

                <select
                  value={sort}
                  onChange={(e) => {
                    setPage(1);
                    setSort(e.target.value);
                  }}
                  className="border px-2 py-1 rounded"
                >
                  <option value="popular">Популярні</option>
                  <option value="cheap">Дешеві → дорогі</option>
                  <option value="expensive">Дорогі → дешеві</option>
                  <option value="name">За ім’ям</option>
                </select>
              </div>
            </div>

            {/* 🔹 PRODUCTS */}
            <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* 🔹 PAGINATION */}
            <div className="flex justify-center items-center gap-2 mt-[40px]">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="opacity-80 disabled:opacity-30"
              >
                <Image
                  src="/images/Catalog/Arrow - Right.svg"
                  alt="prev"
                  width={24}
                  height={24}
                />
              </button>

              {pages.map((p, i) =>
                p === "..." ? (
                  <span key={i} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    onClick={() => setPage(Number(p))}
                    className={`px-3 py-1 rounded transition ${
                      page === p ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="opacity-80 disabled:opacity-30"
              >
                <Image
                  src="/images/Catalog/Arrow - Right.svg"
                  alt="next"
                  width={24}
                  height={24}
                  className="rotate-180"
                />
              </button>
            </div>

            {/* 🔹 HELP BLOCK */}
            <div className="mt-[60px] w-[640px]">
              <h2 className="text-[24px] font-semibold">
                Не знаєте, який ноутбук вибрати?
              </h2>
            </div>

            {/* 🔹 RECENT */}
            <div className="mt-[60px]">
              <h2 className="text-[24px] font-semibold">
                Ви нещодавно переглядали
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
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

// export default function Catalog() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // 🔹 FILTERS
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   // 🔹 SORT
//   const [sort, setSort] = useState("cheap"); // cheap | expensive

//   const LIMIT = 9;

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

//   // 🔹 fake API + FILTER + SORT
//   useEffect(() => {
//     const data: Product[] = new Array(50).fill(null).map((_, i) => ({
//       id: i,
//       image: "Product photo.png",
//       title: `Ноутбук ${i + 1}`,
//       rating: 4,
//       oldPrice: 25000,
//       price: Math.floor(Math.random() * 50000),
//     }));

//     // 🔹 FILTER
//     let filtered = data.filter((p) => {
//       const min = minPrice ? Number(minPrice) : 0;
//       const max = maxPrice ? Number(maxPrice) : Infinity;

//       return p.price >= min && p.price <= max;
//     });

//     // 🔹 SORT
//     if (sort === "cheap") {
//       filtered = filtered.sort((a, b) => a.price - b.price);
//     } else if (sort === "expensive") {
//       filtered = filtered.sort((a, b) => b.price - a.price);
//     }

//     // 🔹 PAGINATION
//     const start = (page - 1) * LIMIT;
//     const end = start + LIMIT;

//     setTotalPages(Math.ceil(filtered.length / LIMIT));
//     setProducts(filtered.slice(start, end));

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [page, minPrice, maxPrice, sort]);

//   const pages = getPagination(page, totalPages);

//   // 🔹 RESET FILTERS
//   const resetFilters = () => {
//     setMinPrice("");
//     setMaxPrice("");
//     setSort("cheap");
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

//               {/* 🔹 SORT */}
//               <div className="mt-4">
//                 <p className="mb-2 text-sm">Сортування</p>

//                 <select
//                   value={sort}
//                   onChange={(e) => {
//                     setPage(1);
//                     setSort(e.target.value);
//                   }}
//                   className="w-full border px-2 py-1 rounded"
//                 >
//                   <option value="cheap">Дешеві → дорогі</option>
//                   <option value="expensive">Дорогі → дешеві</option>
//                 </select>
//               </div>

//               {/* 🔹 RESET */}
//               <button
//                 onClick={resetFilters}
//                 className="mt-6 w-full border py-2 rounded hover:bg-gray-100 transition"
//               >
//                 Скинути фільтри
//               </button>
//             </div>
//           </aside>

//           {/* 🔹 RIGHT */}
//           <div className="w-[954px]">
//             <CatalogSlider categories={categories} />

//             {/* 🔹 PRODUCTS */}
//             <div className="grid grid-cols-3 gap-[24px] mt-[33px]">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>

//             {/* 🔹 PAGINATION */}
//             <div className="flex justify-center items-center gap-2 mt-[40px]">
//               <button
//                 onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                 disabled={page === 1}
//                 className="opacity-80 disabled:opacity-30"
//               >
//                 <Image
//                   src="/images/Catalog/Arrow - Right.svg"
//                   alt="prev"
//                   width={24}
//                   height={24}
//                 />
//               </button>

//               {pages.map((p, i) =>
//                 p === "..." ? (
//                   <span key={i} className="px-2">
//                     ...
//                   </span>
//                 ) : (
//                   <button
//                     key={i}
//                     onClick={() => setPage(Number(p))}
//                     className={`px-3 py-1 rounded transition ${
//                       page === p ? "bg-black text-white" : "hover:bg-gray-100"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ),
//               )}

//               <button
//                 onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//                 disabled={page === totalPages}
//                 className="opacity-80 disabled:opacity-30"
//               >
//                 <Image
//                   src="/images/Catalog/Arrow - Right.svg"
//                   alt="next"
//                   width={24}
//                   height={24}
//                   className="rotate-180"
//                 />
//               </button>
//             </div>

//             {/* 🔹 HELP BLOCK */}
//             <div className="mt-[60px] w-[640px]">
//               <h2 className="text-[24px] font-semibold">
//                 Не знаєте, який ноутбук вибрати?
//               </h2>
//             </div>

//             {/* 🔹 RECENT */}
//             <div className="mt-[60px]">
//               <h2 className="text-[24px] font-semibold">
//                 Ви нещодавно переглядали
//               </h2>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
