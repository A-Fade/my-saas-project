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
  X,
  LayoutGrid
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
    { q: "Is Builder Pro suitable for small contractors?", a: "Yes, it's specifically designed to help small to medium contractors manage sites without complex paperwork." },
    { q: "Can I manage multiple sites at once?", a: "Absolutely. You can create unlimited projects and assign workers to them individually." },
    { q: "Is my data secure?", a: "We use enterprise-grade Supabase encryption to ensure your financial and project data stays private." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Dashboard Style Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
  <img 
    src="/icon.png" 
    alt="BuilderPro Logo" 
    className="w-full h-full object-contain"
  />
</div>

            <span className="text-xl font-bold tracking-tight text-slate-900">Builder Pro</span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-bold text-[11px] uppercase tracking-[0.15em] text-slate-500">
            <Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="#features" className="hover:text-slate-900 transition-colors">Features</Link>
            <Link href="/guides" className="hover:text-slate-900 transition-colors">How it works</Link>
            <Link href="/faq" className="hover:text-slate-900 transition-colors">FAQ</Link>
            <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link href="/login" className="bg-slate-900 text-white px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-md">Get Started</Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full mb-8">
            <ShieldCheck size={16} className="text-slate-900" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Professional Construction Suite</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1]">
            Build Faster. <br />
            <span className="text-slate-300">Manage Better.</span>
          </h1>
<p className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">           Construction management software for contractors and builders.
  Manage projects, track workers, monitor expenses, create quotes,
  and handle payments with <strong>Builder Pro</strong>.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full md:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200">
              Start Building Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

{/* Why Choose BuilderPro */}
<section className="py-24 px-6 bg-white">
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
        Why Choose BuilderPro?
      </h2>
      <p className="text-slate-500 text-lg max-w-2xl mx-auto">
        Built specifically for contractors, builders, and construction companies.
      </p>
    </div>

    <div className="space-y-6 text-center max-w-4xl mx-auto">
      <p className="text-lg text-slate-600 leading-relaxed">
        BuilderPro is a modern construction management software designed for
        contractors, builders, and construction companies. Manage projects,
        track workers, monitor expenses, create quotes, and handle payments
        from one simple dashboard.
      </p>

      <p className="text-lg text-slate-600 leading-relaxed">
        Whether you manage residential homes, commercial buildings,
        renovations, or large construction projects, BuilderPro helps you
        stay organized, reduce delays, and improve productivity.
      </p>

      <p className="text-lg text-slate-600 leading-relaxed">
        With real-time project tracking, worker management, payment
        monitoring, and business reporting tools, BuilderPro gives
        construction professionals everything they need to run their
        business efficiently and grow faster.
      </p>
    </div>
  </div>
</section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-200 hover:border-slate-300 transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-20 tracking-tight">The Builder Pro Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { step: "01", title: "Site Setup", desc: "Create your project and define the site location." },
              { step: "02", title: "Assign Labor", desc: "Add team members and assign them to active sites." },
              { step: "03", title: "Track Payouts", desc: "Manage daily salaries and keep a clean digital ledger." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <span className="text-9xl font-black text-slate-50 absolute -top-16 left-1/2 -translate-x-1/2 -z-10">{step.step}</span>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-slate-500 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-slate-900 text-white rounded-[40px] md:rounded-[80px] mx-4 mb-4">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-800 pb-8">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-4">
                  <div className="w-2 h-2 bg-slate-500 rounded-full" />
                  {faq.q}
                </h4>
                <p className="text-slate-400 font-medium pl-6 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
  <img 
    src="/icon.png" 
    alt="BuilderPro Logo" 
    className="w-full h-full object-contain"
  />
</div>
<span className="text-lg font-bold tracking-tight text-slate-900">Builder Pro</span>

          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2024 Builder Pro. Made for Contractors.</p>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <Link href="/login" className="hover:text-slate-900 transition-colors">Login</Link>
            <Link href="/support" className="hover:text-slate-900 transition-colors">Support</Link>
            <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
