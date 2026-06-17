export type CartItemType = {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number; // ❗ тільки undefined, без null
  quantity: number;
};
