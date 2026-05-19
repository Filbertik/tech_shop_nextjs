"use client";

type Props = {
  total: number;
  sort: string;
  setSort: (v: string) => void;
  setPage: (v: number) => void;
};

export default function SortBar({ total, sort, setSort, setPage }: Props) {
  return (
    <div className="flex justify-between items-center mt-[24px]">
      <p className="text-sm text-gray-500">Знайдено товарів: {total}</p>

      <select
        value={sort}
        onChange={(e) => {
          setPage(1);
          setSort(e.target.value);
        }}
        className="border px-2 py-1 rounded"
      >
        <option value="popular">Популярні</option>
        <option value="cheap">Дешеві</option>
        <option value="expensive">Дорогі</option>
        <option value="name">За ім’ям</option>
      </select>
    </div>
  );
}
