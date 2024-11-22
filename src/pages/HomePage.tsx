import React from 'react';
import SalesOperations from '../components/SalesOperations';
import QuickOperations from '../components/QuickOperations';
import CallList from '../components/CallList';
import CashierOperations from '../components/CashierOperations';

const HomePage: React.FC = () => {
  console.log('HomePage component rendered');
  return (
    <div className="flex-grow p-4 grid grid-cols-3 gap-4">
      <div className="flex flex-col justify-between">
        <SalesOperations />
        <CashierOperations />
      </div>
      <QuickOperations />
      <CallList />
    </div>
  );
};

export default HomePage;