"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    async function updatePlan() {
      // URL se plan_name aur user_id nikal rahe hain
      const planName = searchParams.get("plan");
      const userId = searchParams.get("user_id");

      if (!planName || !userId) {
        setStatus("Invalid request parameters.");
        return;
      }

      try {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30); // 30 Days Expiry

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
  }, [searchParams]);

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          ✓
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Verification</h2>
        <p className="text-slate-600 text-sm font-medium">{status}</p>
      </div>
    </div>
  );
}
