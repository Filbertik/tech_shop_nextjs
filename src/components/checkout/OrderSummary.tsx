"use client";

import { useCartStore } from "@/store/cart.store";
import CartItem from "@/components/cart/CartItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderSummary() {
  const { items } = useCartStore();

  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full min-h-[433px] rounded-[4px] p-[24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
      <h2 className="text-[18px] font-semibold mb-6">Ваше замовлення</h2>

      {/* LIST */}
      <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
        {items.length > 0 ? (
          items.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <p className="text-gray-500">Кошик порожній</p>
        )}
      </div>

      {/* TOTAL */}
      <div className="mt-6 flex justify-between text-[18px] font-semibold border-t pt-4">
        <span>Разом:</span>
        <span>{total} ₴</span>
      </div>

      {/* BUTTONS */}
      <div className="mt-6 flex flex-col gap-4">
        <button
          disabled={!accepted}
          onClick={() => router.push("/thank-you")}
          className="h-[50px] bg-[#355EC0] text-white rounded 
  hover:bg-[#2f32a8] transition duration-200 active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#355EC0]"
        >
          Оформити замовлення
        </button>
        {/* <button
          className="h-[50px] bg-[#355EC0] text-white rounded 
          hover:bg-[#2f32a8] transition duration-200 active:scale-95"
        >
          Оформити замовлення
        </button> */}

        <button
          disabled={!accepted}
          className="h-[50px] border border-[#355EC0] text-[#355EC0] rounded 
  hover:bg-[#355EC0] hover:text-white transition duration-200 active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#355EC0]"
        >
          Купити у розсрочку
        </button>

        {/* <button
          className="h-[50px] border border-[#355EC0] text-[#355EC0] rounded 
          hover:bg-[#355EC0] hover:text-white transition duration-200 active:scale-95"
        >
          Купити у розсрочку
        </button> */}
      </div>
      {/* AGREEMENT */}
      <div className="mt-6 w-full max-w-[526px] flex items-start gap-2">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-[3px] w-[16px] h-[16px] accent-[#355EC0] cursor-pointer"
        />
        {/* <input
          type="checkbox"
          className="mt-[3px] w-[16px] h-[16px] accent-[#355EC0] cursor-pointer"
        /> */}

        <p className="text-[16px] leading-[150%] text-black">
          Підтверджуючи замовлення, я приймаю умови{" "}
          <span className="text-[#355EC0] cursor-pointer">
            публічної оферти
          </span>
        </p>
      </div>
    </div>
  );
}

// export default function OrderSummary() {
//   return (
//     <div className="w-full min-h-[433px] rounded-[4px] p-[24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
//       <h2 className="text-[18px] font-semibold mb-4">Ваші замовлення</h2>

//       {/* тут буде список товарів + сума */}
//     </div>
//   );
// }
