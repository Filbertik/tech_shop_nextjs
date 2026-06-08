"use client";

import Image from "next/image";

export default function Address() {
  return (
    <div className="px-[60px] w-[518px] h-[214px] flex flex-col">
      {/* ===== Заголовок ===== */}
      <h2 className="font-semibold text-[18px] text-black">Адреса</h2>

      {/* ===== Карточка ===== */}
      <div className="mt-[19px] w-[398px] h-[168px] bg-white rounded-[4px] p-[16px] shadow-[0_10px_16px_4px_rgba(12,31,52,0.04)]">
        {/* ===== Верхній блок ===== */}
        <div className="w-[366px] h-[24px] flex items-center justify-between">
          <span className="font-semibold text-[16px] text-[var(--black)]">
            Адреса за замовчуванням
          </span>

          <div className="flex items-center gap-[6px] cursor-pointer">
            <Image
              src="/images/Account/edit.svg"
              alt="edit"
              width={16}
              height={16}
            />
            <span className="font-semibold text-[16px] text-[var(--gray)]">
              Редагувати
            </span>
          </div>
        </div>

        {/* ===== Нижній блок ===== */}
        <div className="mt-[8px] w-[293px] h-[104px] flex flex-col gap-[4px]">
          <span>Софія Шевченко</span>
          <span>+380 (97) 658 95 59</span>
          <span>вулиця Левка Лук&#39;яненка, 12, Київ, Україна, 04207</span>
          {/* <span>вулиця Левка Лук'яненка, 12, Київ, Україна, 04207</span> */}
        </div>
      </div>
    </div>
  );
}

// export default function Address() {
//   return <div>Контент: Адреса</div>;
// }
