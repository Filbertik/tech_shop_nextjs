interface Props {
  title: string;
}

export default function TitleBlock({ title }: Props) {
  return (
    <div className="w-[656px] h-[469px]">
      <h1 className="text-[24px] font-semibold">{title}</h1>
    </div>
  );
}
