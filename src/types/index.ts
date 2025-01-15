import { LucideIcon } from 'lucide-react';

export type TableStatus = 'empty' | 'occupied';

export interface TableData {
  id: number;
  number: string;
  seats: number;
  status: TableStatus;
  occupiedInfo?: {
    waiter: string;
    occupiedTime: number;
    currentGuests: number;
  };
}

export interface Section {
  id: string;
  name: string;
  icon: LucideIcon;
  tables: TableData[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  icon: LucideIcon;
  isCombo?: boolean;
  comboOptions?: ComboOptions;
  barcode?: string;
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
  icon: LucideIcon;
  page: number;
  products: Product[];
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  addedAt?: string;
  addedBy?: string;
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
