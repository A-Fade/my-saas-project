"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}

      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}

          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold">
              B
            </div>

            <span className="text-3xl font-bold text-slate-900">
              BuilderPro
            </span>
          </Link>

          {/* Menu */}

          <nav className="hidden lg:flex items-center gap-10 text-slate-600 font-medium">

            <Link href="/" className="hover:text-indigo-600">
              Home
            </Link>

            <Link href="/features" className="hover:text-indigo-600">
              Features
            </Link>

            <Link href="/templates" className="hover:text-indigo-600">
              Templates
            </Link>

            <Link
              href="/pricing"
              className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg"
            >
              Pricing
            </Link>

            <Link href="/blog" className="hover:text-indigo-600">
              Blog
            </Link>

            <Link href="/contact" className="hover:text-indigo-600">
              Contact
            </Link>

          </nav>

          {/* Right Side */}

          <div className="flex items-center gap-5">

            <Link
              href="/login"
              className="text-slate-700 font-medium"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Start Free
            </Link>

          </div>

        </div>
      </header>

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <div className="inline-flex bg-indigo-100 text-indigo-600 px-5 py-2 rounded-full font-semibold text-sm">
            PRICING
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mt-8 leading-tight">
            Simple, Transparent Pricing
          </h1>

          <p className="max-w-3xl mx-auto text-slate-500 text-xl mt-6">
            Choose the perfect plan for your needs.
            Upgrade or downgrade anytime as your
            business grows.
          </p>

          {/* Billing Toggle */}

          <div className="flex justify-center mt-10">

            <div className="bg-white border rounded-full p-1 flex">

              <button className="bg-indigo-600 text-white px-10 py-3 rounded-full font-semibold">
                Monthly
              </button>

              <button className="px-10 py-3 font-semibold text-slate-600">
                Yearly (Save 20%)
              </button>

            </div>

          </div>

        </div>

        {/* Pricing Cards */}

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {/* STARTER */}

          <div className="bg-white border rounded-3xl p-8 shadow-sm">

            <div className="text-center">

              <h2 className="text-3xl font-bold text-indigo-600">
                STARTER
              </h2>

              <p className="text-slate-500 mt-3">
                Perfect for beginners and small projects
              </p>

              <div className="mt-8">
                <span className="text-6xl font-bold">
                  ₹0
                </span>

                <span className="text-slate-500 text-2xl ml-2">
                  /month
                </span>
              </div>

              <div className="inline-block bg-slate-100 px-4 py-2 rounded-lg mt-5 text-slate-600">
                Free forever
              </div>

              <button className="w-full border-2 border-indigo-500 text-indigo-600 rounded-xl py-4 font-bold mt-8 hover:bg-indigo-50 transition">
                Get Started
              </button>

            </div>

            <div className="border-t mt-8 pt-8">

              <h3 className="font-semibold text-lg mb-6">
                What's included:
              </h3>

              <div className="space-y-4">

                <Feature text="1 Website" />
                <Feature text="5 Pages" />
                <Feature text="500 MB Storage" />
                <Feature text="Basic Templates" />
                <Feature text="Community Support" />
                <Feature text="SSL Certificate" />

              </div>

            </div>

          </div>

          {/* PRO */}

          <div className="bg-white border-2 border-indigo-500 rounded-3xl p-8 relative shadow-lg">

            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold">
                Most Popular
              </div>
            </div>

            <div className="text-center mt-6">

              <h2 className="text-3xl font-bold text-indigo-600">
                PRO
              </h2>

              <p className="text-slate-500 mt-3">
                Ideal for growing businesses
              </p>

              <div className="mt-8">
                <span className="text-6xl font-bold">
                  ₹499
                </span>

                <span className="text-slate-500 text-2xl ml-2">
                  /month
                </span>
              </div>

              <div className="inline-block bg-slate-100 px-4 py-2 rounded-lg mt-5 text-slate-600">
                Billed monthly
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl py-4 font-bold mt-8">
                Start Pro Trial
              </button>

            </div>

            <div className="border-t mt-8 pt-8">

              <h3 className="font-semibold text-lg mb-6">
                Everything in Starter, plus:
              </h3>

              <div className="space-y-4">

                <Feature text="10 Websites" />
                <Feature text="Unlimited Pages" />
                <Feature text="10 GB Storage" />
                <Feature text="Premium Templates" />
                <Feature text="Priority Support" />
                <Feature text="Custom Domain" />
                <Feature text="No Branding" />

              </div>

            </div>

          </div>
                    {/* BUSINESS */}

          <div className="bg-white border rounded-3xl p-8 shadow-sm">

            <div className="text-center">

              <h2 className="text-3xl font-bold text-indigo-600">
                BUSINESS
              </h2>

              <p className="text-slate-500 mt-3">
                For large teams and advanced needs
              </p>

              <div className="mt-8">
                <span className="text-6xl font-bold">
                  ₹999
                </span>

                <span className="text-slate-500 text-2xl ml-2">
                  /month
                </span>
              </div>

              <div className="inline-block bg-slate-100 px-4 py-2 rounded-lg mt-5 text-slate-600">
                Billed monthly
              </div>

              <button className="w-full border-2 border-indigo-500 text-indigo-600 rounded-xl py-4 font-bold mt-8 hover:bg-indigo-50 transition">
                Start Business Trial
              </button>

            </div>

            <div className="border-t mt-8 pt-8">

              <h3 className="font-semibold text-lg mb-6">
                Everything in Pro, plus:
              </h3>

              <div className="space-y-4">

                <Feature text="Unlimited Websites" />
                <Feature text="Unlimited Storage" />
                <Feature text="Team Collaboration" />
                <Feature text="Advanced Analytics" />
                <Feature text="White Label" />
                <Feature text="Dedicated Support" />
                <Feature text="API Access" />

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Guarantee */}

        <div className="flex justify-center mt-16">

          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-500 text-lg">

            <span>🛡️ 30-day money back guarantee</span>

            <span>•</span>

            <span>Cancel anytime</span>

          </div>

        </div>

      </section>

    </div>
  );
}

/* Feature Component */

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
        <Check className="w-3 h-3 text-green-600" />
      </div>

      <span className="text-slate-700">
        {text}
      </span>
    </div>
  );
}