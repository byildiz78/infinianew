import React, { useEffect, useRef, useState } from 'react';
import { Barcode, Calculator } from 'lucide-react';
import Numpad from './Numpad';

interface BarcodeInputProps {
  onSubmit: (barcode: string) => void;
}

const BarcodeInput: React.FC<BarcodeInputProps> = ({ onSubmit }) => {
  const [barcode, setBarcode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep focus on input
  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Initial focus
    focusInput();

    // Re-focus when clicked anywhere on the page
    document.addEventListener('click', focusInput);
    
    return () => {
      document.removeEventListener('click', focusInput);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode.trim()) {
      onSubmit(barcode.trim());
      setBarcode('');
    }
  };

  const [showNumpad, setShowNumpad] = useState(false);

  // Handle click outside to close numpad
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showNumpad && !target.closest('.numpad-container')) {
        setShowNumpad(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNumpad]);

  // Auto-submit when barcode reaches 7 digits
  useEffect(() => {
    if (barcode.length === 7) {
      onSubmit(barcode);
      setBarcode('');
      setShowNumpad(false);
    }
  }, [barcode, onSubmit]);

  const handleNumpadInput = (value: string) => {
    if (value === 'backspace') {
      setBarcode(prev => prev.slice(0, -1));
    } else if (value === '.') {
      // Ignore decimal point for barcode input
      return;
    } else {
      setBarcode(prev => {
        const newValue = prev + value;
        return newValue.slice(0, 7); // Limit to 7 digits
      });
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Barcode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value.slice(0, 7))}
            className="w-full pl-11 pr-12 py-2.5 bg-gray-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Barkod okutun veya girin..."
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setShowNumpad(!showNumpad)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <Calculator size={20} />
          </button>
        </div>
      </form>

      {/* Numpad Modal */}
      {showNumpad && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-900/95 border border-white/10 rounded-lg shadow-xl z-50 numpad-container">
          <Numpad onInput={handleNumpadInput} />
        </div>
      )}
    </div>
  );
};

export default BarcodeInput;
