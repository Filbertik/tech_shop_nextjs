"use client";

import Image from "next/image";

interface Props {
  images: string[];
}

export default function ImageBlock({ images }: Props) {
  return (
    <div className="flex gap-[20px]">
      {/* THUMBNAILS */}
      <div className="w-[80px] h-[472px] flex flex-col items-center justify-between">
        <Image
          src="/images/ProductID/uparrow.svg"
          alt="up"
          width={24}
          height={24}
        />

        <div className="flex flex-col gap-[8px] overflow-hidden">
          {images.map((img, i) => (
            <Image
              key={i}
              src={`/images/ProductID/${img}`}
              alt="thumb"
              width={80}
              height={60}
              className="cursor-pointer border rounded"
            />
          ))}
        </div>

        <Image
          src="/images/ProductID/downarrow.svg"
          alt="down"
          width={24}
          height={24}
        />
      </div>

      {/* MAIN IMAGE */}
      <div className="relative w-[500px] h-[500px] border rounded-[4px]">
        <Image
          src={`/images/ProductID/${images[0]}`}
          alt="main"
          fill
          className="object-contain"
        />

        <div className="absolute top-2 right-2 flex gap-2">
          <Image
            src="/images/ProductID/Heart.svg"
            alt="heart"
            width={24}
            height={24}
          />
          <Image
            src="/images/ProductID/Scales.svg"
            alt="compare"
            width={24}
            height={24}
          />
        </div>

        <div className="absolute bottom-2 right-2 flex gap-2">
          <Image
            src="/images/ProductID/leftarrow.svg"
            alt="left"
            width={24}
            height={24}
          />
          <Image
            src="/images/ProductID/rightarrow.svg"
            alt="right"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
