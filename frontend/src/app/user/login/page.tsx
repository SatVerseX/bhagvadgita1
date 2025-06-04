// User login/signup
'use client';

import { useState } from 'react';
import { auth, googleProvider } from '@/firebase/firebaseClient';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Smile, Zap, Feather } from 'lucide-react'; // Playful icons
import Image from 'next/image';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password.length < 6) {
      setError('Password needs to be a bit longer, at least 6 characters! 🐢');
      setIsLoading(false);
      return;
    }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/user/chapters');
    } catch (err: unknown) {
      console.error('Auth error:', err);
      if (err instanceof Error) {
        const errorWithCode = err as { code?: string };
        const errorCode = errorWithCode.code; // Access code property after type assertion
        // More playful error messages
        if (errorCode === 'auth/email-already-in-use') {
          setError('Oops! This email is already a superstar here. Try logging in! ✨');
        } else if (errorCode === 'auth/invalid-email') {
          setError('Hmm, that email looks a bit funny. Can you double-check it? 🤔');
        } else if (errorCode === 'auth/weak-password') {
          setError('Make your password stronger! Like a superhero! 💪 (min. 6 chars)');
        } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
          setError('Email or Password not matching our records. Give it another go! 🧐');
        } else if (errorCode === 'auth/network-request-failed') {
          setError('Network gremlins! 👾 Check your internet and try again.');
        } else if (errorCode === 'auth/too-many-requests') {
          setError('Wooah there, speedy! Too many tries. Please wait a bit. 🧘');
        } else {
          setError('Uh oh! Something went sideways. Try again in a jiffy! 🌪️');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200 via-red-200 to-pink-200 flex flex-col justify-center items-center p-4 overflow-hidden">
      {/* Playful decorative elements */}
      <Feather className="absolute top-10 left-10 w-16 h-16 text-white opacity-30 transform -rotate-12 animate-bounce" />
      <Zap className="absolute bottom-10 right-10 w-20 h-20 text-yellow-300 opacity-40 transform rotate-12 animate-ping delay-1000" />
      
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:shadow-purple-300/50 duration-300 relative">
        <Smile className="absolute -top-5 -left-5 w-12 h-12 text-yellow-400 bg-white p-2 rounded-full shadow-lg transform rotate-[-15deg]" />
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-700 mb-8">
          {isSignup ? 'Join the Fun! 🎉' : 'Welcome Back! 👋'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-600 block mb-1.5">
              Your Awesome Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="super.gita.fan@example.com"
              className="w-full px-4 py-3 border border-amber-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors duration-300 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-600 block mb-1.5">
              Secret Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your super secret code"
              className="w-full px-4 py-3 border border-amber-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors duration-300 placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg text-center shadow-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3.5 rounded-lg font-semibold text-lg shadow-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 disabled:opacity-60 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? 'Hang Tight... ⏳' : (isSignup ? 'Let\'s Go! 🚀' : 'Sign In ✨')}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 font-medium rounded-full">Or even easier...</span>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              try {
                setIsLoading(true);
                await signInWithPopup(auth, googleProvider);
                router.push('/user/chapters');
              } catch (err: unknown) {
                console.error('Google auth error:', err);
                if (err instanceof Error) {
                  const errorWithCode = err as { code?: string };
                  if (errorWithCode.code) {
                    setError('Google Sign-In hiccup! 🤧 Try again or the other way.');
                  } else {
                    setError('An unexpected error occurred.');
                  }
                } else {
                  setError('An unexpected error occurred.');
                }
              } finally {
                setIsLoading(false);
              }
            }}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-red-300 text-gray-700 py-3 rounded-lg font-semibold shadow-md hover:bg-red-50 hover:border-red-400 transition-all duration-300 disabled:opacity-60 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-1"
            disabled={isLoading}
          >
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
            Continue with Google
          </button>

          <p className="text-center mt-5 text-sm text-gray-600">
            {isSignup ? 'Already a Gita Pal?' : "New to the Adventure?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError(''); // Clear error on toggle
              }}
              className="text-orange-500 hover:text-pink-600 font-bold hover:underline focus:outline-none"
            >
              {isSignup ? 'Sign In Here!' : 'Sign Up Now!'}
            </button>
          </p>
        </form>
      </div>
      <p className="mt-10 text-center text-white text-base font-medium drop-shadow-md">
        🌟 Uncover ancient wisdom, one click at a time! 🌟
      </p>
    </div>
  );
}
