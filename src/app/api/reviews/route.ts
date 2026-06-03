import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // перевір шлях!

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json([], { status: 200 });
    }

    const reviews = await prisma.review.findMany({
      where: {
        productId: Number(productId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("REVIEWS API ERROR:", error);
    return NextResponse.json(
      { error: "Помилка завантаження відгуків" },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const productId = searchParams.get("productId");

//   // ✅ захист від null
//   if (!productId) {
//     return NextResponse.json([], { status: 200 });
//   }

//   // 🔥 поки мокові дані
//   const reviews = [
//     {
//       id: 1,
//       userName: "Іван",
//       rating: 5,
//       comment: `Дуже крутий товар (ID: ${productId}) 🔥`,
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: 2,
//       userName: "Оля",
//       rating: 4,
//       comment: "Все добре, але доставка довга",
//       createdAt: new Date().toISOString(),
//     },
//   ];

//   return NextResponse.json(reviews);
// }

// // import { NextResponse } from "next/server";

// // export async function GET(req: Request) {
// //   const { searchParams } = new URL(req.url);
// //   const productId = searchParams.get("productId");

// //   // тимчасово мок
// //   return NextResponse.json([
// //     {
// //       id: 1,
// //       userName: "Іван",
// //       rating: 5,
// //       comment: "Дуже крутий товар 🔥",
// //       createdAt: new Date().toISOString(),
// //     },
// //     {
// //       id: 2,
// //       userName: "Оля",
// //       rating: 4,
// //       comment: "Все добре, але доставка довга",
// //       createdAt: new Date().toISOString(),
// //     },
// //   ]);
// // }
