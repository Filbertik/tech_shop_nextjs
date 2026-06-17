import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();
  const { items } = await req.json();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: { include: { items: true } } },
  });

  let cart = user?.cart;

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user!.id },
    });
  }

  for (const item of items) {
    const existing = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: item.id,
      },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: { increment: item.quantity },
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.id,
          quantity: item.quantity,
        },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
