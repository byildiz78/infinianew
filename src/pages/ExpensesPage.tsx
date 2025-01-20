'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Users, Wallet, Receipt, ClipboardList } from 'lucide-react';

type ExpenseType = 'GENERAL' | 'PERSONNEL_ADVANCE' | 'CURRENT_REFUND' | 'CURRENT_COLLECTION' | 'COLLECTION_WITH_ADISYON';

const ExpensesPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'EXPENSES' | 'COLLECTIONS'>('EXPENSES');
  const [selectedExpenseType, setSelectedExpenseType] = useState<ExpenseType | null>(null);

  const expenseTypes = [
    {
      id: 'GENERAL' as ExpenseType,
      title: 'GENEL MASRAF',
      description: 'İşletme giderlerini kaydetmek için kullanılır',
      icon: FileText,
    },
    {
      id: 'PERSONNEL_ADVANCE' as ExpenseType,
      title: 'PERSONEL AVANS',
      description: 'Personel avans ödemelerini kaydetmek için kullanılır',
      icon: Users,
    },
    {
      id: 'CURRENT_REFUND' as ExpenseType,
      title: 'CARİ HESAP PARA İADE',
      description: 'Cari hesaplara yapılan para iadelerini kaydetmek için kullanılır',
      icon: Wallet,
    },
    {
      id: 'CURRENT_COLLECTION' as ExpenseType,
      title: 'CARİ TAHSİLAT',
      description: 'Cari hesaplardan tahsilat almak için kullanılır',
      icon: Receipt,
    },
    {
      id: 'COLLECTION_WITH_ADISYON' as ExpenseType,
      title: 'ADİSYON İLE CARİ TAHSİLAT',
      description: 'Adisyon numarası ile cari hesaplardan tahsilat almak için kullanılır',
      icon: ClipboardList,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="bg-gray-900/90 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('EXPENSES')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'EXPENSES'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              MASRAF LİSTESİ
            </button>
            <button
              onClick={() => setActiveTab('COLLECTIONS')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'COLLECTIONS'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              TAHSİLAT LİSTESİ
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-6 py-8">
        {/* Expense Types Grid */}
        <div className="grid grid-cols-3 gap-6">
          {expenseTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedExpenseType(type.id)}
              className="bg-gray-800/50 hover:bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <type.icon size={24} className="text-blue-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium text-white mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-400">{type.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="mt-8 bg-gray-900/50 rounded-xl border border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 text-gray-400 font-medium">SERİNO</th>
                <th className="text-left p-4 text-gray-400 font-medium">MASRAF TİPİ</th>
                <th className="text-left p-4 text-gray-400 font-medium">PERSONEL</th>
                <th className="text-left p-4 text-gray-400 font-medium">SAAT</th>
                <th className="text-left p-4 text-gray-400 font-medium">ÖDEME</th>
                <th className="text-left p-4 text-gray-400 font-medium">KDV</th>
                <th className="text-right p-4 text-gray-400 font-medium">TUTAR</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data rows */}
              <tr className="border-b border-gray-800">
                <td className="p-4 text-white">M-001</td>
                <td className="p-4 text-white">Genel Masraf</td>
                <td className="p-4 text-white">Ahmet Yılmaz</td>
                <td className="p-4 text-gray-400">14:30</td>
                <td className="p-4 text-white">Nakit</td>
                <td className="p-4 text-white">%18</td>
                <td className="p-4 text-white text-right">1,250.00 TL</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-4 text-white">M-002</td>
                <td className="p-4 text-white">Personel Avans</td>
                <td className="p-4 text-white">Mehmet Demir</td>
                <td className="p-4 text-gray-400">15:45</td>
                <td className="p-4 text-white">Havale</td>
                <td className="p-4 text-white">-</td>
                <td className="p-4 text-white text-right">2,500.00 TL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
