import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-100 to-purple-100">
      <div className="text-center bg-white/80 p-8 rounded-xl shadow-lg border border-blue-200">
        <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto mb-6" />
        <p className="text-xl font-semibold text-blue-700">श्लोक लोड हो रहा है...</p>
        <p className="text-md text-gray-600 mt-2">कृपया प्रतीक्षा करें, ज्ञान आ रहा है!</p>
      </div>
    </div>
  );
} 