import productsData from "../data/products.json";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  servings: string;
  tags: string[];
  image: string;
  featured?: boolean;
};

export const products: Product[] = productsData;
