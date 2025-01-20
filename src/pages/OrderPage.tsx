'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import FooterActions from '../components/order/FooterActions';
import OrderModals from '../components/order/OrderModals';
import ComboSelectionModal from '../components/ComboSelectionModal';
import { categories } from '../data/categories';
import { Product, OrderItem, ComboItem } from '../types';

const OrderPage: React.FC<{ tableId?: string }> = ({ tableId }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isOtherOptionsOpen, setIsOtherOptionsOpen] = useState(false);
  const [isCheckDiscountOpen, setIsCheckDiscountOpen] = useState(false);
  const [isProductDiscountOpen, setIsProductDiscountOpen] = useState(false);
  const [isCustomerNameOpen, setIsCustomerNameOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [selectedComboProduct, setSelectedComboProduct] = useState<Product | null>(null);

  // Function to find product by barcode across all categories
  const findProductByBarcode = (barcode: string): Product | null => {
    for (const category of categories) {
      const product = category.products.find(p => p.barcode === barcode);
      if (product) return product;
    }
    return null;
  };

  const handleBarcodeSubmit = (barcode: string) => {
    const product = findProductByBarcode(barcode);
    if (product) {
      addToOrder(product);
    } else {
      console.log('Ürün bulunamadı:', barcode);
    }
  };

  const currentCategories = categories.filter(cat => cat.page === currentPage);

  const addToOrder = (product: Product) => {
    if (product.isCombo && product.comboOptions) {
      setSelectedComboProduct(product);
      setIsComboModalOpen(true);
      return;
    }

    const now = new Date();
    const formattedTime = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const currentStaff = 'Ahmet Yılmaz';

    setOrderItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        addedAt: formattedTime,
        addedBy: currentStaff
      }];
    });
    setSelectedProduct(product.id);
  };

  const removeFromOrder = (productId: string) => {
    setOrderItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.productId !== productId);
    });
  };

  const handlePayment = (type: string) => {
    console.log(`Processing ${type} payment`);
    router.push('/table-layout');
  };

  const handleCheckDiscount = (amount: number) => {
    console.log('Applying check discount:', amount);
  };

  const handleProductDiscount = (percentage: number) => {
    console.log('Applying product discount:', percentage);
  };

  const handleCustomerName = (name: string) => {
    setCustomerName(name);
  };

  const handleComboComplete = (selections: { mainItem: ComboItem; side: ComboItem; drink: ComboItem }) => {
    if (!selectedComboProduct) return;
    
    const extraCost = (
      (selections.mainItem.extraPrice || 0) +
      (selections.side.extraPrice || 0) +
      (selections.drink.extraPrice || 0)
    );

    const comboName = `${selectedComboProduct.name} (${selections.mainItem.name})`;

    setOrderItems(prev => [...prev, {
      productId: selectedComboProduct.id,
      name: comboName,
      price: selectedComboProduct.price + extraCost,
      quantity: 1,
      comboSelections: selections
    }]);

    setSelectedComboProduct(null);
    setIsComboModalOpen(false);
  };

  return (
    <div className="flex h-full">
      {/* Left Menu */}
      <div className="w-64 bg-gray-900/90 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="grid grid-cols-2 gap-2">
            {[1, 2].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-12 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span>Sayfa {page}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {currentCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory.id === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <category.icon size={20} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => router.push('/table-layout')}
            className="w-full h-12 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            İptal
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <ProductGrid
          products={selectedCategory.products}
          selectedProduct={selectedProduct}
          orderItems={orderItems}
          onProductSelect={addToOrder}
        />
        
        <FooterActions
          onCheckDiscount={() => setIsCheckDiscountOpen(true)}
          onProductDiscount={() => setIsProductDiscountOpen(true)}
          onCustomerName={() => setIsCustomerNameOpen(true)}
          onOtherOptions={() => setIsOtherOptionsOpen(true)}
        />
      </div>

      {/* Cart */}
      <Cart
        orderItems={orderItems}
        onIncrement={productId => {
          const product = selectedCategory.products.find(p => p.id === productId);
          if (product) addToOrder(product);
        }}
        onDecrement={removeFromOrder}
        onPayment={handlePayment}
        tableId={tableId || ''}
        onBarcodeSubmit={handleBarcodeSubmit}
      />

      {/* Modals */}
      <OrderModals
        isOtherOptionsOpen={isOtherOptionsOpen}
        isCheckDiscountOpen={isCheckDiscountOpen}
        isProductDiscountOpen={isProductDiscountOpen}
        isCustomerNameOpen={isCustomerNameOpen}
        onOtherOptionsClose={() => setIsOtherOptionsOpen(false)}
        onCheckDiscountClose={() => setIsCheckDiscountOpen(false)}
        onProductDiscountClose={() => setIsProductDiscountOpen(false)}
        onCustomerNameClose={() => setIsCustomerNameOpen(false)}
        onCheckDiscount={handleCheckDiscount}
        onProductDiscount={handleProductDiscount}
        onCustomerName={handleCustomerName}
      />

      {/* Combo Modal */}
      {selectedComboProduct && (
        <ComboSelectionModal
          isOpen={isComboModalOpen}
          onClose={() => {
            setIsComboModalOpen(false);
            setSelectedComboProduct(null);
          }}
          comboOptions={selectedComboProduct.comboOptions!}
          onComplete={handleComboComplete}
        />
      )}
    </div>
  );
};

export default OrderPage;
