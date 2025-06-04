'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchChapterDetails, fetchChapterVerses } from '@/lib/rapidapi';
import { GitaChapter, GitaVerse } from '@/types';
import { BookOpen, Loader2, MessageSquareText, ArrowRight, Sparkles, MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';

export default function ChapterDetailPage() {
  const params = useParams();
  const chapterNumber = parseInt(params.chapterNumber as string);
  
  const [chapter, setChapter] = useState<GitaChapter | null>(null);
  const [verses, setVerses] = useState<GitaVerse[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChapterData() {
      try {
        setLoading(true);
        const [chapterData, versesData] = await Promise.all([
          fetchChapterDetails(chapterNumber),
          fetchChapterVerses(chapterNumber)
        ]);
        setChapter(chapterData);
        setVerses(versesData);
      } catch (err) {
        console.error('Error fetching chapter data:', err);
        setError('अध्याय की जानकारी लोड करने में असमर्थ। कृपया बाद में पुनः प्रयास करें।');
      } finally {
        setLoading(false);
      }
    }

    if (!isNaN(chapterNumber)) {
      loadChapterData();
    } else {
      setError('अमान्य अध्याय संख्या');
      setLoading(false);
    }
  }, [chapterNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-xl text-amber-800 font-baloo">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white border border-red-300 rounded-xl p-8 max-w-md mx-auto shadow-xl text-center">
          <BookOpen className="mx-auto h-16 w-16 text-red-500 mb-6" />
          <h2 className="text-red-700 text-2xl font-bold mb-3">ओह! कुछ गड़बड़ है</h2>
          <p className="text-red-600 mb-8">{error}</p>
          <Link 
            href="/user/chapters"
            className="inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            सभी अध्याय देखें
          </Link>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-amber-300 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Chapter Header - Enhanced with Baloo font and playful colors */}
        <header className="text-center mb-12 relative isolate">
          {/* Decorative Blobs - just for fun, can be removed or improved */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-300/50 rounded-full filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-teal-300/50 rounded-full filter blur-xl opacity-70 animate-pulse delay-2000"></div>
          
          <h1 className="font-baloo text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 mb-3">
            अध्याय {chapter.chapter_number}
          </h1>
          <h2 className="font-baloo text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 mb-4">
            {chapter.name_translated || chapter.name}
          </h2>
          <h3 className="font-baloo text-xl text-gray-700 mb-6">
            {chapter.name_transliterated}
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {chapter.chapter_summary}
          </p>

          {/* Placeholder for Chapter Illustration */}
          <div className="my-8 p-4 bg-green-100/70 border-2 border-dashed border-green-400 rounded-xl text-center">
            <Sparkles className="w-10 h-10 text-green-600 mx-auto mb-2 animate-bounce" />
            <p className="font-baloo text-green-700 font-semibold text-lg">यहाँ अध्याय का चित्र डालें!</p>
            <p className="text-sm text-green-600">(Friendly mascot or chapter-specific illustration)</p>
          </div>
        </header>

        {/* Placeholder for "Fun Fact about this Chapter" */}
        <div className="mb-12 p-4 bg-sky-100/70 border-2 border-dashed border-sky-400 rounded-xl flex items-start space-x-3">
          <MessageCircleQuestion className="w-10 h-10 text-sky-600 flex-shrink-0 animate-ping once" />
          <div>
            <h3 className="font-baloo text-xl font-semibold text-sky-700">इस अध्याय का मजेदार तथ्य!</h3>
            <p className="text-sm text-sky-600 mt-1">
              (जैसे: "इस अध्याय में अर्जुन पहली बार अपनी दुविधा व्यक्त करते हैं!")
            </p>
          </div>
        </div>

        {/* Verses List - Enhanced Cards */}
        <div className="space-y-10">
          {verses.map((verse) => (
            <div 
              key={verse.id}
              className="relative bg-yellow-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-orange-400 hover:border-red-500 transform hover:scale-[1.02]"
            >
              {/* More playful ID Badge */}
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm font-baloo font-semibold px-3 py-1.5 rounded-full shadow-md transform -rotate-6">
                ID: {verse.id}
              </div>

              {/* Shlok number - Enhanced with Baloo font */}
              <h4 className="font-baloo text-2xl sm:text-3xl font-bold text-orange-700 mb-4">
                श्लोक {verse.verse_number}
              </h4>
              <div className="space-y-4">
                <p className="text-lg font-medium text-amber-900">{verse.text}</p>
                <p className="text-gray-700 italic">{verse.transliteration}</p>
                <p className="text-sm text-gray-600">{verse.word_meanings}</p>

                {verse.simple_hindi_explanation && (
                  <div className="mt-5 pt-4 border-t-2 border-dashed border-amber-400">
                    <h5 className="font-baloo text-lg font-semibold text-amber-700 mb-2 flex items-center">
                      <MessageSquareText className="w-6 h-6 mr-2 text-amber-600 animate-pulse" />
                      सरल शब्दों में (Simple Hindi):
                    </h5>
                    <p className="text-gray-600 italic text-base leading-relaxed">{verse.simple_hindi_explanation}</p>
                  </div>
                )}
              </div>

              {/* Know More Link - Enhanced */}
              <div className="mt-6 text-right">
                <Link
                  href={`/user/chapters/${chapterNumber}/verses/${verse.verse_number}`}
                  className="inline-flex items-center text-red-600 hover:text-red-800 font-baloo font-semibold text-lg group transition-all duration-200 hover:bg-red-100 px-4 py-2 rounded-lg"
                >
                  और जानो
                  {/* Pulsing arrow on group hover */}
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:animate-ping once" /> 
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/user/chapters"
            className="inline-flex items-center px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-all duration-200"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            सभी अध्याय देखें
          </Link>
        </div>
      </div>
    </div>
  );
} 