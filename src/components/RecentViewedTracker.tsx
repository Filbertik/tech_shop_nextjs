"use client";

import { useRecentViewed } from "@/hoc/useRecentViewed";

export default function RecentViewedTracker({
  productId,
}: {
  productId: number;
}) {
  useRecentViewed(productId);

  return null;
}

// "use client";

// import { useRecentViewed } from "@/hoc/useRecentViewed";

// export default function RecentViewedTracker({
//   productId,
// }: {
//   productId: string;
// }) {
//   useRecentViewed(productId);

//   return null;
// }
