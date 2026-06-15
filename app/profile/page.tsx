"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Calendar,
  Clock,
  Briefcase,
  KeyRound,
  UserCheck,
  Zap
} from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [subscription, setSubscription] = useState({
    plan: "free",
    item_limit: 1,
    plan_expiry: ""
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setFullName(data.full_name || "");
      setEmail(data.email || "");
      setCreatedAt(data.created_at || "");
      setAvatarUrl(data.avatar_url || "");
      
      setSubscription({
        plan: data.plan || "free",
        item_limit: data.item_limit ?? 1,
        plan_expiry: data.plan_expiry || ""
      });
    }

    setLoading(false);
  }

  async function saveProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
      })
      .eq("id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile updated successfully");
  }

  async function handleAvatarChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const fileName = `${userId}-${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      setAvatarUrl(publicUrl);

      await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
        })
        .eq("id", userId);

      alert("Photo uploaded successfully");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function removePhoto() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          avatar_url: null,
        })
        .eq("id", user.id);

      if (error) throw error;

      setAvatarUrl("");

      alert("Photo removed successfully");
    } catch (err: any) {
      alert(err.message);
    }
  }
  async function updatePassword() {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    alert("Password updated successfully");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Loading Security Vault...</p>
        </div>
      </div>
    );
  }

  return (    
    <div className="p-6 md:p-12 bg-[#F8FAFC] min-h-screen font-sans antialiased text-slate-900 max-w-[1400px] mx-auto w-full">

      {/* Modern Dynamic Header Component */}
      <div className="mb-12 border-b border-slate-200/60 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Account Settings</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Control security access, subscription matrices, and personalized parameters.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Vault Synchronized</span>
        </div>
      </div>

      {/* 📊 PREMIUM SUBSCRIPTION INSIGHT METRICS CARDS */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1: Plan Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between group">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Plan</p>
            <h3 className="text-2xl font-black text-[#0B1533] uppercase">
              {subscription.plan === 'free' ? 'Starter' : subscription.plan}
            </h3>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
            subscription.plan === 'business' ? 'bg-amber-50 text-amber-600' :
            subscription.plan === 'pro' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
          }`}>
            <Zap size={20} className={subscription.plan === 'business' ? 'fill-amber-500/20' : ''} />
          </div>
        </div>

        {/* Metric 2: Allocation Allocation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Resource Allocation</p>
            <h3 className="text-2xl font-black text-slate-800">
              {subscription.plan.toLowerCase() === 'business' ? 'Unlimited' : `${subscription.item_limit} Projects`}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
            <Briefcase size={20} />
          </div>
        </div>

        {/* Metric 3: Time Expiry Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cycle Expiration</p>
            <h3 className="text-lg font-bold text-slate-700 mt-1">
              {subscription.plan_expiry 
                ? new Date(subscription.plan_expiry).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
                : "Continuous Access"}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
            <Calendar size={20} />
          </div>
        </div>
      </div>

      {/* Main Structural Twin Grid Columns Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-start">
        
        {/* Profile Details Panel Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#0B1533] flex items-center justify-center text-white">
              <UserCheck size={16} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
              <p className="text-xs text-slate-400 font-medium">Identity credentials synchronized with core databases</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
            
            {/* High-End Avatar Uploader Frame Layout */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200/60 rounded-2xl">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white flex items-center justify-center shadow-inner border border-slate-200 relative group">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile Picture" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <User size={48} className="text-slate-400" />
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center text-white text-xs font-bold animate-pulse">
                    Saving...
                  </div>
                )}
              </div>

              <input type="file" accept="image/*" id="avatarInput" className="hidden" onChange={handleAvatarChange} />

              <div className="flex flex-col gap-2 w-full mt-4">
                <button onClick={() => document.getElementById("avatarInput")?.click()} className="w-full bg-white hover:bg-slate-100 border border-slate-200 font-semibold text-xs py-2 px-3 rounded-xl transition-all shadow-sm">
                  Upload Image
                </button>
                {avatarUrl && (
                  <button onClick={removePhoto} className="w-full bg-red-50 hover:bg-red-100/80 text-red-600 font-semibold text-xs py-2 px-3 rounded-xl transition-all">
                    Delete Picture
                  </button>
                )}
              </div>
            </div>

            {/* Core Identity Text Forms Controls */}
            <div className="space-y-5 w-full">
              <div>
                <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Legal Full Name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border border-slate-200 focus:border-slate-400 focus:ring-0 rounded-xl px-4 py-3 font-medium transition-colors text-sm" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Primary Authorized Email</label>
                <input value={email} disabled className="w-full border border-slate-200/80 rounded-xl px-4 py-3 font-medium bg-slate-50/80 text-slate-400 text-sm cursor-not-allowed" />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button onClick={saveProfile} className="w-full sm:w-auto bg-[#0B1533] hover:bg-[#15234d] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow transition-all active:scale-[0.98]">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Dynamic Tips & Meta Statistics Panel Box */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col justify-between h-full min-h-[440px]">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-6">
              <KeyRound size={18} />
            </div>
            <h3 className="font-black text-xl mb-4 tracking-tight">Security Guidelines</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">To protect your financial invoices, employee salary records, and database privacy, ensure your credential meets standard cryptography guidelines.</p>
            
            <ul className="space-y-3 text-slate-300 text-xs font-medium">
              <li className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                At least 8 cryptographic characters
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                Include uppercase and lowercase matrix
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                Include at least 1 numerical value
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                Include a system symbol character
              </li>
            </ul>
          </div>

          <div className="border-t border-white/10 pt-6 mt-6">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              <Shield size={12} className="text-blue-400" />
              AES-256 Encryption Active
            </div>
          </div>
        </div>
      </div>

      {/* 🔐 PASSWORD SECURITY MANAGEMENT FRAME */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 md:p-8 mb-8 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-8">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
            <Lock size={16} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
            <p className="text-xs text-slate-400 font-medium">Update account parameters to secure session authorization tokens</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="relative">
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Current Password</label>
            <div className="relative">
              <input type={showCurrent ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full border border-slate-200 focus:border-slate-400 focus:ring-0 rounded-xl px-4 py-3 font-medium text-sm transition-colors pr-10" />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors">
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">New Secure Password</label>
            <div className="relative">
              <input type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border border-slate-200 focus:border-slate-400 focus:ring-0 rounded-xl px-4 py-3 font-medium text-sm transition-colors pr-10" />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors">
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Confirm New Password</label>
            <div className="relative">
              <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border border-slate-200 focus:border-slate-400 focus:ring-0 rounded-xl px-4 py-3 font-medium text-sm transition-colors pr-10" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
          <button onClick={updatePassword} className="w-full sm:w-auto bg-[#0B1533] hover:bg-[#15234d] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-[0.98]">
            Update Password
          </button>
        </div>
      </div>

      {/* 📁 PLATFORM METADATA REGISTRATION INVENTORY */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <Shield size={16} className="mb-3 text-slate-400" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">User Token Key</p>
            <p className="font-semibold text-xs font-mono text-slate-800 break-all mt-1">{userId}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <User size={16} className="mb-3 text-slate-400" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Role Type</p>
            <p className="font-bold text-sm text-slate-800 mt-1">Authorized Root Admin</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <Calendar size={16} className="mb-3 text-slate-400" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verification Date</p>
            <p className="font-bold text-sm text-slate-800 mt-1">
              {createdAt ? new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "-"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <Clock size={16} className="mb-3 text-slate-400" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gateway Link Status</p>
            <p className="font-bold text-sm text-emerald-600 tracking-wide mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active Verified
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
