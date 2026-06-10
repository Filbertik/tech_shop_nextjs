"use client";

import WishlistItem from "./WishlistItem";

const mockWishlist = [
  {
    id: 1,
    title: "Ноутбук ASUS Vivobook",
    price: "25 000 ₴",
    image: "/images/mock/product.jpg",
  },
  {
    id: 2,
    title: "Смартфон Samsung Galaxy",
    price: "18 500 ₴",
    image: "/images/mock/product.jpg",
  },
];

export default function Wishlist() {
  return (
    <div className="px-[60px] w-[769px]">
      {/* ===== Заголовок ===== */}
      <h2 className="font-semibold text-[18px] text-black">Список бажань</h2>

      {/* ===== Header ===== */}
      <div className="mt-[40px] w-[440px] h-[30px] pl-[32px] pb-[8px] flex justify-between text-[14px] text-[#6c7275]">
        <span>Товар</span>
        <span>Ціна</span>
      </div>

      {/* ===== List ===== */}
      <div className="w-[649px] max-h-[708px] overflow-y-auto">
        {mockWishlist.map((item) => (
          <WishlistItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

// export default function Wishlist() {
//   return <div>Контент: Список бажань</div>;
// }
