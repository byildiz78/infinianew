'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Receipt, Home, Palmtree, Warehouse, Users } from 'lucide-react';
import TableComponent from '../components/TableComponent';
import OccupancyStats from '../components/OccupancyStats';
import { Section, TableData, TableStatus } from '../types';

const sectionConfigs = [
  {
    id: 'garden',
    name: 'Bahçe',
    icon: Palmtree,
    tableCount: 15,
    prefix: 'B'
  },
  {
    id: 'salon',
    name: 'Salon',
    icon: Home,
    tableCount: 20,
    prefix: 'S'
  },
  {
    id: 'basement',
    name: 'Alt Kat',
    icon: Warehouse,
    tableCount: 12,
    prefix: 'A'
  }
] as const;

const generateTableData = (count: number, prefix: string): TableData[] => {
  return Array.from({ length: count }, (_, i): TableData => ({
    id: i + 1,
    number: `${prefix}${i + 1}`,
    seats: Math.random() > 0.5 ? 4 : 6,
    status: (Math.random() > 0.6 ? 'occupied' : 'empty') as TableStatus,
    occupiedInfo: Math.random() > 0.6 ? {
      waiter: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma'][Math.floor(Math.random() * 4)],
      occupiedTime: Math.floor(Math.random() * 180),
      currentGuests: Math.floor(Math.random() * 4) + 1,
    } : undefined,
  }));
};

const TableLayoutPage: React.FC = () => {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState('garden');

  useEffect(() => {
    const generatedSections = sectionConfigs.map(config => ({
      ...config,
      tables: generateTableData(config.tableCount, config.prefix)
    }));
    setSections(generatedSections);
  }, []);

  const currentSection = sections.find(s => s.id === activeSection) || sections[0] || { 
    id: '', 
    name: '', 
    icon: Palmtree, 
    tables: [] 
  };

  const handleTableClick = (tableNumber: string) => {
    router.push(`/order/${tableNumber}`);
  };

  return (
    <div className="flex h-full">
      {/* Tables Grid */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="grid grid-cols-4 gap-6 h-full auto-rows-min">
          {currentSection.tables?.map(table => (
            <div key={table.id} className="aspect-square">
              <TableComponent
                table={table}
                onClick={handleTableClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-96 bg-gray-900/90 border-l border-gray-800">
        <div className="h-full flex flex-col p-6">
          {/* Section Navigation */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Bölümler</h2>
            <div className="space-y-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
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
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-6 min-h-0 overflow-auto">
            {/* Current Section Stats */}
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <h3 className="text-lg font-medium text-white mb-3">{currentSection.name}</h3>
              <OccupancyStats
                occupiedTables={currentSection.tables?.filter(t => t.status === 'occupied').length || 0}
                totalTables={currentSection.tables?.length || 0}
                occupiedSeats={currentSection.tables?.reduce((sum, table) => 
                  sum + (table.occupiedInfo?.currentGuests || 0), 0) || 0}
                totalSeats={currentSection.tables?.reduce((sum, table) => sum + table.seats, 0) || 0}
              />
            </div>

            {/* Overall Stats */}
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <h3 className="text-lg font-medium text-white mb-3">Genel Durum</h3>
              <OccupancyStats
                occupiedTables={sections.flatMap(s => s.tables).filter(t => t.status === 'occupied').length}
                totalTables={sections.reduce((sum, s) => sum + s.tables.length, 0)}
                occupiedSeats={sections.reduce((sum, section) => 
                  sum + section.tables.reduce((tableSum, table) => 
                    tableSum + (table.occupiedInfo?.currentGuests || 0), 0), 0)}
                totalSeats={sections.reduce((sum, section) => 
                  sum + section.tables.reduce((tableSum, table) => tableSum + table.seats, 0), 0)}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 mt-6">
            <button
              onClick={() => router.push('/takeaway')}
              className="w-full flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <Receipt size={20} />
              <span>Paket Sipariş</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <Calendar size={20} />
              <span>Rezervasyonlar</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <Users size={20} />
              <span>Personel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayoutPage;
