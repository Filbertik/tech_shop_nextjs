import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  // тимчасово мок
  return NextResponse.json([
    {
      id: 1,
      userName: "Іван",
      rating: 5,
      comment: "Дуже крутий товар 🔥",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      userName: "Оля",
      rating: 4,
      comment: "Все добре, але доставка довга",
      createdAt: new Date().toISOString(),
    },
  ]);
}
