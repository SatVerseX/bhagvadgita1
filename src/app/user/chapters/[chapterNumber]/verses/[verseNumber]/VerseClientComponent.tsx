'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, MessageCircleQuestion, PlayCircle, Sparkles, Search } from 'lucide-react';
import { fetchVerse } from '@/lib/rapidapi';

interface VerseDetails {
  id: string;
  verse_number: number;
  text: string;
  translations: {
    author: string;
    language: string;
    description: string;
  }[];
}

interface VerseClientComponentProps {
  chapterNumber: string;
  verseNumber: string;
}

export default function VerseClientComponent({
  chapterNumber,
  verseNumber,
}: VerseClientComponentProps) {
  const [verse, setVerse] = useState<VerseDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVerse() {
      try {
        const data = await fetchVerse(
          Number(chapterNumber),
          Number(verseNumber)
        );
        setVerse(data);
      } catch (error) {
        console.error('Error fetching verse:', error);
        // Fallback data
        setVerse({
          id: "1",
          verse_number: 1,
          text: "धृतराष्ट्र उवाच\n\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥१.१॥",
          translations: [
            {
              author: "Shri Purohit Swami",
              language: "english",
              description: "The King Dhritarashtra asked, \"O Sanjaya! What happened on the sacred battlefield of Kurukshetra when my people and the Pandavas gathered?\""
            },
            {
              author: "Dr. S. Sankaranarayan",
              language: "english",
              description: "Dhritarashtra said, \"O Sanjaya, what did my sons and the sons of Pandu do in the holy land of Kuruksetra, when they had gathered there, eager for battle?\""
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    }
    loadVerse();
  }, [chapterNumber, verseNumber]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-orange-100 rounded w-48 mx-auto"></div>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="h-6 bg-orange-50 rounded w-1/4"></div>
            <div className="h-20 bg-orange-50 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!verse) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-orange-600">श्लोक नहीं मिला</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-cyan-100 to-blue-200 px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
      <Link
        href={`/user/chapters/${chapterNumber}`}
        className="self-start inline-flex items-center text-blue-700 hover:text-blue-900 mb-6 font-semibold bg-white/70 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        ← अध्याय {chapterNumber} पर वापस
      </Link>

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 max-w-4xl w-full border-4 border-blue-400">
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
          <div className="bg-gradient-to-tr from-pink-400 to-red-400 p-3 sm:p-4 rounded-full shadow-lg mb-4">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="font-baloo text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            अध्याय {chapterNumber}, श्लोक {verseNumber}
          </h1>
          <p className="text-sm text-gray-500">Verse Details</p>
        </div>

        <div className="my-6 p-4 bg-green-100/70 border-2 border-dashed border-green-400 rounded-xl text-center">
          <Sparkles className="w-8 h-8 text-green-600 mx-auto mb-2 animate-pulse" />
          <p className="text-green-700 font-semibold font-baloo">बच्चों के लिए चित्र यहाँ डालें!</p>
          <p className="text-sm text-green-600">(Friendly mascot or chapter-relevant illustration)</p>
        </div>

        <div className="bg-yellow-50/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-yellow-400 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-baloo text-xl sm:text-2xl text-yellow-700 font-bold flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-yellow-500 animate-bounce" />
              मूल श्लोक
            </h2>
            <button className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
              <PlayCircle className="w-5 h-5 mr-2" /> ध्वनि (Play)
            </button>
          </div>
          <div className="text-gray-800 text-lg leading-relaxed font-sanskrit whitespace-pre-line">
            {verse.text}
          </div>
        </div>

        <div className="my-8 p-4 bg-sky-100/70 border-2 border-dashed border-sky-400 rounded-xl flex items-start space-x-3">
          <MessageCircleQuestion className="w-10 h-10 text-sky-600 flex-shrink-0 animate-ping once" />
          <div>
            <h3 className="font-baloo text-lg font-semibold text-sky-700">क्या आप जानते हैं? (Did you know?)</h3>
            <p className="text-sm text-sky-600 mt-1">
              (बच्चों के लिए मजेदार तथ्य यहाँ डालें! जैसे: &quot;महाभारत युद्ध 18 दिनों तक चला था!&quot;)
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-baloo text-xl sm:text-2xl text-purple-700 font-bold mb-4 flex items-center">
            <Search className="w-6 h-6 mr-2 text-purple-500 animate-pulse" />
            विभिन्न अनुवाद
          </h2>
          {verse.translations.map((translation, index) => (
            <div 
              key={index}
              className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 border-2 border-purple-300 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <p className="text-gray-700 mb-2 text-base sm:text-lg leading-relaxed">{translation.description}</p>
              <p className="text-right text-sm font-medium text-purple-600">
                — {translation.author} ({translation.language})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 