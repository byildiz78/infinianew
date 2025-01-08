import React from 'react';
import { Users, Clock, User } from 'lucide-react';

interface TableProps {
  table: {
    id: number;
    number: string;
    seats: number;
    status: 'empty' | 'occupied';
    occupiedInfo?: {
      waiter: string;
      occupiedTime: number;
      currentGuests: number;
    };
  };
  onClick: (tableNumber: string) => void;
}

const TableComponent: React.FC<TableProps> = ({ table, onClick }) => {
  const getStatusColor = (status: string) => {
    return status === 'occupied'
      ? 'bg-gradient-to-br from-green-500/90 to-green-600/90 hover:from-green-600/90 hover:to-green-700/90'
      : 'bg-gradient-to-br from-gray-400/50 to-gray-500/50 hover:from-gray-500/50 hover:to-gray-600/50';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}s ` : ''}${mins}d`;
  };

  return (
    <button
      onClick={() => onClick(table.number)}
      className={`${getStatusColor(table.status)} 
        w-60 flex flex-col text-white 
        transition-all duration-300 cursor-pointer
        border-2 border-white/20 shadow-lg backdrop-blur-sm
        rounded-xl relative overflow-hidden
        hover:shadow-xl hover:scale-105 hover:-translate-y-0.5`}
    >
      {/* Table Header */}
      <div className="w-full bg-black/40 p-2 text-center border-b border-white/20">
        <div className="font-bold text-xl tracking-wide">Masa {table.number}</div>
      </div>

      {/* Table Content */}
      <div className="p-3">
        {table.status === 'occupied' && table.occupiedInfo ? (
          <div className="space-y-2">
            {/* Waiter Info */}
            <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg">
              <User size={18} className="text-white/90 shrink-0" />
              <div className="font-medium text-sm truncate">{table.occupiedInfo.waiter}</div>
            </div>
            
            {/* Time and Guests */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-black/20 px-2 py-1.5 rounded-lg">
                <Clock size={16} className="text-white/90 shrink-0" />
                <div className="font-medium text-sm">{formatTime(table.occupiedInfo.occupiedTime)}</div>
              </div>

              <div className="flex items-center gap-2 bg-black/20 px-2 py-1.5 rounded-lg">
                <Users size={16} className="text-white/90 shrink-0" />
                <div className="font-medium text-sm">{table.occupiedInfo.currentGuests}/{table.seats}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-3 text-center">
            <div className="text-lg font-medium mb-1">Boş</div>
            <div className="text-sm text-white/70">{table.seats} Kişilik</div>
          </div>
        )}
      </div>

      {/* Status Indicator */}
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/90 shadow-glow animate-pulse"></div>
    </button>
  );
};

export default TableComponent;