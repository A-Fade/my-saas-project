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
} from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

 async function removePhoto() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    console.log("Removing photo for:", user.id);

    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", user.id);

    if (error) throw error;

    setAvatarUrl("");

    alert("Photo removed successfully");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
}

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
      <div className="p-8">
        <h2 className="text-xl font-semibold">Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500 mt-2">
          Manage your account information and security.
        </p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-3xl border p-8 mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Profile Information
        </h2>

        <p className="text-slate-500 mb-8">
          Update your personal details.
        </p>

        <div className="grid lg:grid-cols-[1fr_250px] gap-8">
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <label className="block mb-2 mt-6 font-medium">
              Email Address
            </label>

            <input
              value={email}
              disabled
              className="w-full border rounded-xl px-4 py-3 bg-slate-50"
            />

            <button
              onClick={saveProfile}
              className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800"
            >
              Save Changes
            </button>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-44 h-44 rounded-3xl bg-slate-100 flex items-center justify-center">
              <div className="w-44 h-44 rounded-3xl bg-slate-100 flex items-center justify-center overflow-hidden">
  {avatarUrl ? (
    <img
      src={avatarUrl}
      className="w-full h-full object-cover"
    />
  ) : (
    <User size={80} className="text-slate-500" />
  )}
</div>
            </div>
<input
  type="file"
  accept="image/*"
  id="avatarInput"
  style={{ display: "none" }}
  onChange={handleAvatarChange}
/>
            <button
  onClick={() =>
    document.getElementById("avatarInput")?.click()
  }
  className="mt-5 border px-5 py-2 rounded-xl"
>
  {uploading ? "Uploading..." : "Add Photo"}
</button>

<button
  onClick={removePhoto}
  className="mt-3 border px-5 py-2 rounded-xl text-red-500"
>
  Remove Photo
</button>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-3xl border p-8 mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Change Password
        </h2>

        <p className="text-slate-500 mb-8">
          Update your password to keep your account secure.
        </p>

        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          <div>
            <label className="block mb-2 font-medium">
              Current Password
            </label>

            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-4"
              >
                {showCurrent ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <label className="block mb-2 mt-5 font-medium">
              New Password
            </label>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-4"
              >
                {showNew ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <label className="block mb-2 mt-5 font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-4"
              >
                {showConfirm ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              onClick={updatePassword}
              className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800"
            >
              Update Password
            </button>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6">
            <Lock className="mb-5 text-blue-600" />

            <h3 className="font-bold text-lg mb-4">
              Password Tips
            </h3>

            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• Use at least 8 characters</li>
              <li>• Include uppercase and lowercase</li>
              <li>• Include a number</li>
              <li>• Include a special character</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-3xl border p-8">
        <h2 className="text-3xl font-bold mb-2">
          Account Information
        </h2>

        <p className="text-slate-500 mb-8">
          View your account details and activity.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <Shield className="mb-3 text-slate-500" />
            <p className="text-sm text-slate-500">User ID</p>
            <p className="font-medium break-all">
              {userId}
            </p>
          </div>

          <div>
            <User className="mb-3 text-slate-500" />
            <p className="text-sm text-slate-500">
              Account Type
            </p>
            <p className="font-medium">Admin</p>
          </div>

          <div>
            <Calendar className="mb-3 text-slate-500" />
            <p className="text-sm text-slate-500">
              Member Since
            </p>
            <p className="font-medium">
              {createdAt
                ? new Date(createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <Clock className="mb-3 text-slate-500" />
            <p className="text-sm text-slate-500">
              Status
            </p>
            <p className="font-medium text-green-600">
              Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );

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
      .update({ avatar_url: publicUrl })
      .eq("id", userId);

  } catch (err: any) {
    alert(err.message);
  } finally {
    setUploading(false);
  }
}
}