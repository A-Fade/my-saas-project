"use client";
import Link from "next/link";
import { 
  LayoutGrid, ArrowRight, CheckCircle2, ShieldCheck, 
  Zap, Users, BarChart3, Wallet, MessageCircle, ChevronDown 
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <LayoutGrid size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Builder<span className="text-slate-500 font-medium">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900">Log in</Link>
            <Link href="/signup" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-bold mb-6 border border-indigo-100">
            <Zap size={14} /> NEW: AUTOMATIC LABOR CALCULATIONS LIVE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Manage Construction <br /> <span className="text-slate-400 font-medium">Without the Chaos.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            The all-in-one professional system to track projects, workers, payments and materials in real-time. Built for serious builders.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
              Start Your Free Trial <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#preview" className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-lg text-slate-600 hover:bg-slate-100 transition-all">
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* --- DASHBOARD PREVIEW --- */}
      <section id="preview" className="px-6 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] p-4 shadow-2xl border border-slate-200 ring-1 ring-slate-100 relative overflow-hidden">
          {/* Mockup Dashboard Header */}
          <div className="bg-slate-50 rounded-t-3xl border-b border-slate-200 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
              <div className="h-6 w-32 bg-slate-200 rounded-lg"></div>
            </div>
            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
          </div>
          {/* Mockup Body */}
          <div className="grid grid-cols-4 gap-4 p-8 bg-white">
            <div className="col-span-1 h-32 bg-indigo-50 border border-indigo-100 rounded-3xl p-6">
              <div className="h-4 w-12 bg-indigo-200 rounded mb-4"></div>
              <div className="h-8 w-20 bg-indigo-900 rounded-lg"></div>
            </div>
            <div className="col-span-1 h-32 bg-emerald-50 border border-emerald-100 rounded-3xl p-6">
              <div className="h-4 w-12 bg-emerald-200 rounded mb-4"></div>
              <div className="h-8 w-24 bg-emerald-900 rounded-lg"></div>
            </div>
            <div className="col-span-2 h-32 bg-slate-50 border border-slate-100 rounded-3xl"></div>
            <div className="col-span-3 h-64 bg-slate-50 border border-slate-100 rounded-[2rem]"></div>
            <div className="col-span-1 h-64 bg-slate-900 rounded-[2rem]"></div>
          </div>
          {/* Floating Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-xl border border-white font-bold flex items-center gap-3">
             <ShieldCheck className="text-emerald-600" /> Professional Dashboard Interface
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Everything you need to scale</h2>
            <p className="text-slate-500 font-medium">Built for small contractors to large enterprises</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<Users className="text-indigo-600" />} 
              title="Labor Management" 
              desc="Daily attendance tracking with automatic per-day salary calculations and digital records."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-blue-600" />} 
              title="Project Analytics" 
              desc="Real-time profit & loss tracking. See exactly how much you spend on materials vs labor."
            />
            <FeatureCard 
              icon={<Wallet className="text-emerald-600" />} 
              title="Budget Control" 
              desc="Lock project budgets and get notified when you're nearing your expenditure limits."
            />
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Three steps to clarity.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <span className="text-6xl font-black text-white/10 italic">01</span>
              <h3 className="text-xl font-bold">Register Projects</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Add your sites and set your initial budgets. One account handles unlimited locations.</p>
            </div>
            <div className="space-y-4">
              <span className="text-6xl font-black text-white/10 italic">02</span>
              <h3 className="text-xl font-bold">Log Daily Work</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Mark worker attendance and material spends on your phone. System updates instantly.</p>
            </div>
            <div className="space-y-4">
              <span className="text-6xl font-black text-white/10 italic">03</span>
              <h3 className="text-xl font-bold">Automated Reports</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Let BuilderPro calculate your daily totals and net profit. Download summaries anytime.</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -mt-40 -mr-20"></div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqItem 
              id={1} active={activeFaq} toggle={setActiveFaq} 
              q="Is my project data secure?" 
              a="Yes, BuilderPro uses Supabase Enterprise security. Each user can only access their private project data." 
            />
            <FaqItem 
              id={2} active={activeFaq} toggle={setActiveFaq} 
              q="Does it work on mobile?" 
              a="BuilderPro is designed for site use. It works perfectly on any mobile browser or tablet." 
            />
            <FaqItem 
              id={3} active={activeFaq} toggle={setActiveFaq} 
              q="Can I manage multiple sites?" 
              a="Absolutely. You can add unlimited projects and assign different workers to each site." 
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <LayoutGrid size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold">BuilderPro</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs font-medium">The modern standard for construction project management and worker tracking.</p>
          </div>
          <div className="flex gap-20">
            <div className="space-y-4">
              <p className="font-bold text-xs uppercase tracking-widest text-slate-400">Company</p>
              <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-600">
                <Link href="/login">Login</Link>
                <Link href="/signup">Sign up</Link>
                <Link href="#faq">Support</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-200 text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
          &copy; 2024 BuilderPro SaaS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-[2rem] bg-white border border-slate-200 hover:shadow-xl transition-all">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function FaqItem({ id, active, toggle, q, a }: any) {
  const isOpen = active === id;
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggle(isOpen ? null : id)} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors">
        <span className="font-bold text-slate-800">{q}</span>
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="p-6 pt-0 text-slate-500 font-medium leading-relaxed">{a}</div>}
    </div>
  );
}
