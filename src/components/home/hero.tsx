"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  image: string;
  align?: "left" | "right"; // вирівнювання
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Все для вашого ідеального сетапу",
    subtitle: "Техніка для роботи, навчання та ігор.",
    buttonText: "Перейти до каталогу",
    link: "/catalog",
    image: "/images/hero/hero-1.png",
    align: "left",
  },
  {
    id: 2,
    title: "Готовий до більшого?",
    subtitle: "Системи, створені для ігор та високих навантажень.",
    buttonText: "Обрати ПК",
    link: "/catalog",
    image: "/images/hero/hero-2.png",
    align: "right",
  },
  {
    id: 3,
    title: "ASUS Vivobook",
    subtitle: "Легкий у формі.\nПотужний у дії.",
    buttonText: "Переглянути",
    link: "/catalog",
    image: "/images/hero/hero-3.png",
    align: "left",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // автослайд кожні 5 сек
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section
      className="w-full h-[525px] relative overflow-hidden rounded-2xl"
      style={{
        backgroundImage: `url(${slide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* затемнення */}
      <div className="absolute inset-0 bg-black/30" />

      {/* вирівнювання контейнера */}
      <div
        className={`absolute inset-0 flex items-center ${
          slide.align === "right" ? "justify-end" : "justify-start"
        }`}
      >
        {/* відступи і позиція */}
        <div
          className={`max-w-xl text-white ${
            slide.align === "right"
              ? "mr-[80px] text-left"
              : "ml-[80px] text-left"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>

          <p className="text-base md:text-lg mb-6 opacity-90 whitespace-pre-line">
            {slide.subtitle}
          </p>

          <Link href={slide.link}>
            <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl">
              {slide.buttonText}
            </button>
          </Link>
        </div>
      </div>

      {/* dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// type Slide = {
//   id: number;
//   title: string;
//   subtitle: string;
//   buttonText: string;
//   link: string;
//   image: string;
// };

// const slides: Slide[] = [
//   {
//     id: 1,
//     title: "Все для вашого ідеального сетапу",
//     subtitle: "Техніка для роботи, навчання та ігор.",
//     buttonText: "Перейти до каталогу",
//     link: "/catalog",
//     image: "/images/hero/hero-1.png",
//   },
//   {
//     id: 2,
//     title: "Готовий до більшого?",
//     subtitle: "Системи, створені для ігор та високих навантажень.",
//     buttonText: "Обрати ПК",
//     link: "/catalog",
//     image: "/images/hero/hero-2.png",
//   },
//   {
//     id: 3,
//     title: "ASUS Vivobook",
//     // subtitle: "Легкий у формі. Потужний у дії.",
//     subtitle: "Легкий у формі.\nПотужний у дії.",
//     buttonText: "Переглянути",
//     link: "/catalog",
//     image: "/images/hero/hero-3.png",
//   },
// ];

// export default function Hero() {
//   const [current, setCurrent] = useState(0);

//   // автослайд кожні 5 сек
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const slide = slides[current];

//   return (
//     <section
//       className="w-full max-w-[1440px] h-[525px] mx-auto relative overflow-hidden rounded-2xl"
//       style={{
//         backgroundImage: `url(${slide.image})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* затемнення для читабельності тексту */}
//       <div className="absolute inset-0 bg-black/30" />

//       {/* контент */}
//       <div className="absolute inset-0 flex items-center">
//         <div className="px-6 md:px-20 max-w-xl text-white">
//           <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>

//           <p className="text-base md:text-lg mb-6 opacity-90 whitespace-pre-line">
//             {slide.subtitle}
//           </p>

//           {/* <p className="text-base md:text-lg mb-6 opacity-90">
//             {slide.subtitle}
//           </p> */}

//           <Link href={slide.link}>
//             <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl">
//               {slide.buttonText}
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* dots навігація */}
//       <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`w-3 h-3 rounded-full transition ${
//               index === current ? "bg-white" : "bg-white/40"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }
