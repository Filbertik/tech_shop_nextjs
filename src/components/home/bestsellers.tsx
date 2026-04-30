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
];

export default function Bestsellers() {
  return (
    <section className="w-full flex justify-center mt-14">
      <div className="w-[1440px] flex flex-col items-center">
        {/* заголовок */}
        <h2 className="font-[var(--font-family)] font-semibold text-[32px] leading-[150%] text-center text-black">
          Хіти продажів
        </h2>

        {/* карточки */}
        <div className="flex gap-[24px] mt-[28px]">
          {products.map((product, i) => (
            <div
              key={i}
              className="p-[30px_20px] w-[302px] h-[427px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white rounded-[4px] flex flex-col justify-between"
            >
              {/* картинка */}
              <Image
                src={`/images/Bestsellers/${product.image}`}
                alt={product.title}
                width={262}
                height={197}
                className="w-[262px] h-[197px] object-contain mx-auto"
              />

              {/* опис */}
              <div className="mt-4 flex flex-col gap-2">
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
          <button className="mt-[28px] rounded-[4px] px-[32px] py-[12px] w-[175px] h-[50px] bg-[var(--accent)] text-white transition hover:opacity-90">
            Дивитись всі
          </button>
        </Link>
      </div>
    </section>
  );
}

// export default function Bestsellers() {
//   return (
//     <section>
//       <h2 className="text-2xl font-semibold mb-4">Bestsellers</h2>
//       <p>Популярні товари.</p>
//     </section>
//   );
// }
