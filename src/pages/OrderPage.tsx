import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { categories } from '../data/categories';
import { Product, Category, OrderItem } from '../types';
import Header from '../components/Header';
import PageNavigation from '../components/PageNavigation';
import CategoryList from '../components/CategoryList';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';

const OrderPage: React.FC = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

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
      </div>
    </div>
  );
};

export default OrderPage;