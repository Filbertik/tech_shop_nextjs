import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const min = Number(searchParams.get("min") || 0);
  const max = Number(searchParams.get("max") || 999999);
  const sort = searchParams.get("sort") || "popular";

  const products = await prisma.product.findMany({
    where: {
      price: {
        gte: min,
        lte: max,
      },
    },
  });

  let sorted = [...products];

  switch (sort) {
    case "cheap":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "expensive":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      sorted.sort((a, b) => b.rating - a.rating);
  }

  return NextResponse.json(sorted);
}
