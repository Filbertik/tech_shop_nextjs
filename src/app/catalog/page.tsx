"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ProductCard from "@/components/ProductCard";
import CatalogSlider from "@/components/CatalogSlider";
import type { Product } from "@/types/product"; // ✅ ВАЖЛИВО

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

  const LIMIT = 9;

  // 🔹 pagination helper (винесений з JSX)
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

  // 🔹 fake API
  useEffect(() => {
    const data: Product[] = new Array(50).fill(null).map((_, i) => ({
      id: i,
      image: "Product photo.png",
      title: `Ноутбук ${i + 1}`,
      rating: 4,
      oldPrice: 25000,
      price: Math.floor(Math.random() * 50000),
    }));

    const start = (page - 1) * LIMIT;
    const end = start + LIMIT;

    setTotalPages(Math.ceil(data.length / LIMIT));
    setProducts(data.slice(start, end));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  // useEffect(() => {
  //   let data: Product[] = new Array(50).fill(null).map((_, i) => ({
  //     id: i,
  //     image: "Product photo.png",
  //     title: `Ноутбук ${i + 1}`,
  //     rating: 4,
  //     oldPrice: 25000,
  //     price: Math.floor(Math.random() * 50000),
  //   }));

  //   const start = (page - 1) * LIMIT;
  //   const end = start + LIMIT;

  //   setTotalPages(Math.ceil(data.length / LIMIT));
  //   setProducts(data.slice(start, end));

  //   // 🔥 UX: скрол наверх при зміні сторінки
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [page]);

  const pages = getPagination(page, totalPages);

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
              Фільтри (пізніше)
            </div>
          </aside>

          {/* 🔹 RIGHT */}
          <div className="w-[954px]">
            <CatalogSlider categories={categories} />

            {/* 🔹 PRODUCTS */}
            <div className="grid grid-cols-3 gap-[24px] mt-[33px]">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* 🔹 PAGINATION */}
            <div className="flex justify-center items-center gap-2 mt-[40px]">
              {/* prev */}
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

              {/* pages */}
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

              {/* next */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
