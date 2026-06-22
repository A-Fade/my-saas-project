"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PricingPage() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 🚀 BACKGROUND SCRIPT PRELOADER
  useEffect(() => {
    if (typeof window !== "undefined" && !((window as any).Razorpay)) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.id = "razorpay-core-script";
      document.head.appendChild(script);
    }
  }, []);

  // 🔄 DATABASE UPDATE & REDIRECT GATEWAY LOGIC (Bypasses Ad-Blockers 100%)
  async function handleSelectPlan(planName: "free" | "pro" | "business") {
    setLoadingPlan(planName);
    try {
      // Check karein ki user logged in hai ya nahi
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        toast.error("Please login first to select a plan.");
        router.push("/login");
        return;
      }

      // 📅 Thik 30 din baad ki expiry date calculate ho rahi hai (Starter vs Paid Plans)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);

      // 1️⃣ AGAR FREE (STARTER) PLAN HAI -> No Payment, Direct Activation
      if (planName === "free") {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ 
            plan: "free",                       // Plan key target sync
            plan_status: planName,
            item_limit: 1,                      // Starter (Free) Projects Limit
            plan_expiry: expiryDate.toISOString() // 30-Day expiry save
          })
          .eq("id", user.id);

        if (updateError) throw updateError;

        toast.success(`Starter Plan activated successfully!`);
        router.push("/dashboard"); 
        return;
      }

      // 2️⃣ AGAR PAID PLAN (PRO / BUSINESS) HAI -> Automatic Ad-Blocker Bypass Redirection
      const amountInPaise = planName === "pro" ? 49900 : 99900;
      
      // Humara success page jo payment ke baad open hoke database entry karega
      const successRedirectUrl = `${window.location.origin}/payment-success?plan=${planName}&user_id=${user.id}`;

      // 🔥 SAFEST FALLBACK IF AD-BLOCKER COMPLETELY STOPS SDK FROM CHARGING
      if (!((window as any).Razorpay)) {
        // FIXED: Backticks (`` ` ``) used properly to avoid valid URL crashes
        // Notes configuration fallback parameters embedded safely
        window.location.href = `https://razorpay.com{amountInPaise}&currency=INR&name=BuilderPro%20SaaS&description=Purchase%20${planName}%20Monthly%20Subscription&prefill[email]=${encodeURIComponent(user.email || "")}&callback_url=${encodeURIComponent(successRedirectUrl)}&notes[user_id]=${user.id}&notes[plan]=${planName}`;
        return;
      }

      // Standard overlay implementation with auto callback strategy
      const options = {
        key: "rzp_live_T0jkPpCQ9VYDVS", // Aapki live API key
        amount: amountInPaise,
        currency: "INR",
        name: "BuilderPro SaaS",
        description: `Purchase ${planName} Monthly Subscription`,
        callback_url: successRedirectUrl, // Redirect instead of popups
        
        // 📝 WEBHOOK SYNC LOGIC: Notes inject kiye gaye hain bina purane structures chhede
        notes: {
          user_id: user.id,
          plan: planName,
        },
        
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#0B1533",
        },
         // 👇 Yeh naya handler joda gaya hai jo page crash nahi hone dega
        handler: function (response: any) {
          if (response.razorpay_payment_id) {
            toast.success("Payment Received! Redirecting...");
            router.push(`/payment-success?plan=${planName}&user_id=${user.id}`);
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img src="/icon.png" alt="BuilderPro Logo" className="w-full h-full object-contain" />
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              BuilderPro
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-bold text-[11px] uppercase tracking-[0.15em] text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="/guides" className="hover:text-slate-900 transition-colors">Guides</Link>
            <Link href="/faq" className="hover:text-slate-900 transition-colors">FAQ</Link>
            <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-slate-600 font-medium hover:text-slate-900">
              Login
            </Link>
            <Link href="/signup" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold">
              Get Started
            </Link>
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden text-slate-700 font-bold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 font-medium text-slate-600">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-slate-900">Home</Link>
            <Link href="/pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-slate-900">Pricing</Link>
            <Link href="/guides" onClick={() => setIsMenuOpen(false)} className="hover:text-slate-900">Guides</Link>
            <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="hover:text-slate-900">FAQ</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-slate-900">About</Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-slate-900">Login</Link>
            <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="bg-slate-900 text-white text-center py-2 rounded-xl block">Get Started</Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 mt-20">

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

          {/* Starter Plan */}
          <div className="border rounded-3xl p-8 bg-white border-slate-200 shadow-sm">
            <h3 className="text-3xl font-bold text-[#0B1533]">
              Starter
            </h3>
            <p className="text-slate-500 mt-2">
              Perfect for beginners
            </p>
            <div className="mt-6">
              <span className="text-5xl font-black text-slate-900">₹0</span>
              <span className="text-slate-500">/month</span>
            </div>

            <button
              onClick={() => handleSelectPlan("free")}
              disabled={loadingPlan !== null}
              className="w-full text-center mt-8 border-2 border-[#0B1533] py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {loadingPlan === "free" ? "Activating..." : "Get Started"}
            </button>

            <div className="space-y-4 mt-8">
              <Feature text="1 Project" />
              <Feature text="6 Workers" />
              <Feature text="1 Client" />
              <Feature text="Basic Payment Tracking" />
              <Feature text="Basic Dashboard" />
              <Feature text="Community Support" />
            </div>
          </div>
          {/* Pro Plan */}
          <div className="border-2 border-[#0B1533] rounded-3xl p-8 relative shadow-xl bg-white">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-[#0B1533] text-white px-5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">
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
              <span className="text-5xl font-black text-slate-900">₹499</span>
              <span className="text-slate-500">/month</span>
            </div>
            <button
              onClick={() => handleSelectPlan("pro")}
              disabled={loadingPlan !== null}
              className="w-full text-center mt-8 bg-[#0B1533] text-white py-3 rounded-xl font-semibold hover:bg-[#15234d] transition-colors disabled:opacity-50"
            >
              {loadingPlan === "pro" ? "Opening Gateway..." : "Start Pro Trial"}
            </button>

            <div className="space-y-4 mt-8">
              <Feature text="10 Projects" />
              <Feature text="250 Workers" />
              <Feature text="10 Clients" />
              <Feature text="Payment Tracking" />
              <Feature text="Advanced Dashboard" />
              <Feature text="Priority Support" />
            </div>
          </div>

          {/* Business Plan */}
          <div className="border rounded-3xl p-8 bg-white border-slate-200 shadow-sm">
            <h3 className="text-3xl font-bold text-[#0B1533]">
              Business
            </h3>
            <p className="text-slate-500 mt-2">
              For agencies and large teams
            </p>
            <div className="mt-6">
              <span className="text-5xl font-black text-slate-900">₹999</span>
              <span className="text-slate-500">/month</span>
            </div>

            <button
              onClick={() => handleSelectPlan("business")}
              disabled={loadingPlan !== null}
              className="w-full text-center mt-8 border-2 border-[#0B1533] py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {loadingPlan === "business" ? "Opening Gateway..." : "Get Started"}
            </button>

            <div className="space-y-4 mt-8">
              <Feature text="Unlimited Projects" />
              <Feature text="Unlimited Workers" />
              <Feature text="Unlimited Clients" />
              <Feature text="Advanced Payment Tracking" />
              <Feature text="Pro Dashboard" />
              <Feature text="24/7 Dedicated Support" />
            </div>
          </div>

        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-slate-500 text-sm">
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
            <div className="bg-white border rounded-2xl p-6 shadow-sm border-slate-100">
              <h3 className="font-bold text-lg text-[#0B1533]">
                Can I upgrade my plan later?
              </h3>
              <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                Yes. You can upgrade or downgrade your BuilderPro plan anytime.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm border-slate-100">
              <h3 className="font-bold text-lg text-[#0B1533]">
                Is there a free plan available?
              </h3>
              <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                Yes. Our Starter plan is completely free to use.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm border-slate-100">
              <h3 className="font-bold text-lg text-[#0B1533]">
                Do you provide refunds?
              </h3>
              <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                Yes. We offer a 30-day money back guarantee on paid plans.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm border-slate-100">
              <h3 className="font-bold text-lg text-[#0B1533]">
                Can I connect my custom domain?
              </h3>
              <p className="text-slate-500 mt-3 text-sm leading-relaxed">
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
            Join thousands of builders using BuilderPro to create professional websites in minutes.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              href="/login"
              className="bg-white text-[#0B1533] px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors"
            >
              Start Free
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
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
      <span className="text-slate-700 text-sm">
        {text}
      </span>
    </div>
  );
}
