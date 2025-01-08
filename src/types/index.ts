import { type IconType } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  icon: IconType;
  isCombo?: boolean;
  comboOptions?: ComboOptions;
}

export interface ComboOptions {
  mainItems: ComboItem[];
  sides: ComboItem[];
  drinks: ComboItem[];
}

export interface ComboItem {
  id: string;
  name: string;
  extraPrice?: number;
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
  addedAt: string;
  addedBy: string;
  discount?: number;
  comboSelections?: {
    mainItem: ComboItem;
    side: ComboItem;
    drink: ComboItem;
  };
}

export interface CartDiscount {
  amount: number;
  type: 'check' | 'product';
  appliedTo?: string;
}