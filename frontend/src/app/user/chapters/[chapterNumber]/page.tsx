'use client';

import { useState, useEffect } from 'react';
import ShlokCard from '@/components/ShlokCard';
import { BookOpen } from 'lucide-react';

interface Shlok {
  id: string;
  verse_number: number;
  text: string;
  simple_hindi: string;
}

// Sample data - Replace with actual API call in production
const sampleShlokas: Shlok[] = [
  {
    id: "1",
    verse_number: 1,
    text: "धृतराष्ट्र उवाच धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥१.१॥",
    simple_hindi: "[सरल हिंदी अनुवाद] धृतराष्ट्र उवाच धर्मक्षेत्रे कुरुक्षेत्रे समवेता... (यह एक नमूना अनुवाद है)"
  },
  {
    id: "2",
    verse_number: 2,
    text: "सञ्जय उवाच दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा। आचार्यमुपसङ्गम्य राजा वचनमब्रवीत्॥१.२॥",
    simple_hindi: "[सरल हिंदी अनुवाद] सञ्जय उवाच दृष्ट्वा तु पाण्डवानीकं व्यूढं... (यह एक नमूना अनुवाद है)"
  },
  {
    id: "3",
    verse_number: 3,
    text: "पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम्। व्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता॥१.३॥",
    simple_hindi: "[सरल हिंदी अनुवाद] पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम्... (यह एक नमूना अनुवाद है)"
  }
];

export default function ChapterDetail({ params }: { params: { chapterNumber: string } }) {
  const [shlokas, setShlokas] = useState<Shlok[]>([]);
  const [currentShlokNumber, setCurrentShlokNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setShlokas(sampleShlokas);
      setLoading(false);
    }, 1000);
  }, []);

  const handleShlokChange = (shlokNumber: number) => {
    setCurrentShlokNumber(shlokNumber);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-amber-100 rounded w-64 mx-auto"></div>
          <div className="bg-white rounded-2xl shadow p-4 space-y-4 max-w-3xl mx-auto">
            <div className="h-6 bg-amber-100 rounded w-1/4"></div>
            <div className="h-20 bg-amber-50 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const currentShlok = shlokas.find(s => s.verse_number === currentShlokNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          अध्याय {params.chapterNumber}
        </h1>
      </header>

      <div className="max-w-3xl mx-auto mt-8">
        {currentShlok && (
          <ShlokCard
            key={currentShlok.id}
            id={currentShlok.id}
            shlokNumber={currentShlok.verse_number}
            shlokText={currentShlok.text}
            simpleHindi={currentShlok.simple_hindi}
            totalShloks={shlokas.length}
            onShlokChange={handleShlokChange}
          />
        )}
      </div>
    </div>
  );
} 