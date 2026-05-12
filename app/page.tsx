"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  CreditCard,
  Folder,
  Menu,
  Play,
  Shield,
  Users,
  Wallet,
  X,
} from "lucide-react";

export default function HomePage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    {
      icon: Folder,
      title: "Project Management",
      desc: "Create and manage construction projects easily.",
    },
    {
      icon: Users,
      title: "Worker Management",
      desc: "Track workers and assign daily tasks.",
    },
    {
      icon: CreditCard,
      title: "Payment Tracking",
      desc: "Manage payments and expenses quickly.",
    },
    {
      icon: CheckCircle,
      title: "Project Status",
      desc: "Monitor project progress in real-time.",
    },
    {
      icon: Wallet,
      title: "Dashboard Overview",
      desc: "See everything from one clean dashboard.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      desc: "Your construction data stays protected.",
    },
  ];

  const faqs = [
    {
      q: "What is BuilderPro?",
      a: "BuilderPro is a construction management SaaS platform that helps manage projects, workers, payments and expenses.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes, BuilderPro offers a free trial for new users.",
    },
    {
      q: "Can I use BuilderPro on mobile?",
      a: "Yes, BuilderPro is fully responsive and works on mobile, tablet and desktop.",
    },
    {
      q: "Is my data secure?",
      a: "Yes, all your project and payment data is protected securely.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can cancel your subscription anytime.",
    },
    {
      q: "Do you offer support?",
      a: "Yes, we provide customer support to all BuilderPro users.",
    },
  ];

  return (
    <main className="bg-white overflow-hidden text-slate-900">
      {/* HERO */}
      <section className="relative min-h-screen bg-[#020817] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_40%)]" />

        {/* NAVBAR */}
        <nav className="relative z-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🏗️</div>

              <div>
                <h1 className="text-3xl font-black tracking-tight">
                  Builder<span className="text-blue-500">Pro</span>
                </h1>

                <p className="text-sm text-gray-400 hidden md:block">
                  Construction Management SaaS
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-10 text-gray-300 font-medium">
              <a href="#features" className="hover:text-white transition">
                Features
              </a>

              <a href="#how" className="hover:text-white transition">
                How It Works
              </a>

              <a href="#faq" className="hover:text-white transition">
                FAQ
              </a>

              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20"
              >
                Get Started
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenu(true)}
            >
              <Menu size={34} />
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="fixed inset-0 bg-black/70 z-[100] md:hidden">
            <div className="bg-[#020817] w-[85%] h-full p-8 border-r border-white/10">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black">
                  Builder<span className="text-blue-500">Pro</span>
                </h2>

                <button onClick={() => setMobileMenu(false)}>
                  <X size={34} />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-xl text-gray-300">
                <a href="#features">Features</a>
                <a href="#how">How It Works</a>
                <a href="#faq">FAQ</a>
                <a href="#contact">Contact</a>

                <Link
                  href="/login"
                  className="border border-white/20 rounded-2xl py-4 text-center mt-4"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="bg-blue-600 rounded-2xl py-4 text-center font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/20 text-blue-300 px-5 py-2 rounded-full text-sm mb-8">
              All-In-One Construction Management
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              Build Smarter.
              <br />
              Manage <span className="text-blue-500">Better.</span>
            </h2>

            <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-xl">
              BuilderPro helps you manage construction projects, workers,
              payments and everything in one simple dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>

              <a
                href="#features"
                className="border border-white/20 hover:bg-white/10 transition px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                <Play size={18} fill="white" />
                Watch Demo
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-12 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-blue-500" size={18} />
                Easy to Use
              </div>

              <div className="flex items-center gap-2">
                <Shield className="text-blue-500" size={18} />
                Secure & Reliable
              </div>

              <div className="flex items-center gap-2">
                <Wallet className="text-blue-500" size={18} />
                Save Time & Money
              </div>
            </div>
          </div>

          {/* DASHBOARD MOCKUP */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full" />

            <div className="relative bg-white rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
              <img
                src="/dashboard-preview.png"
                alt="BuilderPro Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              FEATURES
            </div>

            <h3 className="text-4xl md:text-5xl font-black mt-6 leading-tight">
              Everything You Need to
              <br />
              Manage Construction Projects
            </h3>

            <p className="text-gray-600 mt-6 text-lg">
              Powerful features to simplify your construction management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-[30px] p-8 hover:-translate-y-2 transition duration-300 hover:shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                  <item.icon className="text-blue-600" size={30} />
                </div>

                <h4 className="text-2xl font-black mb-4">{item.title}</h4>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section className="bg-[#f8fafc] py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[40px] p-8 lg:p-12 shadow-xl border border-gray-200 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              DASHBOARD PREVIEW
            </div>

            <h3 className="text-5xl font-black leading-tight">
              All Your Projects,
              <br />
              At a Glance
            </h3>

            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              Manage everything from one clean and powerful dashboard.
            </p>

            <div className="space-y-5 mt-8 text-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                Projects, Workers & Payments
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                Today Pay & Today Spend
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                Active Projects & History
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                Simple, Clean & Easy to Use
              </div>
            </div>
          </div>

          <div>
            <img
              src="/dashboard-preview.png"
              alt="Dashboard"
              className="rounded-[30px] border border-gray-200 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            HOW IT WORKS
          </div>

          <h3 className="text-4xl md:text-5xl font-black mt-6">
            Get Started in 3 Simple Steps
          </h3>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: "1",
                title: "Create Account",
                desc: "Sign up in minutes and create your account.",
              },
              {
                step: "2",
                title: "Add Your Data",
                desc: "Add projects, workers and payments.",
              },
              {
                step: "3",
                title: "Start Managing",
                desc: "Track business and project progress.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#f8fafc] border border-gray-200 rounded-[30px] p-10"
              >
                <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-black mx-auto mb-6">
                  {item.step}
                </div>

                <h4 className="text-2xl font-black">{item.title}</h4>
                <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#f8fafc] py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              FAQ
            </div>

            <h3 className="text-4xl md:text-5xl font-black mt-6">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-16">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-lg">{item.q}</span>

                  <ChevronDown
                    className={`transition duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed text-lg">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto bg-[#020817] rounded-[40px] p-10 lg:p-16 flex flex-col lg:flex-row gap-8 items-center justify-between text-white shadow-2xl">
          <div>
            <h3 className="text-4xl md:text-5xl font-black leading-tight">
              Ready to Simplify Your Construction Management?
            </h3>

            <p className="text-gray-300 text-lg mt-5 max-w-2xl">
              Join thousands of construction professionals using BuilderPro.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-semibold text-lg whitespace-nowrap"
            >
              Get Started Free
            </Link>

            <a
              href="#features"
              className="border border-white/20 hover:bg-white/10 transition px-8 py-4 rounded-2xl font-semibold text-lg whitespace-nowrap"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-[#020817] text-white py-16 px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-3xl font-black">
              Builder<span className="text-blue-500">Pro</span>
            </h4>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Construction Management SaaS to help you build smarter and
              manage better.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-4">Product</h5>
            <div className="space-y-3 text-gray-400">
              <p>Features</p>
              <p>Pricing</p>
              <p>Updates</p>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-4">Company</h5>
            <div className="space-y-3 text-gray-400">
              <p>About Us</p>
              <p>Contact</p>
              <p>Privacy Policy</p>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-4">Support</h5>
            <div className="space-y-3 text-gray-400">
              <p>Help Center</p>
              <p>FAQ</p>
              <p>Terms & Conditions</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-8 text-center text-gray-500">
          © 2026 BuilderPro. All rights reserved.
        </div>
      </footer>
    </main>
  );
}