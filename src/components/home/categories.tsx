"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  "Frame 119.png",
  "Frame 120.png",
  "Frame 28.png",
  "Frame 118.png",
];

export default function Categories() {
  return (
    <section className="w-full flex justify-center mt-10">
      {/* контейнер 1440 */}
      <div className="w-[1440px] h-[308px] flex flex-col items-center">
        {/* заголовок */}
        <h2 className="font-[var(--font-family)] font-semibold text-[32px] leading-[150%] text-center text-black">
          Популярні категорії
        </h2>

        {/* блок з картинками */}
        <div className="flex gap-[24px] mt-[28px]">
          {categories.map((img, i) => (
            <Link
              key={i}
              href="/catalog"
              className="group relative block w-[302px] h-[232px] overflow-hidden rounded-[4px]"
            >
              {/* зображення */}
              <Image
                src={`/images/Categories/${img}`}
                alt={`Category ${i + 1}`}
                width={302}
                height={232}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// import Image from "next/image";

// export default function Categories() {
//   return (
//     <section className="w-full flex justify-center mt-10">
//       {/* контейнер 1440 */}
//       <div className="w-[1440px] h-[308px] flex flex-col items-center">
//         {/* заголовок */}
//         <h2 className="font-[var(--font-family)] font-semibold text-[32px] leading-[150%] text-center text-black">
//           Популярні категорії
//         </h2>

//         {/* блок з картинками */}
//         <div className="flex gap-[24px] mt-[28px]">
//           <Image
//             src="/images/Categories/Frame 119.png"
//             alt="Category 1"
//             width={302}
//             height={232}
//             className="w-[302px] h-[232px] object-cover rounded-[4px]"
//           />

//           <Image
//             src="/images/Categories/Frame 120.png"
//             alt="Category 2"
//             width={302}
//             height={232}
//             className="w-[302px] h-[232px] object-cover rounded-[4px]"
//           />

//           <Image
//             src="/images/Categories/Frame 28.png"
//             alt="Category 3"
//             width={302}
//             height={232}
//             className="w-[302px] h-[232px] object-cover rounded-[4px]"
//           />

//           <Image
//             src="/images/Categories/Frame 118.png"
//             alt="Category 4"
//             width={302}
//             height={232}
//             className="w-[302px] h-[232px] object-cover rounded-[4px]"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
