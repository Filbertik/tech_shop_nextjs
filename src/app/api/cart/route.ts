import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json(
      user?.cart ?? { items: [] }, // 🔥 ключовий фікс
    );
    // return NextResponse.json({ items: [] });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cart: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(user?.cart || { items: [] });
}
