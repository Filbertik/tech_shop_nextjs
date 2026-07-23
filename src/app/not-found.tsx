"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="relative w-full min-h-[870px] bg-[#e4edf9] flex items-center justify-center overflow-hidden">
      {/* LEFT BOTTOM IMAGE */}
      <Image
        src="/images/404/Group_l.png"
        alt="left decor"
        width={436}
        height={422}
        className="absolute bottom-0 left-0 pointer-events-none"
      />

      {/* RIGHT BOTTOM IMAGE */}
      <Image
        src="/images/404/Group_r.png"
        alt="right decor"
        width={433}
        height={422}
        className="absolute bottom-0 right-0 pointer-events-none"
      />

      {/* CENTER BLOCK */}
      <div className="relative w-[547px] h-[585px] mt-[140px] mb-[144px] flex flex-col items-center">
        {/* BACKGROUND IMAGE */}
        <Image
          src="/images/404/Group_404.png"
          alt="404"
          fill
          className="object-contain pointer-events-none"
        />

        {/* TEXT */}
        <p className="absolute top-[353px] text-[24px] font-semibold leading-[150%] text-[var(--accent)] text-center">
          Цієї сторінки більше немає
        </p>

        {/* BUTTON */}
        <div className="absolute top-[403px]">
          <Button as={Link} href="/" color="primary" variant="shadow">
            Повернутись на головну
          </Button>
        </div>
      </div>
    </div>
  );
}
