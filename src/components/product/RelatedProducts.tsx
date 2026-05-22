export default function RelatedProducts() {
  return (
    <div className="w-[641px] h-[503px]">
      <h3 className="text-lg font-semibold mb-[16px]">
        З цим товаром часто купують
      </h3>

      <div className="grid grid-cols-2 gap-x-[40px] gap-y-[20px]">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="w-[300px] h-[217px] border rounded p-[20px] bg-white"
          >
            текст
          </div>
        ))}
      </div>
    </div>
  );
}
