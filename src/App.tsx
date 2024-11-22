import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TakeawayPage from './pages/TakeawayPage';
import TableLayoutPage from './pages/TableLayoutPage';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route path="/takeaway" element={<TakeawayPage />} />
        <Route path="/table-layout" element={<TableLayoutPage />} />
        <Route path="/order/:tableId" element={<OrderPage />} />
      </Routes>
    </div>
  );
}

export default App;