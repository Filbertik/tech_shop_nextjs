import RecentViewed from "@/components/catalog/RecentViewed";
import Characteristics from "@/components/product/Characteristics";
import Description from "@/components/product/Description";
import Features from "@/components/product/Features";
import ImageBlock from "@/components/product/ImageBlock";
import RelatedProducts from "@/components/product/RelatedProducts";
import Reviews from "@/components/product/Reviews";
import TitleBlock from "@/components/product/TitleBlock";
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
          <ImageBlock images={product.images} />

          {/* FEATURES */}
          <Features />

          {/* CHARACTERISTICS */}
          <Characteristics />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-[20px]">
          {/* TITLE BLOCK */}
          <TitleBlock title={product.title} />

          {/* RELATED PRODUCTS */}
          <RelatedProducts />
        </div>
      </div>

      {/* DESCRIPTION */}
      <Description title={product.title} />

      {/* REVIEWS */}
      <Reviews />

      {/* RECENT VIEWED */}
      <div className="mt-[60px]">
        <RecentViewed />
      </div>
      {/* <div className="mt-[40px]"> */}
      {/* мій компонент з каталогу */}
      {/* <RecentViewed /> */}
      {/* </div> */}
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
