interface Props {
  title: string;
}

export default function Description({ title }: Props) {
  return (
    <div className="w-[703px] h-[435px] mt-[40px]">
      <h3 className="text-lg font-semibold mb-2">Опис товару</h3>
      <p>Опис {title}</p>
    </div>
  );
}
