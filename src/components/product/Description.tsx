interface Props {
  description?: string | null;
}

export default function Description({ description }: Props) {
  return (
    <div className="mt-10 max-w-[700px]">
      <h3 className="text-lg font-semibold mb-2">Опис товару</h3>

      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
        {description ?? "Опис відсутній"}
      </p>
    </div>
  );
}

// interface Props {
//   description?: string;
// }

// export default function Description({ description }: Props) {
//   return (
//     <div className="w-[703px] h-[435px] mt-[40px]">
//       <h3 className="text-lg font-semibold mb-2">Опис товару</h3>

//       <p className="text-gray-600 leading-relaxed whitespace-pre-line">
//         {description || "Опис відсутній"}
//       </p>
//     </div>
//   );
// }

// // interface Props {
// //   description: string;
// // }

// // export default function Description({ description }: Props) {
// //   return (
// //     <div className="w-[703px] h-[435px] mt-[40px]">
// //       <h3 className="text-lg font-semibold mb-2">Опис товару</h3>

// //       <p className="text-gray-600 leading-relaxed">{description}</p>
// //     </div>
// //   );
// // }

// // // interface Props {
// // //   title: string;
// // // }

// // // export default function Description({ title }: Props) {
// // //   return (
// // //     <div className="w-[703px] h-[435px] mt-[40px]">
// // //       <h3 className="text-lg font-semibold mb-2">Опис товару</h3>
// // //       <p>Опис {title}</p>
// // //     </div>
// // //   );
// // // }
