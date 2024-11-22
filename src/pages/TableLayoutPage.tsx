import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Receipt, Home, Palmtree, Warehouse, Users } from 'lucide-react';
import TableComponent from '../components/TableComponent';
import OccupancyStats from '../components/OccupancyStats';

const sections = [
  {
    id: 'garden',
    name: 'Bahçe',
    icon: Palmtree,
    tables: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      number: `B${i + 1}`,
      seats: Math.random() > 0.5 ? 4 : 6,
      status: Math.random() > 0.6 ? 'occupied' : 'empty',
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
    tables: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      number: `S${i + 1}`,
      seats: Math.random() > 0.5 ? 4 : 6,
      status: Math.random() > 0.6 ? 'occupied' : 'empty',
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
    tables: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      number: `A${i + 1}`,
      seats: Math.random() > 0.5 ? 4 : 6,
      status: Math.random() > 0.6 ? 'occupied' : 'empty',
      occupiedInfo: Math.random() > 0.6 ? {
        waiter: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma'][Math.floor(Math.random() * 4)],
        occupiedTime: Math.floor(Math.random() * 180),
        currentGuests: Math.floor(Math.random() * 4) + 1,
      } : undefined,
    })),
  },
];

const TableLayoutPage: React.FC = () => {
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
    console.log(`Clicked table ${tableNumber}`);
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
            <TableComponent
              key={table.id}
              table={table}
              onClick={handleTableClick}
            />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-96 bg-gray-900/90 p-6 space-y-8 border-l border-gray-800">
        {/* Section Navigation */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold mb-4 px-2">Bölümler</h3>
          <div className="space-y-3">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-medium transition-all
                  ${activeSection === section.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800/70'}`}
              >
                <section.icon size={24} />
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <OccupancyStats
            sectionStats={{
              totalTables: currentSection.tables.length,
              occupiedTables: occupiedTables.length,
              totalSeats,
              occupiedSeats
            }}
            restaurantStats={{
              totalTables: sections.reduce((sum, section) => sum + section.tables.length, 0),
              occupiedTables: allOccupiedTables.length,
              totalSeats: allTotalSeats,
              occupiedSeats: allOccupiedSeats
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 px-6 py-4 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors">
            <Calendar size={20} />
            <span className="font-medium">Rezervasyonlar</span>
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Receipt size={20} />
            <span className="font-medium">Hesap Al</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableLayoutPage;