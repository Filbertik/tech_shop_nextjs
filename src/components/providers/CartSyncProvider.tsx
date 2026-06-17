"use client";

import { useSession } from "next-auth/react";
import { useCartSync } from "@/hoc/useCartSync";

export default function CartSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  // 🔥 викликаємо sync тільки коли сесія завантажена
  useCartSync(status === "authenticated");

  return <>{children}</>;
}
