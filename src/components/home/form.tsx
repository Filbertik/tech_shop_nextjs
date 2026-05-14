"use client";

import Image from "next/image";

export default function FormSection() {
  return (
    <section className="w-full flex justify-center mt-20">
      {/* BACKGROUND */}
      <div
        className="
          relative
          w-[1440px]
          h-[478px]
          bg-[linear-gradient(317deg,#010100_0%,#11191b_100%)]
          overflow-hidden
        "
      >
        {/* фонове зображення */}
        <Image
          src="/images/FormSection/unsplash_Im7lZjxeLhg.png"
          alt="background"
          fill
          className="object-cover opacity-40"
        />

        {/* FORM WRAPPER */}
        <div
          className="
    absolute
    top-[60px]
    left-[75px]
    w-[866px]
    h-[358px]
    backdrop-blur-[27px]
    flex
    items-start
    justify-between
    px-[40px]
  "
          // className="
          //   absolute
          //   top-[60px]
          //   left-[75px]
          //   w-[866px]
          //   h-[358px]
          //   backdrop-blur-[27px]
          //   flex
          //   items-center
          //   justify-between
          //   px-[40px]
          // "
        >
          {/* LEFT TEXT */}
          <div className="w-[476px] h-[116px] flex flex-col justify-start">
            <h2
              className="
      font-[var(--font-family)]
      font-semibold
      text-[32px]
      leading-[150%]
      text-white
      text-left
    "
            >
              Потрібна допомога з вибором?
            </h2>

            <p
              className="
      mt-[8px]
      font-[var(--font-family)]
      font-normal
      text-[18px]
      leading-[150%]
      text-white
      text-left
    "
            >
              Запитайте нас — підкажемо, який ПК, ноутбук або комплектуючі
              підійдуть саме вам.
            </p>
          </div>
          {/* <div className="w-[476px] h-[116px] flex flex-col justify-between">
            <h2
              className="
                font-[var(--font-family)]
                font-semibold
                text-[32px]
                leading-[150%]
                text-center
                text-white
              "
            >
              Потрібна допомога з вибором?
            </h2>

            <p
              className="
                font-[var(--font-family)]
                font-normal
                text-[18px]
                leading-[150%]
                text-white
              "
            >
              Запитайте нас — підкажемо, який ПК, ноутбук або комплектуючі
              підійдуть саме вам.
            </p>
          </div> */}

          {/* RIGHT FORM */}
          <div className="flex flex-col ml-[40px]">
            {/* INPUTS */}
            <input
              type="text"
              placeholder="Ім’я"
              className="
                border border-[var(--bg2)]
                rounded-[10px]
                px-[10px]
                py-[12px]
                w-[350px]
                h-[48px]
                text-left
                text-[16px]
                placeholder:text-[#9c9c9c]
                bg-transparent
                text-white
                outline-none
              "
            />

            <input
              type="text"
              placeholder="Номер телефону"
              className="
                mt-[16px]
                border border-[var(--bg2)]
                rounded-[10px]
                px-[10px]
                py-[12px]
                w-[350px]
                h-[48px]
                text-left
                text-[16px]
                placeholder:text-[#9c9c9c]
                bg-transparent
                text-white
                outline-none
              "
            />

            {/* TEXTAREA */}
            <textarea
              placeholder="Коментар"
              className="
                mt-[16px]
                border border-[var(--bg2)]
                rounded-[10px]
                px-[10px]
                py-[12px]
                w-[350px]
                h-[156px]
                text-left
                text-[16px]
                placeholder:text-[#9c9c9c]
                bg-transparent
                text-white
                outline-none
                resize-none
              "
            />

            {/* BUTTON */}
            <button
              className="
                mt-[24px]
                rounded-[4px]
                px-[32px]
                py-[12px]
                w-[224px]
                h-[50px]
                bg-blue-600
                text-white
                hover:bg-blue-700
                transition
              "
            >
              Передзвоніть мені
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
