import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header"; // We'll replace this with Sidebar
import Sidebar from "@/components/Sidebar"; 
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitaVerse - Bhagavad Gita Insights",
  description: "Explore the Bhagavad Gita with translations, commentaries, and quizzes. Your modern guide to ancient wisdom.",
  keywords: ["Bhagavad Gita", "Gita", "Hinduism", "Spirituality", "Yoga", "Meditation", "Indian Philosophy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-amber-50/95 text-foreground antialiased">
        <div className="flex flex-1 min-h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 w-full min-h-screen bg-gradient-to-br from-amber-50/90 via-amber-50/95 to-pink-50/90"> 
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-12 xl:px-16 max-w-7xl">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
