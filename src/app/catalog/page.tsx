"use client";

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

const products = new Array(18).fill(null).map((_, i) => ({
  id: i,
  image: "Product photo.png",
  title: `Ноутбук ${i + 1}`,
  rating: 4,
  oldPrice: "25 000 грн",
  price: "21 999 грн",
}));

export default function Catalog() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-[1440px] px-[80px] py-[40px]">
        {/* 🔹 Breadcrumbs */}
        <div className="flex items-center gap-2 text-[16px] text-[var(--gray)]">
          <Link href="/">Головна</Link>

          <Image
            src="/images/Catalog/arrow-right.svg"
            alt="arrow"
            width={16}
            height={16}
          />

          <span>Ноутбуки</span>
        </div>

        {/* 🔹 Title */}
        <h1 className="mt-[28px] text-[24px] font-semibold">Ноутбуки</h1>

        {/* 🔹 MAIN CONTAINER */}
        <div className="mt-[28px] w-[1280px] flex gap-[24px]">
          {/* 🔹 SIDEBAR */}
          <aside className="w-[302px]">
            <div className="bg-white p-4 shadow-sm rounded">
              Фільтри (пізніше)
            </div>
          </aside>

          {/* 🔹 RIGHT CONTENT */}
          <div className="w-[954px]">
            {/* 🔹 SLIDER (drag + snap) */}
            <CatalogSlider categories={categories} />

            {/* 🔹 SORT */}
            <div className="mt-[33px]">
              <select
                className="
                  w-[182px]
                  h-[36px]
                  px-[12px]
                  rounded-[6px]
                  shadow-[0_10px_16px_4px_rgba(12,31,52,0.04)]
                  bg-[#fcfbff]
                "
              >
                <option>Сортувати</option>
                <option>Релевантні</option>
                <option>За популярністю</option>
                <option>Від дешевих</option>
                <option>Від дорогих</option>
              </select>
            </div>

            {/* 🔹 PRODUCTS */}
            <div className="grid grid-cols-3 gap-[24px] mt-[33px]">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* 🔹 PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-[40px]">
              <button>
                <Image
                  src="/images/Catalog/Arrow - Right.svg"
                  alt="prev"
                  width={24}
                  height={24}
                  className="rotate-180"
                />
              </button>

              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>...</span>
              <span>105</span>

              <button>
                <Image
                  src="/images/Catalog/Arrow - Right.svg"
                  alt="next"
                  width={24}
                  height={24}
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
