import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.favorite.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({ success: true });
}

// import { NextResponse } from "next/server";
// import prisma from "@/utils/prisma";
// import { getCurrentUser } from "@/lib/getCurrentUser";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } },
// ) {
//   const user = await getCurrentUser();

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   await prisma.favorite.delete({
//     where: {
//       id: params.id,
//     },
//   });

//   return NextResponse.json({ success: true });
// }
