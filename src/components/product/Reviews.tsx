"use client";

import { useEffect, useState } from "react";

type Review = {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

interface Props {
  productId: number;
}

export default function Reviews({ productId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews?productId=${productId}`);
        const data = await res.json();
        setReviews(data);
      } catch (e) {
        console.error("Помилка завантаження відгуків", e);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div className="w-[650px] mt-[20px]">
      <h3 className="text-lg font-semibold mb-4">Відгуки</h3>

      {loading && <p>Завантаження...</p>}

      {!loading && reviews.length === 0 && (
        <p className="text-gray-500">Ще немає відгуків</p>
      )}

      <div className="flex flex-col gap-[16px]">
        {reviews.map((review) => (
          <div key={review.id} className="border p-[12px] rounded-[6px]">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{review.userName}</span>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="text-yellow-500 text-sm">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            <p className="mt-2 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default function Reviews() {
//   return (
//     <div className="w-[650px] h-[522px] mt-[20px]">
//       <h3 className="text-lg font-semibold mb-2">Відгуки</h3>
//     </div>
//   );
// }
