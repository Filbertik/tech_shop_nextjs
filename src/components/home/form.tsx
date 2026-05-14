"use client";

import Image from "next/image";
import { IMaskInput } from "react-imask";
import { useState } from "react";

export default function FormSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Введіть ім’я";
    }

    // довжина повного номера з маскою
    if (!phone || phone.length < 19) {
      newErrors.phone = "Введіть коректний номер";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    console.log({ name, phone, comment });

    // тут буде API запит
  };

  return (
    <section className="w-full flex justify-center mt-20">
      <div className="relative w-[1440px] h-[478px] bg-[linear-gradient(317deg,#010100_0%,#11191b_100%)] overflow-hidden">
        <Image
          src="/images/FormSection/unsplash_Im7lZjxeLhg.png"
          alt="background"
          fill
          className="object-cover opacity-40"
        />

        <div className="absolute top-[60px] left-[75px] w-[866px] h-[358px] backdrop-blur-[27px] flex items-start justify-between px-[40px]">
          {/* LEFT TEXT */}
          <div className="w-[476px] flex flex-col">
            <h2 className="text-[32px] text-white font-semibold text-left">
              Потрібна допомога з вибором?
            </h2>

            <p className="mt-[8px] text-[18px] text-white text-left">
              Запитайте нас — підкажемо, який ПК, ноутбук або комплектуючі
              підійдуть саме вам.
            </p>
          </div>

          {/* FORM */}
          <div className="flex flex-col ml-[40px]">
            {/* NAME */}
            <input
              type="text"
              placeholder="Ім’я"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`
                border rounded-[10px] px-[14px] py-[12px]
                w-[350px] h-[48px]
                text-left text-[16px]
                bg-transparent text-white outline-none
                ${errors.name ? "border-red-500" : "border-[var(--bg2)]"}
              `}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">{errors.name}</span>
            )}

            {/* PHONE */}
            <IMaskInput
              mask="+{380} (00) 000 00 00"
              value={phone}
              onAccept={(value) => setPhone(value)}
              placeholder="Номер телефону"
              className={`
                mt-[16px]
                border rounded-[10px] px-[14px] py-[12px]
                w-[350px] h-[48px]
                text-left text-[16px]
                bg-transparent text-white outline-none
                ${errors.phone ? "border-red-500" : "border-[var(--bg2)]"}
              `}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1">{errors.phone}</span>
            )}

            {/* COMMENT */}
            <textarea
              placeholder="Коментар"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="
                mt-[16px]
                border border-[var(--bg2)]
                rounded-[10px]
                px-[14px]
                py-[12px]
                w-[350px]
                h-[156px]
                text-left
                text-[16px]
                bg-transparent
                text-white
                outline-none
                resize-none
              "
            />

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
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
