export interface Product {
  _id: string;
  imgs: string[];
  title: string;
  description: string;
  price: string;
  getProductDetail?: (id: string) => void;
}
