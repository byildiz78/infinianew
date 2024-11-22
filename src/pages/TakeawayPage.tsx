import React, { useState } from 'react';
import { 
  Percent, UserPlus, Coins, FileText, X, Barcode, MessageSquare, 
  Scissors, GitMerge, MoreHorizontal, Mail, Check, DollarSign, 
  CreditCard, Banknote, Plus, Minus, Coffee, Pizza, Utensils, Salad
} from 'lucide-react';

interface Product {
  name: string;
  price: number;
  icon: React.ElementType;
}

interface Category {
  name: string;
  icon: React.ElementType;
  products: Product[];
}

interface CartItem extends Product {
  quantity: number;
}

const categories: Category[] = [
  {
    name: 'İçecekler',
    icon: Coffee,
    products: [
      { name: 'Kahve', price: 15, icon: Coffee },
      { name: 'Çay', price: 5, icon: Coffee },
      { name: 'Su', price: 2, icon: Coffee },
    ]
  },
  {
    name: 'Pizzalar',
    icon: Pizza,
    products: [
      { name: 'Margarita', price: 50, icon: Pizza },
      { name: 'Pepperoni', price: 60, icon: Pizza },
      { name: 'Vejeteryan', price: 55, icon: Pizza },
    ]
  },
  {
    name: 'Burgerler',
    icon: Utensils,
    products: [
      { name: 'Klasik Burger', price: 40, icon: Utensils },
      { name: 'Cheeseburger', price: 45, icon: Utensils },
      { name: 'Tavuk Burger', price: 35, icon: Utensils },
    ]
  },
  {
    name: 'Salatalar',
    icon: Salad,
    products: [
      { name: 'Sezar Salata', price: 30, icon: Salad },
      { name: 'Akdeniz Salata', price: 25, icon: Salad },
      { name: 'Ton Balıklı Salata', price: 35, icon: Salad },
    ]
  },
];

const TakeawayPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === product.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === product.name);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter(item => item.name !== product.name);
    });
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Categories and Products */}
      <div className="w-2/3 p-4 overflow-y-auto">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {categories.map(category => (
            <button
              key={category.name}
              className={`p-4 rounded-lg shadow ${selectedCategory?.name === category.name ? 'bg-blue-500 text-white' : 'bg-white'}`}
              onClick={() => setSelectedCategory(category)}
            >
              <category.icon className="mx-auto mb-2" size={24} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        {selectedCategory && (
          <div className="grid grid-cols-3 gap-4">
            {selectedCategory.products.map(product => (
              <button
                key={product.name}
                className="p-4 bg-white rounded-lg shadow flex flex-col items-center"
                onClick={() => addToCart(product)}
              >
                <product.icon size={24} className="mb-2" />
                <span>{product.name}</span>
                <span className="font-bold">{product.price} TL</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cart */}
      <div className="w-1/3 bg-white p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Sepet</h2>
        {cart.map(item => (
          <div key={item.name} className="flex justify-between items-center mb-2">
            <span>{item.name} x {item.quantity}</span>
            <div>
              <button className="mr-2 bg-blue-500 text-white p-1 rounded" onClick={() => addToCart(item)}>
                <Plus size={16} />
              </button>
              <button className="bg-red-500 text-white p-1 rounded" onClick={() => removeFromCart(item)}>
                <Minus size={16} />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">Toplam:</span>
            <span className="font-bold">{totalAmount} TL</span>
          </div>
          <button className="w-full bg-green-500 text-white p-2 rounded">
            Ödeme Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeawayPage;