"use client";

import Image from "next/image";

interface Props {
  active: string;
  setActive: (value: string) => void;
}

export default function AccountSidebar({ active, setActive }: Props) {
  const menu = [
    { key: "account", label: "Акаунт" },
    { key: "address", label: "Адреса" },
    { key: "orders", label: "Мої замовлення" },
    { key: "wishlist", label: "Список бажань" },
  ];

  return (
    <div className="bg-[#F5F5F7] rounded-[4px] p-[40px_30px] w-[256px] h-[443px] flex flex-col justify-between">
      {/* USER */}
      <div className="flex flex-col items-center gap-[12px]">
        <Image
          src="/images/avatar.png"
          alt="avatar"
          width={82}
          height={82}
          className="rounded-full"
        />

        <div className="text-[18px] font-bold text-black text-center">
          Іван Петренко
        </div>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-[16px] w-full">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`text-left text-[16px] ${
              active === item.key
                ? "font-bold border-b border-black pb-1"
                : "text-gray-600"
            }`}
          >
            {item.label}
          </button>
        ))}

        {/* LOGOUT */}
        <button className="text-left text-[16px] text-red-500 mt-[10px]">
          Вийти
        </button>
      </div>
    </div>
  );
}
