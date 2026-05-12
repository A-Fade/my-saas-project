"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  CreditCard,
  Folder,
  Menu,
  Shield,
  Users,
  Wallet,
  X,
} from "lucide-react";

export default function HomePage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqData = [
    {
      q: "What is BuilderPro?",
      a: "BuilderPro is a construction management SaaS to manage projects, workers, payments and clients.",
    },
    {
      q: "Can I use it on mobile?",
      a: "Yes, BuilderPro works perfectly on mobile, tablet, laptop and desktop devices.",
    },
    {
      q: "Is my data secure?",
      a: "Yes, your project and payment data is secure and protected.",
    },
    {
      q: "Do you provide support?",
      a: "Yes, we provide customer support for all users.",
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative min-h-screen bg-[#020817] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_40%)]" />

        {/* NAVBAR */}
        <nav className="relative z-50 border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-24 flex items-center justify-between">
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
              <a
                href="/login"
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
              >
                Login
              </a>

              <a
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold"
              >
                Get Started
              </a>
            </div>

            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden"
            >
              <Menu size={34} />
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="fixed inset-0 bg-black/70 z-[100] md:hidden">
            <div className="bg-[#020817] h-full w-[85%] p-8 border-r border-white/10">
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

                <a
                  href="/dashboard"
                  className="bg-blue-600 mt-6 py-4 rounded-2xl text-center font-semibold"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/20 text-blue-300 px-5 py-2 rounded-full text-sm mb-8">
              Construction Management SaaS
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              Build Smarter.
              <br />
              Manage <span className="text-blue-500">Better.</span>
            </h2>

            <p className="mt-8 text-gray-300 text-lg leading-relaxed max-w-xl">
              BuilderPro helps contractors and builders manage projects,
              workers, payments and expenses from one powerful dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight size={18} />
              </a>

              <a
                href="#features"
                className="border border-white/20 hover:bg-white/10 transition px-8 py-4 rounded-2xl font-semibold text-center"
              >
                Watch Demo
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-12 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-blue-500" size={18} />
                Easy to Use
              </div>

              <div className="flex items-center gap-2">
                <Shield className="text-blue-500" size={18} />
                Secure System
              </div>

              <div className="flex items-center gap-2">
                <Wallet className="text-blue-500" size={18} />
                Save Time
              </div>
            </div>
          </div>

          {/* DASHBOARD */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full" />

            <div className="relative bg-white rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/dashboard-preview.png"
                alt="BuilderPro Dashboard"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="py-24 px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Features
            </div>

            <h3 className="text-4xl md:text-5xl font-black mt-6 leading-tight">
              Everything You Need to Manage Construction Projects
            </h3>

            <p className="text-gray-600 mt-6 text-lg">
              Powerful features to simplify your workflow and business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Folder,
                title: "Project Management",
                desc: "Manage all construction projects easily.",
              },
              {
                icon: Users,
                title: "Worker Management",
                desc: "Manage workers and daily tasks.",
              },
              {
                icon: CreditCard,
                title: "Payment Tracking",
                desc: "Track payments and daily expenses.",
              },
              {
                icon: CheckCircle,
                title: "Project Status",
                desc: "Monitor active and completed projects.",
              },
              {
                icon: Wallet,
                title: "Expense History",
                desc: "See spending and payment history.",
              },
              {
                icon: Shield,
                title: "Secure System",
                desc: "Safe and reliable cloud platform.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] border border-gray-200 p-8 hover:-translate-y-2 transition duration-300 hover:shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                  <item.icon className="text-blue-600" size={30} />
                </div>

                <h4 className="text-2xl font-black mb-4">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section className="bg-gray-50 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Dashboard Preview
            </div>

            <h3 className="text-5xl font-black leading-tight">
              All Your Projects,
              <br />
              At a Glance
            </h3>

            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              Manage everything from one clean and powerful dashboard.
            </p>

            <div className="space-y-4 mt-8 text-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                Projects, Workers & Payments
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                Daily Pay & Expense Tracking
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                Active Projects & History
              </div>
            </div>
          </div>

          <div>
            <img
              src="/dashboard-preview.png"
              alt="Dashboard"
              className="rounded-[32px] shadow-2xl border border-gray-200"
            />
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            How It Works
          </div>

          <h3 className="text-4xl md:text-5xl font-black mt-6">
            Get Started in 3 Simple Steps
          </h3>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: "1",
                title: "Create Account",
                desc: "Sign up and create your BuilderPro account.",
              },
              {
                step: "2",
                title: "Add Projects",
                desc: "Add workers, projects and payments.",
              },
              {
                step: "3",
                title: "Manage Everything",
                desc: "Track business from your dashboard.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-[30px] p-10"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-6">
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
      <section id="faq" className="bg-gray-50 py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              FAQ
            </div>

            <h3 className="text-4xl md:text-5xl font-black mt-6">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-5 mt-16">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg">{item.q}</span>

                  <ChevronDown
                    className={`transition ${
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
        <div className="max-w-7xl mx-auto bg-[#020817] rounded-[40px] p-10 md:p-16 text-white flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div>
            <h3 className="text-4xl md:text-5xl font-black leading-tight">
              Ready to Simplify Your Construction Business?
            </h3>

            <p className="text-gray-300 text-lg mt-6 max-w-2xl">
              Join builders and contractors using BuilderPro every day.
            </p>
          </div>

          <a
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-semibold text-lg whitespace-nowrap"
          >
            Get Started Free
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-[#020817] text-white py-16 px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h4 className="text-4xl font-black">
              Builder<span className="text-blue-500">Pro</span>
            </h4>

            <p className="text-gray-400 mt-4 text-lg max-w-md">
              Modern construction management platform for builders and
              contractors.
            </p>
          </div>

          <div className="md:text-right text-gray-400">
            © 2026 BuilderPro. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
  }