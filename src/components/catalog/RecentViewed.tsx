"use client";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
};

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Ноутбук ASUS Vivobook 15",
    image: "/images/product-1.png",
    price: 25999,
  },
  {
    id: 2,
    title: "Ноутбук Lenovo IdeaPad 5",
    image: "/images/product-2.png",
    price: 28999,
  },
  {
    id: 3,
    title: "Ноутбук HP Pavilion",
    image: "/images/product-3.png",
    price: 30999,
  },
  {
    id: 4,
    title: "Ноутбук Acer Aspire 7",
    image: "/images/product-4.png",
    price: 27999,
  },
  {
    id: 5,
    title: "Ноутбук Dell Inspiron",
    image: "/images/product-5.png",
    price: 31999,
  },
];

export default function RecentViewed() {
  // 👉 беремо тільки 4 останніх
  const products = mockProducts.slice(0, 4);

  return (
    <div className="mt-[60px]">
      {/* HEADER */}
      <h2 className="text-[24px] font-semibold">Ви нещодавно переглядали</h2>

      {/* PRODUCTS */}
      <div className="mt-[28px] grid grid-cols-4 gap-[20px]">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 p-[12px] rounded-[8px]"
          >
            {/* IMAGE */}
            <div className="w-full h-[160px] bg-gray-100 flex items-center justify-center">
              <span className="text-sm text-gray-400">image</span>
            </div>

            {/* TITLE */}
            <p className="mt-[12px] text-[14px] line-clamp-2">
              {product.title}
            </p>

            {/* PRICE */}
            <p className="mt-[8px] font-semibold text-[16px]">
              {product.price} ₴
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
