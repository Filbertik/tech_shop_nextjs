"use client";

import Image from "next/image";
import { useState } from "react";

type WishlistItemProps = {
  id: string;
  title: string;
  price: string;
  image: string;
  onRemove: (id: string) => void;
};

export default function WishlistItem({
  id,
  title,
  price,
  image,
  onRemove,
}: WishlistItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);

    // невелика затримка для UX (можеш прибрати)
    setTimeout(() => {
      onRemove(id);
    }, 200);
  };

  return (
    <div
      style={{
        borderBottom: "1px solid #e8ecef",
        borderTop: "1px solid #e8ecef",
        padding: "22px 0",
        width: "649px",
        height: "118px",
        display: "flex",
        alignItems: "center",
        gap: "30px",
        opacity: isRemoving ? 0.5 : 1,
        transition: "0.2s",
      }}
    >
      {/* LEFT BLOCK */}
      <div
        style={{
          width: "290px",
          height: "74px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* REMOVE BUTTON */}
        <button
          onClick={handleRemove}
          style={{
            borderRadius: "14px",
            width: "50px",
            height: "50px",
            boxShadow: "0 10px 16px 4px rgba(12, 31, 52, 0.04)",
            background: "#fcfbff",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Image src="/icons/x.svg" alt="remove" width={20} height={20} />
        </button>

        {/* IMAGE */}
        <Image
          src={image}
          alt={title}
          width={88}
          height={74}
          style={{ objectFit: "cover" }}
        />

        {/* TITLE */}
        <span
          style={{
            fontFamily: "var(--font-family)",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "150%",
            color: "var(--black)",
          }}
        >
          {title}
        </span>
      </div>

      {/* PRICE */}
      <div
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "16px",
          lineHeight: "150%",
          color: "var(--black)",
        }}
      >
        {price}
      </div>

      {/* BUTTON */}
      <button
        style={{
          borderRadius: "4px",
          padding: "12px 32px",
          width: "179px",
          height: "50px",
          background: "#355EC0",
          color: "#fff",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          cursor: "pointer",
        }}
      >
        Додати в
        <Image
          src="/icons/ShoppingCartSimple.svg"
          alt="cart"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}

// "use client";

// import Image from "next/image";

// type Props = {
//   title: string;
//   price: string;
//   image: string;
// };

// export default function WishlistItem({ title, price, image }: Props) {
//   return (
//     <div className="w-[649px] h-[118px] py-[22px] border-t border-b border-[#e8ecef] flex items-center justify-between">
//       {/* ===== LEFT BLOCK ===== */}
//       <div className="w-[290px] h-[74px] flex items-center gap-[16px]">
//         {/* Remove button */}
//         <div className="w-[50px] h-[50px] rounded-[14px] bg-[#fcfbff] shadow-[0_10px_16px_4px_rgba(12,31,52,0.04)] flex items-center justify-center cursor-pointer">
//           <Image
//             src="/images/Account/x.svg"
//             alt="remove"
//             width={16}
//             height={16}
//           />
//         </div>

//         {/* Product image */}
//         <Image
//           src={image}
//           alt={title}
//           width={88}
//           height={74}
//           className="object-cover"
//         />

//         {/* Title */}
//         <span className="text-[16px] text-[var(--black)]">{title}</span>
//       </div>

//       {/* ===== PRICE ===== */}
//       <div className="text-[16px] text-[var(--black)]">{price}</div>

//       {/* ===== BUTTON ===== */}
//       <button className="w-[179px] h-[50px] bg-[#355EC0] text-white rounded-[4px] flex items-center justify-center gap-[12px]">
//         Додати в
//         <Image
//           src="/images/Account/ShoppingCartSimple.svg"
//           alt="cart"
//           width={20}
//           height={20}
//         />
//       </button>
//     </div>
//   );
// }
