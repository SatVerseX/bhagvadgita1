'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-yellow-100 via-red-100 to-pink-100 border-t border-purple-300/50 py-6 px-4">
      <div className="container mx-auto text-center space-y-3">
        <Link 
          href="/" 
          className="inline-flex items-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:scale-105 transition-transform"
        >
          GitaVerse <Sparkles className="w-5 h-5 ml-1 text-yellow-500" />
        </Link>

        <p className="text-purple-800 text-sm">
          Join us on a super fun adventure through the Bhagavad Gita!
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-green-700">
          <span>Crafted with</span>
          <span className="text-red-500 animate-pulse">💖</span>
          <span>and secret coding spells! ✨</span>
        </div>

        <p className="text-blue-700/80 text-xs">
          © {currentYear} GitaVerse. All rights reserved. (Psst! Share the wisdom, it&apos;s for everyone! 🌈)
        </p>
      </div>
    </footer>
  );
} 