import { Input } from "@heroui/react";

export default function DeliveryAddress() {
  return (
    <div className="w-full h-[324px] rounded-[4px] p-[40px_24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
      {/* 👉 ГОЛОВНИЙ КОНТЕЙНЕР */}
      <div className="flex flex-col gap-[24px]">
        <h2 className="text-[18px] font-semibold">Адреса доставки</h2>

        {/* 👉 ФОРМА */}
        <div className="flex flex-col gap-[12px] w-[595px]">
          {/* Місто */}
          <Input placeholder="Місто" />

          {/* Вулиця */}
          <Input placeholder="Вулиця" />

          {/* 👉 РЯД З 3 ІНПУТАМИ */}
          <div className="flex gap-[16px]">
            <Input placeholder="Дім" className="flex-1" />

            <Input placeholder="Квартира" className="flex-1" />

            <Input placeholder="Поверх" className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function DeliveryAddress() {
//   return (
//     <div className="w-full h-[324px] rounded-[4px] p-[40px_24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
//       <h2 className="text-[18px] font-semibold mb-4">Адрес доставки</h2>

//       {/* тут буде форма */}
//     </div>
//   );
// }
