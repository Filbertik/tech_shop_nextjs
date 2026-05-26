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

type Product = {
  title: string;
  category: string;
  images: string[];

  rating: number;
  price: number;
  oldPrice?: number;
  code: string;
};

// 🔜 mock (потім заміниш на Prisma)
const product: Product = {
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

  rating: 4,
  price: 32000,
  oldPrice: 35000,
  code: "ASUS-90NB10J2",
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
          <ImageBlock images={product.images} />
          <Features />
          <Characteristics />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-[20px]">
          <TitleBlock
            title={product.title}
            rating={product.rating}
            price={product.price}
            oldPrice={product.oldPrice}
            productCode={product.code}
          />

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
    </div>
  );
}
