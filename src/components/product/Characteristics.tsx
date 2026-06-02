"use client";

import { useState } from "react";

interface Props {
  characteristics: unknown;
}

export default function Characteristics({ characteristics }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!characteristics || typeof characteristics !== "object") {
    return (
      <div className="w-[301px] mt-[20px]">
        <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
        <p className="text-gray-500">Немає даних</p>
      </div>
    );
  }

  const data = characteristics as Record<string, string | number>;

  const entries = Object.entries(data);

  const visibleEntries = expanded ? entries : entries.slice(0, 6);

  return (
    <div className="w-[301px] mt-[20px]">
      <h3 className="text-lg font-semibold mb-2">Характеристики</h3>

      {/* 🔥 контейнер з обмеженням висоти */}
      <div
        className={`flex flex-col gap-2 text-sm text-gray-700 transition-all duration-300 overflow-hidden ${
          expanded ? "max-h-[1000px]" : "max-h-[220px]"
        }`}
      >
        {visibleEntries.map(([key, value]) => (
          <div key={key} className="flex justify-between border-b pb-1">
            <span className="font-medium capitalize">{formatKey(key)}</span>

            <span>{String(value)}</span>
          </div>
        ))}
      </div>

      {/* 🔽 КНОПКА "ДИВИТИСЬ ВСІ" */}
      {!expanded && entries.length > 6 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 underline text-[var(--borders)] text-[16px] font-light leading-[150%]"
          style={{
            fontFamily: "var(--font-family)",
            textDecorationSkipInk: "none",
          }}
        >
          Дивитись всі характеристики
        </button>
      )}

      {/* 🔼 КНОПКА "ЗГОРНУТИ" */}
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-3 underline text-[var(--borders)] text-[16px] font-light leading-[150%]"
          style={{
            fontFamily: "var(--font-family)",
            textDecorationSkipInk: "none",
          }}
        >
          Згорнути
        </button>
      )}
    </div>
  );
}

/* ======================
   FORMAT KEYS
====================== */
function formatKey(key: string) {
  const map: Record<string, string> = {
    cpu: "Процесор",
    gpu: "Відеокарта",
    ram: "Оперативна памʼять",
    storage: "Накопичувач",
    display: "Дисплей",
    battery: "Батарея",
    weight: "Вага",
    color: "Колір",
    ports: "Порти",
    warranty: "Гарантія",
  };

  return map[key] ?? key;
}

// interface Props {
//   characteristics: unknown;
// }

// export default function Characteristics({ characteristics }: Props) {
//   // 🔥 захист від null / string / array
//   if (!characteristics || typeof characteristics !== "object") {
//     return (
//       <div className="w-[301px] mt-[20px]">
//         <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
//         <p className="text-gray-500">Немає даних</p>
//       </div>
//     );
//   }

//   const data = characteristics as Record<string, string | number>;

//   return (
//     <div className="w-[301px] mt-[20px]">
//       <h3 className="text-lg font-semibold mb-2">Характеристики</h3>

//       <div className="flex flex-col gap-2 text-sm text-gray-700">
//         {Object.entries(data).map(([key, value]) => (
//           <div key={key} className="flex justify-between border-b pb-1">
//             <span className="font-medium capitalize">{formatKey(key)}</span>

//             <span>{String(value)}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function formatKey(key: string) {
//   const map: Record<string, string> = {
//     cpu: "Процесор",
//     gpu: "Відеокарта",
//     ram: "Оперативна памʼять",
//     storage: "Накопичувач",
//     display: "Дисплей",
//     battery: "Батарея",
//     weight: "Вага",
//     color: "Колір",
//     ports: "Порти",
//     warranty: "Гарантія",
//   };

//   return map[key] ?? key;
// }

// // interface Props {
// //   characteristics: Record<string, string | number>;
// // }

// // export default function Characteristics({ characteristics }: Props) {
// //   if (!characteristics) {
// //     return (
// //       <div className="w-[301px] mt-[20px]">
// //         <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
// //         <p className="text-gray-500">Немає даних</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-[301px] mt-[20px]">
// //       <h3 className="text-lg font-semibold mb-2">Характеристики</h3>

// //       <div className="flex flex-col gap-2 text-sm text-gray-700">
// //         {Object.entries(characteristics).map(([key, value]) => (
// //           <div key={key} className="flex justify-between border-b pb-1">
// //             <span className="font-medium capitalize">{formatKey(key)}</span>

// //             <span>{String(value)}</span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // /* 🔥 красиво форматуємо ключі */
// // function formatKey(key: string) {
// //   const map: Record<string, string> = {
// //     cpu: "Процесор",
// //     gpu: "Відеокарта",
// //     ram: "Оперативна памʼять",
// //     storage: "Накопичувач",
// //     display: "Дисплей",
// //     battery: "Батарея",
// //     weight: "Вага",
// //     color: "Колір",
// //     ports: "Порти",
// //     warranty: "Гарантія",
// //   };

// //   return map[key] ?? key;
// // }

// // // export default function Characteristics() {
// // //   return (
// // //     <div className="w-[301px] h-[367px] mt-[20px]">
// // //       <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
// // //     </div>
// // //   );
// // // }
