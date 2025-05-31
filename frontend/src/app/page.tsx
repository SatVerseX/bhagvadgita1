'use client';

import Link from 'next/link';
import Image from 'next/image'; 
import { BookOpen, PlayCircle, Sparkles, Heart, Sun } from 'lucide-react'; // Added fun icons

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-red-100 to-pink-100 p-4 sm:p-8 text-center overflow-hidden relative">
      
      {/* Fun Decorative Shapes - More playful */}
      <Sparkles className="absolute top-10 left-20 w-24 h-24 text-yellow-300 opacity-50 animate-ping" />
      <Heart className="absolute bottom-16 right-16 w-20 h-20 text-pink-300 opacity-60 animate-pulse animation-delay-2000" />
      <Sun className="absolute top-1/2 left-1/4 w-16 h-16 text-orange-300 opacity-40 animate-spin-slow" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2 filter blur-2xl animate-pulse-slow animation-delay-4000"></div>
      <div className="absolute bottom-5 left-5 w-40 h-40 bg-green-200 rounded-full opacity-30 translate-x-1/2 translate-y-1/2 filter blur-2xl animate-pulse-slow animation-delay-2000"></div>

      <main className="relative z-10 max-w-4xl mx-auto">
        <div 
          className="mb-8 md:mb-12 w-full max-w-lg mx-auto aspect-video rounded-3xl shadow-2xl overflow-hidden border-8 border-white hover:shadow-purple-300/60 transition-all duration-300 group hover:scale-105"
        >
          <Image
            src="/Studio_Ghibli_style_illustration_of_Lord_Krishna_g-1748610153219.png"
            alt="श्री कृष्ण - एक प्यारी चित्रकला शैली में"
            width={1280}
            height={720}
            className="object-cover w-full h-full transform group-hover:rotate-1 transition-transform duration-300"
            priority
          />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
            श्रीमद्भगवद्गीता
          </span>
          <span className="block text-2xl sm:text-3xl text-gray-700 mt-2 font-semibold">
             ज्ञान का मजेदार सफर! ✨
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          आओ, कुरुक्षेत्र के मैदान से जीवन के रहस्य, धर्म, और आत्म-ज्ञान की अद्भुत कहानियाँ सुनें!
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-5 sm:space-y-0 sm:space-x-6">
          <Link 
            href="/user/chapters"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-xl hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transform hover:scale-110 transition-all duration-200 ease-in-out group"
          >
            <BookOpen className="w-6 h-6 mr-3 transform group-hover:rotate-[-5deg] transition-transform" />
            Read Chapters
          </Link>
          <Link 
            href="/user/quiz" 
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-orange-600 bg-white border-2 border-orange-500 rounded-xl shadow-lg hover:bg-orange-50 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transform hover:scale-110 transition-all duration-200 ease-in-out group"
          >
            <PlayCircle className="w-6 h-6 mr-3 transform group-hover:rotate-[5deg] transition-transform" />
            Test Your Knowledge (Quiz)
          </Link>
        </div>
      </main>

      <footer className="relative z-10 mt-16 text-center">
        <p className="text-md text-gray-500 italic font-medium">
          "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।" <Sparkles className="inline w-4 h-4 text-yellow-500 -mt-1" />
        </p>
      </footer>
    </div>
  );
}

// Add this to your globals.css or a style tag if not already present for animation delay
/*
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulse-slow 8s infinite ease-in-out;
}
.animation-delay-2000 {
  animation-delay: -2s; 
}
.animation-delay-4000 {
  animation-delay: -4s;
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
*/
