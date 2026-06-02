"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  images?: string[] | string | null;
}

export default function ImageBlock({ images }: Props) {
  const imageList = Array.isArray(images) ? images : images ? [images] : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const listRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const isExternal = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://");

  const getSrc = (url: string) =>
    isExternal(url) ? url : `/images/ProductID/${url}`;

  // 🔥 СКРОЛ ДО ЕЛЕМЕНТА (ключ фікса)
  const scrollToIndex = (index: number) => {
    const container = listRef.current;
    if (!container) return;

    const item = container.children[index] as HTMLElement;
    if (!item) return;

    item.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const changeImage = (index: number) => {
    if (index < 0 || index >= imageList.length) return;

    setActiveIndex(index);
    scrollToIndex(index);
  };

  const handleUp = () => {
    listRef.current?.scrollBy({ top: -100, behavior: "smooth" });
  };

  const handleDown = () => {
    listRef.current?.scrollBy({ top: 100, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (activeIndex === 0) return;
    changeImage(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex === imageList.length - 1) return;
    changeImage(activeIndex + 1);
  };

  if (imageList.length === 0) {
    return <div>Немає зображень</div>;
  }

  return (
    <div className="flex gap-[20px]">
      {/* THUMBNAILS */}
      <div className="w-[80px] h-[472px] flex flex-col items-center">
        <button onClick={handleUp} className="mb-[8px]">
          <Image
            src="/images/ProductID/uparrow.svg"
            alt="up"
            width={24}
            height={24}
          />
        </button>

        <div
          ref={listRef}
          className="flex flex-col gap-[8px] overflow-y-auto h-[400px] scroll-smooth"
        >
          {imageList.map((img, i) => (
            <Image
              key={i}
              src={getSrc(img)}
              alt="thumb"
              width={80}
              height={60}
              onClick={() => changeImage(i)}
              className={`cursor-pointer border rounded object-cover transition
                ${activeIndex === i ? "border-black" : "border-gray-200"}`}
            />
          ))}
        </div>

        <button onClick={handleDown} className="mt-[8px]">
          <Image
            src="/images/ProductID/downarrow.svg"
            alt="down"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* MAIN IMAGE */}
      <div
        ref={imageRef}
        className="relative w-[500px] h-[500px] border rounded-[4px] overflow-hidden"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={(e) => {
          if (!imageRef.current) return;

          const rect = imageRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          setPosition({ x, y });
        }}
      >
        <Image
          src={getSrc(imageList[activeIndex])}
          alt="main"
          fill
          className="object-cover cursor-zoom-in"
          style={{
            transform: isZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
            transition: isZoomed ? "none" : "transform 0.3s ease",
          }}
        />

        {/* ICONS */}
        <div className="absolute top-2 right-2 flex gap-[14px] z-10">
          <Image
            src="/images/ProductID/Heart.svg"
            alt="favorite"
            width={37}
            height={34}
          />
          <Image
            src="/images/ProductID/Scales.svg"
            alt="compare"
            width={37}
            height={34}
          />
        </div>

        {/* NAV */}
        <div className="absolute bottom-2 right-2 flex gap-[12px]">
          <button onClick={handlePrev}>
            <Image
              src="/images/ProductID/leftarrow.svg"
              alt="left"
              width={50}
              height={50}
            />
          </button>

          <button onClick={handleNext}>
            <Image
              src="/images/ProductID/rightarrow.svg"
              alt="right"
              width={50}
              height={50}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import { useRef, useState } from "react";

// interface Props {
//   images?: string[] | string | null;
// }

// export default function ImageBlock({ images }: Props) {
//   const imageList = Array.isArray(images) ? images : images ? [images] : [];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

//   const listRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);

//   const isExternal = (url: string) =>
//     url.startsWith("http://") || url.startsWith("https://");

//   const getSrc = (url: string) => {
//     return isExternal(url) ? url : `/images/ProductID/${url}`;
//   };

//   // const changeImage = (newIndex: number) => {
//   //   if (newIndex < 0 || newIndex >= imageList.length) return;
//   //   setActiveIndex(newIndex);
//   // };

//   const handleUp = () => {
//     listRef.current?.scrollBy({ top: -80, behavior: "smooth" });
//   };

//   const handleDown = () => {
//     listRef.current?.scrollBy({ top: 80, behavior: "smooth" });
//   };

//   const handlePrev = () => {
//     if (activeIndex === 0) return;
//     setActiveIndex(activeIndex - 1);
//   };

//   const handleNext = () => {
//     if (activeIndex === imageList.length - 1) return;
//     setActiveIndex(activeIndex + 1);
//   };

//   if (imageList.length === 0) {
//     return <div>Немає зображень</div>;
//   }

//   return (
//     <div className="flex gap-[20px]">
//       {/* THUMBNAILS */}
//       <div className="w-[80px] h-[472px] flex flex-col items-center">
//         <button onClick={handleUp} className="mb-[8px]">
//           <Image
//             src="/images/ProductID/uparrow.svg"
//             alt="up"
//             width={24}
//             height={24}
//           />
//         </button>

//         <div className="flex flex-col gap-[8px] overflow-y-auto h-[400px]">
//           {imageList.map((img, i) => (
//             <Image
//               key={i}
//               src={getSrc(img)}
//               alt="thumb"
//               width={80}
//               height={60}
//               onClick={() => setActiveIndex(i)}
//               className={`cursor-pointer border rounded object-cover
//                 ${activeIndex === i ? "border-black" : "border-gray-200"}`}
//             />
//           ))}
//         </div>

//         <button onClick={handleDown} className="mt-[8px]">
//           <Image
//             src="/images/ProductID/downarrow.svg"
//             alt="down"
//             width={24}
//             height={24}
//           />
//         </button>
//       </div>

//       {/* MAIN IMAGE */}
//       <div
//         ref={imageRef}
//         className="relative w-[500px] h-[500px] border rounded-[4px] overflow-hidden"
//         onMouseEnter={() => setIsZoomed(true)}
//         onMouseLeave={() => setIsZoomed(false)}
//         onMouseMove={(e) => {
//           if (!imageRef.current) return;

//           const rect = imageRef.current.getBoundingClientRect();
//           const x = (e.clientX - rect.left) / rect.width;
//           const y = (e.clientY - rect.top) / rect.height;

//           setPosition({ x, y });
//         }}
//       >
//         <Image
//           src={getSrc(imageList[activeIndex])}
//           alt="main"
//           fill
//           className="object-cover cursor-zoom-in"
//           style={{
//             transform: isZoomed ? "scale(2)" : "scale(1)",
//             transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
//             transition: isZoomed ? "none" : "transform 0.3s ease",
//           }}
//         />

//         {/* ⭐ RIGHT TOP ICONS (ПОВЕРНУЛИ) */}
//         <div className="absolute top-2 right-2 flex gap-[14px] z-10">
//           <Image
//             src="/images/ProductID/Heart.svg"
//             alt="favorite"
//             width={37}
//             height={34}
//             className="cursor-pointer"
//           />
//           <Image
//             src="/images/ProductID/Scales.svg"
//             alt="compare"
//             width={37}
//             height={34}
//             className="cursor-pointer"
//           />
//         </div>

//         {/* NAV */}
//         <div className="absolute bottom-2 right-2 flex gap-[12px]">
//           <button onClick={handlePrev}>
//             <Image
//               src="/images/ProductID/leftarrow.svg"
//               alt="left"
//               width={50}
//               height={50}
//             />
//           </button>

//           <button onClick={handleNext}>
//             <Image
//               src="/images/ProductID/rightarrow.svg"
//               alt="right"
//               width={50}
//               height={50}
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import Image from "next/image";
// // import { useRef, useState } from "react";

// // interface Props {
// //   images?: string[] | string | null;
// // }

// // export default function ImageBlock({ images }: Props) {
// //   const imageList = Array.isArray(images) ? images : images ? [images] : [];

// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [isZoomed, setIsZoomed] = useState(false);
// //   const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

// //   const listRef = useRef<HTMLDivElement>(null);
// //   const imageRef = useRef<HTMLDivElement>(null);

// //   const isExternal = (url: string) =>
// //     url.startsWith("http://") || url.startsWith("https://");

// //   const getSrc = (url: string) => {
// //     return isExternal(url) ? url : `/images/ProductID/${url}`;
// //   };

// //   const scrollToIndex = (index: number) => {
// //     const container = listRef.current;
// //     if (!container) return;

// //     const item = container.children[index] as HTMLElement;
// //     if (!item) return;

// //     const itemTop = item.offsetTop;
// //     const itemBottom = itemTop + item.clientHeight;

// //     const viewTop = container.scrollTop;
// //     const viewBottom = viewTop + container.clientHeight;

// //     if (itemTop < viewTop) {
// //       container.scrollTo({ top: itemTop, behavior: "smooth" });
// //     } else if (itemBottom > viewBottom) {
// //       container.scrollTo({
// //         top: itemBottom - container.clientHeight,
// //         behavior: "smooth",
// //       });
// //     }
// //   };

// //   const changeImage = (newIndex: number) => {
// //     if (newIndex < 0 || newIndex >= imageList.length) return;
// //     setActiveIndex(newIndex);
// //     scrollToIndex(newIndex);
// //   };

// //   const handleUp = () => {
// //     listRef.current?.scrollBy({ top: -80, behavior: "smooth" });
// //   };

// //   const handleDown = () => {
// //     listRef.current?.scrollBy({ top: 80, behavior: "smooth" });
// //   };

// //   const handlePrev = () => {
// //     if (activeIndex === 0) return;
// //     changeImage(activeIndex - 1);
// //     handleUp();
// //   };

// //   const handleNext = () => {
// //     if (activeIndex === imageList.length - 1) return;
// //     changeImage(activeIndex + 1);
// //     handleDown();
// //   };

// //   if (imageList.length === 0) {
// //     return <div>Немає зображень</div>;
// //   }

// //   return (
// //     <div className="flex gap-[20px]">
// //       {/* THUMBNAILS */}
// //       <div className="w-[80px] h-[472px] flex flex-col items-center">
// //         <button onClick={handleUp} className="mb-[8px]">
// //           <Image
// //             src="/images/ProductID/uparrow.svg"
// //             alt="up"
// //             width={24}
// //             height={24}
// //           />
// //         </button>

// //         <div
// //           ref={listRef}
// //           className="flex flex-col gap-[8px] overflow-y-auto scrollbar-hide h-[400px]"
// //         >
// //           {imageList.map((img, i) => (
// //             <Image
// //               key={i}
// //               src={getSrc(img)}
// //               alt="thumb"
// //               width={80}
// //               height={60}
// //               onClick={() => changeImage(i)}
// //               className={`cursor-pointer border rounded transition object-cover
// //                 ${activeIndex === i ? "border-black" : "border-gray-200"}`}
// //             />
// //           ))}
// //         </div>

// //         <button onClick={handleDown} className="mt-[8px]">
// //           <Image
// //             src="/images/ProductID/downarrow.svg"
// //             alt="down"
// //             width={24}
// //             height={24}
// //           />
// //         </button>
// //       </div>

// //       {/* MAIN IMAGE */}
// //       <div
// //         ref={imageRef}
// //         className="relative w-[500px] h-[500px] border rounded-[4px] overflow-hidden"
// //         onMouseEnter={() => setIsZoomed(true)}
// //         onMouseLeave={() => setIsZoomed(false)}
// //         onMouseMove={(e) => {
// //           if (!imageRef.current) return;

// //           const rect = imageRef.current.getBoundingClientRect();

// //           const x = (e.clientX - rect.left) / rect.width;
// //           const y = (e.clientY - rect.top) / rect.height;

// //           setPosition({ x, y });
// //         }}
// //       >
// //         <Image
// //           src={getSrc(imageList[activeIndex])}
// //           alt="main"
// //           fill
// //           className="object-cover cursor-zoom-in"
// //           style={{
// //             transform: isZoomed ? "scale(2)" : "scale(1)",
// //             transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
// //             transition: isZoomed ? "none" : "transform 0.3s ease",
// //           }}
// //         />

// //         {/* NAV BUTTONS */}
// //         <div className="absolute bottom-2 right-2 flex gap-[12px]">
// //           <button onClick={handlePrev}>
// //             <Image
// //               src="/images/ProductID/leftarrow.svg"
// //               alt="left"
// //               width={50}
// //               height={50}
// //             />
// //           </button>

// //           <button onClick={handleNext}>
// //             <Image
// //               src="/images/ProductID/rightarrow.svg"
// //               alt="right"
// //               width={50}
// //               height={50}
// //             />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // "use client";

// // // import Image from "next/image";
// // // import { useRef, useState } from "react";

// // // interface Props {
// // //   images?: string[] | string | null;
// // // }

// // // export default function ImageBlock({ images }: Props) {
// // //   // 🔥 нормалізація даних з БД
// // //   const imageList = Array.isArray(images) ? images : images ? [images] : [];

// // //   const [activeIndex, setActiveIndex] = useState(0);
// // //   const [isZoomed, setIsZoomed] = useState(false);
// // //   const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

// // //   const listRef = useRef<HTMLDivElement>(null);
// // //   const imageRef = useRef<HTMLDivElement>(null);

// // //   const activeImage = imageList[activeIndex];

// // //   const isExternal = (url: string) =>
// // //     url.startsWith("http://") || url.startsWith("https://");

// // //   const getSrc = (url: string) => {
// // //     // 🔥 ключова логіка
// // //     return isExternal(url) ? url : `/images/ProductID/${url}`;
// // //   };

// // //   const scrollToIndex = (index: number) => {
// // //     const container = listRef.current;
// // //     if (!container) return;

// // //     const item = container.children[index] as HTMLElement;
// // //     if (!item) return;

// // //     const itemTop = item.offsetTop;
// // //     const itemBottom = itemTop + item.clientHeight;

// // //     const viewTop = container.scrollTop;
// // //     const viewBottom = viewTop + container.clientHeight;

// // //     if (itemTop < viewTop) {
// // //       container.scrollTo({ top: itemTop, behavior: "smooth" });
// // //     } else if (itemBottom > viewBottom) {
// // //       container.scrollTo({
// // //         top: itemBottom - container.clientHeight,
// // //         behavior: "smooth",
// // //       });
// // //     }
// // //   };

// // //   const changeImage = (index: number) => {
// // //     if (index < 0 || index >= imageList.length) return;
// // //     setActiveIndex(index);
// // //     scrollToIndex(index);
// // //   };

// // //   const handlePrev = () => {
// // //     if (activeIndex === 0) return;
// // //     changeImage(activeIndex - 1);
// // //   };

// // //   const handleNext = () => {
// // //     if (activeIndex === imageList.length - 1) return;
// // //     changeImage(activeIndex + 1);
// // //   };

// // //   if (imageList.length === 0) {
// // //     return <div>Немає зображень</div>;
// // //   }

// // //   return (
// // //     <div className="flex gap-[20px]">
// // //       {/* THUMBNAILS */}
// // //       <div className="w-[80px] h-[472px] flex flex-col items-center">
// // //         <div
// // //           ref={listRef}
// // //           className="flex flex-col gap-[8px] overflow-y-auto scrollbar-hide h-[400px]"
// // //         >
// // //           {imageList.map((img, i) => (
// // //             <Image
// // //               key={i}
// // //               src={getSrc(img)}
// // //               alt="thumb"
// // //               width={80}
// // //               height={60}
// // //               onClick={() => changeImage(i)}
// // //               className={`cursor-pointer border rounded transition object-cover
// // //                 ${activeIndex === i ? "border-black" : "border-gray-200"}`}
// // //             />
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* MAIN IMAGE */}
// // //       <div
// // //         ref={imageRef}
// // //         className="relative w-[500px] h-[500px] border rounded-[4px] overflow-hidden"
// // //         onMouseEnter={() => setIsZoomed(true)}
// // //         onMouseLeave={() => setIsZoomed(false)}
// // //         onMouseMove={(e) => {
// // //           if (!imageRef.current) return;

// // //           const rect = imageRef.current.getBoundingClientRect();

// // //           const x = (e.clientX - rect.left) / rect.width;
// // //           const y = (e.clientY - rect.top) / rect.height;

// // //           setPosition({ x, y });
// // //         }}
// // //       >
// // //         <Image
// // //           src={getSrc(activeImage)}
// // //           alt="main"
// // //           fill
// // //           className="object-cover cursor-zoom-in"
// // //           style={{
// // //             transform: isZoomed ? "scale(2)" : "scale(1)",
// // //             transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
// // //             transition: isZoomed ? "none" : "transform 0.3s ease",
// // //           }}
// // //         />

// // //         {/* NAV */}
// // //         <div className="absolute bottom-2 right-2 flex gap-[12px]">
// // //           <button onClick={handlePrev}>◀</button>
// // //           <button onClick={handleNext}>▶</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // "use client";

// // // // import Image from "next/image";
// // // // import { useRef, useState } from "react";

// // // // interface Props {
// // // //   images?: string[] | string | null;
// // // // }

// // // // export default function ImageBlock({ images }: Props) {
// // // //   // 🔥 NORMALIZE DATA (це ключ)
// // // //   const imageList = Array.isArray(images) ? images : images ? [images] : [];

// // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // //   const [isZoomed, setIsZoomed] = useState(false);
// // // //   const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

// // // //   const listRef = useRef<HTMLDivElement>(null);
// // // //   const imageRef = useRef<HTMLDivElement>(null);

// // // //   const scrollToIndex = (index: number) => {
// // // //     const container = listRef.current;
// // // //     if (!container) return;

// // // //     const item = container.children[index] as HTMLElement;
// // // //     if (!item) return;

// // // //     const itemTop = item.offsetTop;
// // // //     const itemBottom = itemTop + item.clientHeight;

// // // //     const viewTop = container.scrollTop;
// // // //     const viewBottom = viewTop + container.clientHeight;

// // // //     if (itemTop < viewTop) {
// // // //       container.scrollTo({ top: itemTop, behavior: "smooth" });
// // // //     } else if (itemBottom > viewBottom) {
// // // //       container.scrollTo({
// // // //         top: itemBottom - container.clientHeight,
// // // //         behavior: "smooth",
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleUp = () => {
// // // //     listRef.current?.scrollBy({ top: -80, behavior: "smooth" });
// // // //   };

// // // //   const handleDown = () => {
// // // //     listRef.current?.scrollBy({ top: 80, behavior: "smooth" });
// // // //   };

// // // //   const changeImage = (newIndex: number) => {
// // // //     if (newIndex < 0 || newIndex >= imageList.length) return;

// // // //     setActiveIndex(newIndex);
// // // //     scrollToIndex(newIndex);
// // // //   };

// // // //   const handlePrev = () => {
// // // //     if (activeIndex === 0) return;

// // // //     const newIndex = activeIndex - 1;
// // // //     setActiveIndex(newIndex);
// // // //     scrollToIndex(newIndex);
// // // //     handleUp();
// // // //   };

// // // //   const handleNext = () => {
// // // //     if (activeIndex === imageList.length - 1) return;

// // // //     const newIndex = activeIndex + 1;
// // // //     setActiveIndex(newIndex);
// // // //     scrollToIndex(newIndex);
// // // //     handleDown();
// // // //   };

// // // //   // 🔴 safety check
// // // //   if (imageList.length === 0) {
// // // //     return <div>Немає зображень</div>;
// // // //   }

// // // //   return (
// // // //     <div className="flex gap-[20px]">
// // // //       {/* THUMBNAILS */}
// // // //       <div className="w-[80px] h-[472px] flex flex-col items-center">
// // // //         <button onClick={handleUp} className="mb-[8px]">
// // // //           <Image
// // // //             src="/images/ProductID/uparrow.svg"
// // // //             alt="up"
// // // //             width={24}
// // // //             height={24}
// // // //           />
// // // //         </button>

// // // //         <div
// // // //           ref={listRef}
// // // //           className="flex flex-col gap-[8px] overflow-y-auto scrollbar-hide h-[400px]"
// // // //         >
// // // //           {imageList.map((img, i) => (
// // // //             <Image
// // // //               key={i}
// // // //               src={`/images/ProductID/${img}`}
// // // //               alt="thumb"
// // // //               width={80}
// // // //               height={60}
// // // //               onClick={() => changeImage(i)}
// // // //               className={`cursor-pointer border rounded transition
// // // //                 ${activeIndex === i ? "border-black" : "border-gray-200"}`}
// // // //             />
// // // //           ))}
// // // //         </div>

// // // //         <button onClick={handleDown} className="mt-[8px]">
// // // //           <Image
// // // //             src="/images/ProductID/downarrow.svg"
// // // //             alt="down"
// // // //             width={24}
// // // //             height={24}
// // // //           />
// // // //         </button>
// // // //       </div>

// // // //       {/* MAIN IMAGE */}
// // // //       <div
// // // //         ref={imageRef}
// // // //         className="relative w-[500px] h-[500px] border rounded-[4px] overflow-hidden"
// // // //         onMouseEnter={() => setIsZoomed(true)}
// // // //         onMouseLeave={() => setIsZoomed(false)}
// // // //         onMouseMove={(e) => {
// // // //           if (!imageRef.current) return;

// // // //           const rect = imageRef.current.getBoundingClientRect();

// // // //           const x = (e.clientX - rect.left) / rect.width;
// // // //           const y = (e.clientY - rect.top) / rect.height;

// // // //           setPosition({ x, y });
// // // //         }}
// // // //       >
// // // //         <Image
// // // //           src={`/images/ProductID/${imageList[activeIndex]}`}
// // // //           alt="main"
// // // //           fill
// // // //           className="object-cover cursor-zoom-in"
// // // //           style={{
// // // //             transform: isZoomed ? "scale(2)" : "scale(1)",
// // // //             transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
// // // //             transition: isZoomed ? "none" : "transform 0.3s ease",
// // // //           }}
// // // //         />

// // // //         <div className="absolute top-2 right-2 flex gap-[14px]">
// // // //           <Image
// // // //             src="/images/ProductID/Heart.svg"
// // // //             alt="heart"
// // // //             width={37}
// // // //             height={34}
// // // //           />
// // // //           <Image
// // // //             src="/images/ProductID/Scales.svg"
// // // //             alt="compare"
// // // //             width={37}
// // // //             height={34}
// // // //           />
// // // //         </div>

// // // //         <div className="absolute bottom-2 right-2 flex gap-[12px]">
// // // //           <button onClick={handlePrev}>
// // // //             <Image
// // // //               src="/images/ProductID/leftarrow.svg"
// // // //               alt="left"
// // // //               width={50}
// // // //               height={50}
// // // //             />
// // // //           </button>

// // // //           <button onClick={handleNext}>
// // // //             <Image
// // // //               src="/images/ProductID/rightarrow.svg"
// // // //               alt="right"
// // // //               width={50}
// // // //               height={50}
// // // //             />
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // "use client";

// // // // // import Image from "next/image";
// // // // // import { useRef, useState } from "react";

// // // // // interface Props {
// // // // //   images: string[];
// // // // // }

// // // // // export default function ImageBlock({ images }: Props) {
// // // // //   const [activeIndex, setActiveIndex] = useState(0);
// // // // //   const [isZoomed, setIsZoomed] = useState(false);
// // // // //   const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

// // // // //   const listRef = useRef<HTMLDivElement>(null);
// // // // //   const imageRef = useRef<HTMLDivElement>(null);

// // // // //   // 🔁 скрол до активного thumbnail
// // // // //   const scrollToIndex = (index: number) => {
// // // // //     const container = listRef.current;
// // // // //     if (!container) return;

// // // // //     const item = container.children[index] as HTMLElement;
// // // // //     if (!item) return;

// // // // //     const itemTop = item.offsetTop;
// // // // //     const itemBottom = itemTop + item.clientHeight;

// // // // //     const viewTop = container.scrollTop;
// // // // //     const viewBottom = viewTop + container.clientHeight;

// // // // //     if (itemTop < viewTop) {
// // // // //       container.scrollTo({ top: itemTop, behavior: "smooth" });
// // // // //     } else if (itemBottom > viewBottom) {
// // // // //       container.scrollTo({
// // // // //         top: itemBottom - container.clientHeight,
// // // // //         behavior: "smooth",
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   // ⬆️
// // // // //   const handleUp = () => {
// // // // //     listRef.current?.scrollBy({ top: -80, behavior: "smooth" });
// // // // //   };

// // // // //   // ⬇️
// // // // //   const handleDown = () => {
// // // // //     listRef.current?.scrollBy({ top: 80, behavior: "smooth" });
// // // // //   };

// // // // //   // зміна активного зображення
// // // // //   const changeImage = (newIndex: number) => {
// // // // //     if (newIndex < 0 || newIndex >= images.length) return;

// // // // //     setActiveIndex(newIndex);
// // // // //     scrollToIndex(newIndex);
// // // // //   };

// // // // //   // ⬅️ (prev)
// // // // //   const handlePrev = () => {
// // // // //     if (activeIndex === 0) return;

// // // // //     const newIndex = activeIndex - 1;
// // // // //     setActiveIndex(newIndex);
// // // // //     scrollToIndex(newIndex);
// // // // //     handleUp();
// // // // //   };

// // // // //   // ➡️ (next)
// // // // //   const handleNext = () => {
// // // // //     if (activeIndex === images.length - 1) return;

// // // // //     const newIndex = activeIndex + 1;
// // // // //     setActiveIndex(newIndex);
// // // // //     scrollToIndex(newIndex);
// // // // //     handleDown();
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex gap-[20px]">
// // // // //       {/* THUMBNAILS */}
// // // // //       <div className="w-[80px] h-[472px] flex flex-col items-center">
// // // // //         {/* UP */}
// // // // //         <button onClick={handleUp} className="mb-[8px]">
// // // // //           <Image
// // // // //             src="/images/ProductID/uparrow.svg"
// // // // //             alt="up"
// // // // //             width={24}
// // // // //             height={24}
// // // // //           />
// // // // //         </button>

// // // // //         {/* LIST */}
// // // // //         <div
// // // // //           ref={listRef}
// // // // //           className="flex flex-col gap-[8px] overflow-y-auto scrollbar-hide h-[400px]"
// // // // //         >
// // // // //           {images.map((img, i) => (
// // // // //             <Image
// // // // //               key={i}
// // // // //               src={`/images/ProductID/${img}`}
// // // // //               alt="thumb"
// // // // //               width={80}
// // // // //               height={60}
// // // // //               onClick={() => changeImage(i)}
// // // // //               className={`cursor-pointer border rounded transition
// // // // //                 ${activeIndex === i ? "border-black" : "border-gray-200"}`}
// // // // //             />
// // // // //           ))}
// // // // //         </div>

// // // // //         {/* DOWN */}
// // // // //         <button onClick={handleDown} className="mt-[8px]">
// // // // //           <Image
// // // // //             src="/images/ProductID/downarrow.svg"
// // // // //             alt="down"
// // // // //             width={24}
// // // // //             height={24}
// // // // //           />
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* MAIN IMAGE */}
// // // // //       <div
// // // // //         ref={imageRef}
// // // // //         className="relative w-[500px] h-[500px] border rounded-[4px] overflow-hidden"
// // // // //         onMouseEnter={() => setIsZoomed(true)}
// // // // //         onMouseLeave={() => setIsZoomed(false)}
// // // // //         onMouseMove={(e) => {
// // // // //           if (!imageRef.current) return;

// // // // //           const rect = imageRef.current.getBoundingClientRect();

// // // // //           const x = (e.clientX - rect.left) / rect.width;
// // // // //           const y = (e.clientY - rect.top) / rect.height;

// // // // //           setPosition({ x, y });
// // // // //         }}
// // // // //       >
// // // // //         {/* IMAGE */}
// // // // //         <Image
// // // // //           src={`/images/ProductID/${images[activeIndex]}`}
// // // // //           alt="main"
// // // // //           fill
// // // // //           className="object-cover cursor-zoom-in"
// // // // //           style={{
// // // // //             transform: isZoomed ? "scale(2)" : "scale(1)",
// // // // //             transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
// // // // //             transition: isZoomed ? "none" : "transform 0.3s ease",
// // // // //           }}
// // // // //         />

// // // // //         {/* TOP RIGHT ICONS */}
// // // // //         <div className="absolute top-2 right-2 flex gap-[14px]">
// // // // //           <Image
// // // // //             src="/images/ProductID/Heart.svg"
// // // // //             alt="heart"
// // // // //             width={37}
// // // // //             height={34}
// // // // //           />
// // // // //           <Image
// // // // //             src="/images/ProductID/Scales.svg"
// // // // //             alt="compare"
// // // // //             width={37}
// // // // //             height={34}
// // // // //           />
// // // // //         </div>

// // // // //         {/* NAV BUTTONS */}
// // // // //         <div className="absolute bottom-2 right-2 flex gap-[12px]">
// // // // //           <button onClick={handlePrev}>
// // // // //             <Image
// // // // //               src="/images/ProductID/leftarrow.svg"
// // // // //               alt="left"
// // // // //               width={50}
// // // // //               height={50}
// // // // //             />
// // // // //           </button>

// // // // //           <button onClick={handleNext}>
// // // // //             <Image
// // // // //               src="/images/ProductID/rightarrow.svg"
// // // // //               alt="right"
// // // // //               width={50}
// // // // //               height={50}
// // // // //             />
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
