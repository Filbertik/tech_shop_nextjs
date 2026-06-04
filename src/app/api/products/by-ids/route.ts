import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json([]);
  }

  // 🔥 ВАЖЛИВО: у тебе id = number
  const idsArray = ids.split(",").map(Number);

  console.log("IDS FROM CLIENT:", idsArray);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: idsArray,
      },
    },
  });

  console.log("PRODUCTS FROM DB:", products);

  return NextResponse.json(products);
}

// import { NextResponse } from "next/server";
// import prisma from "@/utils/prisma";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const ids = searchParams.get("ids");

//   if (!ids) {
//     return NextResponse.json([]);
//   }

//   const idsArray = ids.split(",");

//   const products = await prisma.product.findMany({
//     where: {
//       id: {
//         in: idsArray,
//       },
//     },
//   });

//   return NextResponse.json(products);
// }
