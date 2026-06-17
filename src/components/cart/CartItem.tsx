"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart.store";

export default function CartItem({ item }: any) {
  const { increase, decrease, remove } = useCartStore();

  return (
    <div className="flex w-[510px] h-[120px] gap-3">
      {/* IMAGE */}
      <div className="w-[120px] h-[120px] relative">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain rounded"
        />
      </div>

      {/* INFO */}
      <div className="w-[223px] flex flex-col justify-between">
        <p className="text-[16px] line-clamp-2">{item.title}</p>

        {/* COUNTER */}
        <div className="flex items-center gap-2">
          <button onClick={() => decrease(item.id)}>
            <Image src="/images/cat/minus.svg" alt="-" width={16} height={16} />
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => increase(item.id)}>
            <Image src="/images/cat/plus.svg" alt="+" width={16} height={16} />
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="flex flex-col justify-start">
        {item.oldPrice && (
          <span className="text-[12px] line-through text-gray-400">
            {item.oldPrice} ₴
          </span>
        )}
        <span className="text-[20px] font-semibold">
          {item.price * item.quantity} ₴
        </span>
      </div>

      {/* REMOVE */}
      <button onClick={() => remove(item.id)}>
        <Image
          src="/images/cat/close.svg"
          alt="remove"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}
