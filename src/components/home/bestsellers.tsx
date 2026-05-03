"use client";

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    image: "Product photo.png",
    title:
      "Ноутбук Asus Vivobook 15 X1504VA-BQ500 (90NB10J2-M00PJ0) Cool Silver",
    price: "25 999 ₴",
  },
  {
    image: "Product photo1.png",
    title:
      "Ноутбук Asus Vivobook 15 X1504VA-BQ500 (90NB10J2-M00PJ0) Cool Silver",
    price: "27 499 ₴",
  },
  {
    image: "Product photo2.png",
    title:
      "Ноутбук Asus Vivobook 15 X1504VA-BQ500 (90NB10J2-M00PJ0) Cool Silver",
    price: "24 199 ₴",
  },
  {
    image: "Product photo3.png",
    title:
      "Ноутбук Asus Vivobook 15 X1504VA-BQ500 (90NB10J2-M00PJ0) Cool Silver",
    price: "26 899 ₴",
  },
];

export default function Bestsellers() {
  return (
    <section className="w-full flex justify-center mt-14">
      {/* контейнер */}
      <div className="w-[1440px] h-[581px] flex flex-col items-center">
        {/* заголовок */}
        <h2 className="font-[var(--font-family)] font-semibold text-[32px] leading-[150%] text-center text-black">
          Хіти продажів
        </h2>

        {/* карточки */}
        <div className="flex gap-[24px] mt-[28px]">
          {products.map((product, i) => (
            <div
              key={i}
              className="p-[30px_20px] w-[302px] h-[427px] bg-white rounded-[4px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] flex flex-col justify-between"
            >
              {/* картинка */}
              <Image
                src={`/images/Bestsellers/${product.image}`}
                alt={product.title}
                width={262}
                height={197}
                className="w-[262px] h-[197px] object-contain mx-auto"
              />

              {/* контент */}
              <div className="mt-4 flex flex-col gap-2">
                {/* опис */}
                <p className="font-[var(--font-family)] text-[16px] leading-[150%] text-[var(--black)]">
                  {product.title}
                </p>

                {/* рейтинг */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((_, i) => (
                    <Image
                      key={`filled-${i}`}
                      src="/images/Bestsellers/Star Icon f.svg"
                      alt="star"
                      width={16}
                      height={16}
                    />
                  ))}
                  <Image
                    src="/images/Bestsellers/Star Icon.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                </div>

                {/* ціна */}
                <p className="font-semibold text-[18px] text-black mt-2">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* кнопка */}
        <Link href="/catalog">
          <button className="mt-[28px] w-[175px] h-[50px] px-[32px] py-[12px] rounded-[4px] bg-[var(--accent)] text-white transition hover:opacity-90">
            Дивитись всі
          </button>
        </Link>
      </div>
    </section>
  );
}
