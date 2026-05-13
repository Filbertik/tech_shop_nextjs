"use client";

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    image: "Product photo4.png",
    title: "Миша Razer DeathAdder Essential USB Black (RZ01-03850100-R3M1)",
    price: "999 ₴",
    oldPrice: "1299 ₴",
    rating: 5,
  },
  {
    image: "Product photo5.png",
    title:
      "Процесор Intel Core Ultra 5 245K (BX80768245K) (Socket 1851, 14T, 5.2 ГГц, Box)",
    price: "11 299 ₴",
    oldPrice: "12 499 ₴",
    rating: 0,
  },
  {
    image: "Product photo6.png",
    title: "Навушники JBL Tune 770NC White (JBLT770NCWHT)",
    price: "3 499 ₴",
    oldPrice: "4 199 ₴",
    rating: 2,
  },
  {
    image: "Product photo7.png",
    title:
      "Монітор 27'' 2E GAMING G2725BV Curved QHD VA 180Hz (2E-G2725BV-01.UA)",
    price: "6 699 ₴",
    oldPrice: "7 499 ₴",
    rating: 2,
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
                {/* IMAGE WRAPPER */}
                <div className="relative flex justify-center">
                  {/* SALE BADGE (ліва сторона) */}
                  <Image
                    src={`/images/Sale/sale bage.png`}
                    alt="sale"
                    width={50}
                    height={50}
                    className="absolute top-0 left-0"
                  />

                  {/* PRODUCT IMAGE */}
                  <Image
                    src={`/images/Sale/${product.image}`}
                    alt={product.title}
                    width={262}
                    height={197}
                    className="w-[262px] h-[197px] object-contain"
                  />
                </div>

                {/* контент */}
                <div className="mt-4 flex flex-col gap-2">
                  {/* ⭐ рейтинг */}
                  <div className="flex items-center gap-2 h-[20px]">
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

                  {/* опис (ФІКС ВИСОТИ) */}
                  <p
                    className="
                      font-[var(--font-family)]
                      text-[16px]
                      leading-[150%]
                      text-[var(--black)]
                      min-h-[72px]
                    "
                  >
                    {product.title}
                  </p>

                  {/* ЦІНИ */}
                  <div className="mt-2 flex flex-col gap-1">
                    {/* стара ціна */}
                    <span
                      className="
                        font-[var(--font-family)]
                        font-normal
                        text-[12px]
                        leading-[100%]
                        line-through
                        text-[var(--gray)]
                      "
                    >
                      {product.oldPrice}
                    </span>

                    {/* нова ціна */}
                    <p className="font-semibold text-[18px] text-black">
                      {product.price}
                    </p>
                  </div>
                </div>

                {/* КНОПКА */}
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

// "use client";

// import Image from "next/image";
// import Link from "next/link";

// const products = [
//   {
//     image: "Product photo4.png",
//     title: "Миша Razer DeathAdder Essential USB Black (RZ01-03850100-R3M1)",
//     price: "999 ₴",
//     oldPrice: "1 399 ₴",
//     rating: 5,
//   },
//   {
//     image: "Product photo5.png",
//     title:
//       "Процесор Intel Core Ultra 5 245K (BX80768245K) (Socket 1851, 14T, 5.2 ГГц, Box)",
//     price: "11 299 ₴",
//     oldPrice: "11 999 ₴",
//     rating: 0,
//   },
//   {
//     image: "Product photo6.png",
//     title: "Навушники JBL Tune 770NC White (JBLT770NCWHT)",
//     price: "3 499 ₴",
//     oldPrice: "3 999 ₴",
//     rating: 2,
//   },
//   {
//     image: "Product photo7.png",
//     title:
//       "Монітор 27'' 2E GAMING G2725BV Curved QHD VA 180Hz (2E-G2725BV-01.UA)",
//     price: "6 699 ₴",
//     oldPrice: "6 999 ₴",
//     rating: 2,
//   },
// ];

// export default function Bestsellers() {
//   return (
//     <section className="w-full flex justify-center mt-14">
//       <div className="w-[1440px] flex flex-col items-center">
//         {/* заголовок */}
//         <h2 className="font-[var(--font-family)] font-semibold text-[32px] leading-[150%] text-center text-black">
//           Акції
//         </h2>

//         {/* карточки */}
//         <div className="flex gap-[24px] mt-[28px]">
//           {products.map((product, i) => (
//             <Link key={i} href="/catalog" className="group">
//               <div
//                 className="
//                   relative
//                   p-[30px_20px]
//                   w-[302px]
//                   h-[427px]
//                   bg-white
//                   rounded-[4px]
//                   shadow-[0_9px_22px_rgba(21,53,90,0.1)]
//                   flex flex-col justify-between
//                   transition
//                   duration-300
//                   group-hover:-translate-y-2
//                   group-hover:shadow-lg
//                 "
//               >
//                 {/* IMAGE WRAPPER */}
//                 <div className="relative flex justify-center">
//                   {/* SALE BADGE */}
//                   <Image
//                     src={`/images/Sale/sale bage.png`}
//                     alt="sale"
//                     width={50}
//                     height={50}
//                     className="absolute top-0 right-0"
//                   />

//                   {/* PRODUCT IMAGE */}
//                   <Image
//                     src={`/images/Sale/${product.image}`}
//                     alt={product.title}
//                     width={262}
//                     height={197}
//                     className="w-[262px] h-[197px] object-contain"
//                   />
//                 </div>

//                 {/* контент */}
//                 <div className="mt-4 flex flex-col gap-2">
//                   {/* ⭐ рейтинг */}
//                   <div className="flex items-center gap-2">
//                     <div className="flex gap-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Image
//                           key={star}
//                           src={
//                             star <= product.rating
//                               ? "/images/Bestsellers/Star Icon f.svg"
//                               : "/images/Bestsellers/Star Icon.svg"
//                           }
//                           alt="star"
//                           width={16}
//                           height={16}
//                         />
//                       ))}
//                     </div>

//                     <span className="text-sm text-gray-600">
//                       {product.rating}
//                     </span>
//                   </div>

//                   {/* опис */}
//                   <p className="font-[var(--font-family)] text-[16px] leading-[150%] text-[var(--black)]">
//                     {product.title}
//                   </p>

//                   {/* ЦІНИ */}
//                   <div className="mt-2 flex flex-col gap-1">
//                     {/* стара ціна */}
//                     <span
//                       className="
//                         font-[var(--font-family)]
//                         font-normal
//                         text-[12px]
//                         leading-[100%]
//                         line-through
//                         text-[var(--gray)]
//                       "
//                     >
//                       {product.oldPrice}
//                     </span>

//                     {/* нова ціна */}
//                     <p className="font-semibold text-[18px] text-black">
//                       {product.price}
//                     </p>
//                   </div>
//                 </div>

//                 {/* КНОПКА */}
//                 <div
//                   className="
//                     absolute
//                     bottom-4
//                     left-1/2
//                     -translate-x-1/2
//                     opacity-0
//                     translate-y-4
//                     group-hover:opacity-100
//                     group-hover:translate-y-0
//                     transition
//                     duration-300
//                   "
//                 >
//                   <button
//                     className="
//                       w-[100px]
//                       py-2
//                       bg-black
//                       text-white
//                       rounded
//                       hover:opacity-90
//                     "
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     У кошик
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* кнопка */}
//         <Link href="/catalog">
//           <button className="mt-[28px] w-[175px] h-[50px] px-[32px] py-[12px] rounded-[4px] bg-blue-600 text-white hover:bg-blue-700 transition">
//             Дивитись всі
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// }
