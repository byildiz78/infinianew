import React from 'react';
import { Users, Clock, User } from 'lucide-react';
import { TableData, TableStatus } from '../types';

interface TableProps {
  table: TableData;
  onClick: (tableNumber: string) => void;
}

const TableComponent: React.FC<TableProps> = ({ table, onClick }) => {
  const getStatusColor = (status: TableStatus) => {
    return status === 'occupied'
      ? 'bg-blue-900/90 border-blue-700 hover:bg-blue-800/90'
      : 'bg-gray-100/5 border-gray-300/20 hover:bg-gray-100/10';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}s ${mins}d`;
  };

  return (
    <div
      onClick={() => onClick(table.number)}
      className={`
        w-full h-full rounded-xl border-2 p-4
        flex flex-col justify-between
        cursor-pointer transition-all duration-300
        ${getStatusColor(table.status)}
      `}
    >
      <div className="relative h-full flex flex-col">
        {table.status === 'occupied' && table.occupiedInfo ? (
          <>
            {/* Customer Info - Top Left */}
            <div className="absolute -top-1 -left-1">
              <div className="bg-blue-800/50 rounded-lg px-2 py-0.5 flex items-center space-x-1">
                <Users size={14} className="text-blue-300" />
                <span className="text-white text-sm font-medium">
                  {table.occupiedInfo.currentGuests}/{table.seats}
                </span>
              </div>
            </div>

            {/* Time Info - Bottom Right */}
            <div className="absolute -bottom-1 -right-1">
              <div className="bg-blue-800/40 rounded-lg px-2 py-0.5 flex items-center space-x-1">
                <Clock size={14} className="text-blue-300" />
                <span className="text-white text-sm font-medium">{formatTime(table.occupiedInfo.occupiedTime)}</span>
              </div>
            </div>

            {/* Center Content - Table Number and Waiter */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white mb-3">
                {table.number}
              </span>
              <div className="bg-blue-800/30 rounded-lg px-3 py-1 flex items-center space-x-1.5">
                <User size={14} className="text-blue-300" />
                <span className="text-sm font-medium text-white">{table.occupiedInfo.waiter}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Empty Table Info */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-2">
              <span className="text-3xl font-bold text-gray-400">
                {table.number}
              </span>
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-gray-400 font-medium">{table.seats} Kişilik</span>
                </div>
                <div className="text-gray-500 text-sm">Boş Masa</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
