import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const address = await prisma.address.findUnique({
    where: { userId: user.id },
  });

  return NextResponse.json(address || {});
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { city, street, house } = body;

  // ⚠️ мінімум required полів з Prisma
  const data = {
    city,
    street,
    house: house || "1", // щоб не падало
    region: "Київська", // тимчасово (бо required)
  };

  let address = await prisma.address.findUnique({
    where: { userId: user.id },
  });

  if (address) {
    address = await prisma.address.update({
      where: { userId: user.id },
      data,
    });
  } else {
    address = await prisma.address.create({
      data: {
        userId: user.id,
        ...data,
      },
    });
  }

  return NextResponse.json(address);
}

// import { NextResponse } from "next/server";
// import prisma from "@/utils/prisma";
// import { getCurrentUser } from "@/lib/getCurrentUser";

// export async function GET() {
//   const user = await getCurrentUser();

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const address = await prisma.address.findFirst({
//     where: { userId: user.id },
//   });

//   return NextResponse.json(address || {});
// }

// export async function PATCH(req: Request) {
//   const user = await getCurrentUser();

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();

//   const { fullName, phone, city, street, zip } = body;

//   let address = await prisma.address.findFirst({
//     where: { userId: user.id },
//   });

//   if (address) {
//     address = await prisma.address.update({
//       where: { id: address.id },
//       data: { fullName, phone, city, street, zip },
//     });
//   } else {
//     address = await prisma.address.create({
//       data: {
//         userId: user.id,
//         fullName,
//         phone,
//         city,
//         street,
//         zip,
//       },
//     });
//   }

//   return NextResponse.json(address);
// }
