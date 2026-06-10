import { auth } from "@/auth/auth";
import prisma from "@/utils/prisma";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return user;
}

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import prisma from "@/utils/prisma";

// export async function getCurrentUser() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) return null;

//   return prisma.user.findUnique({
//     where: {
//       email: session.user.email,
//     },
//   });
// }
