"use client";

import React, { useState } from 'react';

export default function BuilderProLanding() {
  const [openFaq, setOpenFaq] = useState(-1);

  const features = [
    { title: "Fleet & Worker Tracking", desc: "Monitor real-time workforce allocation and automated daily muster rolls with precision.", icon: "🛠️" },
    { title: "Financial Analytics", desc: "Automated expense tracking and budget management tailored for high-scale construction.", icon: "📈" },
    { title: "Dynamic Reporting", desc: "Generate professional stakeholder reports and progress documentation in one click.", icon: "📋" }
  ];

  const faqData = [
    { q: "Is BuilderPro scalable for large firms?", a: "Yes, our cloud infrastructure is built on Supabase to handle unlimited projects and users seamlessly." },
    { q: "Can I manage payments through the tool?", a: "The tool tracks all site expenses and worker payouts, keeping your ledger perfectly balanced." },
    { q: "Is there a dedicated mobile view?", a: "Absolutely. BuilderPro is built with a mobile-first approach for on-site management." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500">
      
      {/* NAV */}
      <nav className="fixed w-full border-b border-white/10 bg-[#020617]/80 backdrop-blur-xl z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black">B</div>
          <span className="text-xl font-bold tracking-tight">Builder<span className="text-blue-500">Pro</span></span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold transition-all text-sm">
          Launch App
        </button>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-8 tracking-widest uppercase">
            The Future of Construction Management
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            Build Faster. <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Manage Smarter.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            The all-in-one SaaS platform for contractors to track workers, expenses, and project lifecycles in real-time.
          </p>

          {/* DYNAMIC MOCKUP (Using high-quality placeholder) */}
          <div className="relative mt-20 group">
            <div className="rounded-3xl border border-white/10 p-2 bg-white/5 backdrop-blur shadow-2xl">
              <img 
                src="https://unsplash.com" 
                alt="Dashboard" 
                className="rounded-2xl w-full h-auto grayscale-[0.5] group-hover:grayscale-0 transition duration-700"
              />
            </div>
            {/* Mobile View Float */}
            <div className="absolute -bottom-10 -right-4 w-32 md:w-64 rounded-[2.5rem] border border-white/20 p-2 bg-[#020617] shadow-2xl hidden sm:block">
              <img 
                src="https://unsplash.com" 
                alt="Mobile" 
                className="rounded-[2rem] w-full h-auto"
              />
            </div>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-500 group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-blue-600 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-left max-w-md">
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Deploy in <br /> Seconds</h2>
            <p className="text-blue-100 mb-8 font-medium">Just sign up, create your first project, and start tracking immediately. No complex installation required.</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-xl">Get Access</button>
          </div>
          <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
            {[1,2,3].map((step) => (
              <div key={step} className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-4">
                <span className="text-2xl font-black opacity-30">0{step}</span>
                <span className="font-bold">Automated Setup Phase {step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-widest text-blue-500">FAQ</h2>
          <div className="space-y-4">
            {faqData.map((f, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full p-6 text-left font-bold flex justify-between items-center hover:bg-white/10 transition-all"
                >
                  <span>{f.q}</span>
                  <span className={`text-blue-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-slate-400 text-sm border-t border-white/5 bg-white/5">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/10 px-6 text-center">
        <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">BuilderPro Global Operations © 2024</p>
      </footer>

    </div>
  );
}
