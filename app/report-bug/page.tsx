"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { UserMenu } from "@/components/UserMenu";

export default function ReportBugPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("linkedpage_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || "");
        setUserEmail(parsed.email || "");
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error("Please fill out both the subject and description fields.");
      return;
    }
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting bug report...");

    try {
      const res = await fetch("/api/report-bug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, description, severity }),
      });
      const data = await res.json();
      toast.dismiss(toastId);

      if (!res.ok) {
        toast.error(data.error || "Failed to submit report.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Bug report submitted! Our team will investigate.");
      setSubject("");
      setDescription("");
      setSeverity("low");

      setTimeout(() => {
        router.push(userName ? "/dashboard" : "/");
      }, 1000);
    } catch {
      toast.dismiss(toastId);
      toast.error("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">
      {/* ── Background Graphic (Polished Light Mesh Gradient) ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-[#FBFBFB]">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#8DB8FF]/12 to-[#E0EBFF]/5 blur-[120px] opacity-70" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#d4ff66]/8 to-[#d4ff66]/5 blur-[100px] opacity-45" />
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
            Report a bug
          </span>
        </div>

        <div className="flex items-center gap-2 relative">
          {userName ? (
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
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="h-8 px-4 text-xs font-semibold bg-[#2A2A2F] text-white rounded-lg hover:bg-[#3A3A42] transition-all"
            >
              Log in
            </button>
          )}

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
                onClick={() => router.push(userName ? "/dashboard" : "/")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-semibold text-black/60 hover:text-black transition-all text-left"
              >
                <Folder className="w-[18px] h-[18px]" />
                {userName ? "All Websites" : "Home"}
              </button>
            </div>

            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3">
                Recent websites
              </span>
              <button
                onClick={() => router.push(userName ? "/dashboard" : "/")}
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
                  {userName ? "Back to dashboard" : "Back to home"}
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
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <Settings className="w-[18px] h-[18px]" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 px-8 md:px-16 py-12 mt-14 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-black font-inter-tight">
              Report a Bug
            </h1>
            <p className="text-[14px] text-gray-500 mt-1">
              Found something broken? Send a report directly to the developers.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                  Bug Title / Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Subdomain check is failing on certain keywords"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="h-11 px-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14.5px] font-medium text-black transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                    Severity Level
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14px] font-medium text-black transition-colors"
                  >
                    <option value="low">Low (Cosmetic/Typo)</option>
                    <option value="medium">Medium (Annoying/Slow)</option>
                    <option value="high">High (Broken feature)</option>
                    <option value="critical">Critical (Crash/Data loss)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                  Description & Steps to reproduce
                </label>
                <textarea
                  rows={6}
                  placeholder="Please describe exactly what happened and the steps to reproduce the issue."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14.5px] font-medium text-black transition-colors resize-none"
                />
              </div>

              <div className="border-t border-[#E6E6E6] pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 px-6 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-bold rounded-xl transition-all active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}{" "}
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
