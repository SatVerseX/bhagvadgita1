'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebaseClient';
import { User } from 'firebase/auth';
import Image from 'next/image';
import { MailCheck, MailWarning, CalendarHeart, ShieldCheck, LogIn, Sparkles, UserCircle2 } from 'lucide-react'; // Fun icons

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/user/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100/80 via-pink-50/80 to-orange-100/80">
        <div className="animate-bounce">
          <Sparkles className="w-16 h-16 text-amber-500" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Or a message indicating user not found / redirecting
  }

  const creationDate = user.metadata.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'A mystical date';

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100/80 via-pink-50/80 to-orange-100/80">
      <div className="min-h-screen bg-white/90 backdrop-blur-sm">
        {/* Playful Header Banner */}
        <div className="relative h-52 sm:h-64 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
          <Sparkles className="absolute top-6 left-6 w-12 h-12 text-white/70 opacity-70 animate-pulse" />
          <Sparkles className="absolute bottom-6 right-6 w-12 h-12 text-white/70 opacity-70 animate-pulse delay-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <UserCircle2 className="w-24 h-24 sm:w-32 sm:h-32 text-white/80" />
          </div>
        </div>

        {/* Profile Image - centered and overlapping banner */}
        <div className="relative -mt-20 sm:-mt-24 flex justify-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-8 border-amber-50 shadow-2xl bg-amber-100 group transform hover:scale-105 transition-transform duration-300">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || 'Profile picture'}
                width={176}
                height={176}
                className="object-cover group-hover:rotate-3 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-200 to-pink-200 flex items-center justify-center">
                <span className="text-6xl font-bold text-amber-600">
                  {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '🌟'}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 sm:px-6 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-6">
            {user.displayName || 'Gita Explorer'} <span className="text-2xl">👋</span>
          </h1>
          <p className="text-amber-700 mt-2 text-sm sm:text-base">{user.email}</p>
          
          <div className="mt-12 space-y-6 sm:space-y-8">
            {/* Email Status Card */}
            <div className="bg-gradient-to-r from-amber-50/90 to-orange-50/90 p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-amber-400 flex items-center space-x-4 hover:shadow-xl transition-shadow mx-4 sm:mx-8">
              {user.emailVerified ? (
                <MailCheck className="w-10 h-10 text-green-500 flex-shrink-0" />
              ) : (
                <MailWarning className="w-10 h-10 text-orange-500 flex-shrink-0" />
              )}
              <div className="text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-amber-700">Email Journey</h2>
                <p className="mt-1 text-base text-slate-600">
                  {user.emailVerified ? (
                    <span className="text-green-700 font-medium">Woohoo! Your email is verified.</span>
                  ) : (
                    <span className="text-orange-700 font-medium">Psst! Your email is waiting for verification.</span>
                  )}
                </p>
              </div>
            </div>

            {/* Birthday Card */}
            <div className="bg-gradient-to-r from-pink-50/90 to-rose-50/90 p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-pink-400 flex items-center space-x-4 hover:shadow-xl transition-shadow mx-4 sm:mx-8">
              <CalendarHeart className="w-10 h-10 text-pink-500 flex-shrink-0" />
              <div className="text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-pink-700">GitaVerse Birthday</h2>
                <p className="mt-1 text-base text-slate-600">Joined us on: {creationDate}</p>
              </div>
            </div>
          </div>

          {/* Login Methods Section */}
          <div className="mt-12 space-y-4 px-4 sm:px-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-700 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-purple-500 mr-2"/>Login Methods
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              {user.providerData.map((provider) => (
                <div
                  key={provider.providerId}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 rounded-full text-base font-medium text-purple-700 shadow-md flex items-center space-x-2 transform hover:scale-105 transition-transform duration-200"
                >
                  <LogIn className="w-5 h-5" />
                  <span>
                    {provider.providerId === 'google.com' ? 'Google Magic' : 
                     provider.providerId === 'password' ? 'Secret Scroll (Email)' : 
                     provider.providerId}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-16 mb-8 text-base text-amber-600 italic px-4">
            Keep exploring, keep smiling, and may your wisdom shine! ✨
          </p>
        </div>
      </div>
    </div>
  );
}
