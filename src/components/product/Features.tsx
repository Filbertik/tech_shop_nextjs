"use client";

import Image from "next/image";

export default function Features() {
  const items = [
    {
      icon: "delivery-truck-02.svg",
      text: "Відправка на наступний день",
    },
    {
      icon: "customer-support.svg",
      text: "Консультація з експертом",
    },
    {
      icon: "iconofreturn.svg",
      text: "Повернення / обмін протягом 14 днів",
    },
  ];

  return (
    <div className="w-[568px] flex gap-[8px] mt-[16px]">
      {items.map((item, i) => (
        <div
          key={i}
          className="w-[184px] h-[106px] border rounded flex flex-col items-center justify-center text-center"
        >
          <Image
            src={`/images/ProductID/${item.icon}`}
            alt="icon"
            width={48}
            height={48}
          />

          <span className="mt-[10px] font-bold text-[16px] leading-[150%] text-center text-black">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}
