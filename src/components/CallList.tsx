import React from 'react';
import { Phone } from 'lucide-react';

const CallList: React.FC = () => {
  const calls = [
    { number: '+90 (555) 123-45-60', time: '14:30' },
    { number: '+90 (555) 123-45-61', time: '14:31' },
    { number: '+90 (555) 123-45-62', time: '14:32' },
    { number: '+90 (555) 123-45-63', time: '14:33' },
  ];

  return (
    <div className="glass-darker rounded-lg p-3 shadow-xl h-[calc(100vh-24rem)]">
      <h2 className="text-lg font-bold text-white mb-3">TÜM ARAMALAR</h2>
      <div className="space-y-2 overflow-auto h-[calc(100%-3rem)]">
        {calls.map((call, index) => (
          <div key={index} className="flex justify-between items-center text-white bg-gray-800 bg-opacity-20 p-2 rounded-lg">
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <span className="text-xs">{call.number}</span>
            </div>
            <span className="text-xs font-semibold">{call.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallList;