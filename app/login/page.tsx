"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔐 CHECK IF USER ALREADY LOGGED IN
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      router.push("/dashboard");
    }
  }

  // 🔐 AUTH FUNCTION
  async function handleAuth() {
    if (!email || !password) {
      toast.error("Fill all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Enter valid email");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
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
        setLoading(false);
        router.push("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "builder",
          },
        },
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

  // 🔁 RESET PASSWORD
  async function forgotPassword() {
    if (!email) {
      toast.error("Enter your email first");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      toast.error("Error sending reset email");
    } else {
      toast.success("Password reset link sent to your email");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">

      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black opacity-95"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl">

          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center text-3xl shadow-lg">
              🏗️
            </div>
          </div>

          <h1 className="text-3xl font-black text-center text-white mb-2">
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </h1>

          <p className="text-center text-slate-400 mb-8">
            {isLogin
              ? "Login to manage your projects"
              : "Start managing your construction business"}
          </p>

          {/* FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAuth();
            }}
          >

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full 
                border border-slate-700
                bg-slate-800/80
                text-white
                placeholder:text-slate-400
                p-4 
                rounded-2xl 
                mb-4
                focus:ring-2 
                focus:ring-indigo-500
                focus:border-indigo-500
                outline-none 
                transition
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Enter your password"
              className="
                w-full 
                border border-slate-700
                bg-slate-800/80
                text-white
                placeholder:text-slate-400
                p-4 
                rounded-2xl 
                mb-3
                focus:ring-2 
                focus:ring-indigo-500
                focus:border-indigo-500
                outline-none 
                transition
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* FORGOT PASSWORD */}
            {isLogin && (
              <p
                onClick={forgotPassword}
                className="text-sm text-indigo-400 cursor-pointer mb-6 hover:text-indigo-300 transition"
              >
                Forgot Password?
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full 
                bg-gradient-to-r 
                from-indigo-600 
                to-violet-600
                hover:from-indigo-700
                hover:to-violet-700
                text-white 
                py-4 
                rounded-2xl 
                font-bold
                shadow-lg
                transition-all 
                duration-300 
                disabled:opacity-50
                hover:scale-[1.02]
              "
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>

          </form>

          {/* SWITCH */}
          <p className="text-center text-sm text-slate-400 mt-6">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-400 cursor-pointer ml-1 hover:text-indigo-300 transition font-semibold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}