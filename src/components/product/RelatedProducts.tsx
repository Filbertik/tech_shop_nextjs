"use client";

import Image from "next/image";

export default function RelatedProducts() {
  const products = [
    {
      id: 1,
      image: "/images/ProductID/keyboard.png",
      name: "Ігрова поверхня Proove Gaming Offland RGB Black",
      price: 699,
    },
    {
      id: 2,
      image: "/images/ProductID/mouse.png",
      name: "Миша Logitech M185 Wireless Gray",
      price: 899,
    },
    {
      id: 3,
      image: "/images/ProductID/cable.png",
      name: "Перехідник Satechi USB-C to USB 3.0 Adapter Cable Space Gray",
      oldPrice: 719,
      price: 549,
    },
    {
      id: 4,
      image: "/images/ProductID/adaptor.png",
      name: "Адаптер Baseus Ingenuity Series Mini OTG Adaptor USB 3.1 to Type-C Blue",
      price: 249,
    },
  ];

  return (
    <div className="w-[641px] h-[503px]">
      <h3 className="text-lg font-semibold mb-[16px]">
        З цим товаром часто купують
      </h3>

      <div className="grid grid-cols-2 gap-x-[40px] gap-y-[20px]">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[300px] h-[217px] border rounded p-[20px] bg-white flex flex-col justify-between"
          >
            {/* TOP BLOCK */}
            <div className="w-[260px] h-[125px] flex gap-[12px]">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="object-contain"
              />

              <p className="text-[16px] leading-[150%] text-black">
                {product.name}
              </p>
            </div>

            {/* BOTTOM BLOCK */}
            <div className="w-[260px] h-[40px] flex items-center justify-between mt-[12px]">
              <div className="flex flex-col">
                {product.oldPrice && (
                  <span className="text-[12px] line-through text-gray-400 leading-[100%]">
                    {product.oldPrice}₴
                  </span>
                )}

                <span className="text-[20px] font-semibold leading-[150%] text-black">
                  {product.price}₴
                </span>
              </div>

              <button className="bg-[#355EC0] rounded-[4px] w-[64px] h-[40px] flex items-center justify-center">
                <Image
                  src="/images/ProductID/ShoppingCartSimple.svg"
                  alt="cart"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default function RelatedProducts() {
//   return (
//     <div className="w-[641px] h-[503px]">
//       <h3 className="text-lg font-semibold mb-[16px]">
//         З цим товаром часто купують
//       </h3>

//       <div className="grid grid-cols-2 gap-x-[40px] gap-y-[20px]">
//         {[1, 2, 3, 4].map((item) => (
//           <div
//             key={item}
//             className="w-[300px] h-[217px] border rounded p-[20px] bg-white"
//           >
//             текст
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
