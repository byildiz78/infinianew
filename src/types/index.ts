import { type IconType } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  icon: IconType;
}

export interface Category {
  id: string;
  name: string;
  icon: IconType;
  page: number;
  products: Product[];
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}