"use client";

import Image from "next/image";

type Props = {
  page: number;
  totalPages: number;
  pages: (number | string)[];
  setPage: (v: number | ((p: number) => number)) => void;
};

export default function Pagination({
  page,
  totalPages,
  pages,
  setPage,
}: Props) {
  return (
    <div className="flex justify-center items-center gap-2 mt-[40px]">
      {/* 🔹 PREV */}
      {/* 🔹 PREV */}
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className={page === 1 ? "opacity-30 cursor-not-allowed" : ""}
      >
        <Image
          src="/images/Catalog/Arrow - Right.svg"
          alt="prev"
          width={24}
          height={24}
        />
      </button>
      {/* <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
        <Image
          src="/images/Catalog/Arrow - Right.svg"
          alt="prev"
          width={24}
          height={24}
        />
      </button> */}

      {/* 🔹 PAGES */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i}>...</span>
        ) : (
          <button
            key={i}
            onClick={() => setPage(Number(p))}
            className={
              page === p ? "bg-black text-white px-3 py-1 rounded" : "px-3 py-1"
            }
          >
            {p}
          </button>
        ),
      )}

      {/* 🔹 NEXT */}
      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className={page === totalPages ? "opacity-30 cursor-not-allowed" : ""}
      >
        <Image
          src="/images/Catalog/Arrow - Right.svg"
          alt="next"
          width={24}
          height={24}
          className="rotate-180"
        />
      </button>
      {/* <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>
        <Image
          src="/images/Catalog/Arrow - Right.svg"
          alt="next"
          width={24}
          height={24}
          className="rotate-180"
        />
      </button> */}
    </div>
  );
}
