import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header"; // We'll replace this with Sidebar
import Sidebar from "@/components/Sidebar"; 
import Footer from "@/components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baloo = Baloo_2({
  subsets: ["latin", "devanagari"], // Added devanagari for Hindi support
  variable: "--font-baloo",
  weight: ["400", "500", "600", "700", "800"], // Specify weights if needed
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
    <html lang="en" className={`${inter.variable} ${baloo.variable} h-full`}>
      <body className="font-sans antialiased flex flex-col min-h-screen bg-amber-50">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-y-auto lg:ml-[280px] xl:ml-[320px]">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
