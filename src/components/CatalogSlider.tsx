"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Category = {
  image: string;
  title: string;
};

type Props = {
  categories: Category[];
};

export default function CatalogSlider({ categories }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 👉 drag start
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  // 👉 drag move
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // швидкість drag
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  // 👉 кнопка вправо
  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="
          flex gap-[16px] overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          cursor-grab active:cursor-grabbing
          select-none
        "
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {categories.map((item, i) => (
          <div
            key={i}
            className="
              min-w-[190px]
              h-[195px]
              p-[10px_15px]
              bg-white
              rounded-[4px]
              shadow-sm
              flex flex-col justify-between
              snap-start
            "
          >
            <Image
              src={`/images/Catalog/${item.image}`}
              alt={item.title}
              width={160}
              height={120}
              className="object-contain mx-auto pointer-events-none"
            />

            <p className="text-center text-sm">{item.title}</p>
          </div>
        ))}
      </div>

      {/* 👉 кнопка */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <Image
          src="/images/Catalog/scroll button.png"
          alt="scroll"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
}
