import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("POPULAR PRODUCTS:", products);

  return NextResponse.json(products);
}

// import { NextResponse } from "next/server";
// import prisma from "@/utils/prisma";

// export async function GET() {
//   const products = await prisma.product.findMany({
//     take: 4,
//     orderBy: {
//       createdAt: "desc", // або views коли додаси
//     },
//   });

//   return NextResponse.json(products);
// }
