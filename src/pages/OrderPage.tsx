import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Percent, FileText, GitMerge, MoreHorizontal, Users, Coins } from 'lucide-react';
import { categories } from '../data/categories';
import { Product, Category, OrderItem } from '../types';
import Header from '../components/Header';
import PageNavigation from '../components/PageNavigation';
import CategoryList from '../components/CategoryList';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import OtherOptionsModal from '../components/OtherOptionsModal';
import CheckDiscountModal from '../components/CheckDiscountModal';
import ProductDiscountModal from '../components/ProductDiscountModal';
import CustomerNameModal from '../components/CustomerNameModal';

const OrderPage: React.FC = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isOtherOptionsOpen, setIsOtherOptionsOpen] = useState(false);
  const [isCheckDiscountOpen, setIsCheckDiscountOpen] = useState(false);
  const [isProductDiscountOpen, setIsProductDiscountOpen] = useState(false);
  const [isCustomerNameOpen, setIsCustomerNameOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');

  // Filter categories based on current page
  const currentCategories = categories.filter(cat => cat.page === currentPage);

  const addToOrder = (product: Product) => {
    setOrderItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, quantity: 1 }];
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
    navigate('/table-layout');
  };

  const handleCheckDiscount = (amount: number) => {
    console.log('Applying check discount:', amount);
    // Implement discount logic
  };

  const handleProductDiscount = (percentage: number) => {
    console.log('Applying product discount:', percentage);
    // Implement discount logic
  };

  const handleCustomerName = (name: string) => {
    setCustomerName(name);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900/70">
      <Header tableId={tableId || ''} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Menu */}
        <div className="w-64 bg-gray-900/90 border-r border-gray-800 flex flex-col">
          <PageNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
          
          <CategoryList
            categories={currentCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={() => navigate('/table-layout')}
              className="w-full h-12 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <X size={20} className="mr-2" />
              İptal
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ProductGrid
            products={selectedCategory.products}
            selectedProduct={selectedProduct}
            orderItems={orderItems}
            onProductSelect={addToOrder}
          />
          
          {/* Footer */}
          <div className="bg-gray-900/90 border-t border-gray-800">
            {/* First Row */}
            <div className="grid grid-cols-4 gap-1 p-1">
              <button 
                onClick={() => setIsCheckDiscountOpen(true)}
                className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded"
              >
                <Percent size={18} />
                <span>ÇEK İNDİRİMİ</span>
              </button>
              <button 
                onClick={() => setIsProductDiscountOpen(true)}
                className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded"
              >
                <Percent size={18} />
                <span>ÜRÜN İNDİRİMİ</span>
              </button>
              <button 
                onClick={() => setIsCustomerNameOpen(true)}
                className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded"
              >
                <Users size={18} />
                <span>MÜŞTERİ ADI</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded">
                <Coins size={18} />
                <span>PARA PUAN</span>
              </button>
            </div>
            {/* Second Row */}
            <div className="grid grid-cols-4 gap-1 p-1">
              <button className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded">
                <FileText size={18} />
                <span>SİPARİŞ NOTU</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded">
                <GitMerge size={18} />
                <span>AYIR</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded">
                <GitMerge size={18} className="rotate-180" />
                <span>BİRLEŞTİR</span>
              </button>
              <button 
                onClick={() => setIsOtherOptionsOpen(true)}
                className="flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-700/90 text-white p-2 rounded"
              >
                <MoreHorizontal size={18} />
                <span>DİĞER</span>
              </button>
            </div>
          </div>
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
        />

        {/* Modals */}
        <OtherOptionsModal 
          isOpen={isOtherOptionsOpen}
          onClose={() => setIsOtherOptionsOpen(false)}
        />
        <CheckDiscountModal
          isOpen={isCheckDiscountOpen}
          onClose={() => setIsCheckDiscountOpen(false)}
          onApply={handleCheckDiscount}
        />
        <ProductDiscountModal
          isOpen={isProductDiscountOpen}
          onClose={() => setIsProductDiscountOpen(false)}
          onApply={handleProductDiscount}
        />
        <CustomerNameModal
          isOpen={isCustomerNameOpen}
          onClose={() => setIsCustomerNameOpen(false)}
          onSave={handleCustomerName}
        />
      </div>
    </div>
  );
};

export default OrderPage;