"use client";

import Image from "next/image";

type Props = {
  title: string;
  price: string;
  image: string;
};

export default function WishlistItem({ title, price, image }: Props) {
  return (
    <div className="w-[649px] h-[118px] py-[22px] border-t border-b border-[#e8ecef] flex items-center justify-between">
      {/* ===== LEFT BLOCK ===== */}
      <div className="w-[290px] h-[74px] flex items-center gap-[16px]">
        {/* Remove button */}
        <div className="w-[50px] h-[50px] rounded-[14px] bg-[#fcfbff] shadow-[0_10px_16px_4px_rgba(12,31,52,0.04)] flex items-center justify-center cursor-pointer">
          <Image
            src="/images/Account/x.svg"
            alt="remove"
            width={16}
            height={16}
          />
        </div>

        {/* Product image */}
        <Image
          src={image}
          alt={title}
          width={88}
          height={74}
          className="object-cover"
        />

        {/* Title */}
        <span className="text-[16px] text-[var(--black)]">{title}</span>
      </div>

      {/* ===== PRICE ===== */}
      <div className="text-[16px] text-[var(--black)]">{price}</div>

      {/* ===== BUTTON ===== */}
      <button className="w-[179px] h-[50px] bg-[#355EC0] text-white rounded-[4px] flex items-center justify-center gap-[12px]">
        Додати в
        <Image
          src="/images/Account/ShoppingCartSimple.svg"
          alt="cart"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
