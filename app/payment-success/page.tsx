"use client";
import { useEffect, useState, Suspense } from "react"; // Suspense import kiya gaya hai
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

// 1️⃣ CORE LOGIC COMPONENT (Yahan search params fetch honge)
function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    async function updatePlan() {
      const planName = searchParams.get("plan");
      const userId = searchParams.get("user_id");

      if (!planName || !userId) {
        setStatus("Invalid request parameters.");
        return;
      }

      try {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30); // 30 Days Monthly Expiry

        const { error } = await supabase
          .from("profiles")
          .update({
            plan_status: planName,
            plan_expiry: expiryDate.toISOString(),
          })
          .eq("id", userId);

        if (error) throw error;

        toast.success("Payment Successful! Plan activated.");
        setStatus("Success! Redirecting to dashboard...");
        
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);

      } catch (err: any) {
        console.error(err);
        setStatus("Database update failed. Please contact support.");
      }
    }

    updatePlan();
  }, [searchParams, router]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
        ✓
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Verification</h2>
      <p className="text-slate-600 text-sm font-medium">{status}</p>
    </div>
  );
}

// 2️⃣ MAIN EXPORT WRAPPER (Wrapping with a solid Suspense boundary to fix Vercel error)
export default function PaymentSuccessPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 font-sans">
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
