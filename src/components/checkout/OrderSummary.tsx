"use client";

import { useCartStore } from "@/store/cart.store"; // перевір шлях!
import CartItem from "@/components/cart/CartItem"; // перевір шлях!

export default function OrderSummary() {
  const { items, total } = useCartStore();

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
          className="h-[50px] bg-[#355EC0] text-white rounded 
          hover:bg-[#2f32a8] transition duration-200 active:scale-95"
        >
          Оформити замовлення
        </button>
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
