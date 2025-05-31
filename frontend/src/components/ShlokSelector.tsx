import { ChevronDown } from 'lucide-react';

interface ShlokSelectorProps {
  currentShlok: number;
  totalShloks: number;
  onShlokChange: (shlokNumber: number) => void;
}

export default function ShlokSelector({ currentShlok, totalShloks, onShlokChange }: ShlokSelectorProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Dropdown for Shlok Selection */}
      <div className="relative w-64">
        <select
          value={currentShlok}
          onChange={(e) => onShlokChange(Number(e.target.value))}
          className="w-full appearance-none bg-white border-2 border-orange-200 rounded-xl px-4 py-3 pr-8 cursor-pointer hover:border-orange-300 transition-colors duration-200 text-gray-700 font-medium focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
        >
          {Array.from({ length: totalShloks }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              श्लोक {num}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 pointer-events-none w-5 h-5" />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onShlokChange(currentShlok - 1)}
          disabled={currentShlok === 1}
          className="px-6 py-2 rounded-lg bg-orange-100 text-orange-600 font-medium hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          पिछला श्लोक
        </button>
        <button
          onClick={() => onShlokChange(currentShlok + 1)}
          disabled={currentShlok === totalShloks}
          className="px-6 py-2 rounded-lg bg-orange-100 text-orange-600 font-medium hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          अगला श्लोक
        </button>
      </div>
    </div>
  );
} 