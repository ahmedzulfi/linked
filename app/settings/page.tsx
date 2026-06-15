"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  User,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { UserMenu } from "@/components/UserMenu";

export default function SettingsPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const full = `${data.user.firstName} ${data.user.lastName}`;
        setUserName(full);
        setUserEmail(data.user.email);
        setFirstName(data.user.firstName || "");
        setLastName(data.user.lastName || "");

        sessionStorage.setItem(
          "linkedpage_user",
          JSON.stringify({ name: full, email: data.user.email }),
        );
      } catch {
        router.push("/login");
      }
    };
    checkUser();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First and last names are required.");
      return;
    }
    setIsSaving(true);
    const toastId = toast.loading("Saving account settings...");

    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });
      const data = await res.json();
      toast.dismiss(toastId);
      setIsSaving(false);

      if (res.ok) {
        toast.success("Profile updated successfully!");
        setUserName(data.name);
        sessionStorage.setItem(
          "linkedpage_user",
          JSON.stringify({ name: data.name, email: userEmail }),
        );
      } else {
        toast.error(data.error || "Failed to update profile.");
      }
    } catch {
      toast.dismiss(toastId);
      setIsSaving(false);
      toast.error("Connection error. Failed to save settings.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">
      {/* ── Background Graphic (Polished Light Mesh Gradient) ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-[#FBFBFB]">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#8DB8FF]/12 to-[#E0EBFF]/5 blur-[120px] opacity-70" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#d4ff66]/8 to-[#d4ff66]/5 blur-[100px] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#FBFBFB]" />
      </div>

      {/* ── Top-bar ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-[#E6E6E6] px-6 z-50 flex items-center justify-between select-none shadow-none">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-7 w-auto object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-[#2A2A2F]/15" />
          <span className="text-sm font-medium text-[#171717]/60 truncate">
            Settings
          </span>
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-8 h-8 rounded-full border border-[#E6E6E6] overflow-hidden cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          <AnimatePresence>
            {isUserMenuOpen && (
              <UserMenu
                name={userName}
                email={userEmail}
                onClose={() => setIsUserMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Dashboard Layout Body ── */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#E6E6E6] bg-white/50 backdrop-blur-md p-6 flex flex-col justify-between select-none shrink-0 min-h-[calc(100vh-3.5rem)] mt-14 relative z-20">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#88888E] px-3 mb-1 uppercase tracking-wider">
                Navigation
              </span>

              <button
                onClick={() => router.push("/dashboard")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-semibold text-black/60 hover:text-black transition-all text-left"
              >
                <Folder className="w-[18px] h-[18px]" />
                All Websites
              </button>
            </div>

            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3">
                Recent websites
              </span>
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-white/60 text-left w-full"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#E6E6E6] overflow-hidden p-0.5 shrink-0">
                  <img
                    src="/logoicon.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[13px] font-semibold text-[#171717] truncate">
                  Back to dashboard
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => router.push("/pricing")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <CreditCard className="w-[18px] h-[18px]" />
                Pricing
              </button>

              <button
                onClick={() => router.push("/docs")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <BookOpen className="w-[18px] h-[18px]" />
                Documentation
              </button>

              <button
                onClick={() => router.push("/settings")}
                className="w-full h-10 px-3 rounded-[8px] bg-white/80 border border-[#E6E6E6]/60 flex items-center gap-3 text-[14px] font-semibold text-black transition-all text-left"
              >
                <Settings className="w-[18px] h-[18px] text-black" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 px-8 md:px-16 py-12 mt-14 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-black font-inter-tight">
              Account Settings
            </h1>
            <p className="text-[14px] text-gray-500 mt-1">
              Manage your professional account details and preferences.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] p-8"
          >
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14.5px] font-medium text-black transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14.5px] font-medium text-black transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userEmail}
                  disabled
                  className="h-11 px-4 rounded-xl bg-[#F3F3F3] border border-[#E6E6E6] outline-none text-[14.5px] font-medium text-gray-500 cursor-not-allowed"
                />
                <span className="text-[11px] text-gray-400 font-medium">
                  Contact email address is linked to better-auth login and
                  cannot be altered.
                </span>
              </div>

              <div className="border-t border-[#E6E6E6] pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="h-11 px-6 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-bold rounded-xl transition-all active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
