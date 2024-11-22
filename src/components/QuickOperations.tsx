import React from 'react';
import { Search, Clipboard, DollarSign, FileX } from 'lucide-react';

const QuickOperations: React.FC = () => {
  return (
    <div className="glass-darker rounded-lg p-3 shadow-xl h-[calc(100vh-24rem)]">
      <h2 className="text-lg font-bold text-white mb-3">Hızlı İşlemler</h2>
      <div className="grid grid-cols-2 gap-3">
        <button className="btn-green flex flex-col items-center justify-center text-white p-3 rounded-lg">
          <Search size={24} />
          <span className="mt-1 text-xs">Çağır</span>
        </button>
        <button className="btn-green flex flex-col items-center justify-center text-white p-3 rounded-lg">
          <Clipboard size={24} />
          <span className="mt-1 text-xs">Paket Durumu</span>
        </button>
        <button className="btn-green flex flex-col items-center justify-center text-white p-3 rounded-lg">
          <DollarSign size={24} />
          <span className="mt-1 text-xs">Ödeme</span>
        </button>
        <button className="btn-green flex flex-col items-center justify-center text-white p-3 rounded-lg">
          <FileX size={24} />
          <span className="mt-1 text-xs">Çek Kapat</span>
        </button>
      </div>
    </div>
  );
};

export default QuickOperations;