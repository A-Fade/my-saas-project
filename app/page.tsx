"use client";

import React, { useState } from 'react';

export default function BuilderProLanding() {
  const [openIndex, setOpenIndex] = useState(-1);

  const faqData = [
    { q: "BuilderPro use karne ke liye kya fees hai?", a: "Humara starter plan contractors ke liye free hai." },
    { q: "Kya mera data safe hai?", a: "Ji haan, hum Supabase ka secure database use karte hain." },
    { q: "Mobile par kaise chalega?", a: "Aap browser mein login karein, yeh automatically mobile ke hisab se set ho jata hai." }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200 h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 text-white p-1.5 rounded-lg font-bold">BP</div>
          <span className="text-xl font-bold tracking-tighter">Builder<span className="text-blue-700 font-black">Pro</span></span>
        </div>
        <button className="bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-200">
          Get Started
        </button>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
            Construction <br/>
            <span className="text-blue-700 italic font-black">Smart Management</span>
          </h1>
          <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Project, Workers aur Payments ka pura hisab ab aapki ungliyon par. 
            Builder ke liye banaya gaya sabse simple tool.
          </p>

          {/* DASHBOARD PREVIEW */}
          <div className="relative mt-12 max-w-5xl mx-auto">
            <div className="rounded-3xl shadow-2xl border-[10px] border-slate-900 bg-white overflow-hidden aspect-video">
              <img 
                src="/desktop-preview.png" 
                alt="Desktop Dashboard" 
                className="w-full h-full object-cover"
                // FIXED: Direct inline logic to avoid "unused variable" red lines
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://placeholder.com";
                }} 
              />
            </div>
            <div className="absolute -bottom-10 -right-4 w-32 md:w-60 aspect-[9/19] bg-white rounded-[2.5rem] border-[6px] border-slate-900 shadow-2xl overflow-hidden hidden sm:block">
              <img 
                src="/mobile-preview.png" 
                alt="Mobile View" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://placeholder.com";
                }} 
              />
            </div>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-blue-700 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-widest">Process</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl mb-4 font-black opacity-40">01</div>
              <h3 className="text-xl font-bold mb-2">Register</h3>
              <p className="text-blue-100 text-sm">Secure login karke apna builder profile setup karein.</p>
            </div>
            <div>
              <div className="text-5xl mb-4 font-black opacity-40">02</div>
              <h3 className="text-xl font-bold mb-2">Data Entry</h3>
              <p className="text-blue-100 text-sm">Projects aur workers ki details ek hi baar add karein.</p>
            </div>
            <div>
              <div className="text-5xl mb-4 font-black opacity-40">03</div>
              <h3 className="text-xl font-bold mb-2">Monitor</h3>
              <p className="text-blue-100 text-sm">Payments aur site reports hamesha mobile par track karein.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-12 tracking-tight uppercase">FAQs</h2>
          <div className="space-y-4">
            {faqData.map((f, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
                <button 
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full p-6 text-left font-bold flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span className="text-slate-800">{f.q}</span>
                  <span className="text-blue-700 font-black text-2xl">
                    {openIndex === i ? '−' : '+'}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="p-6 border-t border-slate-100 text-slate-600 bg-slate-50 leading-relaxed font-medium">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 text-center bg-white">
        <p className="text-slate-800 font-bold mb-1">BuilderPro © 2024</p>
        <p className="text-slate-400 text-[10px] tracking-[0.2em] font-black uppercase italic">Efficiency On Site</p>
      </footer>

    </div>
  );
}
