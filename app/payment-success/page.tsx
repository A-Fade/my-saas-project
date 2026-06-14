"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying payment...");
  const [isSuccess, setIsSuccess] = useState(false); // Button dikhane ke liye state

  useEffect(() => {
    async function updatePlan() {
      const planName = searchParams.get("plan"); // 'pro' ya 'business'
      const userId = searchParams.get("user_id");

      if (!planName || !userId) {
        setStatus("Invalid request parameters.");
        return;
      }

      try {
        // Plan ke mutabik item limits set karein
        let limit = 3; // default free
        if (planName.toLowerCase() === "pro") limit = 10;
        if (planName.toLowerCase() === "business") limit = 99999; // Unlimited

        // Database columns ko update karein (Humne dono variables rakh diye hain safe side ke liye)
        const { error } = await supabase
          .from("profiles")
          .update({
            plan: planName.toLowerCase(),       // Hamari SQL table ke mutabik
            item_limit: limit,                 // Item limit update
            plan_status: planName.toLowerCase(), // Aapke purane schema ke liye
            plan_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 Days expiry
          })
          .eq("id", userId);

        if (error) throw error;

        toast.success("Payment Successful! Plan activated.");
        setStatus("Success! Your account has been upgraded.");
        setIsSuccess(true); // Success button active karein

      } catch (err: any) {
        console.error(err);
        setStatus("Database update failed. Please contact support.");
      }
    }

    updatePlan();
  }, [searchParams]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl ${isSuccess ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
        {isSuccess ? "✓" : "⚡"}
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Verification</h2>
      <p className="text-slate-600 text-sm font-medium mb-6">{status}</p>

      {/* 👇 GO TO DASHBOARD BUTTON (Jo aapko chahiye tha) */}
      {isSuccess && (
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 shadow-sm"
        >
          Go to Dashboard
        </button>
      )}
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 font-sans p-4">
      <Suspense 
        fallback={
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
            <div className="w-8 h-8 border-2 border-slate-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 text-sm font-medium">Loading secure gateway token...</p>
          </div>
        }
      >
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
