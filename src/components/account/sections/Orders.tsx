"use client";

import OrderRow from "./OrderRow";

const mockOrders = [
  {
    id: "#3456_768",
    date: "17.05.2025",
    status: "Доставлено",
    price: "366 ₴",
  },
  {
    id: "#3456_980",
    date: "08.01.2025",
    status: "Доставлено",
    price: "6 500 ₴",
  },
];

export default function Orders() {
  return (
    <div className="w-[773px] max-h-[680px] overflow-y-auto">
      {/* ===== Заголовок ===== */}
      <h2 className="font-semibold text-[18px] text-black">
        Історія замовлень
      </h2>

      {/* ===== Таблиця ===== */}
      <div className="mt-[40px] flex flex-col">
        {/* ===== Header ===== */}
        <div className="w-[707px] h-[32px] border-b border-[#e8ecef] pb-[8px] flex justify-between text-[16px] text-[var(--gray)]">
          <span>Номер замовлення</span>
          <span>Дата</span>
          <span>Статус</span>
          <span>Ціна</span>
        </div>

        {/* ===== Rows ===== */}
        <div className="flex flex-col">
          {mockOrders.map((order, index) => (
            <OrderRow key={index} {...order} />
          ))}
        </div>
      </div>
    </div>
  );
}

// export default function Orders() {
//   return <div>Контент: Мої замовлення</div>;
// }
