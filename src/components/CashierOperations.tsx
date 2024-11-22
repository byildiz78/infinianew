import React from 'react';
import { LogIn, LogOut } from 'lucide-react';

const CashierOperations: React.FC = () => {
  return (
    <div className="glass-darker rounded-lg p-3 shadow-xl">
      <h2 className="text-lg font-bold text-white mb-3">Kasiyer İşlemleri</h2>
      <div className="grid grid-cols-2 gap-3">
        <button className="btn-blue flex flex-col items-center justify-center text-white p-3 rounded-lg">
          <LogIn size={24} />
          <span className="mt-1 text-xs">Kasiyer Giriş</span>
        </button>
        <button className="btn-red flex flex-col items-center justify-center text-white p-3 rounded-lg">
          <LogOut size={24} />
          <span className="mt-1 text-xs">Kasiyer Çıkış</span>
        </button>
      </div>
    </div>
  );
};

export default CashierOperations;