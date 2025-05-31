'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-amber-50/90 via-pink-50/90 to-amber-50/90 border-t border-amber-200/50 py-6 px-4">
      <div className="container mx-auto text-center space-y-3">
        <Link 
          href="/" 
          className="inline-flex items-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:scale-105 transition-transform"
        >
          GitaVerse <Sparkles className="w-5 h-5 ml-1 text-amber-500" />
        </Link>

        <p className="text-amber-800 text-sm">
          Exploring the timeless wisdom of the Bhagavad Gita... with a sprinkle of fun!
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-amber-700">
          <span>Crafted with</span>
          <span className="text-red-500 animate-pulse">❤️</span>
          <span>and a dash of code magic!</span>
        </div>

        <p className="text-xs text-amber-600/80">
          © {currentYear} GitaVerse. All rights reserved. (But wisdom is for everyone!)
        </p>
      </div>
    </footer>
  );
} 