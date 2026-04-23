import Image from "next/image";

export default function Categories() {
  return (
    <section className="w-full flex justify-center mt-10">
      {/* контейнер 1440 */}
      <div className="w-[1440px] h-[308px] flex flex-col items-center">
        {/* заголовок */}
        <h2 className="font-semibold text-[32px] leading-[150%] text-center text-black">
          Популярні категорії
        </h2>

        {/* блок з картинками */}
        <div className="flex gap-[24px] mt-[28px]">
          <Image
            src="/images/Categories/Frame 28.png"
            alt="Category 1"
            width={302}
            height={232}
            className="object-cover"
          />

          <Image
            src="/images/Categories/Frame 118.png"
            alt="Category 2"
            width={302}
            height={232}
            className="object-cover"
          />

          <Image
            src="/images/Categories/Frame 119.png"
            alt="Category 3"
            width={302}
            height={232}
            className="object-cover"
          />

          <Image
            src="/images/Categories/Frame 120.png"
            alt="Category 4"
            width={302}
            height={232}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// export default function Categories() {
//   return (
//     <section>
//       <h2 className="text-2xl font-semibold mb-4">Categories</h2>
//       <p>Категорії товарів.</p>
//     </section>
//   );
// }
