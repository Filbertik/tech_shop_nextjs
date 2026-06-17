"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart.store";

export const useCartSync = (isLoggedIn: boolean) => {
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    if (!isLoggedIn) return;

    const sync = async () => {
      // 🔥 1. відправили локальний кошик
      await fetch("/api/cart/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      // 🔥 2. отримали кошик з БД
      const res = await fetch("/api/cart");
      let data;

      try {
        data = await res.json();
      } catch (e) {
        console.error("JSON parse error", e);
        return;
      }
      //   const data = await res.json();

      // 🔥 3. перезаписали Zustand
      useCartStore.setState({
        items: data.items.map((i: any) => ({
          id: i.product.id,
          title: i.product.title,
          image: i.product.images[0],
          price: i.product.price,
          quantity: i.quantity,
        })),
      });
    };

    sync();
  }, [isLoggedIn]);
};
