import React from 'react';
import { X, Users, Clock, RefreshCcw, Lock, FileText, Timer, Database, ArrowLeftRight, ArrowLeft } from 'lucide-react';

interface OtherOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OtherOptionsModal: React.FC<OtherOptionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-gray-900/95 z-50 flex flex-col">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Diğer İşlemler</h2>
      </div>
      
      <div className="flex-1 p-6">
        <div className="grid grid-cols-5 gap-4">
          {/* Row 1 */}
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <ArrowLeftRight size={32} />
            <span className="text-sm font-medium">MASA DEĞİŞTİR</span>
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <Users size={32} />
            <span className="text-sm font-medium">GARSON DEĞİŞTİR</span>
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <Users size={32} />
            <span className="text-sm font-medium">KİŞİ SAYISI DEĞİŞTİR</span>
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <Users size={32} />
            <span className="text-sm font-medium">MÜŞTERİ BUL</span>
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <Database size={32} />
            <span className="text-sm font-medium">İNDİRİM</span>
          </button>

          {/* Row 2 */}
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <FileText size={32} />
            <span className="text-sm font-medium">SON FİŞLERİ GÖSTER</span>
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <Lock size={32} />
            <span className="text-sm font-medium">EKRANI KİLİTLE</span>
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <Database size={32} />
            <span className="text-sm font-medium">DİPLOMATİK SATIŞ</span>
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <RefreshCcw size={32} />
            <span className="text-sm font-medium">2. FİYATLARI KULLAN</span>
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <Database size={32} />
            <span className="text-sm font-medium">AYIR</span>
          </button>

          {/* Row 3 */}
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <Timer size={32} />
            <span className="text-sm font-medium">HAPPY HOUR AÇ/KAPAT</span>
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <Database size={32} />
            <span className="text-sm font-medium">SUNUCUDAN MENÜLERİ AL</span>
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-4 rounded-lg flex flex-col items-center gap-2">
            <Database size={32} />
            <span className="text-sm font-medium">ÖDEME AYIR</span>
          </button>
        </div>
      </div>

      {/* Return Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <ArrowLeft size={24} />
          <span>Satış Ekranına Geri Dön</span>
        </button>
      </div>
    </div>
  );
};

export default OtherOptionsModal;