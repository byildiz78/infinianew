import {
  Coffee,
  Pizza,
  Utensils,
  Salad,
  Beer,
  IceCream,
  Soup,
  Fish,
  Beef,
  Croissant,
  Wine
} from 'lucide-react';
import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'coffee',
    name: 'Kahve',
    icon: Coffee,
    page: 1,
    products: [
      { id: 'espresso', name: 'Espresso', price: 15, icon: Coffee },
      { id: 'latte', name: 'Latte', price: 20, icon: Coffee },
      { id: 'cappuccino', name: 'Cappuccino', price: 22, icon: Coffee },
      { id: 'americano', name: 'Americano', price: 18, icon: Coffee },
      { id: 'mocha', name: 'Mocha', price: 25, icon: Coffee },
      { id: 'turkish-coffee', name: 'Türk Kahvesi', price: 15, icon: Coffee },
    ]
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: Pizza,
    page: 1,
    products: [
      { id: 'margherita', name: 'Margarita', price: 45, icon: Pizza },
      { id: 'pepperoni', name: 'Pepperoni', price: 55, icon: Pizza },
      { id: 'veggie', name: 'Vejeteryan', price: 50, icon: Pizza },
      { id: 'bbq-chicken', name: 'BBQ Tavuk', price: 60, icon: Pizza },
      { id: 'four-cheese', name: 'Dört Peynirli', price: 65, icon: Pizza },
    ]
  },
  {
    id: 'main',
    name: 'Ana Yemek',
    icon: Utensils,
    page: 1,
    products: [
      { id: 'steak', name: 'Biftek', price: 120, icon: Beef },
      { id: 'salmon', name: 'Somon', price: 90, icon: Fish },
      { id: 'chicken', name: 'Tavuk', price: 70, icon: Utensils },
      { id: 'meatballs', name: 'Köfte', price: 65, icon: Utensils },
    ]
  },
  {
    id: 'salads',
    name: 'Salatalar',
    icon: Salad,
    page: 1,
    products: [
      { id: 'caesar', name: 'Sezar', price: 40, icon: Salad },
      { id: 'greek', name: 'Akdeniz', price: 35, icon: Salad },
      { id: 'tuna', name: 'Ton Balıklı', price: 45, icon: Salad },
    ]
  },
  {
    id: 'soups',
    name: 'Çorbalar',
    icon: Soup,
    page: 2,
    products: [
      { id: 'lentil', name: 'Mercimek', price: 25, icon: Soup },
      { id: 'tomato', name: 'Domates', price: 25, icon: Soup },
      { id: 'chicken-soup', name: 'Tavuk', price: 30, icon: Soup },
    ]
  },
  {
    id: 'breakfast',
    name: 'Kahvaltı',
    icon: Croissant,
    page: 2,
    products: [
      { id: 'full', name: 'Serpme Kahvaltı', price: 120, icon: Croissant },
      { id: 'english', name: 'İngiliz Kahvaltı', price: 90, icon: Croissant },
      { id: 'continental', name: 'Kontinental', price: 70, icon: Croissant },
    ]
  },
  {
    id: 'drinks',
    name: 'İçecekler',
    icon: Beer,
    page: 2,
    products: [
      { id: 'beer', name: 'Bira', price: 35, icon: Beer },
      { id: 'wine', name: 'Şarap', price: 45, icon: Wine },
      { id: 'raki', name: 'Rakı', price: 40, icon: Beer },
    ]
  },
  {
    id: 'desserts',
    name: 'Tatlılar',
    icon: IceCream,
    page: 2,
    products: [
      { id: 'ice-cream', name: 'Dondurma', price: 30, icon: IceCream },
      { id: 'baklava', name: 'Baklava', price: 40, icon: IceCream },
      { id: 'kunefe', name: 'Künefe', price: 45, icon: IceCream },
    ]
  },
];