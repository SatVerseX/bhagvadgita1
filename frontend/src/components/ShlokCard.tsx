import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ShlokCardProps {
  id: string;
  shlokNumber: number;
  shlokText: string;
  simpleHindi: string;
  totalShloks: number;
  onShlokChange: (shlokNumber: number) => void;
}

export default function ShlokCard({ 
  id, 
  shlokNumber, 
  shlokText, 
  simpleHindi, 
  totalShloks,
  onShlokChange 
}: ShlokCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-l-4 border-orange-400 mb-6">
      {/* Shlok Selection Header */}
      <div className="bg-orange-50 p-4 border-b border-orange-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-orange-500 font-bold text-lg">श्लोक</span>
            <select
              value={shlokNumber}
              onChange={(e) => onShlokChange(Number(e.target.value))}
              className="appearance-none bg-white border-2 border-orange-200 rounded-lg px-3 py-1 cursor-pointer hover:border-orange-300 transition-colors duration-200 text-gray-700 font-medium focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            >
              {Array.from({ length: totalShloks }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span className="text-amber-600 text-sm px-2 py-0.5 bg-amber-100 rounded-full">ID: {id}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onShlokChange(shlokNumber - 1)}
              disabled={shlokNumber === 1}
              className="p-1 rounded hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded hover:bg-orange-100"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5 text-orange-500" /> : <ChevronDown className="w-5 h-5 text-orange-500" />}
            </button>
            <button
              onClick={() => onShlokChange(shlokNumber + 1)}
              disabled={shlokNumber === totalShloks}
              className="p-1 rounded hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Shlok Content */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 space-y-4">
          {/* Original Shlok Text */}
          <div className="bg-amber-50/50 p-4 rounded-xl">
            <p className="text-gray-800 font-medium leading-relaxed text-lg">
              {shlokText}
            </p>
          </div>

          {/* Simple Hindi Translation */}
          <div>
            <h4 className="text-orange-600 font-semibold mb-2 flex items-center">
              सरल शब्दों में (Simple Hindi):
            </h4>
            <p className="text-gray-700 leading-relaxed pl-4 border-l-2 border-orange-200">
              {simpleHindi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 