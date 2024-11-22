import React from 'react';
import { Users, Percent } from 'lucide-react';

interface OccupancyStatsProps {
  sectionStats: {
    totalTables: number;
    occupiedTables: number;
    totalSeats: number;
    occupiedSeats: number;
  };
  restaurantStats: {
    totalTables: number;
    occupiedTables: number;
    totalSeats: number;
    occupiedSeats: number;
  };
}

const OccupancyStats: React.FC<OccupancyStatsProps> = ({ sectionStats, restaurantStats }) => {
  const calculateOccupancyRate = (occupied: number, total: number) => {
    return Math.round((occupied / total) * 100);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold mb-3 px-2">İstatistikler</h3>
      
      {/* Section Stats */}
      <div className="bg-gray-900/70 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50">
        <h4 className="text-white font-semibold mb-3 text-sm">Salon İstatistikleri</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-300">
              <Users size={18} />
              <span className="text-sm">Doluluk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${calculateOccupancyRate(sectionStats.occupiedTables, sectionStats.totalTables)}%` }}
                ></div>
              </div>
              <span className="text-white font-medium text-sm">
                {calculateOccupancyRate(sectionStats.occupiedTables, sectionStats.totalTables)}%
              </span>
            </div>
          </div>
          <div className="text-gray-300 text-sm">
            Mevcut Müşteri: {sectionStats.occupiedSeats} kişi
          </div>
        </div>
      </div>

      {/* Restaurant Stats */}
      <div className="bg-gray-900/70 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50">
        <h4 className="text-white font-semibold mb-3 text-sm">Restoran İstatistikleri</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-300">
              <Percent size={18} />
              <span className="text-sm">Toplam Doluluk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${calculateOccupancyRate(restaurantStats.occupiedTables, restaurantStats.totalTables)}%` }}
                ></div>
              </div>
              <span className="text-white font-medium text-sm">
                {calculateOccupancyRate(restaurantStats.occupiedTables, restaurantStats.totalTables)}%
              </span>
            </div>
          </div>
          <div className="text-gray-300 text-sm">
            Toplam Müşteri: {restaurantStats.occupiedSeats} kişi
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyStats;