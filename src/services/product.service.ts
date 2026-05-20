export async function getProducts(sort?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products${sort ? `?sort=${sort}` : ""}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
