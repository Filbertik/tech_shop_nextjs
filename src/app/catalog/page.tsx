"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const categories = [
  { image: "Slide1.png", title: "Ігрові ноутбуки" },
  { image: "Slide2.png", title: "Для навчання та роботи" },
  { image: "Slide3.png", title: "Для дизайну та 3D" },
  { image: "Slide4.png", title: "Топ продажів" },
  { image: "Slide5.png", title: "Бюджетні рішення" },
  { image: "Slide6.png", title: "З сенсорним екраном" },
];

// 🔹 тимчасові продукти
const products = new Array(18).fill(null).map((_, i) => ({
  id: i,
  image: "Product photo.png",
  title: `Ноутбук ${i + 1}`,
  rating: 4,
  oldPrice: "25 000 грн",
  price: "21 999 грн",
}));
// const products = new Array(18).fill(null).map((_, i) => ({
//   image: "Product photo.png",
//   title: "Ноутбук Asus Vivobook 15 X1504VA-BQ500",
//   rating: 4,
//   oldPrice: "25 000 грн",
//   price: "21 999 грн",
// }));

export default function Catalog() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full flex justify-center">
      <div className="w-[1440px] px-[80px] py-[40px]">
        {/* 🔹 Breadcrumbs */}
        <div className="flex items-center gap-2 text-[16px] text-[var(--gray)]">
          <Link href="/">Головна</Link>
          <Image
            src="/images/icons/arrow-right.svg"
            alt="arrow"
            width={16}
            height={16}
          />
          <span>Ноутбуки</span>
        </div>

        {/* 🔹 Title */}
        <h1 className="mt-[28px] text-[24px] font-semibold">Ноутбуки</h1>

        {/* 🔹 MAIN CONTAINER 1280 */}
        <div className="mt-[28px] w-[1280px] flex gap-[24px]">
          {/* 🔹 SIDEBAR */}
          <aside className="w-[302px]">
            <div className="bg-white p-4 shadow-sm rounded">
              <p>Фільтри (пізніше)</p>
            </div>
          </aside>

          {/* 🔹 RIGHT CONTENT */}
          <div className="w-[954px]">
            {/* 🔹 SLIDER */}
            <div className="relative">
              <div ref={sliderRef} className="flex gap-[16px] overflow-hidden">
                {categories.map((item, i) => (
                  <div
                    key={i}
                    className="min-w-[190px] h-[195px] p-[10px_15px] bg-white rounded-[4px] shadow-sm flex flex-col justify-between"
                  >
                    <Image
                      src={`/images/categories/${item.image}`}
                      alt={item.title}
                      width={160}
                      height={120}
                      className="object-contain mx-auto"
                    />
                    <p className="text-center text-sm">{item.title}</p>
                  </div>
                ))}
              </div>

              {/* 🔹 SCROLL BUTTON */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                <Image
                  src="/images/icons/scroll button.png"
                  alt="scroll"
                  width={40}
                  height={40}
                />
              </button>
            </div>

            {/* 🔹 SORT DROPDOWN */}
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
                <option>Від дешевих</option>
                <option>Від дорогих</option>
              </select>
            </div>

            {/* 🔹 PRODUCTS GRID */}
            <div className="grid grid-cols-3 gap-[24px] mt-[33px]">
              {products.map((product, i) => (
                <Link key={i} href="/catalog" className="group">
                  <div className="relative p-[30px_20px] w-[302px] h-[427px] bg-white rounded-[4px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] flex flex-col justify-between transition duration-300 group-hover:-translate-y-2 group-hover:shadow-lg">
                    {/* IMAGE */}
                    <div className="relative flex justify-center">
                      <Image
                        src="/images/Sale/sale bage.png"
                        alt="sale"
                        width={50}
                        height={50}
                        className="absolute top-0 left-0"
                      />

                      <Image
                        src={`/images/Sale/${product.image}`}
                        alt={product.title}
                        width={262}
                        height={197}
                        className="object-contain"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="mt-4 flex flex-col gap-2">
                      {/* rating */}
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

                      <p className="text-[16px] line-clamp-2">
                        {product.title}
                      </p>

                      <div>
                        <span className="text-[12px] line-through text-gray-400">
                          {product.oldPrice}
                        </span>
                        <p className="text-[18px] font-semibold">
                          {product.price}
                        </p>
                      </div>
                    </div>

                    {/* BUTTON */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition">
                      <button
                        className="w-[100px] py-2 bg-black text-white rounded"
                        onClick={(e) => e.preventDefault()}
                      >
                        У кошик
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 🔹 PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-[40px]">
              <button>
                <Image
                  src="/images/icons/Arrow - Right.svg"
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
                  src="/images/icons/Arrow - Right.svg"
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

// export default function Catalog() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Catalog Page123</h1>
//       <p>`Це заготовка сторінки Catalog Page.111`</p>
//     </div>
//   );
// }
