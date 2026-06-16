import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import bcrypt from "bcryptjs";

// ✅ GET — отримати профіль
export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "",
    email: user.email || "",
    photo: user.photo || null, // 🔥 ДОДАЛИ
  });
}

// ✅ PATCH — оновити профіль
export async function PATCH(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const {
    firstName,
    lastName,
    phone,
    oldPassword,
    newPassword,
    photo, // 🔥 ДОДАЛИ
  } = body;

  try {
    // ✅ 1. оновлення профілю (тепер і фото теж)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(phone !== undefined && { phone }),
        ...(photo !== undefined && { photo }), // 🔥 ВАЖЛИВО
      },
    });

    // ✅ 2. зміна паролю (опційно)
    if (newPassword) {
      if (!user.password) {
        return NextResponse.json({ error: "No password set" }, { status: 400 });
      }

      const isValid = await bcrypt.compare(oldPassword, user.password);

      if (!isValid) {
        return NextResponse.json({ error: "Wrong password" }, { status: 400 });
      }

      const hashed = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashed },
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import prisma from "@/utils/prisma";
// import { getCurrentUser } from "@/lib/getCurrentUser";
// import bcrypt from "bcryptjs";

// // ✅ GET — отримати профіль
// export async function GET() {
//   const user = await getCurrentUser();

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   return NextResponse.json({
//     firstName: user.firstName || "",
//     lastName: user.lastName || "",
//     phone: user.phone || "",
//     email: user.email || "",
//   });
// }

// // ✅ PATCH — оновити профіль
// export async function PATCH(req: Request) {
//   const user = await getCurrentUser();

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();

//   const { firstName, lastName, phone, oldPassword, newPassword } = body;

//   try {
//     // 1. оновлення профілю
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         firstName,
//         lastName,
//         phone,
//       },
//     });

//     // 2. зміна паролю (опційно)
//     if (newPassword) {
//       if (!user.password) {
//         return NextResponse.json({ error: "No password set" }, { status: 400 });
//       }

//       const isValid = await bcrypt.compare(oldPassword, user.password);

//       if (!isValid) {
//         return NextResponse.json({ error: "Wrong password" }, { status: 400 });
//       }

//       const hashed = await bcrypt.hash(newPassword, 10);

//       await prisma.user.update({
//         where: { id: user.id },
//         data: { password: hashed },
//       });
//     }

//     return NextResponse.json({ success: true });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// // import { NextResponse } from "next/server";
// // import prisma from "@/utils/prisma";
// // import { getCurrentUser } from "@/lib/getCurrentUser";
// // import bcrypt from "bcryptjs";

// // export async function PATCH(req: Request) {
// //   const user = await getCurrentUser();

// //   if (!user) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   const body = await req.json();

// //   const { firstName, lastName, phone, oldPassword, newPassword } = body;

// //   try {
// //     // ✅ 1. ОНОВЛЕННЯ ПРОФІЛЮ
// //     await prisma.user.update({
// //       where: { id: user.id },
// //       data: {
// //         firstName,
// //         lastName,
// //         phone,
// //       },
// //     });

// //     // ✅ 2. ЯКЩО Є ПАРОЛЬ → МІНЯЄМО
// //     if (newPassword) {
// //       if (!user.password) {
// //         return NextResponse.json({ error: "No password set" }, { status: 400 });
// //       }

// //       const isValid = await bcrypt.compare(oldPassword, user.password);

// //       if (!isValid) {
// //         return NextResponse.json({ error: "Wrong password" }, { status: 400 });
// //       }

// //       const hashed = await bcrypt.hash(newPassword, 10);

// //       await prisma.user.update({
// //         where: { id: user.id },
// //         data: { password: hashed },
// //       });
// //     }

// //     return NextResponse.json({ success: true });
// //   } catch (e) {
// //     console.error(e);
// //     return NextResponse.json({ error: "Server error" }, { status: 500 });
// //   }
// // }

// // // import { NextResponse } from "next/server";
// // // import { getCurrentUser } from "@/lib/getCurrentUser";

// // // export async function GET() {
// // //   const user = await getCurrentUser();

// // //   if (!user) {
// // //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// // //   }

// // //   return NextResponse.json(user);
// // // }
