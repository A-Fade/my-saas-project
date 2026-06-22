"use client";
import React, { useState } from 'react';
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
  X,
  LayoutGrid,
  FolderKanban,
  Receipt,
  TrendingUp,
  ShieldAlert,
  LogOut,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const features = [
    {
      title: "Project Management",
      desc: "Plan, organize, and track all your construction projects in one place.",
      icon: <FolderKanban className="text-blue-600" size={24} />
    },
    {
      title: "Worker Management",
      desc: "Add your team, assign roles, track attendance and daily wages.",
      icon: <Users className="text-blue-600" size={24} />
    },
    {
      title: "Expense Tracking",
      desc: "Monitor all project expenses and materials in real-time.",
      icon: <Wallet className="text-blue-600" size={24} />
    },
    {
      title: "Payment Management",
      desc: "Handle payments, dues, and transactions with complete transparency.",
      icon: <Receipt className="text-blue-600" size={24} />
    },
    {
      title: "Business Analytics",
      desc: "Get powerful insights and reports to make better business decisions.",
      icon: <BarChart3 className="text-blue-600" size={24} />
    },
    {
      title: "Easy & Secure",
      desc: "Cloud-based, secure, and accessible from anywhere, anytime.",
      icon: <ShieldCheck className="text-blue-600" size={24} />
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', icon: <LayoutGrid size={18} /> },
    { name: 'Projects', icon: <FolderKanban size={18} /> },
    { name: 'Clients', icon: <Users size={18} /> },
    { name: 'Workers', icon: <Users size={18} /> },
    { name: 'Payments', icon: <Wallet size={18} /> },
    { name: 'Subscription', icon: <Receipt size={18} /> },
    { name: 'Support', icon: <ShieldAlert size={18} /> },
    { name: 'Profile', icon: <Users size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 selection:bg-blue-600 selection:text-white antialiased">
      
   {/* Navbar */}
<nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    
    {/* Updated Logo and Clean Black Text */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
        <img 
          src="/icon.png" 
          alt="BuilderPro Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight text-[#020617]">
          Builder Pro
        </span>
        <span className="text-[9px] font-bold text-slate-400 -mt-0.5 tracking-wider uppercase">
          Construction Management SaaS
        </span>
      </div>
    </div>

          <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="/guides" className="hover:text-blue-600 transition-colors">How It Works</Link>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            <Link href="/login" className="bg-[#020617] text-white px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-all text-sm font-bold shadow-sm">
              Get Started
            </Link>
          </div>

          <button className="md:hidden text-slate-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl p-6 flex flex-col gap-4 font-medium text-slate-600">
              <Link href="#features" onClick={() => setIsMenuOpen(false)}>Features</Link>
              <Link href="/guides" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
              <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
              <Link href="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link href="/login" className="bg-[#020617] text-white text-center py-3 rounded-lg font-bold" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">All-in-One Construction Management Software</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Build Faster.<br />
              <span className="text-blue-600">Manage Better.</span>
            </h1>
            
            <p className="text-base text-slate-500 font-medium leading-relaxed max-w-lg">
              BuilderPro helps contractors and builders manage projects, track workers, monitor expenses, create quotes, and handle payments — all from one simple dashboard.
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
              {[
                "Project & Task Management", "Payment & Payroll",
                "Worker & Team Tracking", "Real-time Reports & Analytics",
                "Expense & Material Tracking", "Secure & Reliable"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link href="/login" className="w-full sm:w-auto bg-[#020617] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-300">
                Start Building Now <ArrowRight size={18} />
              </Link>
              <button className="w-full sm:w-auto border border-slate-200 bg-white text-slate-800 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></span> View Demo
              </button>
            </div>

            {/* Social Proof Badges */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-tr from-slate-400 to-slate-500 flex items-center justify-center text-[10px] text-white font-bold uppercase">U{num}</div>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">Trusted by 500+ builders & contractors</p>
                <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5">
                  {"★".repeat(5)} <span className="text-slate-500 font-semibold ml-1">4.8/5 (120+ Reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right: Live Interactive Dashboard Mockup matching image */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-12 h-[500px]">
            {/* Mockup Sidebar */}
            <div className="col-span-3 bg-[#0b1329] p-4 flex flex-col justify-between text-white">
              <div className="space-y-6">
                <div className="flex items-center gap-2 px-2">
                  <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-xs font-black">B</div>
                  <span className="text-sm font-bold tracking-tight">Builder<span className="text-blue-400">Pro</span></span>
                </div>
                <div className="space-y-1">
                  {sidebarItems.map((item) => (
                    <button 
                      key={item.name} 
                      onClick={() => setActiveTab(item.name)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-left ${activeTab === item.name ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                    >
                      {item.icon}
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mockup Main Content View */}
            <div className="col-span-9 bg-[#f8fafc] flex flex-col overflow-y-auto">
              {/* Mockup Topbar */}
              <div className="h-14 bg-white border-b border-slate-100 px-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <Menu size={16} className="text-slate-400" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block">BuilderPro</span>
                    <span className="text-[10px] text-slate-400 -mt-0.5 block">Welcome back 👋</span>
                  </div>
                </div>
                <button className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-all">
                  <LogOut size={10} /> Logout
                </button>
              </div>

              {/* Mockup Dynamic Body Content */}
              <div className="p-5 space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">{activeTab} Overview</h3>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">Live Demo Mode</span>
                </div>

                {/* Info Bar */}
                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm grid grid-cols-4 gap-2 text-center">
                  <div>
                    <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wider">Plan</span>
                    <span className="text-[10px] text-amber-600 font-extrabold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block mt-0.5">★ BUSINESS</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wider">Projects</span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">2 <span className="text-[10px] text-slate-400">/ ∞</span></span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wider">Workers</span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">4 <span className="text-[10px] text-slate-400">/ ∞</span></span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wider">Clients Allowed</span>
                    <span className="text-xs font-bold text-slate-500 block mt-0.5">Unlimited</span>
                  </div>
                </div>

                {/* Banner alert */}
                <div className="bg-[#0b1329] text-white p-3 rounded-xl flex items-center justify-between shadow-md relative overflow-hidden group cursor-pointer">
                  <div className="flex items-center gap-2 z-10">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400"><Zap size={12} /></div>
                    <div>
                      <span className="text-[9px] font-bold uppercase text-amber-400 tracking-wider block">PREMIUM BUSINESS ANALYTICS</span>
                      <span className="text-[9px] text-slate-300 block">Welcome VIP Corporate Partner! Unlimited modules active.</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-white transition-colors z-10" />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-[9px] text-slate-400 font-bold block">PROJECTS</span>
                    <span className="text-lg font-black text-slate-800 mt-1 block">2</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-[9px] text-slate-400 font-bold block">WORKERS</span>
                    <span className="text-lg font-black text-slate-800 mt-1 block">4</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-[9px] text-slate-400 font-bold block">TODAY PAY</span>
                    <span className="text-lg font-black text-slate-800 mt-1 block">₹0</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-[9px] text-slate-400 font-bold block">ACTIVE</span>
                    <span className="text-lg font-black text-emerald-600 mt-1 block">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* Features Grid Section */}
      <section id="features" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              Powerful Features
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Everything You Need to Run Your Construction Business
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
              BuilderPro is designed to simplify your daily operations and help you deliver projects on time and within budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all group duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 tracking-tight text-slate-900">{f.title}</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Dashboard Overview Section */}
      <section className="py-24 bg-[#f8fafc] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Section Left Layout */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Dashboard Overview</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              See BuilderPro <br />in Action
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              A powerful dashboard that gives you complete control over your projects, team, and finances.
            </p>

            <div className="space-y-4 pt-2">
              {[
                { title: "At-a-Glance Overview", desc: "See all key statistics and summaries on your dashboard." },
                { title: "Real-time Updates", desc: "Stay updated with the latest project, worker, and payment status." },
                { title: "Easy Navigation", desc: "Access all modules quickly with a clean and intuitive interface." },
                { title: "Mobile Friendly", desc: "Use BuilderPro on any device, anywhere, anytime." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium pl-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section Right Showcase Mockup Matching Lower Half Image */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden grid grid-cols-12 h-[420px]">
            {/* Sidebar Visual */}
            <div className="col-span-3 bg-[#0b1329] p-4 text-white flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 px-1">
                  <div className="w-5 h-5 bg-amber-500 rounded flex items-center justify-center text-[10px] font-black">B</div>
                  <span className="text-xs font-bold">Builder<span className="text-blue-400">Pro</span></span>
                </div>
                <div className="space-y-1">
                  {sidebarItems.slice(0, 6).map((item) => (
                    <div key={item.name} className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] font-medium ${item.name === 'Dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                      {item.icon}
                      <span className="truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Layout Grid matching image with Material Spends info */}
            <div className="col-span-9 bg-[#f8fafc] p-4 overflow-y-auto space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div className="text-[10px] font-bold text-slate-800">Dashboard View</div>
                <div className="text-[9px] text-slate-400">Project Stats Active</div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                {/* Main Table Block */}
                <div className="col-span-7 bg-white p-3 rounded-xl border border-slate-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-slate-400 uppercase tracking-wider">Project Status</span>
                    <span className="text-blue-600 cursor-pointer">View all</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: 'Kanpur', status: 'active', color: 'bg-emerald-500' },
                      { name: 'Lucknow', status: 'active', color: 'bg-emerald-500' }
                    ].map((proj, pi) => (
                      <div key={pi} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs font-semibold">
                        <span className="text-slate-700">{proj.name}</span>
                        <span className="flex items-center gap-1.5 text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100">
                          <span className={`w-1.5 h-1.5 rounded-full ${proj.color}`}></span>{proj.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side Spend Module matching image */}
                <div className="col-span-5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm space-y-2.5">
                  <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wider">Daily Material Spends</span>
                  <div className="space-y-2">
                    {[
                      { type: 'Steel', loc: 'Lucknow', price: '₹40000' },
                      { type: 'Pipe', loc: 'Lucknow', price: '₹10000' },
                      { type: 'Cement', loc: 'Lucknow', price: '₹50000' }
                    ].map((mat, mi) => (
                      <div key={mi} className="flex justify-between items-center text-[10px] border-b border-slate-50 pb-1.5 last:border-none">
                        <div>
                          <span className="font-bold text-slate-800 block">{mat.type}</span>
                          <span className="text-[8px] text-slate-400 block">{mat.loc}</span>
                        </div>
                        <span className="font-extrabold text-slate-800">{mat.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Statistics Analytics Strip */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500+", label: "Happy Customers" },
            { value: "1000+", label: "Projects Managed" },
            { value: "50+", label: "Team Members" },
            { value: "99.9%", label: "Uptime & Secure" }
          ].map((stat, sIdx) => (
            <div key={sIdx} className="space-y-1 relative group">
              <h4 className="text-3xl font-black text-blue-600 tracking-tight">{stat.value}</h4>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              {sIdx < 3 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-slate-200"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Conversion Focused Final CTA Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto bg-[#020617] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl text-left z-10">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Ready to Take Your Construction Business to the Next Level?
            </h2>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Join hundreds of contractors and builders who are already saving time and growing faster with BuilderPro.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 z-10 w-full md:w-auto">
            <Link href="/login" className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30">
              Start Your Free Trial <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto bg-white text-slate-900 px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-slate-50 transition-all">
              View Pricing
            </Link>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-12 text-[10px] text-slate-500 font-medium tracking-wide">
            No credit card required  •  Cancel anytime
          </div>
        </div>
      </section>

      {/* Footer */}
<footer className="py-12 bg-white border-t border-slate-100">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
    
    {/* Updated Logo and Clean Black Text */}
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
        <img 
          src="/icon.png" 
          alt="BuilderPro Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-base font-black tracking-tight text-[#020617]">
        Builder Pro
      </span>
    </div>

    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
      © 2026 Builder Pro. Made for Contractors.
    </p>
    <div className="flex gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-500">
      <Link href="/login" className="hover:text-blue-600 transition-colors">Login</Link>
      <Link href="/support" className="hover:text-blue-600 transition-colors">Support</Link>
      <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
    </div>
  </div>
</footer>

</div>
);
}