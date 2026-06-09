"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}

      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3">

            <div className="w-10 h-10 bg-[#0B1533] rounded-xl flex items-center justify-center text-white font-bold">
              B
            </div>

            <span className="text-2xl md:text-3xl font-bold text-[#0B1533]">
              BuilderPro
            </span>

          </Link>

          <nav className="hidden md:flex items-center gap-8">

            <Link
              href="/"
              className="font-semibold text-slate-600 hover:text-[#0B1533]"
            >
              Home
            </Link>

            <Link
              href="/pricing"
              className="font-semibold text-[#0B1533]"
            >
              Pricing
            </Link>

          </nav>

          <div className="flex items-center gap-3">

            <Link
              href="/login"
              className="text-slate-600 font-medium"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-[#0B1533] text-white px-5 py-3 rounded-xl font-semibold"
            >
              Get Started
            </Link>

          </div>

        </div>
      </header>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">

        <div className="text-center">

          <span className="border rounded-full px-5 py-2 text-sm font-bold text-[#0B1533]">
            PRICING
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0B1533] mt-8">
            Simple Pricing
          </h1>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-300">
            For Every Builder
          </h2>

          <p className="max-w-2xl mx-auto text-slate-500 mt-8 text-lg">
            Choose the perfect BuilderPro plan and grow your business faster.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">

          {/* Starter */}

          <div className="border rounded-3xl p-8">

            <h3 className="text-3xl font-bold text-[#0B1533]">
              Starter
            </h3>

            <p className="text-slate-500 mt-2">
              Perfect for beginners
            </p>

            <div className="mt-6">
              <span className="text-5xl font-black">₹0</span>
              <span className="text-slate-500">/month</span>
            </div>

            <Link
              href="/register"
              className="block text-center mt-8 border-2 border-[#0B1533] py-3 rounded-xl font-semibold"
            >
              Get Started
            </Link>

            <div className="space-y-4 mt-8">

              <Feature text="1 Project" />
              <Feature text="5 Workers" />
              <Feature text="5 Clients" />
              <Feature text="Basic Payment Tracking" />
              <Feature text="Basic Dashboard" />
              <Feature text="Community Support" />

            </div>

          </div>          {/* Pro */}

          <div className="border-2 border-[#0B1533] rounded-3xl p-8 relative shadow-xl">

            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-[#0B1533] text-white px-5 py-2 rounded-lg text-sm font-semibold">
                Most Popular
              </span>
            </div>

            <h3 className="text-3xl font-bold text-[#0B1533] mt-4">
              Pro
            </h3>

            <p className="text-slate-500 mt-2">
              Best for growing businesses
            </p>

            <div className="mt-6">
              <span className="text-5xl font-black">₹499</span>
              <span className="text-slate-500">/month</span>
            </div>

            <Link
              href="/register"
              className="block text-center mt-8 bg-[#0B1533] text-white py-3 rounded-xl font-semibold"
            >
              Start Pro Trial
            </Link>

            <div className="space-y-4 mt-8">

              <Feature text="Unlimited Projects" />
              <Feature text="Unlimited Workers" />
              <Feature text="Unlimited Clients" />
              <Feature text="Payment Tracking" />
              <Feature text="Reports" />
              <Feature text="Priority Support" />
            

            </div>

          </div>

          {/* Business */}

          <div className="border rounded-3xl p-8">

            <h3 className="text-3xl font-bold text-[#0B1533]">
              Business
            </h3>

            <p className="text-slate-500 mt-2">
              For agencies and large teams
            </p>

            <div className="mt-6">
              <span className="text-5xl font-black">₹999</span>
              <span className="text-slate-500">/month</span>
            </div>

            <Link
              href=""
              className="block text-center mt-8 border-2 border-[#0B1533] py-3 rounded-xl font-semibold"
            >
              Get Started
            </Link>

            <div className="space-y-4 mt-8">

              <Feature text="Everything in Pro" />
              <Feature text="Multi Company Support" />
              <Feature text="Team Permissions" />
              <Feature text="Advanced Analytics" />
              <Feature text="Pro Dashboard" />
             

            </div>

          </div>

        </div>

        {/* Trust Section */}

        <div className="mt-16 text-center">

          <div className="flex flex-wrap justify-center gap-4 text-slate-500">

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

      {/* FAQ Section */}
            <section className="bg-slate-50 py-20">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <h2 className="text-3xl md:text-5xl font-black text-center text-[#0B1533] mb-14">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white border rounded-2xl p-6">
              <h3 className="font-bold text-lg text-[#0B1533]">
                Can I upgrade my plan later?
              </h3>

              <p className="text-slate-500 mt-3">
                Yes. You can upgrade or downgrade your BuilderPro plan anytime.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <h3 className="font-bold text-lg text-[#0B1533]">
                Is there a free plan available?
              </h3>

              <p className="text-slate-500 mt-3">
                Yes. Our Starter plan is completely free to use.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <h3 className="font-bold text-lg text-[#0B1533]">
                Do you provide refunds?
              </h3>

              <p className="text-slate-500 mt-3">
                Yes. We offer a 30-day money back guarantee on paid plans.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <h3 className="font-bold text-lg text-[#0B1533]">
                Can I connect my custom domain?
              </h3>

              <p className="text-slate-500 mt-3">
                Yes. Pro and Business plans support custom domains.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA Section */}

      <section className="bg-[#0B1533] py-24">

        <div className="max-w-4xl mx-auto text-center px-4">

          <h2 className="text-4xl md:text-6xl font-black text-white">
            Ready To Build Your Website?
          </h2>

          <p className="text-slate-300 mt-6 text-lg">
            Join thousands of builders using BuilderPro to create
            professional websites in minutes.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <Link
              href="/register"
              className="bg-white text-[#0B1533] px-8 py-4 rounded-xl font-bold"
            >
              Start Free
            </Link>

            <Link
              href="/contact"
              className="border border-white text-white px-8 py-4 rounded-xl font-bold"
            >
              Contact Sales
            </Link>

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

      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4 text-green-600" />
      </div>

      <span className="text-slate-700">
        {text}
      </span>

    </div>
  );
}