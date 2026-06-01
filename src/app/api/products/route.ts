export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 9);

  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const sort = searchParams.get("sort");

  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {};

  if (min || max) {
    where.price = {};
    if (min) where.price.gte = Number(min);
    if (max) where.price.lte = Number(max);
  }

  // ✅ ФІКС ТУТ
  let orderBy: Prisma.ProductOrderByWithRelationInput = {};

  if (sort === "cheap") {
    orderBy = { price: "asc" };
  }

  if (sort === "expensive") {
    orderBy = { price: "desc" };
  }

  if (sort === "name") {
    orderBy = { title: "asc" };
  }

  if (sort === "popular") {
    orderBy = { rating: "desc" };
  }

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

// import { NextResponse } from "next/server";
// import prisma from "@/utils/prisma";
// import { Prisma } from "@prisma/client";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);

//   const page = Number(searchParams.get("page") || 1);
//   const limit = Number(searchParams.get("limit") || 9);

//   const min = searchParams.get("min");
//   const max = searchParams.get("max");
//   const sort = searchParams.get("sort");

//   const skip = (page - 1) * limit;

//   // ✅ правильні типи
//   const where: Prisma.ProductWhereInput = {};

//   if (min || max) {
//     where.price = {};
//     if (min) where.price.gte = Number(min);
//     if (max) where.price.lte = Number(max);
//   }

//   const orderBy: Prisma.ProductOrderByWithRelationInput = {};

//   if (sort === "price_asc") orderBy.price = "asc";
//   if (sort === "price_desc") orderBy.price = "desc";
//   if (sort === "title") orderBy.title = "asc";
//   if (sort === "brand") orderBy.brand = "asc";

//   const [products, total] = await Promise.all([
//     prisma.product.findMany({
//       where,
//       orderBy,
//       skip,
//       take: limit,
//     }),
//     prisma.product.count({ where }),
//   ]);

//   return NextResponse.json({
//     products,
//     total,
//   });
// }
