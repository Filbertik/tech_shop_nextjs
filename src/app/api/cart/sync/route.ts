import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { auth } from "@/auth/auth";

export async function POST(req: Request) {
  const session = await auth();
  const { items } = await req.json();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cart: {
        include: {
          items: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let cart = user.cart;

  // 🔥 1. створюємо cart З include (ВАЖЛИВО)
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id },
      include: {
        items: true,
      },
    });
  }

  // 🔥 2. sync items
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
          quantity: {
            increment: item.quantity,
          },
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

// import { NextResponse } from "next/server";
// import prisma from "@/utils/prisma";
// // import { getServerSession } from "next-auth";
// import { auth } from "@/auth/auth";

// export async function POST(req: Request) {
//   //   const session = await getServerSession();
//   const session = await auth();
//   const { items } = await req.json();

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" });
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//     include: { cart: { include: { items: true } } },
//   });

//   let cart = user?.cart;

//   if (!cart) {
//     cart = await prisma.cart.create({
//       data: { userId: user!.id },
//     });
//   }

//   for (const item of items) {
//     const existing = await prisma.cartItem.findFirst({
//       where: {
//         cartId: cart.id,
//         productId: item.id,
//       },
//     });

//     if (existing) {
//       await prisma.cartItem.update({
//         where: { id: existing.id },
//         data: {
//           quantity: { increment: item.quantity },
//         },
//       });
//     } else {
//       await prisma.cartItem.create({
//         data: {
//           cartId: cart.id,
//           productId: item.id,
//           quantity: item.quantity,
//         },
//       });
//     }
//   }

//   return NextResponse.json({ ok: true });
// }
