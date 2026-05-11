"use client";

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    image: "Product photo.png",
    title:
      "Ноутбук Asus Vivobook 15 X1504VA-BQ500 (90NB10J2-M00PJ0) Cool Silver",
    price: "25 999 ₴",
    rating: 4,
  },
  {
    image: "Product photo1.png",
    title:
      "Монітор 27'' ASUS TUF Gaming VG27AQ5A QHD IPS 210Hz (90LM0BN0-B01371)",
    price: "9 499 ₴",
    rating: 5,
  },
  {
    image: "Product photo2.png",
    title:
      "Відеокарта Sapphire AMD Radeon RX 7900 XTX 24Gb Nitro+ GAMING OC VAPOR-X ...",
    price: "33 129 ₴",
    rating: 3,
  },
  {
    image: "Product photo3.png",
    title:
      "Ноутбук Dell 1'' Latitude 5410, i5-10310U, 8 GB, 240 GB, Intel UHD Graphics, 1920x1080",
    price: "15 329 ₴",
    rating: 4,
  },
];

export default function Bestsellers() {
  return (
    <section className="w-full flex justify-center mt-14">
      <div className="w-[1440px] flex flex-col items-center">
        {/* заголовок */}
        <h2 className="font-[var(--font-family)] font-semibold text-[32px] leading-[150%] text-center text-black">
          Акції
        </h2>

        {/* карточки */}
        <div className="flex gap-[24px] mt-[28px]">
          {products.map((product, i) => (
            <Link key={i} href="/catalog" className="group">
              <div
                className="
                  relative
                  p-[30px_20px]
                  w-[302px]
                  h-[427px]
                  bg-white
                  rounded-[4px]
                  shadow-[0_9px_22px_rgba(21,53,90,0.1)]
                  flex flex-col justify-between
                  transition
                  duration-300
                  group-hover:-translate-y-2
                  group-hover:shadow-lg
                "
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
                  {/* ⭐ рейтинг */}
                  <div className="flex items-center gap-2">
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

                    <span className="text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>

                  {/* опис */}
                  <p className="font-[var(--font-family)] text-[16px] leading-[150%] text-[var(--black)]">
                    {product.title}
                  </p>

                  {/* ціна */}
                  <p className="font-semibold text-[18px] text-black mt-2">
                    {product.price}
                  </p>
                </div>

                {/* КНОПКА (зʼявляється при hover) */}
                <div
                  className="
                    absolute
                    bottom-4
                    left-1/2
                    -translate-x-1/2
                    opacity-0
                    translate-y-4
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    transition
                    duration-300
                  "
                >
                  <button
                    className="
                      w-[100px]
                      py-2
                      bg-black
                      text-white
                      rounded
                      hover:opacity-90
                    "
                    onClick={(e) => e.preventDefault()}
                  >
                    У кошик
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* кнопка */}
        <Link href="/catalog">
          <button className="mt-[28px] w-[175px] h-[50px] px-[32px] py-[12px] rounded-[4px] bg-blue-600 text-white hover:bg-blue-700 transition">
            Дивитись всі
          </button>
        </Link>
      </div>
    </section>
  );
}
