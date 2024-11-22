import React from 'react';
import { Plus, Minus, CreditCard, Wallet, DollarSign } from 'lucide-react';
import { OrderItem } from '../types';

interface CartProps {
  orderItems: OrderItem[];
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onPayment: (type: string) => void;
}

const Cart: React.FC<CartProps> = ({ orderItems, onIncrement, onDecrement, onPayment }) => {
  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-96 bg-gray-900/90 border-l border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">Sepet</h2>
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {orderItems.map(item => (
          <div
            key={item.productId}
            className="flex items-center justify-between bg-gray-800 p-3 rounded-lg text-white"
          >
            <div>
              <span className="block">{item.name}</span>
              <span className="text-sm text-gray-400">{item.price} TL</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onDecrement(item.productId)}
                className="p-1 bg-red-600 rounded-lg hover:bg-red-700"
              >
                <Minus size={16} />
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => onIncrement(item.productId)}
                className="p-1 bg-green-600 rounded-lg hover:bg-green-700"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex justify-between items-center mb-4 text-white">
          <span className="text-lg font-bold">Toplam</span>
          <span className="text-2xl font-bold">{totalAmount} TL</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onPayment('cash')}
            className="flex items-center justify-center gap-2 bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700"
          >
            <DollarSign size={20} />
            <span>Nakit</span>
          </button>
          <button
            onClick={() => onPayment('card')}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            <CreditCard size={20} />
            <span>Kredi Kartı</span>
          </button>
          <button
            onClick={() => onPayment('multinet')}
            className="flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            <Wallet size={20} />
            <span>Multinet</span>
          </button>
          <button
            onClick={() => onPayment('sodexo')}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
          >
            <Wallet size={20} />
            <span>Sodexo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;