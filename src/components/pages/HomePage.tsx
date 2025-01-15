import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, CloudSun, Sun } from 'lucide-react';
import SalesOperations from '../SalesOperations';
import QuickOperations from '../QuickOperations';
import CallList from '../CallList';
import CashierOperations from '../CashierOperations';
import Footer from '../Footer';

const HomePage: React.FC = () => {
  const [weather, setWeather] = useState({
    temp: 24,
    condition: 'sunny', // sunny, cloudy, rainy
    humidity: 65
  });

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'rainy':
        return <CloudRain size={24} className="text-blue-400" />;
      case 'cloudy':
        return <Cloud size={24} className="text-gray-400" />;
      case 'partly':
        return <CloudSun size={24} className="text-yellow-400" />;
      default:
        return <Sun size={24} className="text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900/70">
      {/* Header Bar */}
      <div className="bg-gradient-to-b from-gray-900/90 to-gray-900/50 py-4">
        <div className="container mx-auto px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Robot<span className="text-blue-500">POS</span>
              <span className="ml-2 text-gray-400 text-lg">Air</span>
            </h1>
          </div>

          {/* Weather Widget */}
          <div className="bg-gray-800/50 rounded-xl p-3 flex items-center gap-4 border border-gray-700/50">
            {getWeatherIcon()}
            <div className="text-white">
              <span className="text-2xl font-bold">{weather.temp}°C</span>
              <span className="text-gray-400 text-sm ml-2">Nem: %{weather.humidity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-8 mb-16">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="h-[calc(100vh-24rem)] transition-all duration-300 hover:transform hover:scale-[1.02]">
              <SalesOperations />
            </div>
            <div className="h-64 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <CashierOperations />
            </div>
          </div>

          {/* Middle Column */}
          <div className="h-[calc(100vh-16rem)] transition-all duration-300 hover:transform hover:scale-[1.02]">
            <QuickOperations />
          </div>

          {/* Right Column */}
          <div className="h-[calc(100vh-16rem)] transition-all duration-300 hover:transform hover:scale-[1.02]">
            <CallList />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
