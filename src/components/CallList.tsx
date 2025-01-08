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
    <div className="glass-darker h-full rounded-lg p-4 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4">TÜM ARAMALAR</h2>
      <div className="space-y-3 overflow-auto h-[calc(100%-5rem)]">
        {calls.map((call, index) => (
          <div key={index} className="flex justify-between items-center text-white bg-gray-800/50 p-3 rounded-lg">
            <div className="flex items-center">
              <Phone size={18} className="mr-2" />
              <span>{call.number}</span>
            </div>
            <span className="font-medium">{call.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallList;