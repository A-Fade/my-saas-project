"use client";

import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <main>

          <div className="bg-white rounded-3xl border p-6 lg:p-10">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h1 className="text-4xl font-bold text-slate-900">
                  Subscription Plans
                </h1>

                <p className="text-slate-500 mt-2">
                  Choose the perfect plan for your construction business
                </p>
              </div>

              <div className="border rounded-xl px-4 py-3 text-sm text-slate-600">
                14-Day Money Back Guarantee
              </div>

            </div>

            {/* Billing Toggle */}

            <div className="flex gap-3 mt-8">

              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold">
                Monthly
              </button>

              <button className="border px-8 py-3 rounded-xl font-semibold">
                Yearly (Save 20%)
              </button>

            </div>

            {/* Pricing Cards */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">

              {/* FREE */}

              <div className="border rounded-3xl p-8">

                <h2 className="text-3xl font-bold">
                  Free
                </h2>

                <p className="text-slate-500 mt-2">
                  Perfect for beginners
                </p>

                <h3 className="text-5xl font-bold mt-6">
                  ₹0
                  <span className="text-lg text-slate-500">
                    /month
                  </span>
                </h3>

                <button className="w-full mt-8 border rounded-xl py-3 font-semibold">
                  Current Plan
                </button>

                <div className="space-y-4 mt-8">

                  <Feature text="1 Project" />
                  <Feature text="1 Worker" />
                  <Feature text="1 Client" />
                  <Feature text="Basic Templates" />
                  <Feature text="Community Support" />

                  <FeatureOff text="Reports" />
                  <FeatureOff text="Payment Tracking" />
                  <FeatureOff text="Priority Support" />

                </div>

              </div>

              {/* PRO */}

              <div className="border-2 border-blue-500 rounded-3xl overflow-hidden">

                <div className="bg-blue-600 text-white text-center py-3 font-semibold">
                  Most Popular
                </div>

                <div className="p-8">

                  <h2 className="text-3xl font-bold">
                    Pro
                  </h2>

                  <p className="text-slate-500 mt-2">
                    For growing contractors
                  </p>

                  <h3 className="text-5xl font-bold mt-6">
                    ₹599
                    <span className="text-lg text-slate-500">
                      /month
                    </span>
                  </h3>

                  <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold">
                    Upgrade to Pro
                  </button>

                  <div className="space-y-4 mt-8">

                    <Feature text="Unlimited Projects" />
                    <Feature text="Unlimited Workers" />
                    <Feature text="Unlimited Clients" />
                    <Feature text="Premium Templates" />
                    <Feature text="Payment Tracking" />
                    <Feature text="Project Reports" />
                    <Feature text="Custom Branding" />
                    <Feature text="Priority Support" />

                  </div>

                </div>

              </div>
                            {/* BUSINESS */}

              <div className="border rounded-3xl p-8">

                <h2 className="text-3xl font-bold">
                  Business
                </h2>

                <p className="text-slate-500 mt-2">
                  For construction companies
                </p>

                <h3 className="text-5xl font-bold mt-6">
                  ₹1499
                  <span className="text-lg text-slate-500">
                    /month
                  </span>
                </h3>

                <button className="w-full mt-8 border border-blue-600 text-blue-600 rounded-xl py-3 font-semibold">
                  Upgrade to Business
                </button>

                <div className="space-y-4 mt-8">

                  <Feature text="Everything in Pro" />
                  <Feature text="Multi Company Support" />
                  <Feature text="Advanced Analytics" />
                  <Feature text="Team Permissions" />
                  <Feature text="White Label Solution" />
                  <Feature text="Dedicated Manager" />
                  <Feature text="24/7 Support" />
                  <Feature text="Custom Integrations" />

                </div>

              </div>

            </div>

            {/* Compare Plans */}

            <div className="mt-12 border rounded-3xl overflow-hidden">

              <div className="bg-slate-50 border-b p-6">
                <h2 className="text-2xl font-bold">
                  Compare Plans
                </h2>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px]">

                  <thead>

                    <tr className="border-b">
                      <th className="text-left p-4">Feature</th>
                      <th className="p-4">Free</th>
                      <th className="p-4">Pro</th>
                      <th className="p-4">Business</th>
                    </tr>

                  </thead>

                  <tbody>

                    <tr className="border-b">
                      <td className="p-4">Projects</td>
                      <td className="text-center">1</td>
                      <td className="text-center">Unlimited</td>
                      <td className="text-center">Unlimited</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Workers</td>
                      <td className="text-center">1</td>
                      <td className="text-center">Unlimited</td>
                      <td className="text-center">Unlimited</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Clients</td>
                      <td className="text-center">1</td>
                      <td className="text-center">Unlimited</td>
                      <td className="text-center">Unlimited</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Payment Tracking</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Reports</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Custom Branding</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">White Label</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                    </tr>

                    <tr>
                      <td className="p-4">Priority Support</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

            {/* Bottom Banner */}

            <div className="mt-10 rounded-3xl border bg-gradient-to-r from-blue-50 to-slate-50 p-8">

              <h2 className="text-3xl font-bold text-slate-900">
                Manage Your Entire Construction Business
              </h2>

              <p className="text-slate-600 mt-3 max-w-2xl">
                Track projects, workers, clients, invoices,
                payments and reports from one powerful dashboard.
              </p>

              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
                Start Free Trial
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

/* Components */

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <Check className="w-5 h-5 text-green-600" />
      <span>{text}</span>
    </div>
  );
}

function FeatureOff({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <X className="w-5 h-5 text-red-500" />
      <span className="text-slate-500">{text}</span>
    </div>
  );
}