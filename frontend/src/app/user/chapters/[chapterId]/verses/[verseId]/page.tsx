// Verse detail page
import { fetchVerse } from '@/lib/rapidapi';
import Link from 'next/link';
import { GitaVerse } from '@/types'; // Assuming this path
import { ChevronLeft, BookOpenText, MessageCircle, Lightbulb, Sparkles, Smile, HelpCircle } from 'lucide-react';

interface Props {
  params: { chapterId: string; verseId: string };
}

// Dummy function to simulate fetching Hindi translation - replace with actual API
// const fetchHindiTranslation = async (text: string): Promise<string> => {
//   console.log(`Fetching translation for (verse detail): ${text.substring(0,30)}...`);
//   await new Promise(resolve => setTimeout(resolve, 50)); // Simulate network delay
//   return `[श्लोक का सरल हिंदी अनुवाद] ${text.substring(0, 60)}... (यह एक नमूना अनुवाद है)`;
// };

export default async function VersePage({ params }: Props) {
  try {
    const chapterNumber = Number(params.chapterId);
    const verseNumber = Number(params.verseId);

    if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > 18 ||
        isNaN(verseNumber) || verseNumber < 1 ) { // Basic validation
      throw new Error('Invalid chapter or verse number');
    }

    const verseData = await fetchVerse(chapterNumber, verseNumber);
    if (!verseData) {
        throw new Error('Verse not found. Maybe it took a day off? 🌴');
    }
    const verse = verseData as GitaVerse;

    // Fetch simple Hindi translation for the main verse text
    // const simpleHindiTranslation = await fetchHindiTranslation(verse.text);

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-orange-50 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 sm:border-4 border-orange-300">
          <Link
            href={`/user/chapters/${chapterNumber}`}
            className="inline-flex items-center text-orange-600 hover:text-red-700 font-medium mb-6 sm:mb-8 group text-sm sm:text-base"
          >
            <ChevronLeft size={22} className="mr-1 sm:mr-1.5 group-hover:-translate-x-1 transition-transform duration-200" />
            अध्याय {chapterNumber} पर वापस
          </Link>

          <header className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block p-2.5 sm:p-3 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full shadow-lg mb-4 sm:mb-5">
              <BookOpenText size={34} className="text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 mb-2 sm:mb-3">
              अध्याय {verse.chapter_number}, श्लोक {verse.verse_number}
            </h1>
          </header>

          {/* Sanskrit Original Shloka */}
          <div className="bg-white/70 p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg border-2 border-yellow-400 mb-6 sm:mb-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-3 sm:mb-4 flex items-center justify-center">
                <Sparkles size={26} className="mr-2 text-yellow-600"/> मूल श्लोक
            </h2>
            <p className="text-slate-700 text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose font-serif" style={{ whiteSpace: 'pre-line' }}>
              {verse.text}
            </p>
          </div>

          {/* Simple Hindi Explanation - REMOVED */}
          {/* 
          <div className="bg-amber-50/80 p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-md border border-amber-300 mb-6 sm:mb-8">
             <h3 className="text-lg sm:text-xl font-semibold text-amber-700 mb-2 sm:mb-3 flex items-center">
                <MessageCircle size={22} className="mr-2 text-amber-600"/> सरल हिंदी में मतलब:
            </h3>
            <p className="text-sm sm:text-base leading-relaxed italic text-slate-600">
                {simpleHindiTranslation}
            </p>
          </div>
          */}

          {/* Translations Section */}
          {verse.translations && verse.translations.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-4 sm:mb-5 text-center flex items-center justify-center">
                <Lightbulb size={26} className="mr-2 sm:mr-3 text-pink-500" /> विभिन्न अनुवाद
              </h2>
              <div className="space-y-4">
                {verse.translations.map((t) => (
                  <div key={t.id} className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border border-pink-200 hover:shadow-pink-300/50 transition-shadow duration-300">
                    <p className="text-sm sm:text-base leading-relaxed mb-1.5 text-slate-700">{t.description}</p>
                    <p className="text-xs text-pink-700 font-medium text-right">
                      — {t.author_name} <span className="text-pink-500">({t.language})</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Commentaries Section */}
          {verse.commentaries && verse.commentaries.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-4 sm:mb-5 text-center flex items-center justify-center">
                <HelpCircle size={26} className="mr-2 sm:mr-3 text-orange-500" /> ज्ञानवर्धक टीकाएँ
              </h2>
              <div className="space-y-4">
                {verse.commentaries.map((c) => (
                  <div key={c.id} className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border border-orange-200 hover:shadow-orange-300/50 transition-shadow duration-300">
                    <p className="text-sm sm:text-base leading-relaxed mb-1.5 text-slate-700">{c.description}</p>
                    <p className="text-xs text-orange-700 font-medium text-right">
                      — {c.author_name} <span className="text-orange-500">({c.language})</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in VersePage:', error);
    const errMessage = error instanceof Error ? error.message : 'An unknown error occurred. Our code ninjas are on it! 🥋';
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-orange-100 flex flex-col items-center justify-center p-4 text-center">
        <Smile size={70} className="text-red-500 mb-5 sm:mb-6 animate-bounce" />
        <h1 className="text-2xl sm:text-3xl font-bold text-red-700 mb-3 sm:mb-4">ओहो! श्लोक खोजने में कोई परेशानी हुई!</h1>
        <p className="text-base sm:text-lg text-orange-600 mb-2">({errMessage})</p>
        <p className="text-sm sm:text-base text-orange-500 mb-6 sm:mb-8">शायद यह श्लोक ध्यान कर रहा है? 🧘 कृपया थोड़ी देर बाद पुनः प्रयास करें।</p>
        <Link
          href="/user/chapters"
          className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-orange-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
        >
          <ChevronLeft size={20} className="mr-1.5 sm:mr-2" />
          सभी अध्यायों पर वापस
        </Link>
      </div>
    );
  }
}
