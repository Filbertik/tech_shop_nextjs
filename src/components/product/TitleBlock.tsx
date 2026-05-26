import Image from "next/image";

interface Props {
  title: string;
  rating: number;
  price: number;
  oldPrice?: number;
  productCode: string;
}

export default function TitleBlock({
  title,
  rating,
  price,
  oldPrice,
  productCode,
}: Props) {
  return (
    <div className="flex flex-col gap-[40px] w-[656px]">
      {/* ================= TOP BLOCK ================= */}
      <div className="w-[478px] h-[128px] flex flex-col justify-between">
        {/* rating */}
        <div className="flex items-center gap-2 h-[20px]">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                key={star}
                src={
                  star <= rating
                    ? "/images/Bestsellers/Star Icon f.svg"
                    : "/images/Bestsellers/Star Icon.svg"
                }
                alt="star"
                width={16}
                height={16}
              />
            ))}
          </div>

          <span className="text-sm text-gray-600">{rating}</span>
        </div>

        {/* title */}
        <h1 className="text-[24px] font-semibold text-black">{title}</h1>

        {/* availability + code */}
        <div className="flex gap-4 text-[14px]">
          <span className="text-green-600 font-medium">У наявності</span>
          <span className="text-gray-500">Код: {productCode}</span>
        </div>
      </div>

      {/* ================= PRICE + BUY ================= */}
      <div className="w-[656px] h-[138px] flex flex-col gap-[16px]">
        <div className="flex items-start justify-between">
          {/* price block */}
          <div className="flex flex-col">
            {oldPrice && (
              <span className="text-[16px] font-normal text-gray-400 line-through">
                {oldPrice} ₴
              </span>
            )}

            <span className="text-[32px] font-semibold text-black leading-[150%]">
              {price} ₴
            </span>
          </div>

          {/* buy button */}
          <button className="bg-[#355EC0] text-white rounded-[4px] w-[367px] h-[50px] px-[32px] py-[12px] font-semibold">
            Купити
          </button>
        </div>

        {/* payment row */}
        <div className="flex items-center justify-between">
          {/* icons */}
          <div className="flex gap-2 items-center">
            {[
              "image 10.png",
              "image 11.png",
              "OTP.BD 1.png",
              "image 12.png",
              "image 13.png",
            ].map((img, i) => (
              <Image
                key={i}
                src={`/images/ProductID/${img}`}
                alt="pay"
                width={32}
                height={20}
              />
            ))}
          </div>

          {/* installment button */}
          <button className="border-[1.5px] border-[#355EC0] rounded-[4px] w-[365px] h-[50px] px-[32px] py-[12px] text-[#355EC0] font-semibold">
            Розстрочка
          </button>
        </div>
      </div>

      {/* ================= DELIVERY BLOCK ================= */}
      <div className="w-[280px] h-[123px] flex flex-col gap-[14px]">
        {/* city selector */}
        <div className="flex items-center justify-between w-[255px] h-[27px]">
          <div>
            <span className="font-bold text-[18px] text-black">
              Самовивіз / Доставка
            </span>
            <div className="text-gray-500 font-normal text-[14px]">Київ</div>
          </div>

          <Image
            src="/images/ProductID/downarrow.svg"
            alt="dropdown"
            width={16}
            height={16}
          />
        </div>

        {/* delivery info */}
        <div className="flex flex-col gap-[6px] text-[16px] text-black">
          <span>Доставка: 1–3 дні</span>
          {/* <span>Кур'єр: завтра</span> */}
          <span>Кур&apos;єр: завтра</span>
          <span>Самовивіз: сьогодні після 16:00</span>
        </div>
      </div>
    </div>
  );
}

// interface Props {
//   title: string;
// }

// export default function TitleBlock({ title }: Props) {
//   return (
//     <div className="w-[656px] h-[469px]">
//       <h1 className="text-[24px] font-semibold">{title}</h1>
//     </div>
//   );
// }
