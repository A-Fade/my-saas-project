import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script"; // 🔥 Next.js Standard Optimizer imported

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuilderPro | Best Construction Management Software & Labor Attendance App",
  description:
    "Stop using diaries & Excel. BuilderPro helps contractors, builders, and construction companies track multiple sites, manage daily labor attendance, monitor site expenses (kharcha), and handle payments from one simple app.",
  keywords: [
    "construction management software",
    "contractor app India",
    "builder software",
    "labor attendance app",
    "site expense tracker",
    "construction project management",
    "daily wage ledger",
    "site kharcha manager",
    "construction SaaS",
    "digital dihaadi diary"
  ],

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    title: "BuilderPro SaaS",
    description:
      "Construction Management Software for Contractors and Builders.",
    url: "https://builderprosaas.com",
    siteName: "BuilderPro SaaS",
    type: "website",
  },

  metadataBase: new URL("https://builderprosaas.com"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-slate-100">
        
        {/* 🔥 Global Razorpay Script injection layout configuration */}
        <Script 
          src="https://razorpay.com" 
          strategy="beforeInteractive" 
        />

        {children}
        
        {/* Premium Professional Toaster Center Setting */}
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'font-sans font-semibold text-sm',
            style: {
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              color: '#0f172a',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              padding: '16px 24px',
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)',
              maxWidth: '450px',
            },
            success: {
              iconTheme: { primary: '#0f172a', secondary: '#ffffff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#ffffff' },
              style: { border: '1px solid rgba(254, 226, 226, 1)' },
            },
          }}
        />
      </body>
    </html>
  );
}
