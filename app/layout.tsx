import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";

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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-gray-100">

        <Toaster position="top-right" />

        <div className="flex min-h-screen">

          {/* DESKTOP SIDEBAR */}
          <div className="hidden md:block fixed left-0 top-0 h-screen w-64 z-40">
            <Sidebar />
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 md:ml-64">

            {/* MOBILE TOPBAR */}
            <div className="md:hidden sticky top-0 z-50">
              <Topbar />
            </div>

            {children}

          </div>

        </div>

      </body>
    </html>
  );
}