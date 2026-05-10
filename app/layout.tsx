import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Builder SaaS",
  description: "Manage projects, workers & payments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-100 antialiased">
        <Toaster position="top-right" />
        
        {/* Isme koi extra Sidebar ya Topbar nahi hai */}
        {/* Sirf wahi dikhega jo aapke page.tsx files mein hai */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
