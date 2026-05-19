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

// 🔹 FILTER STRUCTURE
const filterSections = [
  "Наявність",
  "Знижка",
  "Бренд",
  "Тип",
  "Діагональ екрану",
  "Роздільна здатність екрану",
  "Тип екрану",
  "Частота оновлення екрану",
  "Особливості дисплея",
  "Процесор",
  "Кількість ядер",
  "Виробник відеокарти",
  "Тип відеокарти",
  "Графічний адаптер",
  "Об'єм відеопам'яті",
  "Оперативна пам'ять",
  "Характеристики оперативної пам'яті",
  "Об'єм SSD",
  "Операційна система",
  "Тип покриття",
  "Тип матриці",
  "Тип акумулятору",
  "Особливості",
];

// 🔹 FAKE OPTIONS
const fakeOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];

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
    const data: Product[] = new Array(50).fill(null).map((_, i) => ({
      id: i,
      image: "Product photo.png",
      title: `Ноутбук ${i + 1}`,
      rating: Math.floor(Math.random() * 5) + 1,
      oldPrice: 25000,
      price: Math.floor(Math.random() * 50000),
    }));

    const filteredBase = data.filter((p) => {
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      return p.price >= min && p.price <= max;
    });

    const filtered = [...filteredBase];

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
      default:
        filtered.sort((a, b) => b.rating - a.rating);
    }

    const start = (page - 1) * LIMIT;
    const end = start + LIMIT;

    setTotalPages(Math.ceil(filtered.length / LIMIT));
    setProducts(filtered.slice(start, end));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, minPrice, maxPrice, sort]);

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
          <aside className="w-[302px]">
            <div className="bg-white p-4 shadow-sm rounded">
              <h3 className="font-semibold mb-4">Фільтри</h3>

              {/* PRICE */}
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

              {/* 🔥 FILTERS */}
              <div className="mt-6 space-y-4">
                {filterSections.map((section) => (
                  <div key={section}>
                    <button
                      onClick={() => toggleSection(section)}
                      className="w-full flex justify-between text-sm font-medium"
                    >
                      {section}
                      <span>{openSections[section] ? "−" : "+"}</span>
                    </button>

                    {openSections[section] && (
                      <div className="mt-2 space-y-1">
                        {fakeOptions.map((opt) => (
                          <label key={opt} className="flex gap-2 text-sm">
                            <input type="checkbox" />
                            {opt}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={resetFilters}
                className="mt-6 w-full border py-2 rounded hover:bg-gray-100"
              >
                Скинути фільтри
              </button>
            </div>
          </aside>

          {/* 🔹 RIGHT */}
          <div className="w-[954px]">
            <CatalogSlider categories={categories} />

            {/* SORT */}
            <div className="flex justify-between items-center mt-[24px]">
              <p className="text-sm text-gray-500">
                Знайдено товарів: {products.length}
              </p>

              <select
                value={sort}
                onChange={(e) => {
                  setPage(1);
                  setSort(e.target.value);
                }}
                className="border px-2 py-1 rounded"
              >
                <option value="popular">Популярні</option>
                <option value="cheap">Дешеві</option>
                <option value="expensive">Дорогі</option>
                <option value="name">За ім’ям</option>
              </select>
            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-2 mt-[40px]">
              <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                <Image
                  src="/images/Catalog/Arrow - Right.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>

              {pages.map((p, i) =>
                p === "..." ? (
                  <span key={i}>...</span>
                ) : (
                  <button
                    key={i}
                    onClick={() => setPage(Number(p))}
                    className={page === p ? "bg-black text-white px-3" : "px-3"}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                <Image
                  src="/images/Catalog/Arrow - Right.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="rotate-180"
                />
              </button>
            </div>
          </div>
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
    </section>
  );
}
