export type Product = {
  id: string;
  name: string;
  companyName: string;
  description: string;
  inStock: number;
  price: number;
  discount: number;
  imgUrls: string[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartDisplayItem = {
  product: Product;
  quantity: number;
};
