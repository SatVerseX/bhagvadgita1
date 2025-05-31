// Chapter detail with verses list
import { fetchChapterVerses, fetchChapters } from '@/lib/rapidapi';
import Link from 'next/link';
import { GitaChapter, GitaVerse } from '@/types'; // Assuming types are here
import { BookText, ChevronLeft, Smile, MessageSquare, Sparkles, Sun, ChevronRight } from 'lucide-react';

interface Props {
  params: { chapterId: string };
}

// Helper to get a playful gradient
const getPlayfulGradient = (color1: string, color2: string) => {
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};

// Dummy function to simulate fetching Hindi translation - replace with actual API
const fetchHindiTranslation = async (text: string): Promise<string> => {
  // In a real app, this would call a translation service
  console.log(`Fetching translation for: ${text.substring(0,30)}...`);
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate network delay
  return `[सरल हिंदी अनुवाद] ${text.substring(0, 50)}... (यह एक नमूना अनुवाद है)`;
};

export default async function ChapterDetailPage({ params }: Props) {
  try {
    if (!params?.chapterId) {
      throw new Error('Chapter ID is required');
    }

    const chapterNumber = Number(params.chapterId);

    if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > 18) { // Assuming 18 chapters
      throw new Error('Invalid chapter number');
    }

    // Fetch data in parallel
    const [chaptersData, versesData] = await Promise.all([
      fetchChapters(),
      fetchChapterVerses(chapterNumber)
    ]);
    
    const chapters = chaptersData as GitaChapter[];
    const verses = versesData as GitaVerse[];


    const chapter = chapters.find((c) => c.chapter_number === chapterNumber);

    if (!chapter) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-amber-100 flex flex-col items-center justify-center p-6 text-center">
          <Smile size={80} className="text-red-500 mb-6 animate-bounce" />
          <h1 className="text-3xl font-bold text-red-700 mb-4">अरे! अध्याय नहीं मिला</h1>
          <p className="text-orange-600 mb-8 text-lg">लगता है यह अध्याय छुट्टी पर गया है! 🏖️</p>
          <Link
            href="/user/chapters"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
          >
            <ChevronLeft size={22} className="mr-2" />
            सभी अध्यायों पर वापस जाएं
          </Link>
        </div>
      );
    }
    
    // Fetch translations for all verses (consider performance for many verses)
    const versesWithTranslations = await Promise.all(
      verses.map(async (verse) => ({
        ...verse,
        hindi_translation: await fetchHindiTranslation(verse.text) 
      }))
    );


    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-pink-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border-4 border-amber-300">
          <Link
            href="/user/chapters"
            className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium mb-6 sm:mb-8 group text-base sm:text-lg"
          >
            <ChevronLeft size={24} className="mr-1.5 group-hover:-translate-x-1 transition-transform duration-200" />
            सभी प्यारे अध्याय
          </Link>

          <header className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-block p-3 sm:p-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full shadow-lg mb-4 sm:mb-6">
              <BookText size={40} className="text-white sm:w-12 sm:h-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 mb-2 sm:mb-3">
              {chapter.name_translated} - अध्याय {chapter.chapter_number}
            </h1>
            <p className="text-lg sm:text-xl text-amber-700 font-medium">{chapter.name_transliterated}</p>
            <p className="text-base sm:text-lg text-slate-600 mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
              <Sparkles size={20} className="inline-block text-yellow-500 mr-1.5 mb-0.5" />
              {chapter.chapter_summary}
              <Sparkles size={20} className="inline-block text-pink-500 ml-1.5 mb-0.5" />
            </p>
          </header>

          <div className="mt-8 sm:mt-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-700 mb-6 sm:mb-8 text-center">
              <Sun size={36} className="inline-block text-yellow-400 mr-3 mb-1 animate-spin-slow" />
              ज्ञान के मोती (श्लोक)
              <Sun size={36} className="inline-block text-yellow-400 ml-3 mb-1 animate-spin-slow" />
            </h2>
            <ul className="space-y-6 sm:space-y-8">
              {versesWithTranslations.map((verse, index) => (
                <li
                  key={verse.id}
                  className="bg-white/70 p-5 sm:p-6 rounded-2xl shadow-lg border-2 border-amber-200 hover:shadow-xl hover:border-amber-400 transition-all duration-300 group"
                  style={{
                    borderLeftColor: index % 2 === 0 ? '#FF9500' : '#FFCC00', // Alternating accent border
                    borderLeftWidth: '6px'
                  }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <Link href={`/user/chapters/${chapterNumber}/verses/${verse.verse_number}`}>
                      <h3 
                        className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 from-amber-600 to-orange-500 transition-all duration-300"
                      >
                        श्लोक {verse.verse_number}
                      </h3>
                    </Link>
                    <span className="text-xs font-medium text-amber-600 bg-amber-100/70 px-2.5 py-1 rounded-full">
                      ID: {verse.id}
                    </span>
                  </div>
                  
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                    {verse.text}
                  </p>
                  
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-amber-200/70">
                    <h4 className="text-sm sm:text-base font-semibold text-pink-600 mb-1.5 sm:mb-2 flex items-center">
                      <MessageSquare size={18} className="mr-2 text-pink-500" />
                      सरल शब्दों में (Simple Hindi):
                    </h4>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic">
                      {verse.hindi_translation || "अनुवाद लोड हो रहा है..."}
                    </p>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <Link 
                      href={`/user/chapters/${chapterNumber}/verses/${verse.verse_number}`} 
                      className="inline-flex items-center text-sm text-orange-500 hover:text-red-500 font-semibold group/link"
                    >
                      और जानो <ChevronRight size={18} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in ChapterDetailPage:', error);
    const errMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-amber-100 flex flex-col items-center justify-center p-6 text-center">
        <Smile size={80} className="text-red-500 mb-6 animate-ping" />
        <h1 className="text-3xl font-bold text-red-700 mb-4">ओहो! कुछ गड़बड़ हो गयी!</h1>
        <p className="text-orange-600 mb-2 text-lg">({errMessage})</p>
        <p className="text-orange-500 mb-8 text-base">चिंता न करें, हमारी तकनीकी बंदर सेना इसे ठीक कर रही है! 🐒🔧</p>
        <Link
          href="/user/chapters"
          className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
        >
          <ChevronLeft size={22} className="mr-2" />
          अध्यायों पर वापस जाएं
        </Link>
      </div>
    );
  }
}
