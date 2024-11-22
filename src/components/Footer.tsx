import React from 'react';
import { Clock, Settings, ArrowLeft, LogOut } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-800 bg-opacity-50 text-white p-2 flex justify-between items-center shadow-md">
      <div className="flex space-x-2">
        <button className="btn flex items-center bg-gray-700 bg-opacity-50 px-2 py-1 rounded-full text-sm">
          <Clock size={16} className="mr-1" />
          <span>Zaman</span>
        </button>
        <button className="btn flex items-center bg-gray-700 bg-opacity-50 px-2 py-1 rounded-full text-sm">
          <Settings size={16} className="mr-1" />
          <span>İşlemler</span>
        </button>
        <button className="btn flex items-center bg-gray-700 bg-opacity-50 px-2 py-1 rounded-full text-sm">
          <ArrowLeft size={16} className="mr-1" />
          <span>Arka Ofis</span>
        </button>
      </div>
      <div className="flex items-center">
        <span className="mr-2 text-sm">Terminal: 2 | Kasiyer: Murat Demir</span>
        <button className="btn bg-red-600 bg-opacity-70 hover:bg-opacity-80 flex items-center px-3 py-1 rounded-full text-sm">
          <LogOut size={16} className="mr-1" />
          <span>Çıkış</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;