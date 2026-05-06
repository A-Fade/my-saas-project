import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="h-full flex bg-gray-100">

        {/* SIDEBAR (FIXED WIDTH) */}
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 md:ml-0 overflow-y-auto h-screen">
          <Toaster position="top-right" />
          <div className="p-4 md:p-6">
            {children}
          </div>
        </div>

      </body>
    </html>
  );
}