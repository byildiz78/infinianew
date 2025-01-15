import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Receipt, Home, Palmtree, Warehouse, Users } from 'lucide-react';
import TableComponent from '../components/TableComponent';
import OccupancyStats from '../components/OccupancyStats';
import { Section, TableData, TableStatus } from '../types';

const sections: Section[] = [
  {
    id: 'garden',
    name: 'Bahçe',
    icon: Palmtree,
    tables: Array.from({ length: 15 }, (_, i): TableData => ({
      id: i + 1,
      number: `B${i + 1}`,
      seats: Math.random() > 0.5 ? 4 : 6,
      status: (Math.random() > 0.6 ? 'occupied' : 'empty') as TableStatus,
      occupiedInfo: Math.random() > 0.6 ? {
        waiter: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma'][Math.floor(Math.random() * 4)],
        occupiedTime: Math.floor(Math.random() * 180),
        currentGuests: Math.floor(Math.random() * 4) + 1,
      } : undefined,
    })),
  },
  {
    id: 'salon',
    name: 'Salon',
    icon: Home,
    tables: Array.from({ length: 20 }, (_, i): TableData => ({
      id: i + 1,
      number: `S${i + 1}`,
      seats: Math.random() > 0.5 ? 4 : 6,
      status: (Math.random() > 0.6 ? 'occupied' : 'empty') as TableStatus,
      occupiedInfo: Math.random() > 0.6 ? {
        waiter: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma'][Math.floor(Math.random() * 4)],
        occupiedTime: Math.floor(Math.random() * 180),
        currentGuests: Math.floor(Math.random() * 4) + 1,
      } : undefined,
    })),
  },
  {
    id: 'basement',
    name: 'Alt Kat',
    icon: Warehouse,
    tables: Array.from({ length: 12 }, (_, i): TableData => ({
      id: i + 1,
      number: `A${i + 1}`,
      seats: Math.random() > 0.5 ? 4 : 6,
      status: (Math.random() > 0.6 ? 'occupied' : 'empty') as TableStatus,
      occupiedInfo: Math.random() > 0.6 ? {
        waiter: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma'][Math.floor(Math.random() * 4)],
        occupiedTime: Math.floor(Math.random() * 180),
        currentGuests: Math.floor(Math.random() * 4) + 1,
      } : undefined,
    })),
  },
];

const TableLayoutPage: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const currentSection = sections.find(s => s.id === activeSection) || sections[0];
  
  const occupiedTables = currentSection.tables.filter(t => t.status === 'occupied');
  const totalSeats = currentSection.tables.reduce((sum, table) => sum + table.seats, 0);
  const occupiedSeats = occupiedTables.reduce((sum, table) => sum + (table.occupiedInfo?.currentGuests || 0), 0);
  
  const allOccupiedTables = sections.flatMap(s => s.tables.filter(t => t.status === 'occupied'));
  const allTotalSeats = sections.reduce((sum, section) => 
    sum + section.tables.reduce((tableSum, table) => tableSum + table.seats, 0), 0);
  const allOccupiedSeats = sections.reduce((sum, section) => 
    sum + section.tables.reduce((tableSum, table) => 
      tableSum + (table.occupiedInfo?.currentGuests || 0), 0), 0);

  const handleTableClick = (tableNumber: string) => {
    router.push(`/order/${tableNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-900/70 flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">RobotPOS</h1>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-4 gap-6 p-4">
          {currentSection.tables.map(table => (
            <div key={table.id} className="flex justify-center">
              <TableComponent
                table={table}
                onClick={handleTableClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-96 bg-gray-900/90 p-6 space-y-8 border-l border-gray-800">
        {/* Section Navigation */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white mb-4">Bölümler</h2>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <section.icon size={20} />
              <span>{section.name}</span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">İstatistikler</h2>
          
          {/* Current Section Stats */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-3">{currentSection.name}</h3>
            <OccupancyStats
              occupiedTables={occupiedTables.length}
              totalTables={currentSection.tables.length}
              occupiedSeats={occupiedSeats}
              totalSeats={totalSeats}
            />
          </div>

          {/* Overall Stats */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-3">Genel Durum</h3>
            <OccupancyStats
              occupiedTables={allOccupiedTables.length}
              totalTables={sections.reduce((sum, s) => sum + s.tables.length, 0)}
              occupiedSeats={allOccupiedSeats}
              totalSeats={allTotalSeats}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white mb-4">Hızlı İşlemler</h2>
          <button
            onClick={() => router.push('/takeaway')}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Receipt size={20} />
            <span>Paket Sipariş</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Calendar size={20} />
            <span>Rezervasyonlar</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Users size={20} />
            <span>Personel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableLayoutPage;
