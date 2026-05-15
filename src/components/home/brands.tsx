"use client";

import Image from "next/image";

const brands = [
  "NVIDIA_wordmark_light 1.png",
  "asus-4 1.png",
  "intel-6 1.png",
  "amd-logo-1 1.png",
  "msi-3 1.png",
  "samsung-electronics 1.png",
  "be-quiet-logo 1.png",
];

export default function Brands() {
  return (
    // <section className="flex justify-center mt-20">
    <section className="flex justify-center mt-20 mb-[40px]">
      <div className="w-[1440px] px-[80px]">
        {/* TEXT */}
        {/* <h2 className="text-2xl font-semibold mb-4 text-center">Our Brands</h2> */}
        {/* <p className="text-center mb-8">Рекомендовані торгові марки.</p> */}

        {/* BRANDS */}
        <div
          className="
            flex
            justify-center
            items-center
            gap-[106px]
            h-[30px]
          "
        >
          {brands.map((brand, index) => (
            <Image
              key={index}
              src={`/images/brands/${brand}`}
              alt={brand}
              width={120}
              height={30}
              className="object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// export default function Brands() {
//   return (
//     <section>
//       <h2 className="text-2xl font-semibold mb-4">Our Brands</h2>
//       <p>Рекомендовані торгові марки.</p>
//     </section>
//   );
// }
