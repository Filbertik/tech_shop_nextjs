"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ProductCard from "@/components/ProductCard";
import CatalogSlider from "@/components/CatalogSlider";

const categories = [
  { image: "Slide1.png", title: "Ігрові ноутбуки" },
  { image: "Slide2.png", title: "Для навчання та роботи" },
  { image: "Slide3.png", title: "Для дизайну та 3D" },
  { image: "Slide4.png", title: "Топ продажів" },
  { image: "Slide5.png", title: "Бюджетні рішення" },
  { image: "Slide6.png", title: "З сенсорним екраном" },
];

type Product = {
  id: number;
  image: string;
  title: string;
  rating: number;
  oldPrice: string;
  price: string;
};

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 9;

  // 🔹 fake API
  const fetchProducts = async (page: number) => {
    // імітація API
    const allProducts = new Array(50).fill(null).map((_, i) => ({
      id: i,
      image: "Product photo.png",
      title: `Ноутбук ${i + 1}`,
      rating: 4,
      oldPrice: "25 000 грн",
      price: "21 999 грн",
    }));

    const start = (page - 1) * LIMIT;
    const end = start + LIMIT;

    setProducts(allProducts.slice(start, end));
    setTotalPages(Math.ceil(allProducts.length / LIMIT));
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

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
            <div className="flex justify-center items-center gap-3 mt-[40px]">
              {/* prev */}
              <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                <Image
                  src="/images/Catalog/Arrow - Right.svg"
                  alt="prev"
                  width={24}
                  height={24}
                />
              </button>

              {/* pages */}
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1 ? "bg-black text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              {/* next */}
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
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
