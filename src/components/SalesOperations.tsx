import React from 'react';
import { Grid, Box, Clipboard, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const SalesOperations: React.FC = () => {
  return (
    <div className="glass-darker rounded-lg p-3 shadow-xl h-[calc(100vh-24rem)]">
      <h2 className="text-lg font-bold text-white mb-3">Satış İşlemleri</h2>
      <div className="grid grid-cols-2 gap-3">
        <Link to="/table-layout" className="btn-blue flex flex-col items-center justify-center text-white p-3 rounded-lg">
          <Grid size={24} />
          <span className="mt-1 text-xs">Masa Modu</span>
        </Link>
        <Link to="/takeaway" className="btn-blue flex flex-col items-center justify-center text-white p-3 rounded-lg">
          <Box size={24} />
          <span className="mt-1 text-xs">Al Götür</span>
        </Link>
        <button className="btn-blue flex flex-col items-center justify-center text-white p-3 rounded-lg">
          <Clipboard size={24} />
          <span className="mt-1 text-xs">Tezgah Satış</span>
        </button>
        <button className="btn-blue flex flex-col items-center justify-center text-white p-3 rounded-lg">
          <Package size={24} />
          <span className="mt-1 text-xs">Paket Satış</span>
        </button>
      </div>
    </div>
  );
};

export default SalesOperations;