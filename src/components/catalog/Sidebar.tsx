"use client";

type Props = {
  minPrice: string;
  maxPrice: string;
  setMinPrice: (v: string) => void;
  setMaxPrice: (v: string) => void;
  setPage: (v: number) => void;

  filterSections: string[];
  fakeOptions: string[];

  openSections: Record<string, boolean>;
  toggleSection: (title: string) => void;

  resetFilters: () => void;
};

export default function Sidebar({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  setPage,
  filterSections,
  fakeOptions,
  openSections,
  toggleSection,
  resetFilters,
}: Props) {
  return (
    <aside className="w-[302px]">
      <div className="bg-white p-4 shadow-sm rounded">
        <h3 className="font-semibold mb-4">Фільтри</h3>

        {/* PRICE */}
        <div>
          <p className="mb-2 text-sm">Ціна</p>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Від"
              value={minPrice}
              onChange={(e) => {
                setPage(1);
                setMinPrice(e.target.value);
              }}
              className="w-full border px-2 py-1 rounded"
            />
            <input
              type="number"
              placeholder="До"
              value={maxPrice}
              onChange={(e) => {
                setPage(1);
                setMaxPrice(e.target.value);
              }}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="mt-6 space-y-4">
          {filterSections.map((section) => (
            <div key={section}>
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex justify-between text-sm font-medium"
              >
                {section}
                <span>{openSections[section] ? "−" : "+"}</span>
              </button>

              {openSections[section] && (
                <div className="mt-2 space-y-1">
                  {fakeOptions.map((opt) => (
                    <label key={opt} className="flex gap-2 text-sm">
                      <input type="checkbox" />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={resetFilters}
          className="mt-6 w-full border py-2 rounded hover:bg-gray-100"
        >
          Скинути фільтри
        </button>
      </div>
    </aside>
  );
}
