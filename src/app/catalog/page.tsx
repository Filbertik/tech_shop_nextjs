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

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sort, setSort] = useState("popular");

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const LIMIT = 9;

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
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products?min=${minPrice}&max=${maxPrice}&sort=${sort}`,
      );

      const data = await res.json();

      setTotalPages(Math.ceil(data.length / LIMIT));

      const start = (page - 1) * LIMIT;
      const end = start + LIMIT;

      setProducts(data.slice(start, end));
    };

    fetchProducts();
  }, [page, minPrice, maxPrice, sort]);

  // useEffect(() => {
  //   const data: Product[] = new Array(50).fill(null).map((_, i) => ({
  //     id: i,
  //     image: "Product photo.png",
  //     title: `Ноутбук ${i + 1}`,
  //     rating: Math.floor(Math.random() * 5) + 1,
  //     oldPrice: 25000,
  //     price: Math.floor(Math.random() * 50000),
  //   }));

  //   const filteredBase = data.filter((p) => {
  //     const min = minPrice ? Number(minPrice) : 0;
  //     const max = maxPrice ? Number(maxPrice) : Infinity;
  //     return p.price >= min && p.price <= max;
  //   });

  //   const filtered = [...filteredBase];

  //   switch (sort) {
  //     case "cheap":
  //       filtered.sort((a, b) => a.price - b.price);
  //       break;
  //     case "expensive":
  //       filtered.sort((a, b) => b.price - a.price);
  //       break;
  //     case "name":
  //       filtered.sort((a, b) => a.title.localeCompare(b.title));
  //       break;
  //     default:
  //       filtered.sort((a, b) => b.rating - a.rating);
  //   }

  //   const start = (page - 1) * LIMIT;
  //   const end = start + LIMIT;

  //   setTotalPages(Math.ceil(filtered.length / LIMIT));
  //   setProducts(filtered.slice(start, end));

  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [page, minPrice, maxPrice, sort]);

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
        {/* 🔹 BREADCRUMBS */}
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

        {/* 🔹 TITLE */}
        <h1 className="mt-[28px] text-[24px] font-semibold">Ноутбуки</h1>

        <div className="mt-[28px] w-[1280px] flex gap-[24px]">
          {/* 🔹 SIDEBAR */}
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

          {/* 🔹 RIGHT */}
          <div className="w-[954px]">
            <CatalogSlider categories={categories} />

            {/* SORT */}
            <SortBar
              total={products.length}
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
        {/* 🔹 HELP BLOCK */}
        <div className="mt-[60px] w-[640px]">
          <HelpBlock />
        </div>

        {/* 🔹 RECENT */}
        <div className="mt-[60px]">
          <RecentViewed />
        </div>
      </div>
    </section>
  );
}
