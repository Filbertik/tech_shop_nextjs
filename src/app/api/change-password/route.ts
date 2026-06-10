import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    return NextResponse.json(
      { error: "Невірний поточний пароль" },
      { status: 400 },
    );
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });

  return NextResponse.json({ success: true });
}
