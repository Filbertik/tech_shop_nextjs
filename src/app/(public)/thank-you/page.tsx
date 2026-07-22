export default function Page() {
  return (
    <div className="flex justify-center py-[90px] bg-[#f5f7fb]">
      {/* MAIN CARD */}
      <div
        className="bg-white rounded-[4px] shadow-[0_9px_22px_rgba(21,53,90,0.1)]
        w-[738px] h-[546px] px-[95px] py-[80px]
        flex flex-col items-center gap-[40px]"
      >
        {/* BLOCK 1 */}
        <div className="w-[546px] h-[100px] flex flex-col items-center justify-center gap-[16px]">
          <h1 className="text-[32px] font-semibold leading-[150%] text-black text-center">
            Дякую за замовлення!
          </h1>
          <h2 className="text-[32px] font-semibold leading-[150%] text-black text-center">
            Ваше замовлення прийнято
          </h2>
        </div>

        {/* BLOCK 2 */}
        <div className="w-[548px] h-[156px] flex justify-center gap-[32px]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-[12px] text-gray-500 font-bold text-[16px] leading-[150%]">
            <span>Номер замовлення:</span>
            <span>Дата:</span>
            <span>Сумма:</span>
            <span>Спосіб оплати:</span>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-[12px] text-black font-bold text-[16px] leading-[150%]">
            <span>#0123_45678</span>
            <span>13 грудня, 2025</span>
            <span>25 999 ₴</span>
            <span>Оплата картою</span>
          </div>
        </div>

        {/* BLOCK 3 */}
        <button
          onClick={() => (window.location.href = "/")}
          className="w-[277px] h-[50px] bg-[#355EC0] text-white rounded-[4px]
          px-[32px] py-[12px]
          hover:bg-[#2f32a8] transition duration-200 active:scale-95"
        >
          Повернутися на головну
        </button>
      </div>
    </div>
  );
}

// export default function Page() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Thank You Page</h1>
//       <p>`Це заготовка сторінки Thank You Page.`</p>
//     </div>
//   );
// }
