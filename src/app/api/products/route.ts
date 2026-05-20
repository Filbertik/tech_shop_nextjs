import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 9);

  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const sort = searchParams.get("sort");

  const skip = (page - 1) * limit;

  // 🔹 filters
  const where: any = {};

  if (min || max) {
    where.price = {};
    if (min) where.price.gte = Number(min);
    if (max) where.price.lte = Number(max);
  }

  // 🔹 sorting
  const orderBy: any = {};

  if (sort === "price_asc") orderBy.price = "asc";
  if (sort === "price_desc") orderBy.price = "desc";
  if (sort === "title") orderBy.title = "asc";
  if (sort === "brand") orderBy.brand = "asc";

  // 🔹 query
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({
    products,
    total,
  });
}

// import { prisma } from "@/utils/prisma";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   const min = Number(searchParams.get("min") || 0);
//   const max = Number(searchParams.get("max") || 999999);
//   const sort = searchParams.get("sort") || "popular";

//   const products = await prisma.product.findMany({
//     where: {
//       price: {
//         gte: min,
//         lte: max,
//       },
//     },
//   });

//   const sorted = [...products];

//   switch (sort) {
//     case "cheap":
//       sorted.sort((a, b) => a.price - b.price);
//       break;
//     case "expensive":
//       sorted.sort((a, b) => b.price - a.price);
//       break;
//     case "name":
//       sorted.sort((a, b) => a.title.localeCompare(b.title));
//       break;
//     default:
//       sorted.sort((a, b) => b.rating - a.rating);
//   }

//   return NextResponse.json(sorted);
// }
