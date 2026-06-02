interface Props {
  characteristics: Record<string, string | number>;
}

export default function Characteristics({ characteristics }: Props) {
  if (!characteristics) {
    return (
      <div className="w-[301px] mt-[20px]">
        <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
        <p className="text-gray-500">Немає даних</p>
      </div>
    );
  }

  return (
    <div className="w-[301px] mt-[20px]">
      <h3 className="text-lg font-semibold mb-2">Характеристики</h3>

      <div className="flex flex-col gap-2 text-sm text-gray-700">
        {Object.entries(characteristics).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b pb-1">
            <span className="font-medium capitalize">{formatKey(key)}</span>

            <span>{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🔥 красиво форматуємо ключі */
function formatKey(key: string) {
  const map: Record<string, string> = {
    cpu: "Процесор",
    gpu: "Відеокарта",
    ram: "Оперативна памʼять",
    storage: "Накопичувач",
    display: "Дисплей",
    battery: "Батарея",
    weight: "Вага",
    color: "Колір",
    ports: "Порти",
    warranty: "Гарантія",
  };

  return map[key] ?? key;
}

// export default function Characteristics() {
//   return (
//     <div className="w-[301px] h-[367px] mt-[20px]">
//       <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
//     </div>
//   );
// }
