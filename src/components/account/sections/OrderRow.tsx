"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  id: string;
  date: string;
  status: string;
  price: string;
};

export default function OrderRow({ id, date, status, price }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-start gap-[16px]">
      {/* ===== Arrow ===== */}
      <div
        onClick={() => setOpen(!open)}
        className="w-[50px] h-[50px] rounded-[14px] bg-[#fcfbff] shadow-[0_10px_16px_4px_rgba(12,31,52,0.04)] flex items-center justify-center cursor-pointer"
      >
        <Image
          src="/images/Account/CaretRight.svg"
          alt="open"
          width={16}
          height={16}
          className={`transition-transform ${open ? "rotate-90" : ""}`}
        />
      </div>

      {/* ===== Data Row ===== */}
      <div className="w-[707px] border-b border-[#e8ecef] py-[24px] flex justify-between text-[16px] text-[#141718]">
        <span>{id}</span>
        <span>{date}</span>
        <span>{status}</span>
        <span>{price}</span>
      </div>

      {/* ===== Expandable Content (на майбутнє) ===== */}
      {open && (
        <div className="w-full pl-[66px] pb-[16px] text-sm text-gray-500">
          Деталі замовлення (тут будуть товари)
        </div>
      )}
    </div>
  );
}
