import Image from "next/image";

export default function Features() {
  const items = [
    {
      icon: "delivery-truck-02.svg",
      text: "Відправка на наступний день",
    },
    {
      icon: "customer-support.svg",
      text: "Консультація з експертом",
    },
    {
      icon: "iconofreturn.svg",
      text: "Повернення / обмін протягом 14 днів",
    },
  ];

  return (
    <div className="w-[568px] h-[106px] flex justify-between mt-[16px]">
      {items.map((item, i) => (
        <div
          key={i}
          className="w-[184px] h-[106px] border rounded flex flex-col items-center justify-center text-center text-[14px]"
        >
          <Image
            src={`/images/ProductID/${item.icon}`}
            alt="icon"
            width={32}
            height={32}
          />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
