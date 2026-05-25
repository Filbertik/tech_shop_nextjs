"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  images: string[];
}

export default function ImageBlock({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const listRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // 🔁 скрол до активного thumbnail
  const scrollToIndex = (index: number) => {
    const container = listRef.current;
    if (!container) return;

    const item = container.children[index] as HTMLElement;
    if (!item) return;

    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.clientHeight;

    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight;

    if (itemTop < viewTop) {
      container.scrollTo({ top: itemTop, behavior: "smooth" });
    } else if (itemBottom > viewBottom) {
      container.scrollTo({
        top: itemBottom - container.clientHeight,
        behavior: "smooth",
      });
    }
  };

  // ⬆️
  const handleUp = () => {
    listRef.current?.scrollBy({ top: -80, behavior: "smooth" });
  };

  // ⬇️
  const handleDown = () => {
    listRef.current?.scrollBy({ top: 80, behavior: "smooth" });
  };

  // ← →
  const changeImage = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= images.length) return;

    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  return (
    <div className="flex gap-[20px]">
      {/* THUMBNAILS */}
      <div className="w-[80px] h-[472px] flex flex-col items-center">
        {/* UP */}
        <button onClick={handleUp} className="mb-[8px]">
          <Image
            src="/images/ProductID/uparrow.svg"
            alt="up"
            width={24}
            height={24}
          />
        </button>

        {/* LIST */}
        <div
          ref={listRef}
          className="flex flex-col gap-[8px] overflow-y-auto scrollbar-hide h-[400px]"
        >
          {images.map((img, i) => (
            <Image
              key={i}
              src={`/images/ProductID/${img}`}
              alt="thumb"
              width={80}
              height={60}
              onClick={() => changeImage(i)}
              className={`cursor-pointer border rounded transition
                ${activeIndex === i ? "border-black" : "border-gray-200"}`}
            />
          ))}
        </div>

        {/* DOWN */}
        <button onClick={handleDown} className="mt-[8px]">
          <Image
            src="/images/ProductID/downarrow.svg"
            alt="down"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* MAIN IMAGE */}
      <div
        ref={imageRef}
        className="relative w-[500px] h-[500px] border rounded-[4px] overflow-hidden"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={(e) => {
          if (!imageRef.current) return;

          const rect = imageRef.current.getBoundingClientRect();

          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          setPosition({ x, y });
        }}
      >
        {/* IMAGE */}
        <Image
          src={`/images/ProductID/${images[activeIndex]}`}
          alt="main"
          fill
          className="object-cover cursor-zoom-in"
          style={{
            transform: isZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
            transition: isZoomed ? "none" : "transform 0.3s ease",
          }}
        />

        {/* TOP RIGHT ICONS */}
        <div className="absolute top-2 right-2 flex gap-[14px]">
          <Image
            src="/images/ProductID/Heart.svg"
            alt="heart"
            width={37}
            height={34}
          />
          <Image
            src="/images/ProductID/Scales.svg"
            alt="compare"
            width={37}
            height={34}
          />
        </div>

        {/* LEFT RIGHT NAV */}
        <div className="absolute bottom-2 right-2 flex gap-[12px]">
          <button onClick={() => changeImage(activeIndex - 1)}>
            <Image
              src="/images/ProductID/leftarrow.svg"
              alt="left"
              width={50}
              height={50}
            />
          </button>

          <button onClick={() => changeImage(activeIndex + 1)}>
            <Image
              src="/images/ProductID/rightarrow.svg"
              alt="right"
              width={50}
              height={50}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
