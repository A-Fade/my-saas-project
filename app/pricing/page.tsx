"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}

      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}

          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0B1533] flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
              </svg>
            </div>

            <span className="text-4xl font-bold text-[#0B1533]">
              Builder Pro
            </span>
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-12">

            <Link
              href="/pricing"
              className="text-sm font-bold tracking-[3px] text-slate-500 hover:text-[#0B1533]"
            >
              PRICING
            </Link>

            <Link
              href="/features"
              className="text-sm font-bold tracking-[3px] text-slate-500 hover:text-[#0B1533]"
            >
              FEATURES
            </Link>

            <Link
              href="/how-it-works"
              className="text-sm font-bold tracking-[3px] text-slate-500 hover:text-[#0B1533]"
            >
              HOW IT WORKS
            </Link>

            <Link
              href="/faq"
              className="text-sm font-bold tracking-[3px] text-slate-500 hover:text-[#0B1533]"
            >
              FAQ
            </Link>

          </nav>

          {/* CTA */}

          <Link
            href="/register"
            className="bg-[#0B1533] hover:bg-[#111f47] text-white px-10 py-4 rounded-2xl font-bold tracking-[2px] shadow-lg transition"
          >
            GET STARTED
          </Link>

        </div>
      </header>

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-10">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 border border-slate-200 rounded-full px-6 py-3">

            <span className="text-[#0B1533] font-bold text-xs tracking-[4px]">
              PRICING
            </span>

          </div>

          <h1 className="text-6xl lg:text-8xl font-black text-[#0B1533] mt-10 leading-none">
            Simple Pricing
          </h1>

          <h2 className="text-6xl lg:text-8xl font-black text-slate-300 leading-none mt-2">
            For Every Builder
          </h2>

          <p className="max-w-3xl mx-auto text-slate-500 text-xl mt-10 leading-relaxed">
            Choose the perfect Builder Pro plan for your business.
            Upgrade anytime as your company grows and unlock more powerful features.
          </p>

          {/* Billing Toggle */}

          <div className="flex justify-center mt-12">

            <div className="border border-slate-200 rounded-full p-2 flex bg-white shadow-sm">

              <button className="bg-[#0B1533] text-white px-10 py-3 rounded-full font-bold">
                Monthly
              </button>

              <button className="px-10 py-3 font-bold text-slate-500">
                Yearly (Save 20%)
              </button>

            </div>

          </div>

        </div>

        {/* Pricing Cards Start */}

        <div className="grid lg:grid-cols-3 gap-8 mt-24">

          {/* STARTER */}

          <div className="bg-white border border-slate-200 rounded-[32px] p-10">

            <div className="text-center">

              <h3 className="text-[#0B1533] font-black text-4xl">
                STARTER
              </h3>

              <p className="text-slate-500 mt-4">
                Perfect for beginners and small projects
              </p>

              <div className="mt-10">
                <span className="text-7xl font-black text-[#0B1533]">
                  ₹0
                </span>

                <span className="text-slate-500 text-3xl ml-2">
                  /month
                </span>
              </div>

              <div className="inline-block bg-slate-100 px-5 py-2 rounded-xl mt-5 text-slate-600 font-medium">
                Free Forever
              </div>

              <button className="w-full mt-10 border-2 border-[#0B1533] text-[#0B1533] py-4 rounded-2xl font-bold hover:bg-slate-50 transition">
                Get Started
              </button>

            </div>

            <div className="border-t mt-10 pt-10">

              <h4 className="font-bold text-[#0B1533] mb-6">
                What's Included:
              </h4>

              <div className="space-y-5">

                <Feature text="1 Website" />
                <Feature text="5 Pages" />
                <Feature text="500 MB Storage" />
                <Feature text="Basic Templates" />
                <Feature text="Community Support" />
                <Feature text="SSL Certificate" />

              </div>

            </div>

          </div>

          {/* PRO CARD START */}
                    {/* PRO */}

          <div className="bg-white border-2 border-[#0B1533] rounded-[32px] p-10 relative shadow-xl">

            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-[#0B1533] text-white px-6 py-2 rounded-xl font-bold">
                Most Popular
              </div>
            </div>

            <div className="text-center pt-4">

              <h3 className="text-[#0B1533] font-black text-4xl">
                PRO
              </h3>

              <p className="text-slate-500 mt-4">
                Ideal for growing businesses
              </p>

              <div className="mt-10">
                <span className="text-7xl font-black text-[#0B1533]">
                  ₹499
                </span>

                <span className="text-slate-500 text-3xl ml-2">
                  /month
                </span>
              </div>

              <div className="inline-block bg-slate-100 px-5 py-2 rounded-xl mt-5 text-slate-600 font-medium">
                Billed Monthly
              </div>

              <button className="w-full mt-10 bg-[#0B1533] hover:bg-[#111f47] text-white py-4 rounded-2xl font-bold transition">
                Start Pro Trial
              </button>

            </div>

            <div className="border-t mt-10 pt-10">

              <h4 className="font-bold text-[#0B1533] mb-6">
                Everything in Starter, plus:
              </h4>

              <div className="space-y-5">

                <Feature text="10 Websites" />
                <Feature text="Unlimited Pages" />
                <Feature text="10 GB Storage" />
                <Feature text="Premium Templates" />
                <Feature text="Priority Support" />
                <Feature text="Custom Domain" />
                <Feature text="Remove BuilderPro Branding" />

              </div>

            </div>

          </div>

          {/* BUSINESS */}

          <div className="bg-white border border-slate-200 rounded-[32px] p-10">

            <div className="text-center">

              <h3 className="text-[#0B1533] font-black text-4xl">
                BUSINESS
              </h3>

              <p className="text-slate-500 mt-4">
                For large teams and advanced needs
              </p>

              <div className="mt-10">
                <span className="text-7xl font-black text-[#0B1533]">
                  ₹999
                </span>

                <span className="text-slate-500 text-3xl ml-2">
                  /month
                </span>
              </div>

              <div className="inline-block bg-slate-100 px-5 py-2 rounded-xl mt-5 text-slate-600 font-medium">
                Billed Monthly
              </div>

              <button className="w-full mt-10 border-2 border-[#0B1533] text-[#0B1533] py-4 rounded-2xl font-bold hover:bg-slate-50 transition">
                Contact Sales
              </button>

            </div>

            <div className="border-t mt-10 pt-10">

              <h4 className="font-bold text-[#0B1533] mb-6">
                Everything in Pro, plus:
              </h4>

              <div className="space-y-5">

                <Feature text="Unlimited Websites" />
                <Feature text="Unlimited Storage" />
                <Feature text="Team Collaboration" />
                <Feature text="Advanced Analytics" />
                <Feature text="White Label Solution" />
                <Feature text="Dedicated Manager" />
                <Feature text="API Access" />

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Trust Section */}

        <div className="flex justify-center mt-20">

          <div className="flex flex-wrap justify-center gap-4 text-slate-500 font-medium">

            <span>🛡️ 30-Day Money Back Guarantee</span>

            <span>•</span>

            <span>Cancel Anytime</span>

            <span>•</span>

            <span>No Hidden Fees</span>

            <span>•</span>

            <span>24/7 Support</span>

          </div>

        </div>

      </section>

      {/* FAQ SECTION START */}
            {/* FAQ Section */}

      <section className="bg-[#0B1533] mt-24 rounded-t-[60px]">
        <div className="max-w-6xl mx-auto px-6 py-24">

          <h2 className="text-center text-white text-5xl font-black mb-16">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white/10 border border-white/10 rounded-3xl p-8">
              <h3 className="text-white text-xl font-bold">
                Can I upgrade later?
              </h3>

              <p className="text-slate-300 mt-4">
                Yes, you can upgrade or downgrade your plan at any time.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-8">
              <h3 className="text-white text-xl font-bold">
                Do you offer refunds?
              </h3>

              <p className="text-slate-300 mt-4">
                Yes, we provide a 30-day money back guarantee.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-8">
              <h3 className="text-white text-xl font-bold">
                Can I connect my custom domain?
              </h3>

              <p className="text-slate-300 mt-4">
                Yes, Pro and Business plans support custom domains.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-8">
              <h3 className="text-white text-xl font-bold">
                Is there a free plan?
              </h3>

              <p className="text-slate-300 mt-4">
                Yes, Builder Pro includes a free starter plan.
              </p>
            </div>

          </div>

          {/* CTA */}

          <div className="text-center mt-20">

            <h2 className="text-5xl font-black text-white">
              Ready To Build Faster?
            </h2>

            <p className="text-slate-300 text-xl mt-6 max-w-2xl mx-auto">
              Join Builder Pro today and start creating professional websites
              for your clients in minutes.
            </p>

            <button className="mt-10 bg-white text-[#0B1533] px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition">
              Get Started Now
            </button>

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

      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
        <Check className="w-4 h-4 text-green-600" />
      </div>

      <span className="text-slate-700">
        {text}
      </span>

    </div>
  );
}