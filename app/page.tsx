"use client";

import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  Folder,
  Menu,
  Shield,
  Users,
  Wallet,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-white text-slate-900 overflow-hidden">
      {/* HERO SECTION */}
      <section className="bg-[#020817] text-white min-h-screen relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_40%)]" />

        {/* NAVBAR */}
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏗️</div>
            <div>
              <h1 className="text-3xl font-bold">
                Builder<span className="text-blue-500">Pro</span>
              </h1>
              <p className="text-sm text-gray-400 hidden md:block">
                Construction Management SaaS
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
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
            <button className="border border-white/20 px-5 py-2 rounded-xl hover:bg-white/10 transition">
              Login
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl font-medium">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-white">
            <Menu size={32} />
          </button>
        </nav>

        {/* HERO */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-14 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/20 text-blue-300 text-sm mb-8">
              Construction Management SaaS
            </div>

            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              Build Smarter.
              <br />
              Manage <span className="text-blue-500">Better.</span>
            </h2>

            <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-xl">
              BuilderPro helps you manage projects, workers, payments,
              expenses and everything in one simple dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight size={18} />
              </button>

              <button className="border border-white/20 hover:bg-white/10 transition px-8 py-4 rounded-2xl font-semibold">
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-12 text-sm text-gray-300">
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

          {/* DASHBOARD IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full" />

            <img
              src="/dashboard-preview.png"
              alt="BuilderPro Dashboard"
              className="relative rounded-3xl border border-white/10 shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 lg:px-8 py-24"
      >
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            Features
          </div>

          <h3 className="text-4xl md:text-5xl font-black mt-6 leading-tight">
            Everything You Need to Manage Construction Projects
          </h3>

          <p className="text-gray-600 mt-6 text-lg">
            Powerful features to simplify your construction management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Folder,
              title: "Project Management",
              desc: "Create and track projects easily.",
            },
            {
              icon: Users,
              title: "Worker Management",
              desc: "Manage workers and assignments.",
            },
            {
              icon: CreditCard,
              title: "Payment Tracking",
              desc: "Track daily payments and spending.",
            },
            {
              icon: CheckCircle,
              title: "Project Status",
              desc: "Monitor project activity live.",
            },
            {
              icon: Wallet,
              title: "Expense History",
              desc: "View all spending history in one place.",
            },
            {
              icon: Shield,
              title: "Secure & Reliable",
              desc: "Your data is always safe and secure.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <item.icon className="text-blue-600" size={30} />
              </div>

              <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-gray-50 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
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
                desc: "Sign up in minutes.",
              },
              {
                step: "2",
                title: "Add Projects & Workers",
                desc: "Manage everything from dashboard.",
              },
              {
                step: "3",
                title: "Track Everything",
                desc: "Monitor payments and progress.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-10 border border-gray-200"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>

                <h4 className="text-2xl font-bold">{item.title}</h4>
                <p className="text-gray-600 mt-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-5xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            FAQ
          </div>

          <h3 className="text-4xl md:text-5xl font-black mt-6">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-6 mt-16">
          {[
            "What is BuilderPro?",
            "Can I use it on mobile?",
            "Is my data secure?",
            "Do you provide support?",
          ].map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg">{item}</h4>
                <span className="text-2xl">+</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto bg-[#020817] rounded-[40px] px-8 py-16 md:px-16 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-4xl font-black leading-tight">
              Ready to Simplify Construction Management?
            </h3>

            <p className="text-gray-300 mt-4 text-lg">
              Start managing projects smarter with BuilderPro.
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-semibold whitespace-nowrap">
            Get Started Free
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-gray-200 py-10 px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-black">
              Builder<span className="text-blue-600">Pro</span>
            </h4>

            <p className="text-gray-600 mt-2">
              Construction Management SaaS Platform.
            </p>
          </div>

          <p className="text-gray-500 text-sm">
            © 2026 BuilderPro. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}