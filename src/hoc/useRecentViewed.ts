"use client";

import { useEffect } from "react";

export function useRecentViewed(productId: string | number) {
  useEffect(() => {
    if (!productId) return;

    const key = "recentViewed";

    const existing: (string | number)[] = JSON.parse(
      localStorage.getItem(key) || "[]",
    );

    const updated = [productId, ...existing.filter((id) => id !== productId)];

    const limited = updated.slice(0, 10);

    localStorage.setItem(key, JSON.stringify(limited));

    console.log("✅ SAVED TO LOCALSTORAGE:", limited);
  }, [productId]);
}

// "use client";

// import { useEffect } from "react";

// export function useRecentViewed(productId: string) {
//   useEffect(() => {
//     if (!productId) return;

//     const key = "recentViewed";

//     const existing: string[] = JSON.parse(localStorage.getItem(key) || "[]");

//     // прибираємо дублікати
//     const updated = [productId, ...existing.filter((id) => id !== productId)];

//     // максимум 10 товарів
//     const limited = updated.slice(0, 10);

//     localStorage.setItem(key, JSON.stringify(limited));
//   }, [productId]);
// }
