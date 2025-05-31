'use client';

import { fetchChapters } from '@/lib/rapidapi'; // Assuming this path is correct for your project
import Link from 'next/link';
import { GitaChapter } from '@/types'; // Assuming this path is correct for your project
import { useEffect, useState } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react'; // ChevronRight can be an alternative to emoji for "read more"

// Accent colors from the provided HTML - these are already quite vibrant and good for kids
const extendedAccentColors = [
  '#007BFF', '#5856D6', '#34C759', '#FF9500', '#FFCC00', '#FF3B30',
  '#5AC8FA', '#AF52DE', '#00A98F', '#FF2D55', '#A2845E', '#8E8E93',
  '#00AEEF', '#6A4EF9', '#4CD964', '#FF6B22', '#FFD60A', '#E52753'
];

// Icons for chapters - emojis are great for kids!
const chapterIcons = [
  "📖", "💡", "🛠️", "📚", "🧘", "🎯", "🔬", "✨", "👑", "🌟", 
  "👁️‍🗨️", "💖", "🧬", "⚖️", "🌳", "😇🆚😈", "📊", "🕊️" // Kept the original 18 icons
];

// Helper function to generate a subtle, playful gradient from the accent color
const getGradientBackground = (hexColor: string) => {
  let r = 0, g = 0, b = 0;
  if (hexColor.length === 7) {
    r = parseInt(hexColor.substring(1, 3), 16);
    g = parseInt(hexColor.substring(3, 5), 16);
    b = parseInt(hexColor.substring(5, 7), 16);
  } else if (hexColor.length === 4) {
    r = parseInt(hexColor[1] + hexColor[1], 16);
    g = parseInt(hexColor[2] + hexColor[2], 16);
    b = parseInt(hexColor[3] + hexColor[3], 16);
  }
  // A slightly more vibrant gradient that fades gently
  return `linear-gradient(135deg, rgba(${r},${g},${b},0.20) 0%, rgba(${r},${g},${b},0.03) 60%, transparent 100%)`;
};

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<GitaChapter[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChapters() {
      try {
        // Simulating API call for demonstration if fetchChapters is not available
        // const data = await fetchChapters(); 
        // In a real scenario, ensure fetchChapters is correctly implemented and API keys are set up.
        // For now, using placeholder data if fetchChapters is not working in this environment.
        if (typeof fetchChapters !== 'function' || process.env.NODE_ENV === 'development') {
            console.warn("fetchChapters function not available or in dev mode. Using placeholder data.");
            const placeholderData = Array.from({ length: 18 }, (_, i) => ({
              id: i + 1,
              chapter_number: i + 1,
              name: `अध्याय ${i + 1}`,
              name_translated: `Chapter ${i + 1}`,
              name_transliterated: `Adhyāya ${i + 1}`,
              name_meaning: `Meaning of Chapter ${i + 1}`,
              chapter_summary: `This is a captivating summary for chapter ${i + 1}, full of wisdom and stories that children will find interesting and easy to understand. Explore the adventure within!`,
              verses_count: Math.floor(Math.random() * 50) + 20,
            }));
            setChapters(placeholderData as GitaChapter[]);
        } else {
            const data = await fetchChapters();
            setChapters(data);
        }
      } catch (err) {
        console.error('Error fetching chapters:', err);
        setError('अध्याय लोड करने में असमर्थ। कृपया बाद में पुनः प्रयास करें।');
      } finally {
        setLoading(false);
      }
    }
    loadChapters();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 bg-amber-50 min-h-screen">
        <header className="text-center mb-12 sm:mb-16">
          {/* Pulsing header placeholders */}
          <div className="h-10 bg-amber-200/70 rounded-lg w-3/5 sm:w-2/5 mx-auto animate-pulse"></div>
          <div className="h-6 bg-amber-200/70 rounded-md w-4/5 sm:w-3/5 mx-auto mt-4 animate-pulse"></div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10">
          {[...Array(6)].map((_, i) => (
            // Pulsing card placeholders
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse border-l-[6px] border-amber-200/70 min-h-[330px] flex flex-col">
              <div className="h-6 bg-amber-100 rounded w-1/3 mb-2"></div> {/* Chapter Number Placeholder */}
              <div className="h-7 bg-amber-200 rounded w-3/4 mb-1.5"></div> {/* Title Placeholder */}
              <div className="h-5 bg-amber-100 rounded w-1/2 mb-4"></div> {/* Subtitle Placeholder */}
              <div className="space-y-2.5 flex-grow mb-4"> {/* Summary Placeholders */}
                <div className="h-4 bg-amber-100 rounded"></div>
                <div className="h-4 bg-amber-100 rounded"></div>
                <div className="h-4 bg-amber-100 rounded w-5/6"></div>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full mt-auto self-end"></div> {/* Icon Placeholder */}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 bg-red-50 min-h-screen flex items-center justify-center">
        <div className="bg-white border border-red-300 rounded-xl p-8 sm:p-10 max-w-md mx-auto shadow-xl text-center">
          <BookOpen className="mx-auto h-16 w-16 sm:h-20 sm:w-20 text-red-500 mb-6" />
          <h2 className="text-red-700 text-2xl sm:text-3xl font-bold mb-3">ओह! कुछ गड़बड़ है</h2>
          <p className="text-red-600 mb-8 text-base sm:text-lg">{error}</p>
          <Link href="/" 
            className="inline-block px-7 py-3.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-base sm:text-lg"
          >
            घर वापस जाएं
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-amber-50 min-h-screen">
      <header className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800"> 
          श्रीमद्भगवद्गीता के <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">प्यारे अध्याय</span>
        </h1>
        <p className="text-lg sm:text-xl text-amber-700 mt-4 max-w-3xl mx-auto"> 
          ज्ञान के रंगीन सागर में गोता लगाएँ! हर अध्याय में है एक नई कहानी, एक नई सीख।
        </p>
      </header>

      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-10">
          {chapters.map((chapter: GitaChapter, index) => {
            const accentColor = extendedAccentColors[index % extendedAccentColors.length];
            const icon = chapterIcons[(chapter.chapter_number - 1) % chapterIcons.length] || chapterIcons[0]; 
            const cardBgGradient = getGradientBackground(accentColor);

            return (
              <Link
                key={chapter.id} 
                href={`/user/chapters/${chapter.chapter_number}`}
                className="block bg-white rounded-3xl shadow-2xl hover:shadow-purple-300/50 group relative overflow-hidden transition-all duration-300 ease-out flex flex-col min-h-[320px] lg:min-h-[350px] border-4 hover:scale-105"
                style={{ 
                  borderColor: accentColor,
                }}
              >
                {/* Subtle gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl pointer-events-none"
                  style={{ backgroundImage: cardBgGradient, zIndex: 0 }}
                ></div>
                
                {/* Card Content */}
                <div className="relative p-8 flex flex-col flex-grow z-10">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="font-extrabold text-3xl sm:text-4xl tracking-tighter" 
                        style={{ color: accentColor }}
                      >
                        अध्याय {chapter.chapter_number}
                      </div>
                      <div 
                        className="text-sm font-semibold py-2 px-4 rounded-full shadow-sm"
                        style={{backgroundColor: `${accentColor}20`, color: accentColor }}
                      >
                        {chapter.verses_count} श्लोक
                      </div>
                    </div>
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-700 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                      {chapter.name_translated || chapter.name}
                    </h2>
                    <h3 className="font-sans font-medium text-lg text-slate-500 mb-4 group-hover:text-slate-600 transition-colors duration-200">
                      {chapter.name_transliterated}
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors duration-200">
                      {chapter.chapter_summary}
                    </p>
                  </div>
                  <div className="flex justify-end mt-6 pt-4 border-t border-orange-100">
                    <div 
                      className="text-7xl sm:text-8xl text-right transition-all duration-300 ease-out group-hover:rotate-[15deg] group-hover:scale-[1.35]"
                      style={{ color: accentColor }}
                    >
                      {icon}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
