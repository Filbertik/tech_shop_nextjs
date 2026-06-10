import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) return NextResponse.json([]);

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: true,
    },
  });

  return NextResponse.json(favorites);
}
