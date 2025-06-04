'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '@/firebase/firebaseClient';
import { signOut, User } from 'firebase/auth';
import { useState, useEffect, useRef } from 'react';
import { Home, BookOpen, UserCircle, LogOut, Shield, LogIn, Menu, Palette } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Playful accent colors - can be cycled or used for different elements
const playfulColors = [
  '#FF6B6B', // Lively Red
  '#4ECDC4', // Aqua
  '#45B7D1', // Sky Blue
  '#FED766', // Sunflower Yellow
  '#FFD166', // Orange Yellow
  '#06D6A0', // Emerald Green
  '#F79256', // Sandy Orange
];

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  // Example: Cycle through playful colors for a dynamic touch, or select one
  const [accentColor, setAccentColor] = useState(playfulColors[0]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Cycle accent color for fun - or remove if too distracting
    const interval = setInterval(() => {
      setAccentColor(prev => playfulColors[(playfulColors.indexOf(prev) + 1) % playfulColors.length]);
    }, 5000); // Change color every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMobileMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current && 
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    // Add class to body when mobile menu is open to prevent scrolling
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
    }

    return () => {
      document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const commonLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/user/chapters', label: 'Chapters', icon: BookOpen },
  ];

  const userRoutes = [
    { href: '/user/profile', label: 'Profile', icon: UserCircle },
  ];

  const adminRoutes = [
    { href: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
      setIsMobileMenuOpen(false); // Close menu on logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const sidebarContent = (
    <>
      {/* User Profile Section */}
      <div className="p-5 border-b border-amber-200" style={{ backgroundColor: `${accentColor}1A`}}> {/* Light accent bg */}
        {user ? (
          <div className="flex items-center space-x-4">
            <div 
              className="relative w-12 h-12 rounded-full overflow-hidden border-2 p-0.5"
              style={{ borderColor: accentColor }}
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  width={44}
                  height={44}
                  className="object-cover rounded-full"
                />
              ) : (
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: accentColor }}
                >
                  {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '😃'}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user.displayName || 'Gita Explorer'}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {user.email}
              </p>
            </div>
          </div>
        ) : (
          <Link
            href="/user/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 font-medium p-2 rounded-lg hover:bg-amber-100 transition-colors duration-200"
          >
            <LogIn className="w-6 h-6" style={{ color: accentColor }}/>
            <span>Sign In / Join the Fun!</span>
          </Link>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5">
        {commonLinks.map((link, idx) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-250 ease-in-out transform hover:scale-[1.03] hover:shadow-md ${
                isActive
                  ? 'text-white shadow-lg'
                  : 'text-gray-700 hover:text-white'
              }`}
              style={{ 
                backgroundColor: isActive ? accentColor : 'transparent',
                // Use a different color from the array for hover if desired
                // For simplicity, using accentColor for active and a generic hover approach
                ...(isActive ? {} : { '--hover-bg-color': playfulColors[(idx + 1) % playfulColors.length] } as React.CSSProperties)
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = e.currentTarget.style.getPropertyValue('--hover-bg-color'); }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}

        {user && (
          <>
            <hr className="my-3 border-amber-200" />
            {userRoutes.map((link, idx) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-250 ease-in-out transform hover:scale-[1.03] hover:shadow-md ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-gray-700 hover:text-white'
                  }`}
                  style={{ 
                    backgroundColor: isActive ? accentColor : 'transparent',
                    ...(isActive ? {} : { '--hover-bg-color': playfulColors[(commonLinks.length + idx + 1) % playfulColors.length] } as React.CSSProperties)
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = e.currentTarget.style.getPropertyValue('--hover-bg-color'); }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Admin section if needed (conditionally render) */}
            {/* Example: if (user.isAdmin) { ... adminRoutes.map ... } */}
            {adminRoutes.map((link, idx) => { // Assuming admin check elsewhere or always show for demo
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-250 ease-in-out transform hover:scale-[1.03] hover:shadow-md ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-gray-700 hover:text-white'
                  }`}
                   style={{ 
                    backgroundColor: isActive ? accentColor : 'transparent',
                    ...(isActive ? {} : { '--hover-bg-color': playfulColors[(commonLinks.length + userRoutes.length + idx + 1) % playfulColors.length] } as React.CSSProperties)
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = e.currentTarget.style.getPropertyValue('--hover-bg-color'); }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            
            <hr className="my-3 border-amber-200" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-100 hover:shadow-md transition-all duration-250 ease-in-out transform hover:scale-[1.03]"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </>
        )}
      </nav>
      
      {/* Optional: Fun Footer Element */}
      <div className="p-4 mt-auto text-center">
        <Palette className="w-8 h-8 mx-auto mb-2" style={{ color: accentColor }} />
        <p className="text-xs text-gray-500">GitaVerse Adventures!</p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button - Updated positioning and z-index */}
      <button
        ref={mobileMenuButtonRef}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-2 hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="Toggle menu"
        style={{ borderColor: accentColor }}
      >
        <Menu className="w-6 h-6" style={{ color: accentColor }} />
      </button>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 w-[280px] xl:w-[320px] bg-amber-50 shadow-lg border-r-4 border-amber-300 z-50`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile backdrop - Improved animation and blur */}
      <div 
        className={`lg:hidden fixed inset-0 z-[40] bg-black/40 backdrop-blur-[2px] transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile sidebar - Updated z-index and animation */}
      <aside
        ref={sidebarRef}
        className={`lg:hidden fixed inset-y-0 left-0 z-[50] w-[280px] bg-amber-50 shadow-2xl transition-all duration-300 ease-in-out flex flex-col border-r-4 border-amber-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Safe area for mobile devices */}
        <div className="pt-20 pb-safe-area-inset-bottom h-screen overflow-y-auto">
          {sidebarContent}
        </div>
      </aside>
    </>
  );
} 