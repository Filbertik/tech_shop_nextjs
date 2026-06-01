import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

import RecentViewed from "@/components/catalog/RecentViewed";
import Characteristics from "@/components/product/Characteristics";
import Description from "@/components/product/Description";
import Features from "@/components/product/Features";
import ImageBlock from "@/components/product/ImageBlock";
import RelatedProducts from "@/components/product/RelatedProducts";
import Reviews from "@/components/product/Reviews";
import TitleBlock from "@/components/product/TitleBlock";

type PageProps = {
  params: { id: string };
};

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id), // 🔥 FIX HERE
    },
  });

  return product;
}

export default async function Page({ params }: PageProps) {
  const product = await getProduct(params.id);

  if (!product) return notFound();

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

      {/* MAIN */}
      <div className="w-[1280px] flex gap-[24px]">
        <div className="w-[600px] gap-[60px]">
          <ImageBlock images={product.images} />
          <Features />
          <Characteristics />
        </div>

        <div className="flex flex-col gap-[74px]">
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

      <Description title={product.title} />
      <Reviews />

      <div className="mt-[60px]">
        <RecentViewed />
      </div>
    </div>
  );
}

// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import prisma from "@/lib/prisma";

// import RecentViewed from "@/components/catalog/RecentViewed";
// import Characteristics from "@/components/product/Characteristics";
// import Description from "@/components/product/Description";
// import Features from "@/components/product/Features";
// import ImageBlock from "@/components/product/ImageBlock";
// import RelatedProducts from "@/components/product/RelatedProducts";
// import Reviews from "@/components/product/Reviews";
// import TitleBlock from "@/components/product/TitleBlock";

// type PageProps = {
//   params: { id: string };
// };

// async function getProduct(id: string) {
//   const product = await prisma.product.findUnique({
//     where: {
//       id: id, // ✅ STRING ID
//     },
//   });

//   return product;
// }

// export default async function Page({ params }: PageProps) {
//   const product = await getProduct(params.id);

//   if (!product) return notFound();

//   return (
//     <div className="px-[80px] py-[40px]">
//       {/* BREADCRUMBS */}
//       <div className="flex items-center gap-2 text-[16px] text-[var(--gray)] mb-6">
//         <Link href="/">Головна</Link>

//         <Image
//           src="/images/Catalog/caret-right.svg"
//           alt="arrow"
//           width={16}
//           height={16}
//         />

//         <span>{product.category}</span>

//         <Image
//           src="/images/Catalog/caret-right.svg"
//           alt="arrow"
//           width={16}
//           height={16}
//         />

//         <span className="text-black">{product.title}</span>
//       </div>

//       {/* MAIN */}
//       <div className="w-[1280px] flex gap-[24px]">
//         {/* LEFT */}
//         <div className="w-[600px] gap-[60px]">
//           <ImageBlock images={product.images} />
//           <Features />
//           <Characteristics />
//         </div>

//         {/* RIGHT */}
//         <div className="flex flex-col gap-[74px]">
//           <TitleBlock
//             title={product.title}
//             rating={product.rating}
//             price={product.price}
//             oldPrice={product.oldPrice}
//             productCode={product.code}
//           />

//           <RelatedProducts />
//         </div>
//       </div>

//       {/* DESCRIPTION */}
//       <Description title={product.title} />

//       {/* REVIEWS */}
//       <Reviews />

//       {/* RECENT */}
//       <div className="mt-[60px]">
//         <RecentViewed />
//       </div>
//     </div>
//   );
// }

// // import Image from "next/image";
// // import Link from "next/link";
// // import { notFound } from "next/navigation";

// // import RecentViewed from "@/components/catalog/RecentViewed";
// // import Characteristics from "@/components/product/Characteristics";
// // import Description from "@/components/product/Description";
// // import Features from "@/components/product/Features";
// // import ImageBlock from "@/components/product/ImageBlock";
// // import RelatedProducts from "@/components/product/RelatedProducts";
// // import Reviews from "@/components/product/Reviews";
// // import TitleBlock from "@/components/product/TitleBlock";

// // type Product = {
// //   id: string;
// //   title: string;
// //   category: string;
// //   images: string[];
// //   rating: number;
// //   price: number;
// //   oldPrice?: number;
// //   code: string;
// //   description?: string;
// //   characteristics?: any;
// // };

// // async function getProduct(id: string): Promise<Product | null> {
// //   // const res = await fetch(`http://localhost:3000/api/products/${id}`, {
// //   const res = await prisma.product.findUnique();

// //   if (!res.ok) return null;

// //   return res.json();
// // }

// // export default async function Page({ params }: { params: { id: string } }) {
// //   const product = await getProduct(params.id);

// //   if (!product) return notFound();

// //   return (
// //     <div className="px-[80px] py-[40px]">
// //       {/* BREADCRUMBS */}
// //       <div className="flex items-center gap-2 text-[16px] text-[var(--gray)] mb-6">
// //         <Link href="/">Головна</Link>

// //         <Image
// //           src="/images/Catalog/caret-right.svg"
// //           alt="arrow"
// //           width={16}
// //           height={16}
// //         />

// //         <span>{product.category}</span>

// //         <Image
// //           src="/images/Catalog/caret-right.svg"
// //           alt="arrow"
// //           width={16}
// //           height={16}
// //         />

// //         <span className="text-black">{product.title}</span>
// //       </div>

// //       {/* MAIN */}
// //       <div className="w-[1280px] flex gap-[24px]">
// //         <div className="w-[600px] gap-[60px]">
// //           <ImageBlock images={product.images} />
// //           <Features />
// //           <Characteristics />
// //         </div>

// //         <div className="flex flex-col gap-[74px]">
// //           <TitleBlock
// //             title={product.title}
// //             rating={product.rating}
// //             price={product.price}
// //             oldPrice={product.oldPrice}
// //             productCode={product.code}
// //           />

// //           <RelatedProducts />
// //         </div>
// //       </div>

// //       <Description title={product.title} />
// //       <Reviews />

// //       <div className="mt-[60px]">
// //         <RecentViewed />
// //       </div>
// //     </div>
// //   );
// // }
