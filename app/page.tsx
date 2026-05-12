"use client";
import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Wallet, 
  BarChart3, 
  ShieldCheck, 
  Zap,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const features = [
    {
      title: "Project Tracking",
      desc: "Monitor multiple construction sites with real-time status updates and location tracking.",
      icon: <Briefcase className="text-slate-900" size={24} />
    },
    {
      title: "Staff Management",
      desc: "Onboard workers, set daily rates, and assign them to specific projects effortlessly.",
      icon: <Users className="text-slate-900" size={24} />
    },
    {
      title: "Payment Ledger",
      desc: "Record every transaction, track total payouts, and maintain transparent labor history.",
      icon: <Wallet className="text-slate-900" size={24} />
    }
  ];

  const faqs = [
    { q: "Is this tool suitable for small contractors?", a: "Yes, it's specifically designed to help small to medium contractors manage sites without complex paperwork." },
    { q: "Can I manage multiple sites at once?", a: "Absolutely. You can create unlimited projects and assign workers to them individually." },
    { q: "Is my data secure?", a: "We use enterprise-grade Supabase encryption to ensure your financial and project data stays private." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rotate-45" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">BuildFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest text-slate-500">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
            <Link href="/login" className="bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-all">Get Started</Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full mb-6">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Professional Site Management</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
            Build Faster. <span className="text-slate-400">Manage Smarter.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 max-w-2xl mx-auto">
            The all-in-one platform for contractors to track projects, manage labor, and handle payments without the headache of spreadsheets.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full md:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-slate-200">
              Start Free Trial <ArrowRight size={20} />
            </Link>
            <Link href="#features" className="w-full md:w-auto px-10 py-5 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all text-slate-600">
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-200 hover:border-slate-400 transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How it Works</h2>
            <p className="text-slate-500 font-medium">Three simple steps to digitize your construction business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {[
              { step: "01", title: "Add Project", desc: "Enter your site location and set your working budget." },
              { step: "02", title: "Onboard Labor", desc: "Add your workers and assign them to active sites." },
              { step: "03", title: "Record Payouts", desc: "Manage daily payments and track expenses automatically." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <span className="text-7xl font-black text-slate-100 absolute -top-10 left-1/2 -translate-x-1/2 -z-10">{step.step}</span>
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-slate-500 text-sm font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-800 pb-6">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  {faq.q}
                </h4>
                <p className="text-slate-400 font-medium pl-4">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-white rotate-45" />
            </div>
            <span className="font-black uppercase tracking-tighter">BuildFlow</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2024 BuildFlow Systems. All rights reserved.</p>
          <div className="flex gap-6 text-xs font-bold uppercase text-slate-500">
            <Link href="/login" className="hover:text-slate-900">Login</Link>
            <Link href="/login" className="hover:text-slate-900">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
