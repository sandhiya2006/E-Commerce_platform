export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}
