"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Все для вашого ідеального сетапу",
    subtitle: "Техніка для роботи, навчання та ігор.",
    buttonText: "Перейти до каталогу",
    link: "/catalog",
    image: "/images/hero/hero-1.png",
  },
  {
    id: 2,
    title: "Готовий до більшого?",
    subtitle: "Системи, створені для ігор та високих навантажень.",
    buttonText: "Обрати ПК",
    link: "/catalog",
    image: "/images/hero/hero-2.png",
  },
  {
    id: 3,
    title: "ASUS Vivobook",
    subtitle: "Легкий у формі. Потужний у дії.",
    buttonText: "Переглянути",
    link: "/catalog",
    image: "/images/hero/hero-3.png",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // автопереключення
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="w-full max-w-[1440px] h-[525px] mx-auto relative overflow-hidden rounded-2xl">
      {/* BACKGROUND IMAGE */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-cover"
        priority
      />

      {/* OVERLAY (щоб текст читався) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-10 md:px-20 max-w-xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>

          <p className="text-lg mb-6 opacity-90">{slide.subtitle}</p>

          <Link href={slide.link}>
            <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl">
              {slide.buttonText}
            </button>
          </Link>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// export default function Hero() {
//   return (
//     <section className="h-[60vh] flex items-center justify-center bg-gray-100 rounded-2xl">
//       <div className="text-center max-w-xl">
//         <h1 className="text-4xl font-bold mb-4">Tech Shop</h1>
//         <p>Це hero banner. Тут буде ключова пропозиція магазину.</p>
//       </div>
//     </section>
//   );
// }
