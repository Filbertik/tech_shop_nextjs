"use client";

import { useState } from "react";

export default function PaymentMethod() {
  const [method, setMethod] = useState("card");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const [errors, setErrors] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const options = [
    { id: "card", label: "Оплата картою" },
    { id: "cash", label: "Оплата при отриманні" },
    { id: "credit", label: "Купити в кредит" },
  ];

  // 📌 Форматування
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  // 📌 Валідація
  const validate = () => {
    const newErrors = {
      cardNumber: "",
      expiry: "",
      cvc: "",
    };

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Невірний номер карти";
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Невірний формат";
    }

    if (!/^\d{3}$/.test(cvc)) {
      newErrors.cvc = "Невірний CVC";
    }

    setErrors(newErrors);
  };

  return (
    <div className="w-full h-[543px] rounded-[4px] p-[40px_24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
      <h2 className="text-[18px] font-semibold mb-4">Спосіб оплати</h2>

      <div className="w-[595px] h-[412px]">
        {/* 🔘 Radio блок */}
        <div className="w-[595px] pb-8 border-b border-[#6c7275] flex flex-col gap-3">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 border rounded-[10px] px-[10px] py-[12px] h-[48px] cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={method === option.id}
                onChange={() => setMethod(option.id)}
                className="accent-black w-4 h-4"
              />
              <span className="text-[16px] text-black">{option.label}</span>
            </label>
          ))}
        </div>

        {/* 💳 Інпути карти */}
        {method === "card" && (
          <div className="w-[595px] mt-6 flex flex-col gap-4">
            {/* Номер карти */}
            <div className="flex flex-col gap-2">
              <label className="text-sm">Номер карти</label>
              <input
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                onBlur={validate}
                placeholder="1234 1234 1234 1234"
                className="border border-gray-300 rounded-[10px] px-[10px] py-[12px] h-[50px]"
              />
              {errors.cardNumber && (
                <span className="text-red-500 text-sm">
                  {errors.cardNumber}
                </span>
              )}
            </div>

            {/* MM/YY + CVC */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-[289px]">
                <label className="text-sm">Термін придатності</label>
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  onBlur={validate}
                  placeholder="MM/YY"
                  className="border border-gray-300 rounded-[10px] px-[10px] py-[12px] h-[50px]"
                />
                {errors.expiry && (
                  <span className="text-red-500 text-sm">{errors.expiry}</span>
                )}
              </div>

              <div className="flex flex-col gap-2 w-[289px]">
                <label className="text-sm">CVC</label>
                <input
                  value={cvc}
                  onChange={(e) =>
                    setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                  onBlur={validate}
                  placeholder="CVC"
                  className="border border-gray-300 rounded-[10px] px-[10px] py-[12px] h-[50px]"
                />
                {errors.cvc && (
                  <span className="text-red-500 text-sm">{errors.cvc}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Input } from "@heroui/react";

// export default function PaymentMethod() {
//   const [method, setMethod] = useState("card");

//   return (
//     <div className="w-full h-[543px] rounded-[4px] p-[40px_24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
//       <div className="flex flex-col gap-[40px]">
//         <h2 className="text-[18px] font-semibold">Спосіб оплати</h2>

//         {/* ================= MAIN BLOCK ================= */}
//         <div className="w-[595px] h-[412px] flex flex-col justify-between">
//           {/* ================= METHODS ================= */}
//           <div className="border-b border-[#6c7275] pb-[32px] flex flex-col gap-[12px]">
//             {[
//               { id: "card", label: "Оплата картою" },
//               { id: "cash", label: "Оплата при отриманні" },
//               { id: "credit", label: "Купити в кредит" },
//             ].map((item) => (
//               <label
//                 key={item.id}
//                 className="flex items-center gap-3 border border-[var(--borders)] rounded-[10px] px-[10px] py-[12px] w-full h-[48px] cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   name="payment"
//                   checked={method === item.id}
//                   onChange={() => setMethod(item.id)}
//                   className="accent-black"
//                 />

//                 <span className="text-[16px] font-normal text-black">
//                   {item.label}
//                 </span>
//               </label>
//             ))}
//           </div>

//           {/* ================= CARD FORM ================= */}
//           <div className="flex flex-col gap-[16px] mt-[24px]">
//             {/* CARD NUMBER */}
//             <div className="flex flex-col gap-[8px]">
//               <span className="text-[14px]">Номер карти</span>
//               <Input
//                 placeholder="1234 1234 1234 1234"
//                 classNames={{
//                   inputWrapper:
//                     "border border-[var(--gray2)] rounded-[10px] h-[50px]",
//                 }}
//               />
//             </div>

//             {/* DATE + CVC */}
//             <div className="flex gap-[16px]">
//               <div className="flex flex-col gap-[8px] w-[289px]">
//                 <span className="text-[14px]">Термін придатності</span>
//                 <Input
//                   placeholder="MM/YY"
//                   classNames={{
//                     inputWrapper:
//                       "border border-[var(--gray2)] rounded-[10px] h-[50px]",
//                   }}
//                 />
//               </div>

//               <div className="flex flex-col gap-[8px] w-[289px]">
//                 <span className="text-[14px]">CVC</span>
//                 <Input
//                   placeholder="CVC"
//                   classNames={{
//                     inputWrapper:
//                       "border border-[var(--gray2)] rounded-[10px] h-[50px]",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // export default function PaymentMethod() {
// //   return (
// //     <div className="w-full h-[543px] rounded-[4px] p-[40px_24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
// //       <h2 className="text-[18px] font-semibold mb-4">Спосіб оплати</h2>

// //       {/* тут буде вибір оплати */}
// //     </div>
// //   );
// // }
