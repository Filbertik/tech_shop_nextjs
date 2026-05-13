"use client";

import Image from "next/image";

const features = [
  {
    icon: "Shield.svg",
    text: "Гарантія до 36 місяців",
  },
  {
    icon: "delivery-truck-02.svg",
    text: "Швидка доставка",
  },
  {
    icon: "shopping-basket-done-01.svg",
    text: "Офіційні продукти",
  },
  {
    icon: "customer-support.svg",
    text: "Підтримка 7 днів на тиждень",
  },
];

export default function Choice() {
  return (
    <section className="w-full flex justify-center mt-20">
      <div className="w-[1440px] flex flex-col items-center">
        {/* заголовок */}
        <h2
          className="
            font-[var(--font-family)]
            font-semibold
            text-[32px]
            leading-[150%]
            text-center
            text-black
          "
        >
          Чому обирають нас
        </h2>

        {/* блоки */}
        <div className="flex gap-[60px] mt-[28px]">
          {features.map((item, i) => (
            <div
              key={i}
              className="
                border border-[var(--border-light)]
                rounded-[10px]
                p-[20px]
                w-[180px]
                h-[160px]
                bg-white
                flex flex-col
                items-center
                justify-center
                text-center
              "
            >
              {/* іконка */}
              <Image
                src={`/images/Choice/${item.icon}`}
                alt={item.text}
                width={48}
                height={48}
                className="mb-4"
              />

              {/* текст */}
              <p
                className="
                  font-[var(--font-family)]
                  font-bold
                  text-[16px]
                  leading-[150%]
                  text-center
                  text-[var(--black)]
                "
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// export default function Choice() {
//   return (
//     <section>
//       <h2 className="text-2xl font-semibold mb-4">Our Choice</h2>
//       <p>Рекомендовані товари.</p>
//     </section>
//   );
// }
