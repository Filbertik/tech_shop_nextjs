"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ProductCard from "@/components/ProductCard";
import CatalogSlider from "@/components/CatalogSlider";
import type { Product } from "@/types/product";
import HelpBlock from "@/components/catalog/HelpBlock";
import RecentViewed from "@/components/catalog/RecentViewed";
import Sidebar from "@/components/catalog/Sidebar";
import SortBar from "@/components/catalog/SortBar";
import Pagination from "@/components/catalog/Pagination";

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

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sort, setSort] = useState("price_asc");

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const LIMIT = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products?page=${page}&limit=${LIMIT}&min=${minPrice}&max=${maxPrice}&sort=${sort}`,
          { cache: "no-store" },
        );

        const data = await res.json();

        console.log("API RESPONSE:", data);

        setProducts(data?.products ?? []);
        setTotalPages(Math.ceil((data?.total ?? 0) / LIMIT));
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setProducts([]);
        setTotalPages(1);
      }
    };

    fetchProducts();
  }, [page, minPrice, maxPrice, sort]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const res = await fetch(
  //       `/api/products?page=${page}&limit=${LIMIT}&min=${minPrice}&max=${maxPrice}&sort=${sort}`,
  //       {
  //         cache: "no-store",
  //       },
  //     );
  //     // const res = await fetch(
  //     //   `/api/products?page=${page}&limit=${LIMIT}&min=${minPrice}&max=${maxPrice}&sort=${sort}`,
  //     // );

  //     const data = await res.json();

  //     setProducts(data.products);
  //     setTotalPages(Math.ceil(data.total / LIMIT));
  //   };

  //   fetchProducts();
  // }, [page, minPrice, maxPrice, sort]);

  const getPagination = (current: number, total: number) => {
    const delta = 1;
    const range: (number | string)[] = [];

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < total - 1) range.push("...");
    if (total > 1) range.push(total);

    return range;
  };

  const pages = getPagination(page, totalPages);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <section className="w-full flex justify-center">
      <div className="w-[1440px] px-[80px] py-[40px]">
        {/* BREADCRUMBS */}
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

        {/* TITLE */}
        <h1 className="mt-[28px] text-[24px] font-semibold">Ноутбуки</h1>

        <div className="mt-[28px] w-[1280px] flex gap-[24px]">
          {/* SIDEBAR */}
          <Sidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setPage={setPage}
            openSections={openSections}
            toggleSection={toggleSection}
            resetFilters={resetFilters}
          />

          {/* RIGHT */}
          <div className="w-[954px]">
            <CatalogSlider categories={categories} />

            <SortBar
              total={totalPages * LIMIT}
              sort={sort}
              setSort={setSort}
              setPage={setPage}
            />

            {/* PRODUCTS */}
            <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* PAGINATION */}
            <Pagination
              page={page}
              totalPages={totalPages}
              pages={pages}
              setPage={setPage}
            />
          </div>
        </div>

        <div className="mt-[60px] w-[640px]">
          <HelpBlock />
        </div>

        <div className="mt-[60px]">
          <RecentViewed />
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
// import HelpBlock from "@/components/catalog/HelpBlock";
// import RecentViewed from "@/components/catalog/RecentViewed";
// import Sidebar from "@/components/catalog/Sidebar";
// import SortBar from "@/components/catalog/SortBar";
// import Pagination from "@/components/catalog/Pagination";

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

//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   const [sort, setSort] = useState("popular");

//   const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

//   const LIMIT = 9;

//   const getPagination = (current: number, total: number) => {
//     const delta = 1;
//     const range: (number | string)[] = [];

//     const left = Math.max(2, current - delta);
//     const right = Math.min(total - 1, current + delta);

//     range.push(1);

//     if (left > 2) range.push("...");
//     for (let i = left; i <= right; i++) range.push(i);
//     if (right < total - 1) range.push("...");
//     if (total > 1) range.push(total);

//     return range;
//   };
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await fetch(
//         `/api/products?min=${minPrice}&max=${maxPrice}&sort=${sort}`,
//       );

//       const data = await res.json();

//       setTotalPages(Math.ceil(data.length / LIMIT));

//       const start = (page - 1) * LIMIT;
//       const end = start + LIMIT;

//       setProducts(data.slice(start, end));
//     };

//     fetchProducts();
//   }, [page, minPrice, maxPrice, sort]);

//   const pages = getPagination(page, totalPages);

//   const toggleSection = (title: string) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [title]: !prev[title],
//     }));
//   };

//   const resetFilters = () => {
//     setMinPrice("");
//     setMaxPrice("");
//     setPage(1);
//   };

//   return (
//     <section className="w-full flex justify-center">
//       <div className="w-[1440px] px-[80px] py-[40px]">
//         {/* 🔹 BREADCRUMBS */}
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

//         {/* 🔹 TITLE */}
//         <h1 className="mt-[28px] text-[24px] font-semibold">Ноутбуки</h1>

//         <div className="mt-[28px] w-[1280px] flex gap-[24px]">
//           {/* 🔹 SIDEBAR */}
//           <Sidebar
//             minPrice={minPrice}
//             maxPrice={maxPrice}
//             setMinPrice={setMinPrice}
//             setMaxPrice={setMaxPrice}
//             setPage={setPage}
//             openSections={openSections}
//             toggleSection={toggleSection}
//             resetFilters={resetFilters}
//           />

//           {/* 🔹 RIGHT */}
//           <div className="w-[954px]">
//             <CatalogSlider categories={categories} />

//             {/* SORT */}
//             <SortBar
//               total={products.length}
//               sort={sort}
//               setSort={setSort}
//               setPage={setPage}
//             />

//             {/* PRODUCTS */}
//             <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>

//             {/* PAGINATION */}
//             <Pagination
//               page={page}
//               totalPages={totalPages}
//               pages={pages}
//               setPage={setPage}
//             />
//           </div>
//         </div>
//         {/* 🔹 HELP BLOCK */}
//         <div className="mt-[60px] w-[640px]">
//           <HelpBlock />
//         </div>

//         {/* 🔹 RECENT */}
//         <div className="mt-[60px]">
//           <RecentViewed />
//         </div>
//       </div>
//     </section>
//   );
// }
