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
      ? 'bg-red-500/20 border-red-500 hover:bg-red-500/30'
      : 'bg-green-500/20 border-green-500 hover:bg-green-500/30';
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
        w-48 h-48 rounded-xl border-2 p-4
        flex flex-col justify-between
        cursor-pointer transition-all duration-300
        ${getStatusColor(table.status)}
      `}
    >
      {/* Table Number and Seats */}
      <div className="flex justify-between items-start">
        <span className="text-2xl font-bold text-white">{table.number}</span>
        <div className="flex items-center space-x-1 text-gray-300">
          <Users size={16} />
          <span>{table.seats}</span>
        </div>
      </div>

      {/* Occupied Info */}
      {table.status === 'occupied' && table.occupiedInfo && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-300">
            <User size={16} />
            <span>{table.occupiedInfo.waiter}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock size={16} />
            <span>{formatTime(table.occupiedInfo.occupiedTime)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Users size={16} />
            <span>{table.occupiedInfo.currentGuests} Misafir</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {table.status === 'empty' && (
        <div className="text-gray-400 text-center mt-8">
          Boş
        </div>
      )}
    </div>
  );
};

export default TableComponent;