"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  User,
  Mail,
  Lock,
  Save,
  CheckCircle,
} from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setUserId(user.id);
    setEmail(user.email || "");

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setFullName(data.full_name || "");
    }

    setLoading(false);
  };

  const saveProfile = async () => {
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        full_name: fullName,
        email: email,
      });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    setMessage("Profile updated successfully");
  };

  const updatePassword = async () => {
    if (!newPassword) {
      alert("Enter new password");
      return;
    }

    const { error } =
      await supabase.auth.updateUser({
        password: newPassword,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setNewPassword("");
    setMessage("Password updated successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="text-center mb-12">

          <span className="px-4 py-2 rounded-full border bg-white text-sm font-medium">
            BuilderPro Account
          </span>

          <h1 className="text-5xl font-bold mt-6">
            My Profile
          </h1>

          <p className="text-gray-500 mt-4">
            Manage your account information and security.
          </p>

        </div>

        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-2">
            <CheckCircle size={18} />
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
                  {/* Profile Information */}
          <div className="bg-white border rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Profile Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full h-14 border rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full h-14 border rounded-2xl pl-12 pr-4 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="w-full h-14 bg-black text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800"
              >
                <Save size={18} />

                {saving
                  ? "Saving..."
                  : "Save Profile"}
              </button>

            </div>

          </div>

          {/* Security Section */}
          <div className="bg-white border rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Security
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">
                  New Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter new password"
                    className="w-full h-14 border rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <button
                onClick={updatePassword}
                className="w-full h-14 bg-black text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800"
              >
                <Lock size={18} />
                Update Password
              </button>

              <div className="border-t pt-6">

                <h3 className="font-semibold mb-2">
                  Account Information
                </h3>

                <p className="text-gray-500">
                  User ID:
                </p>

                <p className="text-sm break-all">
                  {userId}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}