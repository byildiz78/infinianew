import React, { useEffect, useRef } from 'react';
import { Plus, Minus, CreditCard, Wallet, DollarSign, Percent, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import { OrderItem, CartDiscount } from '../types';
import BarcodeInput from './BarcodeInput';

interface CartProps {
  orderItems: OrderItem[];
  discount?: CartDiscount;
  tableId: string;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onPayment: (type: string) => void;
  onBarcodeSubmit: (barcode: string) => void;
}

const Cart: React.FC<CartProps> = ({ 
  orderItems, 
  discount, 
  tableId, 
  onIncrement, 
  onDecrement, 
  onPayment,
  onBarcodeSubmit 
}) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const cartItemsRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  // Scroll to the last item whenever orderItems changes
  useEffect(() => {
    if (orderItems.length > 0 && lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [orderItems]);

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = discount ? (discount.type === 'check' ? discount.amount : 0) : 0;
  const totalAmount = subtotal - discountAmount;

  const toggleExpand = (productId: string) => {
    setExpandedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="w-96 bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-l border-white/10 flex flex-col h-screen">
      {/* Cart Header */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-br from-blue-900/50 to-blue-800/50">
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-xl p-4 shadow-lg border border-white/10">
          <div className="text-center mb-3">
            <h2 className="text-2xl font-bold text-white">Barkod</h2>
            <div className="h-0.5 w-16 bg-blue-500 mx-auto mt-2"></div>
          </div>
          <BarcodeInput onSubmit={onBarcodeSubmit} />
        </div>
      </div>

      {/* Cart Items */}
      <div ref={cartItemsRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {orderItems.map((item, index) => (
          <div
            key={item.productId}
            ref={index === orderItems.length - 1 ? lastItemRef : null}
            className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-xl border border-white/5 shadow-lg overflow-hidden"
          >
            {/* Rest of the item content remains the same */}
            {/* Main Item Info */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-white">{item.name}</span>
                      {item.comboSelections && (
                        <button
                          onClick={() => toggleExpand(item.productId)}
                          className="p-1 rounded-full hover:bg-gray-700/50"
                        >
                          {expandedItems.includes(item.productId) ? (
                            <ChevronUp size={16} className="text-blue-400" />
                          ) : (
                            <ChevronDown size={16} className="text-blue-400" />
                          )}
                        </button>
                      )}
                    </div>
                    <span className="text-blue-400 font-bold">{item.price} TL</span>
                  </div>
                  
                  {/* Staff and Time Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{item.addedBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{item.addedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => onDecrement(item.productId)}
                    className="p-1.5 bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center text-white font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onIncrement(item.productId)}
                    className="p-1.5 bg-green-500/80 hover:bg-green-600/80 text-white rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Combo Selections */}
            {item.comboSelections && expandedItems.includes(item.productId) && (
              <div className="bg-gray-900/50 border-t border-white/5 p-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-gray-300">
                    <span>• {item.comboSelections.mainItem.name}</span>
                    {item.comboSelections.mainItem.extraPrice && (
                      <span className="text-blue-400">+{item.comboSelections.mainItem.extraPrice} TL</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>• {item.comboSelections.side.name}</span>
                    {item.comboSelections.side.extraPrice && (
                      <span className="text-blue-400">+{item.comboSelections.side.extraPrice} TL</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>• {item.comboSelections.drink.name}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payment Section */}
      <div className="border-t border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-4">
        {/* Totals */}
        <div className="mb-4 space-y-2">
          {discount && (
            <>
              <div className="flex justify-between items-center text-gray-300 bg-gray-800/50 p-2 rounded-lg">
                <span>Ara Toplam</span>
                <span>{subtotal.toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between items-center text-green-400 bg-green-900/20 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Percent size={16} />
                  <span>İndirim</span>
                </div>
                <span>-{discountAmount.toFixed(2)} TL</span>
              </div>
            </>
          )}

          <div className="flex justify-between items-center p-4 bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-xl border border-blue-500/20">
            <span className="text-lg text-gray-200">Toplam</span>
            <span className="text-2xl font-bold text-white">{totalAmount.toFixed(2)} TL</span>
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onPayment('cash')}
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-500/20"
          >
            <DollarSign size={20} />
            <span className="font-medium">Nakit</span>
          </button>
          <button
            onClick={() => onPayment('card')}
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            <CreditCard size={20} />
            <span className="font-medium">Kredi Kartı</span>
          </button>
          <button
            onClick={() => onPayment('multinet')}
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg shadow-green-500/20"
          >
            <Wallet size={20} />
            <span className="font-medium">Multinet</span>
          </button>
          <button
            onClick={() => onPayment('sodexo')}
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/20"
          >
            <Wallet size={20} />
            <span className="font-medium">Sodexo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
