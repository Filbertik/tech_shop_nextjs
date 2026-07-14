import { useState } from "react";
import { Input } from "@heroui/react";

export default function PaymentMethod() {
  const [method, setMethod] = useState("card");

  return (
    <div className="w-full h-[543px] rounded-[4px] p-[40px_24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
      <div className="flex flex-col gap-[40px]">
        <h2 className="text-[18px] font-semibold">Спосіб оплати</h2>

        {/* ================= MAIN BLOCK ================= */}
        <div className="w-[595px] h-[412px] flex flex-col justify-between">
          {/* ================= METHODS ================= */}
          <div className="border-b border-[#6c7275] pb-[32px] flex flex-col gap-[12px]">
            {[
              { id: "card", label: "Оплата картою" },
              { id: "cash", label: "Оплата при отриманні" },
              { id: "credit", label: "Купити в кредит" },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3 border border-[var(--borders)] rounded-[10px] px-[10px] py-[12px] w-full h-[48px] cursor-pointer"
              >
                <input
                  type="radio"
                  name="payment"
                  checked={method === item.id}
                  onChange={() => setMethod(item.id)}
                  className="accent-black"
                />

                <span className="text-[16px] font-normal text-black">
                  {item.label}
                </span>
              </label>
            ))}
          </div>

          {/* ================= CARD FORM ================= */}
          <div className="flex flex-col gap-[16px] mt-[24px]">
            {/* CARD NUMBER */}
            <div className="flex flex-col gap-[8px]">
              <span className="text-[14px]">Номер карти</span>
              <Input
                placeholder="1234 1234 1234 1234"
                classNames={{
                  inputWrapper:
                    "border border-[var(--gray2)] rounded-[10px] h-[50px]",
                }}
              />
            </div>

            {/* DATE + CVC */}
            <div className="flex gap-[16px]">
              <div className="flex flex-col gap-[8px] w-[289px]">
                <span className="text-[14px]">Термін придатності</span>
                <Input
                  placeholder="MM/YY"
                  classNames={{
                    inputWrapper:
                      "border border-[var(--gray2)] rounded-[10px] h-[50px]",
                  }}
                />
              </div>

              <div className="flex flex-col gap-[8px] w-[289px]">
                <span className="text-[14px]">CVC</span>
                <Input
                  placeholder="CVC"
                  classNames={{
                    inputWrapper:
                      "border border-[var(--gray2)] rounded-[10px] h-[50px]",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function PaymentMethod() {
//   return (
//     <div className="w-full h-[543px] rounded-[4px] p-[40px_24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
//       <h2 className="text-[18px] font-semibold mb-4">Спосіб оплати</h2>

//       {/* тут буде вибір оплати */}
//     </div>
//   );
// }
