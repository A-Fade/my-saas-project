"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleAuth() {
    if (!email || !password) {
      toast.error("Fill all fields");
      return;
    }

    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
      } else {
        toast.success("Login successful");
        router.push("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signup successful! Please login");
        setIsLogin(true);
      }
    }
  }

  async function forgotPassword() {
    if (!email) {
      toast.error("Enter your email first");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      toast.error("Error sending reset email");
    } else {
      toast.success("Password reset link sent to your email");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-2">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h1>

        <p className="text-center text-gray-500 mb-6">
          {isLogin
            ? "Login to your account"
            : "Start managing your projects"}
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* FORGOT PASSWORD */}
        {isLogin && (
          <p
            onClick={forgotPassword}
            className="text-sm text-blue-600 cursor-pointer mb-4 hover:underline"
          >
            Forgot Password?
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : isLogin
            ? "Login"
            : "Create Account"}
        </button>

        {/* SWITCH */}
        <p className="text-center text-sm mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer ml-1 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}