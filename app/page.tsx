"use client";

import React, { useState } from 'react';

export default function BuilderProLanding() {
  const [openFaq, setOpenFaq] = useState(-1);

  // SEO Optimized Content Array
  const features = [
    { title: "Worker Attendance", desc: "Digital muster roll. Ek click mein workers ki attendance aur daily wages track karein.", icon: "👷‍♂️" },
    { title: "Expense Tracking", desc: "Site par hone wale har ek rupaye ka hisab. Cement, saria se lekar chai tak ka kharcha.", icon: "💸" },
    { title: "Live Site Reports", desc: "Client ko dikhane ke liye professional PDF reports aur progress photos.", icon: "📊" }
  ];

  const steps = [
    { n: "01", t: "Setup Project", d: "Apni site ka naam aur location dalkar naya project shuru karein." },
    { n: "02", t: "Add Team", d: "Apne workers aur supervisors ko system mein register karein." },
    { n: "03", t: "Monitor & Grow", d: "Dashboard par analytics dekhein aur apne profit ko badhayein." }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* --- HEADER --- */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 h-20 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">B</div>
          <span className="text-2xl font-bold tracking-tighter text-slate-800">Builder<span className="text-blue-700">Pro</span></span>
        </div>
        <div className="hidden md:flex gap-10 font-bold text-sm uppercase tracking-widest text-slate-500">
          <a href="#features" className="hover:text-blue-700 transition">Features</a>
          <a href="#how" className="hover:text-blue-700 transition">Process</a>
          <a href="#faq" className="hover:text-blue-700 transition">Support</a>
        </div>
        <button className="bg-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-100">
          Try Now
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="bg-blue-50 text-blue-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 animate-bounce">
            #1 Construction Management SaaS
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
            Manage Sites <br />
            <span className="text-blue-700">Without Stress.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-2xl max-w-3xl mb-12 font-medium leading-relaxed">
            Diary aur registers chhodiye. BuilderPro ke saath apne construction business ko automate karein aur har site ka profit real-time mein track karein.
          </p>
          
          {/* Main Visual with Mobile/Desktop Overlap */}
          <div className="relative w-full max-w-6xl mt-10 group">
            <div className="bg-slate-900 rounded-[2.5rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-800 overflow-hidden aspect-video">
              <img 
                src="/desktop-preview.png" 
                alt="BuilderPro Dashboard Desktop" 
                className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:opacity-100 transition"
                onError={(e) => { e.currentTarget.src = "https://placeholder.com" }}
              />
            </div>
            {/* Mobile View Floating */}
            <div className="absolute -bottom-10 -right-4 md:right-10 w-32 md:w-64 bg-slate-900 rounded-[2.5rem] p-2 md:p-3 border-4 border-slate-800 shadow-2xl hidden sm:block">
              <div className="aspect-[9/19] rounded-2xl overflow-hidden">
                <img 
                  src="/mobile-preview.png" 
                  alt="BuilderPro Mobile App" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = "https://placeholder.com" }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- FEATURES --- */}
      <section id="features" className="py-32 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-slate-900 uppercase">Aapka Digital Sathi</h2>
            <p className="text-slate-500 font-bold">Har wo cheez jo ek contractor ko chahiye.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="text-6xl mb-8">{f.icon}</div>
                <h3 className="text-2xl font-black mb-4 text-slate-800">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how" className="py-32 bg-blue-700 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-24 tracking-tighter uppercase italic">Easy 3 Step Process</h2>
          <div className="grid md:grid-cols-3 gap-16 relative">
            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <span className="text-8xl font-black opacity-20 mb-4">{s.n}</span>
                <h3 className="text-2xl font-bold mb-4">{s.t}</h3>
                <p className="text-blue-100 leading-relaxed max-w-xs font-medium">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 tracking-tight uppercase">Common Doubts</h2>
          <div className="space-y-4">
            {[
              { q: "क्या यह टूल फ्री है?", a: "जी हाँ! BuilderPro का बेसिक प्लान नए कॉन्ट्रैक्टर्स के लिए फ्री है।" },
              { q: "क्या मेरा डेटा सुरक्षित है?", a: "हमारा पूरा सिस्टम Supabase पर चलता है जो बैंक-लेवल सिक्योरिटी देता है।" },
              { q: "क्या इसमें ऑफलाइन काम कर सकते हैं?", a: "अभी के लिए इंटरनेट ज़रूरी है, पर हम जल्द ही ऑफलाइन मोड ला रहे हैं।" }
            ].map((item, index) => (
              <div key={index} className="border-2 border-slate-100 rounded-[2rem] overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full p-8 text-left font-black flex justify-between items-center text-lg md:text-xl text-slate-800 hover:bg-slate-50"
                >
                  {item.q}
                  <span className={`text-blue-700 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === index && (
                  <div className="p-8 pt-0 text-slate-500 font-bold leading-relaxed bg-slate-50/50 italic">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-slate-100 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tighter">BuilderPro</h2>
            <p className="text-slate-400 font-bold tracking-widest text-[10px] uppercase">Crafted for Indian Contractors</p>
          </div>
          <div className="flex gap-8 text-slate-500 font-black text-xs uppercase">
            <a href="#" className="hover:text-blue-700">Privacy</a>
            <a href="#" className="hover:text-blue-700">Terms</a>
            <a href="#" className="hover:text-blue-700">Support</a>
          </div>
        </div>
        <div className="text-center mt-20 text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">
          BuilderPro SaaS © 2024
        </div>
      </footer>

    </div>
  );
}
