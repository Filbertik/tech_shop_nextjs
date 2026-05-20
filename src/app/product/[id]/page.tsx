import Image from "next/image";
import Link from "next/link";

// 🔜 тимчасові дані (потім заміниш на fetch з БД)
const product = {
  title: "Ноутбук Asus Vivobook 15 X1504VA-BQ500 (90NB10J2-M00PJ0) Cool Silver",
  category: "Ноутбуки",
  images: [
    "Frame 755.png",
    "Frame 754.png",
    "Frame 753.png",
    "Frame 752.png",
    "Frame 756.png",
    "Frame 757.png",
    "Frame 758.png",
    "Frame 759.png",
    "Frame 760.png",
  ],
};

export default function Page() {
  return (
    <div className="px-[80px] py-[40px]">
      {/* BREADCRUMBS */}
      <div className="flex items-center gap-2 text-[16px] text-[var(--gray)] mb-6">
        <Link href="/">Головна</Link>

        <Image
          src="/images/Catalog/caret-right.svg"
          alt="arrow"
          width={16}
          height={16}
        />

        <span>{product.category}</span>

        <Image
          src="/images/Catalog/caret-right.svg"
          alt="arrow"
          width={16}
          height={16}
        />

        <span className="text-black">{product.title}</span>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-[1280px] flex gap-[24px]">
        {/* LEFT COLUMN */}
        <div className="w-[600px]">
          {/* IMAGE BLOCK */}
          <div className="flex gap-[20px]">
            {/* THUMBNAILS */}
            <div className="w-[80px] h-[472px] flex flex-col items-center justify-between">
              <Image
                src="/images/ProductID/uparrow.svg"
                alt="up"
                width={24}
                height={24}
              />

              <div className="flex flex-col gap-[8px] overflow-hidden">
                {product.images.map((img, i) => (
                  <Image
                    key={i}
                    src={`/images/ProductID/${img}`}
                    alt="thumb"
                    width={80}
                    height={60}
                    className="cursor-pointer border rounded"
                  />
                ))}
              </div>

              <Image
                src="/images/ProductID/downarrow.svg"
                alt="down"
                width={24}
                height={24}
              />
            </div>

            {/* MAIN IMAGE */}
            <div className="relative w-[500px] h-[500px] border rounded-[4px]">
              <Image
                src={`/images/ProductID/${product.images[0]}`}
                alt="main"
                fill
                className="object-contain"
              />

              {/* TOP RIGHT ICONS */}
              <div className="absolute top-2 right-2 flex gap-2">
                <Image
                  src="/images/ProductID/Heart.svg"
                  alt="heart"
                  width={24}
                  height={24}
                />
                <Image
                  src="/images/ProductID/Scales.svg"
                  alt="compare"
                  width={24}
                  height={24}
                />
              </div>

              {/* BOTTOM RIGHT ARROWS */}
              <div className="absolute bottom-2 right-2 flex gap-2">
                <Image
                  src="/images/ProductID/leftarrow.svg"
                  alt="left"
                  width={24}
                  height={24}
                />
                <Image
                  src="/images/ProductID/rightarrow.svg"
                  alt="right"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="w-[568px] h-[106px] flex justify-between mt-[16px]">
            {[
              {
                icon: "delivery-truck-02.svg",
                text: "Відправка на наступний день",
              },
              {
                icon: "customer-support.svg",
                text: "Консультація з експертом",
              },
              {
                icon: "iconofreturn.svg",
                text: "Повернення / обмін протягом 14 днів",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="w-[184px] h-[106px] border rounded flex flex-col items-center justify-center text-center text-[14px]"
              >
                <Image
                  src={`/images/ProductID/${item.icon}`}
                  alt="icon"
                  width={32}
                  height={32}
                />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* CHARACTERISTICS */}
          <div className="w-[301px] h-[367px] mt-[20px]">
            <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-[20px]">
          {/* TITLE BLOCK */}
          <div className="w-[656px] h-[469px]">
            <h1 className="text-[24px] font-semibold">{product.title}</h1>
          </div>

          {/* RELATED PRODUCTS */}
          <div className="w-[641px] h-[503px]">
            <h3 className="text-lg font-semibold mb-[16px]">
              З цим товаром часто купують
            </h3>

            <div className="grid grid-cols-2 gap-x-[40px] gap-y-[20px]">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-[300px] h-[217px] border rounded p-[20px] bg-white"
                >
                  текст
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="w-[703px] h-[435px] mt-[40px]">
        <h3 className="text-lg font-semibold mb-2">Опис товару</h3>
        <p>Опис {product.title}</p>
      </div>

      {/* REVIEWS */}
      <div className="w-[650px] h-[522px] mt-[20px]">
        <h3 className="text-lg font-semibold mb-2">Відгуки</h3>
      </div>

      {/* RECENT VIEWED */}
      <div className="mt-[40px]">
        {/* 🔜 підключиш свій компонент */}
        {/* <RecentViewed /> */}
      </div>
    </div>
  );
}

// export default function Page() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Product Page</h1>
//       <p>`Це заготовка сторінки Product Page..`</p>
//     </div>
//   );
// }
