import React from 'react';
import { Delete } from 'lucide-react';

interface TouchKeyboardProps {
  onInput: (value: string) => void;
}

const TouchKeyboard: React.FC<TouchKeyboardProps> = ({ onInput }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç'],
  ];

  return (
    <div className="space-y-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onInput(key)}
              className="w-16 h-16 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xl font-semibold transition-colors"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => onInput('backspace')}
          className="w-16 h-16 bg-red-600/80 hover:bg-red-700/80 text-white rounded-lg flex items-center justify-center"
        >
          <Delete size={24} />
        </button>
        <button
          onClick={() => onInput('space')}
          className="flex-1 h-16 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xl"
        >
          Boşluk
        </button>
        <button
          onClick={() => onInput('clear')}
          className="w-16 h-16 bg-yellow-600/80 hover:bg-yellow-700/80 text-white rounded-lg text-sm font-semibold"
        >
          Temizle
        </button>
      </div>
    </div>
  );
};

export default TouchKeyboard;
